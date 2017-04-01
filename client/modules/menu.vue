<template>
  <div class="menu" :class="{'is-visible': isVisible}">
    <div>
      <ul @click="onSelect">
        <li><router-link to="/"><i class="fa fa-home fa-fw" aria-hidden="true"></i>HOME</router-link></li>
        <li><router-link to="/work"><i class="fa fa-diamond fa-fw" aria-hidden="true"></i>WORK</router-link></li>
        <li><router-link to="/article"><i class="fa fa-newspaper-o fa-fw" aria-hidden="true"></i>ARTICLE</router-link></li>
        <li><router-link to="/about"><i class="fa fa-user-circle-o fa-fw" aria-hidden="true"></i>ABOUT</router-link></li>
      </ul>
    </div>
    <div>
      <p class="copyright">
        <i class="fa fa-copyright fa-fw" aria-hidden="true"></i>2011 - 2017 どろっせる<br>
        Made with <i class="fa fa-heart fa-fw" aria-hidden="true"></i> in Akihabara
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'menu',
    data () {
      return {};
    },
    props: ['isVisible'],
    methods: {
      onSelect() {
        this.$emit('onSelectMenuItem');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .menu {
    transition-duration: .3s;
    position: fixed;
    z-index: 200;
    top: 0;
    bottom: 0;
    left: -240px;
    width: 240px;
    a {
      color: #dddddd;
      i {
        color: #b99458;
      }
    }
    background: #333333;
    border-right: 1px solid #666666;

    &.is-visible {
      left: 0;
    }

    ul {
      padding: 2rem;
      li {
        font-size: 1.6rem;
        border-bottom: 1px solid #666666;
        &:last-child {
          border-bottom: none;
        }
        a {
          display: block;
          padding: 1.5rem 1rem;
          text-decoration: none;
          transition-duration: .2s;
          &:hover {
            padding-left: 2rem;
          }
          i {
            margin-right: 1rem;
          }
        }
      }
    }

    .copyright {
      color: #aaaaaa;
      text-align: center;
      font-size: 1rem;
    }
  }
</style>
