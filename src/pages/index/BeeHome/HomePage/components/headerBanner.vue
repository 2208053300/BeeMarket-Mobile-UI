<template>
  <div class="header-banner">
    <van-swipe
      :autoplay="3000"
      :height="170"
      indicator-color="white"
    >
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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

<style lang="less">
.header-banner {
  margin: 0 0.3rem;
  border-radius: 0.2rem;
  overflow: hidden;
  height: 3.1rem;
  .van-swipe {
    .van-swipe-item{
      background-color: @Grey2;
    }
    .van-swipe__indicators {
      .van-swipe__indicator {
        width: 0.2rem;
        border-radius: 0.08rem;
      }
      .van-swipe__indicator--active {
        width: 0.3rem;
        border-radius: 0.1rem;
      }
    }
  }
}
</style>
