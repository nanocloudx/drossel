<template>
  <div id="article">
    <modules-article-list :items="qiita"></modules-article-list>
    <modules-article-list :items="medium"></modules-article-list>
  </div>
</template>

<script>
  import request from 'superagent';
  import articleList from '../modules/article-list.vue';
  export default {
    name: 'article',
    data () {
      return {
        qiita: null,
        medium: null
      };
    },
    components: {
      'modules-article-list': articleList
    },
    methods: {
      fetch() {
        const baseUrl = '/api/articles';
        request
          .get(baseUrl)
          .set('content-type', 'application/json')
          .then((res) => {
            this.qiita = res.body.qiita;
            this.medium = res.body.medium;
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
