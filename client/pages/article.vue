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
      fetchQiitaList() {
        const baseUrl = '/api/articles/qiita';
        request
          .get(baseUrl)
          .set('content-type', 'application/json')
          .then((res) => {
            this.qiita = res.body;
          });
      },
      fetchMediumList() {
        const baseUrl = '/api/articles/medium';
        request
          .get(baseUrl)
          .set('content-type', 'application/json')
          .then((res) => {
            this.medium = res.body;
          });
      }
    },
    mounted() {
      this.fetchQiitaList();
      this.fetchMediumList();
    },
  };
</script>

<style lang="scss">

</style>
