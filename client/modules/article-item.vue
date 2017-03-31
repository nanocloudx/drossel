<template>
  <div class="article-item">
    <a :href="url" target="_blank">
      <h3 class="title">{{title}}</h3>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'article-item',
    data () {
      return {
        //
      };
    },
    props: [
      'title',
      'timestamp',
      'url'
    ]
  };
</script>

<style lang="scss" scoped>
  .article-item {
    a {
      text-decoration: none;
    }
    margin-bottom: 1rem;
  }
</style>
