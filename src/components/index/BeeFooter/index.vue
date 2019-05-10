<template>
  <div>
    <van-tabbar
      v-model="active"
      :active-color="BeeDefault"
    >
      <van-tabbar-item
        to="/"
      >
        首页
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? tabIcon.home_s : tabIcon.home_n"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to="/category"
      >
        分类
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? tabIcon.cat_s : tabIcon.cat_n"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to="/discover"
      >
        发现
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? tabIcon.find_s : tabIcon.find_n"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to="/cart"
      >
        购物车
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? tabIcon.shop_s : tabIcon.shop_n"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to="/persion"
      >
        我的
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? tabIcon.my_s : tabIcon.my_n"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {},
  data() {
    return {
      BeeDefault: BeeDefault,
      tabIcon: {
        home_n: require('@/assets/icon/footer/tab_icon_home_n@2x.png'),
        home_s: require('@/assets/icon/footer/tab_icon_home_s@2x.png'),
        cat_n: require('@/assets/icon/footer/tab_icon_cat_n@2x.png'),
        cat_s: require('@/assets/icon/footer/tab_icon_cat_s@2x.png'),
        find_n: require('@/assets/icon/footer/tab_icon_find_n@2x.png'),
        find_s: require('@/assets/icon/footer/tab_icon_find_s@2x.png'),
        shop_n: require('@/assets/icon/footer/tab_icon_shop_n@2x.png'),
        shop_s: require('@/assets/icon/footer/tab_icon_shop_s@2x.png'),
        my_n: require('@/assets/icon/footer/tab_icon_my_n@2x.png'),
        my_s: require('@/assets/icon/footer/tab_icon_my_s@2x.png')
      }
    }
  },
  computed: {
    // NOTE 高亮图标与state绑定
    active: {
      get() {
        return this.$store.state.app.beeFooter.active
      },
      set(val) {
        // this.$store.commit('SET_BEEFOOTER', {
        //   show: true,
        //   active: val
        // })
        this.$store.state.app.beeFooter.active = val
      }
    }
  },
  watch: {
    // NOTE 如果动态更改route,图标高亮
    $route(to, from) {
      if (to.path.indexOf('category') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          active: 1
        })
      } else if (to.path.indexOf('discover') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          active: 2
        })
      } else if (to.path.indexOf('cart') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          active: 3
        })
      } else if (to.path.indexOf('persion') !== -1) {
        this.$store.commit('SET_BEEFOOTER', {
          show: true,
          active: 4
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
.van-tabbar-item__icon img {
  width: 18px;
}
</style>
