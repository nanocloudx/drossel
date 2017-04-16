<template>
  <div class="menu" :class="{'is-visible': isVisible}">
    <div>
      <ul @click="onSelect">
        <li><router-link to="/"><i class="fa fa-home fa-fw" aria-hidden="true"></i>INDEX</router-link></li>
        <li><router-link to="/work"><i class="fa fa-diamond fa-fw" aria-hidden="true"></i>WORK</router-link></li>
        <li><router-link to="/article"><i class="fa fa-newspaper-o fa-fw" aria-hidden="true"></i>ARTICLE</router-link></li>
        <li><router-link to="/about"><i class="fa fa-user-circle-o fa-fw" aria-hidden="true"></i>ABOUT</router-link></li>
      </ul>
    </div>
    <div class="bottom">
      <p class="copyright">
        <i class="fa fa-copyright fa-fw" aria-hidden="true"></i>2011 - 2017 どろっせる<br>
        Made with <i class="fa fa-heart fa-fw" aria-hidden="true"></i> in Tokyo
      </p>
      <p class="social">
        <i @click="onClickTwitter" class="fa fa-twitter" aria-hidden="true"></i>
        <i @click="onClickFacebook" class="fa fa-facebook-official" aria-hidden="true"></i>
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
      },
      onClickTwitter() {
        window.open(
          'http://twitter.com/share?url=https://www.drossel.io/&text=どろっせる',
          'twitter',
          'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1'
        );
      },
      onClickFacebook() {
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=http://www.drossel.io/',
          'facebook',
          'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1'
        );
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
      margin: 2rem;
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

    .bottom {
      position: absolute;
      bottom: 2rem;
      width: 240px;
      .copyright {
        color: #aaaaaa;
        text-align: center;
        font-size: 1rem;
        margin: 1rem 0;
      }
      .social {
        text-align: center;
        font-size: 2rem;
        i {
          cursor: pointer;
          color: #eeeeee;
          margin: 0 0.3rem;
        }
      }
    }
  }
</style>
