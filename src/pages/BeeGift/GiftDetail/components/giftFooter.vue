<template>
  <div class="gift-footer">
    <van-button
      v-if="giftDetail.status===0"
      class="send-other footer-button"
    >
      转赠
    </van-button>
    <van-button
      v-if="giftDetail.status===0"
      class="get-gift footer-button"
    >
      领取
    </van-button>
    <van-button
      v-if="giftDetail.status===1"
      class="default footer-button"
    >
      转赠
    </van-button>
    <van-button
      v-if="giftDetail.status===2"
      class="default footer-button"
    >
      领取
    </van-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    giftDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.gift-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.1rem;
  box-sizing: border-box;
  padding: 0.11rem 0.32rem;
  background-color: @Grey10;
  text-align: center;
  border-top: 0.02rem solid @Grey4;
  .footer-button {
    border-radius: 0.16rem;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.34rem;
    font-weight: bold;
    box-sizing: border-box;
    color: #ffffff;
    border: 0.02rem solid @BeeDefault;
    background-color: @BeeDefault;
  }
  .send-other {
    width: 2.06rem;
    color: @BeeDefault;
    margin-right: 0.3rem;
    background-color: transparent;
  }
  .default{
    width: 5.86rem;
  }
  .get-gift {
    width: 4.5rem;
  }
}
</style>
