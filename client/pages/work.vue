<template>
  <div id="work">
    <modules-thumbnail-list :items="items"></modules-thumbnail-list>
  </div>
</template>

<script>
  import thumbnailList from '../modules/thumbnail-list.vue';
  export default {
    name: 'work',
    data () {
      return {
        items: [
          {
            title: 'にゃんぱす！',
            year: '2016',
            media: 'Web',
            publisher: 'どろっせる',
            description1: '同人イベントが見つかるウェブサービス。',
            description2: '即売会の開催情報を見やすく掲載。',
            image: '/assets/images/works/nyanpass.jpg',
            externalLink: 'http://www.nyanpass.net/'
          },
          {
            title: 'にゃんぱす！製作日誌',
            year: '2016',
            media: 'Book',
            publisher: '黒曜堂 with どろっせる',
            description1: 'にゃんぱす！の開発で得た知見を纏めた技術本。',
            description2: '空港駆動開発の話など。寄稿とデザインを担当。',
            image: '/assets/images/works/nyanpass-book.jpg',
            externalLink: 'https://booth.pm/ja/items/391524'
          },
          {
            title: 'あずにゃんでもわかるHTML5',
            year: '2011',
            media: 'Book',
            publisher: 'どろっせる (旧にょにっつ!)',
            description1: '当時策定中だったHTML5について纏めた技術本。',
            description2: 'けいおん!の二次創作まんがにあわせて紹介。',
            image: '/assets/images/works/nyonits-book.jpg'
          },
          {
            title: '変わらぬ世界で',
            year: '2011',
            media: 'Video',
            publisher: 'EastNewSound',
            description1: 'ENSオリジナルアルバム UncannyInstinct 収録曲。',
            description2: '雪山で撮影。ボーカルは茶太さん。MVを担当。',
            image: '/assets/images/works/eastnewsound.jpg',
            externalLink: 'https://www.youtube.com/watch?v=Gx07N8KD2SI'
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
