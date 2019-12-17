<template>
  <div class="share-container">
    <van-popup
      v-model="show"
      class="share-modal"
      transition="van-fade"
    >
      <div class="canvas-content">
        <van-loading v-if="loading" size="24px" vertical>
          二维码生成中...
        </van-loading>
        <img
          v-show="posterBase64"
          ref="shareImgPre"
          alt=""
          :src="posterBase64"
        >
        <div class="screenshot">
          <img v-show="screenshotBase64End" :src="screenshotBase64End" alt="">
        </div>
      </div>
      <div v-if="!loading" class="text-tip">
        <span>长按保存图片到本地</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { cashShareQrcode } from '@/api/BeeApi/alcohol'
export default {
  props: {},
  data() {
    return {
      show: false,
      liqueur_img_poster_under: require('@/assets/icon/alcohol/liqueur_img_poster_under_zip.png'),
      posterBase64: '',
      screenshotBase64End: '',
      loading: false
    }
  },
  mounted() {
    this.loadJimp()
  },
  destroyed() {
    this.jimp = undefined
    this.callback = undefined
  },
  methods: {
    showShare() {
      this.show = true
      if (!(this.screenshotBase64End && this.posterBase64)) {
        this.getQrcodeData()
      }
    },
    async loadJimp() {
      this.jimp = await import('jimp')
      if (this.callback) {
        await this.callback()
      }
    },
    async getQrcodeData() {
      this.loading = true
      if (!this.jimp) {
        this.callback = this.getQrcodeData
        return
      }
      const jimp = this.jimp
      const res = await cashShareQrcode()
      const qrcode = 'data:image/png;base64,' + res.data.qr_code
      const qr = await jimp.read(qrcode)
      const backimg = await jimp.read(this.liqueur_img_poster_under)
      // 将二维码缩放到100x100 px
      qr.resize(100, 100)
      // 将二维码放到指定x,y位置
      backimg.composite(qr, 175, 765)
      // 获取base64数据
      this.posterBase64 = await backimg.getBase64Async(jimp.MIME_PNG)
      backimg.background(0xffffffff)
      this.screenshotBase64End = await backimg.getBase64Async(jimp.MIME_JPEG)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .share-container {
    .share-modal {
      background: rgba(0, 0, 0, 0);
      .text-tip {
        color: #ffffff;
        font-size: 0.28rem;
        padding: 0.1rem;
        text-align: center;
      }
    }

    .canvas-content {
      text-align: center;
      width: 5.02rem;
      height: auto;
      border-radius: 0.16rem;
      padding: 0.16rem;
      position: relative;
      .canvas-img {
        width: 100%;
        height: 100%;
      }
      .screenshot {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
      }
    }
  }
</style>
