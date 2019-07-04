<template>
  <div class="my-qrcode">
    <div class="header-text">
      <div class="header-text1">
        邀请好友加入您的蜂友圈
      </div>
      <div class="header-text2">
        邀请扫描二维码 - 加入您的蜂友圈和集市一起共享收益
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
              :onerror="$store.state.app.defaultImg"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入微信分享
import wxapi from '@/utils/wxapi.js'
import { getQrcode } from '@/api/BeeApi/user'
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
      qrcode: ''
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
      this.qrcode = 'data:image/jpeg;base64,' + res.data

      wxapi.wxShare({
        title: '蜂集市', // 分享标题, 请自行替换
        desc: '蜂集市，让生活蜂富起来！', // 分享描述, 请自行替换
        link: 'https://app.fengjishi.com/#/persion/myQrcode', // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg' // 分享图标, 请自行替换，需要绝对路径
      })
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
          background-color: #000000;
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
    }
  }
}
</style>
