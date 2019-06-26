<template>
  <div class="help-success">
    <div class="success-card">
      <div class="img-content">
        <img
          :src="beeIcon.publicwelfare_detail_pop_ups_pic_value2"
          alt=""
        >
      </div>
      <p class="success-text1">
        助力成功
      </p>
      <p class="tip">
        请保持关注，我们共同监督！
      </p>
      <p
        v-if="charity_value"
        class="success-text2"
      >
        <van-icon :name="beeIcon.smile" />
        为感谢您的参与，蜂集市送您 <span class="bee-text">100</span> 公益值
      </p>
      <p
        v-if="charity_value"
        class="success-text3"
      >
        海量商品可任选免单
      </p>
      <van-button
        round
        class="join-help2"
        @click="arouseApp()"
      >
        关注领取
      </van-button>
    </div>
  </div>
</template>

<script>
import { goHome, getOs } from '@/utils'
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        publicwelfare_detail_pop_ups_pic_value2: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_pic_value2@2x.png'),
        smile: require('@/assets/icon/discover/smile.jpg')
      },
      charity_value: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.charity_value = this.$route.query.charity_value | 0
  },
  methods: {
    arouseApp() {
      const osObj = getOs()
      if (osObj.isWx) {
        // 微信直接跳转路由
        goHome()
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToCatList.postMessage(1)
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToCatList()
      } else {
        goHome()
      }
    }
  }
}
</script>

<style scoped lang="less">
.success-card {
  padding-top: 0.6rem;
  text-align: center;
  line-height: 1.15;
  .img-content {
    height: 2.12rem;
    width: 2.12rem;
    margin: auto;
  }
  .success-text1 {
    font-size: 0.58rem;
    margin: 0.52rem 0 0.24rem;
    padding: 0;
    font-weight: bold;
    color: @BeeDefault;
  }
  .tip{
    font-size: 0.36rem;
    color: #333;
    font-weight: 600;
    margin-bottom:1rem;
  }
  .success-text2 {
    font-size: 0.26rem;
    color: @Grey2;
    padding: 0;
    margin: 0;
    .bee-text {
      color: @BeeDefault;
      font-size: 0.34rem;
    }
  }
  .success-text3 {
    color: @BeeDefault;
    padding: 0;
    margin: 0;
    margin-top: 1rem;
    font-size: 0.22rem;
  }
  .join-help2 {
    height: 0.8rem;
    width: 5.8rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #ffffff;
    background: linear-gradient(to right, #fe9907, #fec108);
    margin-top: 0.24rem;
  }
}
</style>
