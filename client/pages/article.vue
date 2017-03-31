<template>
  <div id="article">
    <p>{{articles}}</p>
  </div>
</template>

<script>
  import request from 'superagent';
  export default {
    name: 'article',
    data () {
      return {
        articles: null
      };
    },
    methods: {
      fetch() {
        const baseUrl = '/api/articles';
        request
          .get(baseUrl)
          .set('content-type', 'application/json')
          .then((res) => {
            this.articles = res.body;
          });
      }
    },
    mounted() {
      this.fetch();
    },
  };
</script>

<style lang="scss">

</style>
