<template>
  <div class="thumbnail-item">
    <a :href="link" target="_blank">
      <div class="image-container">
        <img :src="image" />
      </div>
      <h3 class="title">{{title}}</h3>
      <p class="meta">{{year}} / {{media}} / {{publisher}}</p>
      <p class="description">{{description1}}</p>
      <p class="description">{{description2}}</p>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'thumbnail-item',
    data () {
      return {
        //
      };
    },
    props: [
      'title',
      'description1',
      'description2',
      'year',
      'media',
      'publisher',
      'image',
      'link'
    ]
  };
</script>

<style lang="scss" scoped>
  .thumbnail-item {
    float: left;
    margin: 0.5rem 0.5rem 2rem;
    width: 250px;
    overflow: hidden;
    a {
      text-decoration: none;
    }
    .image-container {
      width: 250px;
      height: 140px;
      margin-bottom: 0.7rem;
      overflow: hidden;
      img {
        width: 250px;
        height: 140px;
        transition-duration: .3s;
        transform: scale(1.05);
      }
    }
    &:hover {
      .image-container {
        img {
          transform: scale(1);
        }
      }
    }
    .title {
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
    }
    .meta {
      margin-bottom: 0.4rem;
      font-size: 1.2rem;
      line-height: 1.2rem;
    }
    .description {
      font-size: 1.1rem;
      line-height: 1.2rem;
      color: #777777;
    }
  }
  @media (max-width: 575px) {
    .thumbnail-item {
      width: 100%;
      height: auto;
      .image-container {
        width: inherit;
        height: inherit;
        margin-bottom: 0.4rem;
        img {
          width: inherit;
          height: inherit;
          transform: scale(1);
        }
      }
    }
  }
</style>
