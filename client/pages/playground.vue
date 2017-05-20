<template>
  <div id="playground">
    <modules-thumbnail-list :items="items"></modules-thumbnail-list>
  </div>
</template>

<script>
  import thumbnailList from '../modules/thumbnail-list.vue';
  export default {
    name: 'playground',
    data () {
      return {
        items: [
          {
            title: 'example',
            description1: 'てすと',
            image: '/assets/images/works/nyanpass.jpg',
            internalLink: '/playground/example'
          }
        ]
      };
    },
    components: {
      'modules-thumbnail-list': thumbnailList
    }
  };
</script>

<style lang="scss">

</style>
