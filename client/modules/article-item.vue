<template>
  <a :href="url" target="_blank">
    <div class="article-item">
      <h3 class="title">{{title}}</h3>
      <p class="meta">
        <i class="fa fa-calendar" aria-hidden="true"></i> {{date}}
        <template v-if="retweet"><i class="fa fa-retweet" aria-hidden="true"></i> {{retweet}}</template>
        <template v-if="favorite"><i class="fa fa-heart-o" aria-hidden="true"></i> {{favorite}}</template>
      </p>
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
      'media',
      'favorite',
      'retweet'
    ]
  };
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
  .article-item {
    padding: 1rem 0.5rem;
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
      background-color: rgba(185, 148, 88, 0.7);
    }
  }
</style>
