<template>
  <div>
    <van-nav-bar fixed>
      <van-icon
        slot="left"
        :name="beeIcon.tab_icon_home_s"
        size="0.5rem"
        @click="goHome"
      />
      <span slot="title">农产品礼包</span>
      <span slot="right" @click="$emit('on-rule')">规则</span>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        tab_icon_home_s: require('@/assets/icon/footer/tab_icon_home_s.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goHome() {
      if (window.location.pathname === '/') {
        this.$store.state.app.beeHeader = false
        this.$store.state.app.beeFooter = {
          show: true,
          active: 0
        }
        this.$router.push('/')
      } else {
        window.location.href = this.$store.state.app.homeUri
      }
    }
  }
}
</script>

<style  lang="less">
</style>
