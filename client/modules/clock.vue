<template>
  <div class="clock">
    <p class="time">{{time}}</p>
    <p class="date">{{date}}</p>
  </div>
</template>

<script>
  export default {
    name: 'clock',
    data () {
      return {
        time: '',
        date: '',
        clockInterval: null,
        weekdays: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
      };
    },
    methods: {
      updateTime() {
        const date = new Date();

        const hour = ('0' + date.getHours()).slice(-2);
        const ticker = date.getSeconds() % 2 === 0 ? ':' : ' ';
        const minute = ('0' + date.getMinutes()).slice(-2);
        this.time = `${hour}${ticker}${minute}`;

        const weekday = this.weekdays[date.getDay()];
        const month = this.months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        this.date = `${weekday}, ${month} ${day}, ${year}`;

      }
    },
    mounted() {
      this.updateTime();
      this.clockInterval = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
      clearInterval(this.clockInterval);
    }
  };
</script>

<style lang="scss" scoped>
  .clock {
    color: #ffffff;
    text-align: center;
    text-shadow: 0 0 10px #000000;
  }
  .time {
    font-size: 14rem;
    font-family: 'Share Tech Mono', monospace;
    margin-bottom: -2rem;
  }
  .date {
    font-size: 3.5rem;
    margin-bottom: 2rem;
  }
  @media (max-width: 1094px) {
    .time {
      font-size: 10rem;
      margin-bottom: -1rem;
    }
    .date {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }
  }
</style>
