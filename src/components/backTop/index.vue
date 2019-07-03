<template>
  <div
    class="back-top"
    @click="toTop"
  >
    <van-icon name="arrow-up" />
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
  methods: {
    toTop() {
      // 动画
      const timer = setInterval(function() {
        const osTop =
          document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    }
  }
}
</script>

<style scoped lang="less">
.back-top {
  position: fixed;
  right: 0.5rem;
  bottom: 1.6rem;
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  z-index: 100;
  color: @BeeDefault;
  border: 0.02rem solid @Grey7;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.4rem;
}
</style>
