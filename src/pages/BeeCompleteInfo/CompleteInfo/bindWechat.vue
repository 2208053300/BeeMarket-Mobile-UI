<template>
  <div class="bee-task">
    <div class="card head">
      <div class="head-icon">
        <img :src="beeIcon.data_icon_smile" style="width: 1rem;height: 1rem">
      </div>
      <div class="head-text">
        关注公众号+下载APP，可获得100公益值同时享受更多集市福利
      </div>
    </div>
    <div class="card body">
      <div class="step-1-1">
        <img :src="beeIcon.data_icon_1" style="width: 0.5rem">
        <div class="default-text">
          微信中搜索并关注“蜂集市”公众号
        </div>
      </div>
      <div class="step-2-img">
        <img :src="beeIcon.data_pic_description">
      </div>
      <div class="step-2">
        <img :src="beeIcon.data_icon_2" style="width: 0.5rem">
        <div class="default-text">
          点击下载“蜂集市”APP
        </div>
      </div>
      <div style="display: flex;justify-content: center;flex-direction: column;align-items: center">
        <img :src="beeIcon.data_pic_logo" style="width: 0.96rem;height: 1.56rem;margin-top: 0.24rem">
        <div class="btn" @click="download">
          <span>立即下载</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getOs } from '@/utils'
export default {
  metaInfo: {
    title: '完善资料'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        data_icon_smile: require('@/assets/icon/task/perfectData/data_icon_smile@2x.png'),
        data_icon_1: require('@/assets/icon/task/perfectData/data_icon_1@2x.png'),
        data_icon_2: require('@/assets/icon/task/perfectData/data_icon_2@2x.png'),
        data_icon_wechat: require('@/assets/icon/task/perfectData/data_icon_weixin@2x.png'),
        data_pic_description: require('@/assets/icon/task/perfectData/data_pic_description@2x.png'),
        data_pic_logo: require('@/assets/icon/task/perfectData/data_pic_logo@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
  },
  methods: {
    download() {
      window.location.href = '/beeRegister#/download'
    }
    // bindWeChat() {
    //   const osObj = getOs()
    //   if (osObj.isIphone && osObj.isApp) {
    //     window.webkit.messageHandlers.ToBindWeChat.postMessage({
    //       target: ''
    //     })
    //   } else if (osObj.isAndroid && osObj.isApp) {
    //     window.beeMarket.ToBindWeChat()
    //   } else {
    //     this.$toast.fail('请使用手机打开')
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
.bee-task {
  .card {
    margin-top: 0.46rem;
    background: white;
    border-radius: 0.2rem;
    box-sizing: border-box;
    box-shadow: 0 0.02rem 0.1rem rgba(153, 153, 153, 0.2);
    padding: 0.6rem 0.32rem;
  }
  .head {
    margin: 0.2rem 0.3rem;
    padding: 0.4rem 0.32rem;
    .head-icon {
      text-align: center;
      padding-bottom: 0.36rem;
    }
    .head-text {
      text-align: center;
      font-size: 0.3rem;
      font-weight: bold;
      color: @ProductName;
      .unusual {
        color: @BeeDefault;
      }
    }
  }
  .body {
    margin: 0 0.3rem 0.4rem 0.3rem;
    .step-1-1 {
      display: flex;
      align-items: center;
    }
    .step-2 {
      display: flex;
      margin-top: 0.6rem;
      align-items: center;
    }
    .step-2-img {
      margin: 0.4rem 0.36rem 0 0.36rem;
    }
    .default-text {
      padding-left: 0.16rem;
      line-height: 1.3;
      color: @ProductName;
      font-size: 0.26rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.32rem;
      margin-bottom: 0.2rem;
      width: 2.4rem;
      line-height: 0.64rem;
      border-radius: 4px;
      background: @BeeDefault;
      color: white;
      font-size: 0.3rem;
      &:active {
        background: @BeeDefault3;
      }
    }
  }
}
</style>
