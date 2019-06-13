<template>
  <div class="get-success">
    <div class="result-content">
      <div class="result-img">
        <img
          :src="beeIcon.wechat_order_gift_img_failure"
          alt=""
        >
      </div>
      <div class="result-text2">
        领取失败
      </div>
      <div class="result-text1">
        <span class="text1">该赠送订单已被他人抢先一步领取</span>
        <span class="text2">退款将在24小时内原路返回至您的账户</span>
      </div>
      <div class="button-content">
        <van-button class="result-button2">
          逛逛蜂集市
        </van-button>
      </div>
    </div>
    <bee-guess />
  </div>
</template>

<script>
import BeeGuess from '@/components/index/BeeGuess'
export default {
  components: {
    BeeGuess
  },
  props: {},
  data() {
    return {
      beeIcon: {
        wechat_order_gift_img_failure: require('@/assets/icon/common/wechat_order_gift_img_failure.png')
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
    height: 6.8rem;
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
      margin: 0.3rem auto;
      line-height: 0.4rem;
      .text2 {
        color: @Grey2;
        display: block;
      }
    }
    .result-text2 {
      font-size: 0.3rem;
      margin: 0.1rem auto;
    }
    .button-content {
      margin-top: 0.6rem;
      .result-button2 {
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
