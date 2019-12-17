<template>
  <div class="share-container">
    <van-popup
      v-model="show"
      class="share-modal"
      transition="van-fade"
    >
      <div class="canvas-content">
        <div v-if="loading" style="padding: 0.5rem 0">
          <van-loading size="24px" vertical>
            二维码生成中...
          </van-loading>
        </div>
        <img
          v-show="posterBase64"
          ref="shareImgPre"
          alt=""
          :src="posterBase64"
        >
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
      loading: false,
      res: ''
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
      if (!this.posterBase64) {
        this.getQrcodeData()
      }
    },
    async loadJimp() {
      this.jimp = await import('jimp')
      this.res = await cashShareQrcode()
      if (this.callback) {
        await this.callback()
      }
    },
    async getQrcodeData() {
      this.loading = true
      if (!this.res) {
        this.callback = this.getQrcodeData
        return
      }
      const qrcode = 'data:image/png;base64,' + this.res.data.qr_code
      const qr = await this.jimp.read(qrcode)
      const backimg = await this.jimp.read(this.liqueur_img_poster_under)
      // 将二维码缩放到100x100 px
      qr.resize(100, 100)
      // 将二维码放到指定x,y位置
      backimg.composite(qr, 175, 765)
      backimg.background(0xffffffff)
      this.posterBase64 = await backimg.getBase64Async(this.jimp.MIME_JPEG)
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
      background: white;
      position: relative;
      border-radius: 0.1rem;
      img {
        border-radius: 0.1rem;
      }
    }
  }
</style>
