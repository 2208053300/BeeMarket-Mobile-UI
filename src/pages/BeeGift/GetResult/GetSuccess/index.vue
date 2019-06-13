<template>
  <div class="get-success">
    <div class="result-content">
      <div class="result-img">
        <img
          :src="beeIcon.wechat_order_gift_img_success"
          alt=""
        >
      </div>
      <div class="result-text1">
        领取成功
      </div>
      <div class="result-text2">
        您已成功领取张**赠送的礼物
        平台将立即安排发货
      </div>
      <div class="button-content">
        <van-button class="result-button1">
          查看订单
        </van-button>
      </div>
      <div class="result-text3">
        关注公众号可随时了解订单进度
      </div>
      <div class="qrcode-content">
        <img
          :src="beeIcon.wechat_order_gift_img_qrcode"
          alt=""
        >
        <!-- TODO 此处是否需要qrcode渲染图片？二维码？ -->
        <div class="qrcode">
          <img
            src=""
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        wechat_order_gift_img_success: require('@/assets/icon/common/wechat_order_gift_img_success.png'),
        wechat_order_gift_img_qrcode: require('@/assets/icon/common/wechat_order_gift_img_qrcode.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.get-success {
  height: 100%;
  padding-top: 46px;
  box-sizing: border-box;
  .result-content {
    height: 100%;
    margin-top: 0.2rem;
    background-color: #fff;
    text-align: center;
    box-sizing: border-box;
    padding: 0.5rem;
    .result-img {
      height: 2.1rem;
      width: 2.9rem;
      margin: auto;
    }
    .result-text1 {
      font-size: 0.34rem;
      color: @BeeDefault;
      margin-top: 0.1rem;
    }
    .result-text2 {
      font-size: 0.3rem;
      width: 4rem;
      margin: 0.15rem auto 0;
    }
    .result-text3 {
      font-size: 0.26rem;
      color: @Grey2;
      margin-top: 0.9rem;
    }
    .button-content {
      margin-top: 0.6rem;
      .result-button1 {
        background-color: #fff;
        border-color: @BeeDefault;
        color: @BeeDefault;
        width: 5.2rem;
        height: 0.88rem;
        line-height: 0.88rem;
        padding: 0;
        border-radius: 0.08rem;
      }
    }
    .qrcode-content {
      margin: 0.3rem auto;
      width: 3.8rem;
      .qrcode{
        width: 3.4rem;
        height: 3.4rem;
        margin: 0.2rem;
        background-color: #000000;
      }
    }
  }
}
</style>
