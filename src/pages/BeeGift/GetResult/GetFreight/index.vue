<template>
  <div class="get-success">
    <div class="result-content">
      <div class="result-img">
        <img
          :src="beeIcon.wechat_order_gift_img_prompt"
          alt=""
        >
      </div>
      <div class="result-text1">
        由于您的地址不支持包邮您需要支付该商品的运费
      </div>
      <div class="result-text2">
        需付金额
      </div>
      <div class="result-text3">
        ￥150
      </div>
      <div class="button-content">
        <van-button class="result-button2">
          去支付
        </van-button>
        <van-button class="result-button1">
          放弃领取
        </van-button>
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
        wechat_order_gift_img_prompt: require('@/assets/icon/common/wechat_order_gift_img_prompt.png')
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
  height: 80%;
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
      font-size: 0.26rem;
      color: @Grey2;
      margin: 0.1rem auto;
      width: 2.9rem;
    }
    .result-text2 {
      font-size: 0.3rem;
      margin: 0.5rem auto 0;
    }
    .result-text3 {
      font-size: 0.6rem;
      color: @BeeDefault;
      margin-top: 0.3rem;
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
      .result-button2{
        width: 5.2rem;
        height: 0.88rem;
        line-height: 0.88rem;
        padding: 0;
        border-radius: 0.08rem;
        color: #fff;
        background-color: @BeeDefault;
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>
