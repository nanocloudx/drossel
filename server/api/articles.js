const _ = require('lodash');
const request = require('superagent');
const redisClient = require('../utils/redis');

const articlesAPI = {
  fetchAllList: (req, res) => {
    Promise.all([fetchQiita(), fetchMedium()]).then((results) => {
      res.json({
        qiita: results[0],
        medium: results[1]
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
          timestamp: item.updatedAt,
          url: `https://medium.com/nanocloudx/${item.uniqueSlug}`
        });
      });
      results = _.sortBy(results, 'timestamp').reverse();
      redisClient.setex('article:medium', 600, JSON.stringify(results)); // 10min
      return results;
    });
  });
}

module.exports = articlesAPI;
