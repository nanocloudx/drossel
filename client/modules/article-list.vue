<template>
  <div class="article-list">
    <template v-for="item in items">
      <modules-article-item
        :title="item.title"
        :timestamp="item.timestamp"
        :url="item.url"
        :media="media"
      ></modules-article-item>
    </template>
  </div>
</template>

<script>
  import articleItem from '../modules/article-item.vue';
  export default {
    name: 'articleList',
    data () {
      return {
        //
      };
    },
    props: ['items', 'media'],
    components: {
      'modules-article-item': articleItem
    }
  };
</script>

<style lang="scss">

</style>
