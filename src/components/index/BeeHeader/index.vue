<template>
  <div style="position:relative; z-index:9999;">
    <van-nav-bar fixed class="fixed-header">
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
  props: {

  },
  data() {
    return {
      beeIcon: {
        tab_icon_home_s: require('@/assets/icon/footer/tab_icon_home_s@2x.png'),
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
      // FIXME 多页中，路由不同，需要设置为域名路径？
      this.$store.state.app.beeHeader = false
      this.$store.state.app.beeFooter = {
        show: true,
        active: 0
      }
      this.$router.push('/')
    },
    goCart() {
      this.$store.state.app.beeHeader = false
      this.$store.state.app.beeFooter.show = {
        show: true,
        active: 3
      }
      this.$router.push('/cart')
    }
  }
}
</script>

<style  lang="less">
.fixed-header{z-index: 9999;}
</style>
