
<template>
  <div>
    <van-nav-bar title="功能设置">
      <div
        slot="left"
        class="nav-right"
      >
        <div>
          <van-icon
            name="arrow-left"
            size="20px"
            @click="back"
          />
        </div>
      </div>
    </van-nav-bar>

    <div class="fun-list margin-t-20">
      <van-cell title="功能反馈" is-link @click="goFeedBack" />
    </div>
    <div class="fun-list margin-t-20">
      <van-cell title="关于" is-link to="/persion/beeSetting/about" />
    </div>

    <van-button type="primary" block class="margin-t-20 logout-btn">
      退出
    </van-button>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },
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
.logout-btn{
  background: #fff;
  border-color:#fff;
  color: #323233
}
</style>
