<template>
  <div class="home-page">
    <div class="home-header">
      <div class="logo-content">
        <img
          :src="beeIcon.home_img_logo"
          alt=""
        >
      </div>
      <div class="search-input">
        <van-icon
          slot="left-icon"
          :name="beeIcon.nav_icon_search"
          :color="Grey1"
        />
        <span>蜂集市，让生活丰富起来</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Grey1 } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {},
  data() {
    return {
      Grey1,
      beeIcon: {
        nav_icon_search: require('@/assets/icon/category/nav_icon_search@2x.png'),
        home_img_logo: require('@/assets/icon/home/index/home_img_logo@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.home-page {
  .home-header{
    height: 0.64rem;
    padding: 0.24rem;
    display: flex;
    align-items: center;
    .logo-content{
      height: 0.32rem;
      width: 0.8rem;
    }
    .search-input{
      background-color: #fff;
      width: 4.86rem;
      height: 0.64rem;
      border-radius: 0.4rem;
      overflow: hidden;
      margin: 0 0.16rem;
      display: flex;
      align-items: center;
      color: @Grey9;
      font-size: 0.28rem;

      .van-icon{
        margin: 0 0.24rem 0 0.3rem;
      }
    }
  }
}
</style>
