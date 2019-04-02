<template>
  <div>
    <van-tabbar
      v-model="avtive"
      :active-color="BeeDefault"
    >
      <van-tabbar-item
        icon="home-o"
        to="/"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        icon="apps-o"
        to="/category"
      >
        分类
      </van-tabbar-item>
      <van-tabbar-item
        icon="browsing-history-o"
        to="/discover"
      >
        发现
      </van-tabbar-item>
      <van-tabbar-item
        icon="cart-o"
        to="/cart"
      >
        购物车
      </van-tabbar-item>
      <van-tabbar-item
        icon="user-o"
        to="/persion"
      >
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { BeeDefault } from '../../styles/variables.less'
export default {
  components: {},
  props: {},
  data() {
    return {
      BeeDefault: BeeDefault
    }
  },
  computed: {
    // NOTE 高亮图标与state绑定
    avtive: {
      get() {
        return this.$store.state.app.beeFooter.avtive
      },
      set(val) {
        // this.$store.commit('SET_BEEFOOTER', {
        //   show: true,
        //   avtive: val
        // })
        this.$store.state.app.beeFooter.avtive = val
      }
    }
  },
  watch: {
    // NOTE 如果动态更改route,图标高亮
    $route(to, from) {
      if (to.path.indexOf('category') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          avtive: 1
        })
      } else if (to.path.indexOf('discover') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          avtive: 2
        })
      } else if (to.path.indexOf('cart') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          avtive: 3
        })
      } else if (to.path.indexOf('persion') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          avtive: 4
        })
      } else {
        this.active = 0
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
</style>
