<template>
  <div class="buy-success">
    <img
      :src="require('@/assets/icon/giftPackage/farm_pic_success.png')"
      style="height: auto"
      alt="购买成功"
    >
    <button @click="goGiftHome()">
      挑选农礼包
    </button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    goGiftHome() {
      this.$router.replace({ name: 'giftPackageHome' })
    }
  }
}
</script>

<style lang="less" scoped>
.buy-success {
  height: 100vh;
  text-align: center;
  background: linear-gradient(to bottom, #ffe3be, #fff8ee);
  button {
    font-size: 0.32rem;
    color: white;
    padding: 0;
    width: 5.4rem;
    line-height: 0.88rem;
    background: #915212;
    border-radius: 5rem;
    border: none;
  }
}
</style>
