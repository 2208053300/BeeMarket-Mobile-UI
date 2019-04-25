<template>
  <div>
    <van-nav-bar fixed>
      <van-icon
        slot="left"
        name="wap-home"
        size="0.5rem"
        :color="BeeDefault"
        @click="goHome"
      />
      <span slot="title">蜂集市</span>
      <van-icon
        slot="right"
        name="cart-o"
        size="0.5rem"
        :color="BeeDefault"
        @click="goCart"
      />
    </van-nav-bar>
  </div>
</template>

<script>
import { BeeDefault } from '../../styles/variables.less'
export default {
  components: {},
  props: {},
  data() {
    return {
      BeeDefault
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goHome() {
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

<style scoped lang="less">
</style>
