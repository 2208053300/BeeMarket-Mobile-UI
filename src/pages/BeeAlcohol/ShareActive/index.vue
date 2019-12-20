<template>
  <div class="share-avtive">
    <p class="share-title">
      分享好友参与  立即激活提现
    </p>
    <div
      class="share-img"
      :style="{backgroundImage:'url('+liqueur_img_poster_under+')'}"
    >
      <div class="screenshot">
        <img v-show="screenshotBase64" :src="screenshotBase64" alt="">
      </div>
      <div class="screenshot" style="opacity: 0">
        <img v-show="screenshotBase64" :src="screenshotBase64End" alt="">
      </div>
    </div>
    <div class="download-img" @click="$toast('长按图片保存到本地分享')">
      <img :src="liqueur_button_download" alt="">
    </div>
    <div class="download-img share-link" @click="clipBoardFunc">
      <img :src="liqueur_button_link" alt="">
    </div>
  </div>
</template>

<script>
import wxapi from '@/utils/wxapi.js'
import { cashShareQrcode } from '@/api/BeeApi/alcohol'
import { clipBoard } from '@/utils'
export default {
  metaInfo: {
    title: '分享'
  },
  components: {},
  props: {},
  data() {
    return {
      liqueur_img_poster_under: require('@/assets/icon/alcohol/liqueur_img_poster_under.png'),
      liqueur_button_download: require('@/assets/icon/alcohol/liqueur_button_download.png'),
      liqueur_button_link: require('@/assets/icon/alcohol/liqueur_button_link.png'),
      screenshotBase64: '',
      screenshotBase64End: '',
      qrcode: '',
      link: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getQrcodeData()
  },
  methods: {
    clipBoardFunc() {
      this.$toast('复制成功！')
      clipBoard(this.link + '  购茅台1箱，送现金一万！\n全民抢酒，全民抢钱！')
    },
    async getQrcodeData() {
      const jimp = await import('jimp')
      const res = await cashShareQrcode()
      this.qrcode = 'data:image/png;base64,' + res.data.qr_code
      const qr = await jimp.read(this.qrcode)
      const backimg = await jimp.read(this.liqueur_img_poster_under)
      // 将二维码缩放到100x100 px
      qr.resize(100, 100)
      // 将二维码放到指定x,y位置
      backimg.composite(qr, 175, 765)
      // 获取base64数据
      this.screenshotBase64 = await backimg.getBase64Async(jimp.MIME_PNG)
      setTimeout(async() => {
        backimg.background(0xffffffff)
        this.screenshotBase64End = await backimg.getBase64Async(jimp.MIME_JPEG)
      }, 1000)
      this.link = res.data.share.link
      wxapi.wxShare({
        title: res.data.share.title, // 分享标题, 请自行替换
        desc: res.data.share.desc, // 分享描述, 请自行替换
        link: res.data.share.link, // 分享链接，根据自身项目决定是否需要split
        imgUrl: res.data.share.img // 分享图标, 请自行替换，需要绝对路径
      })
    }
  }
}
</script>

<style scoped lang="less">
.share-avtive{
  padding: 0.8rem 0.5rem;
  text-align: center;
  p{
    padding: 0;
    margin: 0;
  }
  .share-title{
    font-size: 0.36rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }
  .share-img{
    height: 9.25rem;
    width: 6.44rem;
    background-size: cover;
    position: relative;
    .screenshot{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
  }
  .download-img{
    width: 5rem;
    height: 1.3rem;
    margin: auto;
  }
}
</style>
