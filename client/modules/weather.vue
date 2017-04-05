<template>
  <div class="weather">
    <p v-if="weatherStatus" class="result">
      <i :class="`wi wi-owm-${dayNight}-${weatherStatus}`"></i>
      <span class="mono">{{temp}}</span><i class="wi wi-celsius"></i>
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
        temp: null
      };
    },
    methods: {
      getWeather() {
        request.get('/api/weather').then((res) => {
          this.weatherStatus = res.body.status;
          this.temp = res.body.temp;
          this.dayNight = res.body.dayNight;
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
      },
      // TODO
      // 任意でユーザーの位置情報の天気を表示できるような実装にする
      getGeolocation() {
        if ('geolocation' in navigator) {
          /* geolocation is available */
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
          });
        } else {
          /* geolocation IS NOT available */
        }
      }
    },
    mounted() {
      this.getWeather();
//      this.getGeolocation();
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
  }
  @media (max-width: 1094px) {
    .weather {
      .result {
        font-size: 4rem;
      }
      .location {
        font-size: 1.5rem;
      }
    }
  }
</style>
