<template>
  <div style="position:relative; z-index:9999;">
    <van-nav-bar
      fixed
      class="fixed-header"
    >
      <van-icon
        slot="left"
        :name="beeIcon.tab_icon_home_s"
        size="0.5rem"
        @click="goHome"
      />
      <span slot="title">蜂集市</span>
      <van-icon
        slot="right"
        :name="beeIcon.tab_icon_shop_s"
        size="0.5rem"
        @click="goCart"
      />
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
        tab_icon_home_s: require('@/assets/icon/footer/tab_icon_home_s.png'),
        tab_icon_shop_s: require('@/assets/icon/footer/tab_icon_shop_s@2x.png')
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
    },
    goCart() {
      if (window.location.pathname === '/') {
        this.$store.state.app.beeHeader = false
        this.$store.state.app.beeFooter.show = {
          show: true,
          active: 3
        }
        this.$router.push('/cart')
      } else {
        window.location.href = this.$store.state.app.homeUri + '/cart'
      }
    }
  }
}
</script>

<style  lang="less">
.fixed-header {
  z-index: 9999;
}
</style>
