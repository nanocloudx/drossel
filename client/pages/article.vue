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
      display: flex;
      .media {
        margin: 0.5rem;
        width: 345px;
        h2 {
          font-size: 1.8rem;
          padding: 0 0.5rem;
        }
        .border {
          width: 200px;
          height: 1px;
          background-color: #dddddd;
          margin: 0.8rem 0;
        }
      }
    }
  }
</style>
