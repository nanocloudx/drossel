<template>
  <div id="article">
    <div class="media-container">
      <div class="media">
        <h2><i class="fa fa-code fa-fw" aria-hidden="true"></i>Tech</h2>
        <div class="border"></div>
        <modules-article-list :items="qiita" :media="'Qiita'"></modules-article-list>
      </div>
      <div class="media">
        <h2><i class="fa fa-plane fa-fw" aria-hidden="true"></i>Travel</h2>
        <div class="border"></div>
        <modules-article-list :items="medium" :media="'Medium'"></modules-article-list>
      </div>
      <div class="media">
        <h2><i class="fa fa-twitter fa-fw" aria-hidden="true"></i>Twitter</h2>
        <div class="border"></div>
        <modules-article-list :items="twitter" :media="'Twitter'"></modules-article-list>
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
        medium: null,
        twitter: null
      };
    },
    components: {
      'modules-article-list': articleList
    },
    methods: {
      fetchQiitaList() {
        request
          .get('/api/articles/qiita')
          .then((res) => {
            this.qiita = res.body;
          });
      },
      fetchMediumList() {
        request
          .get('/api/articles/medium')
          .then((res) => {
            this.medium = res.body;
          });
      },
      fetchTwitterList() {
        request
          .get('/api/articles/twitter')
          .then((res) => {
            this.twitter = res.body;
          });
      }
    },
    mounted() {
      this.fetchQiitaList();
      this.fetchMediumList();
      this.fetchTwitterList();
    },
  };
</script>

<style lang="scss">
  #article {
    .media-container {
      overflow: hidden;
      display: flex;
      .media {
        margin-right: 1rem;
        width: 345px;
        h2 {
          font-size: 1.8rem;
          margin: 0 0 0.6rem 0.1rem;
        }
        .border {
          width: 180px;
          height: 1px;
          background-color: #dddddd;
          margin: 0.5rem 0;
        }
      }
    }
  }
</style>
