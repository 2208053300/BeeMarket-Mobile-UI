<template>
  <div class="share-avtive">
    <p class="share-title">
      邀好友购茅台  激活提现权益
    </p>
    <p class="share-desc">
      好友扫描二维码-加入您的蜂友圈
    </p>
    <p class="share-desc2">
      和蜂集市一起共享收益
    </p>
    <div
      class="share-img"
      :style="{backgroundImage:'url('+liqueur_img_poster_under+')'}"
    >
      <div class="qrcode-content">
        <img
          :src="qrcode"
          alt="二维码"
        >
      </div>
      <div class="screenshot">
        <img :src="screenshotBase64" alt="">
      </div>
    </div>
    <div class="download-img" @click="$toast('长按图片保存到本地分享')">
      <img :src="liqueur_button_download" alt="">
    </div>
    <div class="share-link" @click="clipBoardFunc">
      <img :src="liqueur_button_link" alt="">
      分享活动链接
    </div>
  </div>
</template>

<script>
import wxapi from '@/utils/wxapi.js'
import { getQrcode } from '@/api/BeeApi/user'
import html2canvas from 'html2canvas/dist/html2canvas.min.js'
import wait from '@/utils/wait'
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
      clipBoard(this.link + '  茅台免费喝，现金轻松赚！\n全民抢酒，全民抢钱！')
    },
    async getQrcodeData() {
      const res = await getQrcode()
      this.qrcode = 'data:image/jpeg;base64,' + res.data.qr_code
      this.link = res.data.link
      wxapi.wxShare({
        title: res.data.title, // 分享标题, 请自行替换
        desc: res.data.desc, // 分享描述, 请自行替换
        link: res.data.link, // 分享链接，根据自身项目决定是否需要split
        imgUrl: res.data.img // 分享图标, 请自行替换，需要绝对路径
      })
      await wait(1000)
      this.createImg()
    },
    async createImg() {
      const imgDom = document.querySelector('.share-img')
      const width = imgDom.offsetWidth
      const height = imgDom.offsetHeight
      const canvas = document.createElement('canvas')
      const scale = 8
      canvas.width = width * scale
      canvas.height = height * scale
      canvas.getContext('2d').scale(scale, scale)
      try {
        const canvasImg = await html2canvas(imgDom, {
          scale: scale,
          canvas: canvas,
          // useCORS: true,
          y: document.querySelector('.share-img').offsetTop,
          width: width,
          height: height,
          // 必须获得其距离顶部距离，避免滚动偏移
          backgroundColor: null
        })
        const img = canvasImg.toDataURL('image/png')
        this.screenshotBase64 = img
      } catch (error) {
        console.log(error)
        this.$toast('生成专属海报失败！')
      }
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
  }
  .share-desc{
    font-size: 0.24rem;
    color: @Grey1;
    margin-top: 0.3rem;
  }
  .share-desc2{
    font-size: 0.24rem;
    color: @Grey1;
  }
  .share-img{
    height: 9.25rem;
    width: 6.44rem;
    background-size: cover;
    position: relative;
    .qrcode-content{
      width: 1rem;
      height: 1rem;
      padding: 0.05rem;
      background-color: #fff;
      position: absolute;
      bottom: 0.6rem;
      left: 1.7rem;
    }
    .screenshot{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
  }
  .download-img{
    width: 5.16rem;
    height: 1.72rem;
    margin: auto;
  }
  .share-link{
    text-align: center;
    font-size: 0.3rem;
    color: @BeeDefault;
    border: 0.02rem solid @BeeDefault;
    height: 0.88rem;
    width: 5.16rem;
    line-height: 0.88rem;
    border-radius: 0.44rem;
    box-sizing: border-box;
    margin: auto;
    img{
      vertical-align: text-bottom;
      width: 0.35rem;
      height: 0.35rem;
    }
  }
}
</style>
