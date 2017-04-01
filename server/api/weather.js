const request = require('superagent');
const redisClient = require('../utils/redis');

const weatherAPI = {
  fetch: (req, res) => {
    fetchWeather().then((results) => {
      res.json(results);
    });
  }
};

function fetchWeather() {
  return redisClient.get('weather').then((result) => {
    if (result) {
      return JSON.parse(result);
    }
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const ajax = request.get(baseUrl).query({
      q: 'chiyoda,tokyo,jp',
      units: 'metric',
      APPID: '270d1fd480b5a8393b40039b1d53a52e'
    });
    return ajax.then((res) => {
      // 昼夜判定
      const sunrise = res.body.sys.sunrise;
      const sunset = res.body.sys.sunset;
      const nowTime = new Date().getTime() / 1000;
      const dayNight = (nowTime < sunrise || sunset < nowTime) ? 'night' : 'day';
      // ステータスコード
      const status = res.body.weather[0].id;
      // 気温
      const temp = Math.round(res.body.main.temp);

      const result = {status, temp, dayNight};
      redisClient.setex('weather', 300, JSON.stringify(result)); // 5min
      return result;
    });
  });
}

module.exports = weatherAPI;
