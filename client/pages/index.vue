<template>
  <div id="index" :class="weatherClass">
    <div class="center">
      <modules-clock></modules-clock>
      <modules-weather @onUpdate="onUpdateWeather"></modules-weather>
    </div>
  </div>
</template>

<script>
  import clock from '../modules/clock.vue';
  import weather from '../modules/weather.vue';
  export default {
    name: 'index',
    data () {
      return {
        weatherClass: null
      };
    },
    methods: {
      onUpdateWeather(weather) {
        this.weatherClass = `weather-${weather}`;
      }
    },
    components: {
      'modules-clock': clock,
      'modules-weather': weather
    }
  };
</script>

<style lang="scss">
  #index {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .center {
      margin-top: 19rem;
    }
    background-color: #666666;
    background-size: cover;

    &.weather-sun {
      background-image: url("/assets/images/weather-sun.jpg");
    }
    &.weather-cloud {
      background-image: url("/assets/images/weather-cloud.jpg");
    }
    &.weather-rain {
      background-image: url("/assets/images/weather-rain.jpg");
    }
    &.weather-snow {
      background-image: url("/assets/images/weather-snow.jpg");
    }
    &.weather-thunder {
      background-image: url("/assets/images/weather-thunderstorm.jpg");
    }
    &.weather-atmosphere {
      background-image: url("/assets/images/weather-atmosphere.jpg");
    }
  }
</style>
