<template>
  <a :href="url" target="_blank">
  <div class="article-item">
      <h3 class="title">{{title}}</h3>
      <p class="meta"><i class="fa fa-calendar" aria-hidden="true"></i> {{date}}</p>
  </div>
  </a>
</template>

<script>
  export default {
    name: 'article-item',
    data () {
      return {
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      };
    },
    computed: {
      date() {
        const date = new Date(this.timestamp);
        const month = this.months[date.getMonth()];
        const day = `0${date.getDate()}`.slice(-2);
        return `${month} ${day}, ${date.getFullYear()}`;
      }
    },
    props: [
      'title',
      'timestamp',
      'url',
      'media'
    ]
  };
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .article-item {
    padding: 1rem;
    .title {
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
    }
    .meta {
      font-size: 1.1rem;
      line-height: 1.2rem;
      color: #777777;
    }
    &:hover {
      background-color: rgba(185, 148, 88, 0.71);
    }
  }
</style>
