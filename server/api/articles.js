const request = require('superagent');

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
    return results;
  });
}

function fetchMedium() {
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
    return results;
  });
}

module.exports = articlesAPI;
