<template>
  <div>
    <van-nav-bar
      title="蜂集市"
      fixed
    >
      <div slot="left" @click="goHome">
        <van-icon name="wap-home" size="0.3rem" />
      </div>
      <div slot="right" @click="goCart">
        <van-icon name="shopping-cart-o" size="0.3rem" />
      </div>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    title: {
      type: String,
      default: ''
    }
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

  },
  methods: {
  // 跳转到首页
    goHome() {
      this.$store.state.app.beeFooter.show = true
      this.$router.push('/')
    },
    // 跳转到首页
    goCart() {
      this.$store.state.app.beeFooter.show = true
      this.$router.push('/cart')
    }
  },
  metaInfo: {
    title: this.title // set a title
  //   titleTemplate: '%s - Yay!', // title is now "My Example App - Yay!"
  //   htmlAttrs: {
  //     lang: 'en',
  //     amp: undefined // "amp" has no value
  //   }
  }
}
</script>

<style scoped lang="less">

</style>
