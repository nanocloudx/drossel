<template>
  <div class="article-item">
    <a :href="url" target="_blank">
      <h3 class="title">{{title}}</h3>
      <p class="meta">{{timestamp}}</p>
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

</style>
