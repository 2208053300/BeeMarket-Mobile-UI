
<template>
  <div>
    <div class="fun-list margin-t-20">
      <van-cell
        title="功能反馈"
        is-link
        @click="goFeedBack"
      />
    </div>
    <div class="fun-list margin-t-20">
      <van-cell
        title="关于"
        is-link
        to="/persion/beeSetting/about"
      />
    </div>

    <van-button
      type="primary"
      block
      class="margin-t-20 logout-btn"
    >
      退出
    </van-button>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '功能设置'
  },
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 跳转到功能反馈
    goFeedBack() {
      this.$store.state.app.beeFooter.show = false
      this.$router.push({
        path: '/persion/BeeSetting/functionFeedBack'
      })
    }
  }
}
</script>

<style scoped lang="less">
.logout-btn {
  background: #fff;
  border-color: #fff;
  color: #323233;
}
</style>
