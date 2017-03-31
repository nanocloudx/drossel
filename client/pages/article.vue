<template>
  <div id="article">
    <div class="media-container">
      <div class="media">
        <h2><i class="fa fa-code fa-fw" aria-hidden="true"></i>Tech</h2>
        <modules-article-list :items="qiita"></modules-article-list>
      </div>
      <div class="media">
        <h2><i class="fa fa-plane fa-fw" aria-hidden="true"></i>Travel</h2>
        <modules-article-list :items="medium"></modules-article-list>
      </div>
      <div class="media">
        <h2><i class="fa fa-twitter fa-fw" aria-hidden="true"></i>Twitter</h2>
        <p>Under construction</p>
      </div>
    </div>
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
  #article {
    .media-container {
      overflow: hidden;
      .media {
        float: left;
        width: 345px;
      }
    }
  }
</style>
