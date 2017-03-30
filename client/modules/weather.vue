<template>
  <div class="weather">
    <p v-if="weatherStatus" class="result">
      <i :class="`wi wi-owm-${dayNight}-${weatherStatus}`"></i>
      <span class="mono">{{temp}}</span><i class="wi wi-celsius"></i>
      <span class="mono">{{humidity}}</span><span class="percentage"><i class="wi wi-humidity"></i></span>
    </p>
    <p v-if="weatherStatus" class="location mono">TOKYO / JAPAN</p>
    <p v-else>Weather N/A</p>
  </div>
</template>

<script>
  import request from 'superagent';
  export default {
    name: 'weather',
    data () {
      return {
        dayNight: null,
        weatherStatus: null,
        temp: null,
        humidity: null
      };
    },
    methods: {
      getWeather() {
        const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const ajax = request.get(baseUrl).query({
          q: 'chiyoda,tokyo,jp',
          units: 'metric',
          APPID: '270d1fd480b5a8393b40039b1d53a52e'
        });
        ajax.then((res) => {
          this.weatherStatus = res.body.weather[0].id;
          this.temp = Math.round(res.body.main.temp);
          this.humidity = res.body.main.humidity;

          // 昼夜判定
          const sunrise = res.body.sys.sunrise;
          const sunset = res.body.sys.sunset;
          const nowTime = new Date().getTime() / 1000;
          if (nowTime < sunrise || sunset < nowTime) {
            this.dayNight = 'night';
          } else {
            this.dayNight = 'day';
          }

          // 背景用イベント
          // OpenWeatherMapのコードで判定
          // https://openweathermap.org/weather-conditions
          switch(Math.floor(this.weatherStatus / 100)) {
            case 8:
              if (this.weatherStatus === 800) {
                this.$emit('onUpdate', 'sun');
              } else {
                this.$emit('onUpdate', 'cloud');
              }
              break;
            case 3:
            case 5:
              this.$emit('onUpdate', 'rain');
              break;
            case 6:
              this.$emit('onUpdate', 'snow');
              break;
            case 2:
              this.$emit('onUpdate', 'thunder');
              break;
            case 7:
              this.$emit('onUpdate', 'atmosphere');
              break;
            default:
              this.$emit('onUpdate', 'cloud'); // todo other
              break;
          }
        });
      }
    },
    mounted() {
      this.getWeather();
    },
  };
</script>

<style lang="scss" scoped>
  .weather {
    color: #ffffff;
    text-align: center;
    text-shadow: 0 0 10px #000000;
    .result {
      font-size: 6rem;
    }
    .location {
      padding-top: 0.5rem;
      font-size: 2rem;
    }
    .mono {
      font-family: 'Share Tech Mono', monospace;
    }
    .percentage {
      font-size: 3.2rem;
      vertical-align: 1.6rem;
    }
  }
  @media (max-width: 1094px) {
    .weather {
      .result {
        font-size: 4rem;
      }
      .location {
        font-size: 1.5rem;
      }
      .percentage {
        font-size: 2rem;
        vertical-align: 1.2rem;
      }
    }
  }
</style>
