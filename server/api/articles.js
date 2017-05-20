const _ = require('lodash');
const request = require('superagent');
const Twitter = require('twitter');
const redisClient = require('../utils/redis');

const articlesAPI = {
  fetchAllList: (req, res) => {
    Promise.all([fetchQiita(), fetchMedium(), fetchTwitter()]).then((results) => {
      res.json({
        qiita: results[0],
        medium: results[1],
        twitter: results[2]
      });
    });
  },

  fetchQiitaList: (req, res) => {
    fetchQiita().then((results) => {
      res.json(results);
    });
  },

  fetchMediumList: (req, res) => {
    fetchMedium().then((results) => {
      res.json(results);
    });
  },

  fetchTwitterList: (req, res) => {
    fetchTwitter().then((results) => {
      res.json(results);
    });
  }
};

function fetchQiita() {
  return redisClient.get('article:qiita').then((result) => {
    if (result) {
      return JSON.parse(result);
    }
    const baseUrl = 'http://qiita.com/api/v2/users/nanocloudx/items.json';
    return request.get(baseUrl).then((data) => {
      let results = [];
      data.body.forEach((item) => {
        results.push({
          title: item.title,
          timestamp: +new Date(item.updated_at),
          url: item.url
        });
      });
      results = _.sortBy(results, 'timestamp').reverse();
      redisClient.setex('article:qiita', 600, JSON.stringify(results)); // 10min
      return results;
    });
  });
}

function fetchMedium() {
  return redisClient.get('article:medium').then((result) => {
    if (result) {
      return JSON.parse(result);
    }
    const baseUrl = 'https://medium.com/nanocloudx/latest?format=json';
    return request.get(baseUrl).catch((err) => {
      const data = JSON.parse(err.rawResponse.substr(16)).payload.posts;
      let results = [];
      data.forEach((item) => {
        results.push({
          title: item.title,
          timestamp: item.latestPublishedAt,
          url: `https://medium.com/nanocloudx/${item.uniqueSlug}`
        });
      });
      results = _.sortBy(results, 'timestamp').reverse();
      redisClient.setex('article:medium', 600, JSON.stringify(results)); // 10min
      return results;
    });
  });
}

function fetchTwitter() {
  return redisClient.get('article:twitter').then((result) => {
    if (result) {
      return JSON.parse(result);
    }
    const twitterClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_SECRET
    });
    const params = {
      screen_name: 'nanocloudx',
      count: 10,
      exclude_replies: true,
      include_rts: false,
      trim_user: true
    };
    return twitterClient.get('statuses/user_timeline', params).then((data) => {
      let results = [];
      data.forEach((item) => {
        results.push({
          title: item.text,
          timestamp: +new Date(item.created_at),
          url: `https://twitter.com/nanocloudx/status/${item.id_str}`,
          favorite: item.favorite_count,
          retweet: item.retweet_count
        });
      });
      redisClient.setex('article:twitter', 60, JSON.stringify(results)); // 1min
      return results;
    });
  });
}

module.exports = articlesAPI;
