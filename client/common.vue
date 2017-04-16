<template>
  <div id="common">
    <div class="header-bar"></div>
    <div class="header" :class="{index: $route.name === 'INDEX', fixed: this.isFixHeader}">
      <div class="menu-button" @click="isVisibleMenu=true">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <p class="breadcrumbs">{{$route.name}}</p>
      <h1>
        <router-link to="/">
          <img v-if="windowWidth >= 1095 && $route.name === 'INDEX'" src="/assets/images/logo-white.png" alt="どろっせる">
          <img v-else src="/assets/images/logo.png" alt="どろっせる">
        </router-link>
      </h1>
    </div>
    <div class="menu">
      <div class="menu-shadow" v-show="isVisibleMenu" @click="isVisibleMenu=false"></div>
      <modules-menu :is-visible="isVisibleMenu" @onSelectMenuItem="isVisibleMenu=false"></modules-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import menu from './modules/menu.vue';
  export default {
    name: 'common',
    data () {
      return {
        isVisibleMenu: false,
        windowWidth: 0,
        isFixHeader: false
      };
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResizeWindow);
        window.addEventListener('scroll', this.onScrollWindow);
        this.onResizeWindow();
      });
    },
    methods: {
      onResizeWindow() {
        this.windowWidth = document.documentElement.clientWidth;
      },
      onScrollWindow() {
        this.isFixHeader = window.scrollY >= 50;
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResizeWindow);
      window.removeEventListener('scroll', this.onScrollWindow);
    },
    components: {
      'modules-menu': menu
    }
  };
</script>

<style lang="scss">
  html {
    font-family: 'Cabin', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #555555;
    a {
      color: #555555;
    }
  }
  #common {
    margin: 0 auto;
    width: 100%;
    max-width: 1080px;
  }
  .content {
    margin: 15rem 2rem 5rem;
  }
  .header-bar {
    position: fixed;
    z-index: 999;
    border-top: 5px solid #333333;
    top: 0;
    left: 0;
    right: 0;
  }
  .header {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 200;
    padding: 10px 50px 5px;
    background-color: #ffffff;
    &.index {
      color: #ffffff;
      text-shadow: 0 0 10px #000000;
      background: none;
      border: none !important;
    }
    &.fixed {
      position: fixed;
      top: 0;
      border-bottom: 1px solid #eeeeee;
    }
    .menu-button {
      float: left;
      cursor: pointer;
      font-size: 2rem;
      padding: 0.8rem 2.5rem;
    }
    .breadcrumbs {
      float: left;
      border-left: 1px solid #dddddd;
      padding: 1rem 2rem;
    }
    h1 {
      float: right;
      padding: 0.6rem 2rem 0;
      img {
        height: 26px;
      }
    }
    overflow: hidden;
  }
  @media (max-width: 1194px) {
    #common {
      width: auto;
    }
    .header-bar {
      display: none;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: auto;
      margin: 0 auto;
      padding: 0.6rem 0;
      height: 5rem;
      background-color: #ffffff !important;
      border-bottom: 1px solid #dddddd;
      &.index {
        text-shadow: none;
        color: inherit;
      }
    }
    .content {
      margin: 7rem 2rem;
    }
  }
  .menu-shadow {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
  }

  //--------------------------------------------------
  // normalization
  //--------------------------------------------------
  html, body, p, ol, ul, li, dl, dt, dd, blockquote,
  figure, fieldset, legend, textarea, pre, iframe,
  hr, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
  }
  ul {
    list-style: none;
  }
  button, input, select, textarea {
    margin: 0;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  body {
    font-size: 1.6rem;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  img, embed, object, audio, video {
    height: auto;
    max-width: 100%;
  }
  iframe {
    border: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td, th {
    padding: 0;
    text-align: left;
  }
</style>
