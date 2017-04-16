<template>
  <div id="about">

    <section>
      <h2>どろっせるについて</h2>
      <div class="border"></div>
      <div class="paragraph">
        <p>どろっせるは、なのくろの個人サークルです。</p>
        <p>拙いながらWeb開発、映像製作、同人誌製作などを行っています。友人のお手伝いのほうが多いです。</p>
        <p>御用の際は、気兼ねなくメール (nanocloudx@gmail.com) またはTwitterのDMよりお問い合わせください。</p>
      </div>
    </section>

    <section>
      <h2>私について</h2>
      <div class="border"></div>
      <div class="profile">
        <img class="profile-image" src="/assets/images/nanocloudx.jpg">
        <div class="profile-description">
          <h3>
            なのくろ
            <span> / nanocloudx</span>
            <span class="profile-link">
              <a href="https://twitter.com/nanocloudx" target="_blank"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></a>
              <a href="https://github.com/nanocloudx" target="_blank"><i class="fa fa-github fa-fw" aria-hidden="true"></i></a>
            </span>
          </h3>
          <dl>
            <dt>おしごと</dt>
            <dd>(たぶん)フロントエンドエンジニア</dd>
            <dt>できること</dt>
            <dd>Web開発、映像製作
            </dd>
            <dt>すきなこと</dt>
            <dd>旅行、深夜アニメ、テーブルゲーム、スポーツ（その他、多趣味なのでだいたい好き）</dd>
            <dt>ごあいさつ</dt>
            <dd>
              <p>なのくろです。26歳です。寂しがりやです。。彼女がいません。。。</p>
              <p>東銀座の某社でウェブサービスを作っています。パソコンが苦手です。</p>
              <p>暇でいるのが苦手で、何か作ってるか動いていないと落ち着かない性格です。</p>
              <p>どうか誰か構ってください、宜しくお願い致しますm(_ _)m</p>
            </dd>
          </dl>
        </div>
      </div>
    </section>

    <section>
      <h2>このサイトについて</h2>
      <div class="border"></div>
      <div class="paragraph">
        <p>このサイトは自己紹介を兼ねて公開しているシングルページアプリケーションです。</p>
        <p>(Vue.js, Node.js, socket.io, Webpack, Redis, Postgresql, Github, Heroku などを利用しています。)</p>
      </div>
      <div class="paragraph">
        <p>情報の表示には以下のサービスを利用しています。</p>
        <p>
          <a href="https://openweathermap.org/api">OpenWeatherMap API</a> |
          <a href="https://dev.twitter.com/">Twitter API</a> |
          <a href="https://qiita.com/api/v2/docs">Qiita API</a> |
          <a href="https://developers.medium.com/">Medium API</a>
        </p>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      //
    };
  }
};
</script>

<style lang="scss">
  #about {
    section {
      margin-bottom: 2rem;
    }
    h2 {
      font-weight: bold;
      font-size: 1.8rem;
    }
    .border {
      width: 180px;
      height: 1px;
      background-color: #dddddd;
      margin: 0.5rem 0 1rem;
    }
    .paragraph {
      font-size: 1.4rem;
      line-height: 1.6rem;
      margin-bottom: 1rem;
    }
    .profile {
      display: flex;
      .profile-image {
        width: 250px;
        height: 250px;
        margin: 0 5rem 2rem 0;
      }
      .profile-description {
        h3 {
          font-size: 1.7rem;
          font-weight: bold;
          margin-bottom: 0.8rem;
          span {
            font-weight: normal;
          }
          .profile-link {
            font-size: 1.8rem;
            margin-left: 1rem;
          }
        }
        dl {
          dt {
            font-size: 1.5rem;
            line-height: 1.7rem;
            font-weight: bold;
          }
          dd {
            font-size: 1.4rem;
            line-height: 1.6rem;
            margin-bottom: 1rem;
          }
        }
      }
    }
    @media (max-width: 700px) {
      .profile {
        flex-direction: column;
      }
      .border {
        width: 100%;
      }
    }

  }
</style>
