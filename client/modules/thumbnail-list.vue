<template>
  <div class="thumbnail-list">
    <template v-for="item in items">
      <modules-thumbnail-item
        :title="item.title"
        :description1="item.description1"
        :description2="item.description2"
        :year="item.year"
        :media="item.media"
        :publisher="item.publisher"
        :image="item.image"
        :link="item.link"
      ></modules-thumbnail-item>
    </template>
  </div>
</template>

<script>
  import thumbnailItem from '../modules/thumbnail-item.vue';
  export default {
    name: 'thumbnailList',
    data () {
      return {
        //
      };
    },
    props: ['items'],
    components: {
      'modules-thumbnail-item': thumbnailItem
    }
  };
</script>

<style lang="scss">
  .thumbnail-list {
    overflow: hidden;
    margin: 0 auto;
  }
  @media (max-width: 1094px) {
    .thumbnail-list {
      width: 780px;
    }
  }
  @media (max-width: 820px) {
    .thumbnail-list {
      width: 520px;
    }
  }
  @media (max-width: 560px) {
    .thumbnail-list {
      width: auto;
    }
  }
</style>
