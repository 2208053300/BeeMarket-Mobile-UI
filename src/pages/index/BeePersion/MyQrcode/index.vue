<template>
  <div class="my-qrcode">
    <div class="header-text">
      <div class="header-text1">
        邀请好友加入您的蜂友圈
      </div>
      <div class="header-text2">
        邀请扫描二维码 - 加入您的蜂友圈和蜂集市一起共享收益
      </div>
      <div
        class="qrcode-content"
        :style="{backgroundImage:'url('+beeIcon.mine_qrcode_img_card+')'}"
      >
        <div class="qrcode-text">
          <div class="qrcode">
            <img
              :src="qrcode"
              alt="二维码"
            >
          </div>
        </div>
        <div class="screenshot">
          <img :src="screenshotBase64" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入微信分享
import wxapi from '@/utils/wxapi.js'
import { getQrcode } from '@/api/BeeApi/user'
import html2canvas from 'html2canvas/dist/html2canvas.min.js'
import wait from '@/utils/wait'
export default {
  metaInfo: {
    title: '我的二维码'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        mine_qrcode_img_card: require('@/assets/icon/personalCenter/mine_qrcode_img_card@2x.png')
      },
      qrcode: '',
      screenshotBase64: ''
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
    async getQrcodeData() {
      const res = await getQrcode()
      this.qrcode = 'data:image/jpeg;base64,' + res.data.qr_code

      wxapi.wxShare({
        title: res.data.title, // 分享标题, 请自行替换
        desc: res.data.desc, // 分享描述, 请自行替换
        link: res.data.link, // 分享链接，根据自身项目决定是否需要split
        imgUrl: res.data.img // 分享图标, 请自行替换，需要绝对路径
      })
      await wait(200)
      this.createImg()
    },
    async createImg() {
      const imgDom = document.querySelector('.qrcode-content')
      const width = imgDom.offsetWidth
      const height = imgDom.offsetHeight
      const canvas = document.createElement('canvas')
      const scale = 2
      canvas.width = width * scale
      canvas.height = height * scale
      canvas.getContext('2d').scale(scale, scale)
      try {
        const canvasImg = await html2canvas(imgDom, {
          scale: scale,
          canvas: canvas,
          // useCORS: true,
          y: document.querySelector('.qrcode-content').offsetTop,
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
.my-qrcode {
  padding: 0.8rem 0.5rem;
  text-align: center;
  .header-text {
    .header-text1 {
      font-size: 0.36rem;
      font-weight: bold;
    }
    .header-text2 {
      margin-top: 0.3rem;
      font-size: 0.24rem;
      color: @Grey1;
    }
    .qrcode-content {
      background-size: contain;
      background-repeat: no-repeat;
      width: 6rem;
      height: 7.2rem;
      margin: 0.52rem auto 0;
      position: relative;
      .qrcode-text {
        width: 100%;
        position: absolute;
        bottom: 0.8rem;
        .qrcode {
          height: 2.4rem;
          width: 2.4rem;
          margin: auto;
          margin-bottom: 0.2rem;
          background-color: #fff;
        }
        .text-content {
          font-size: 0.22rem;
          color: @Grey1;
          .bee-text {
            color: @BeeDefault;
            font-weight: bold;
          }
        }
      }
      .screenshot{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
