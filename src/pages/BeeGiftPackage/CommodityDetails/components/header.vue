<template>
  <div>
    <van-nav-bar fixed>
      <van-icon
        slot="left"
        :name="beeIcon.tab_icon_home_s"
        size="0.5rem"
        @click="goHome"
      />
      <span slot="title">商品详情</span>
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
      this.$router.replace('/')
    }
  }
}
</script>

<style  lang="less">
</style>
