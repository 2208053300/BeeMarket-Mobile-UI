<template>
  <div class="home-page">
    <div
      class="header-content"
      :style="{backgroundImage:'url('+beeIcon.home_img_top_bg+')'}"
    >
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
        <van-icon
          :name="beeIcon.home_icon_message"
          class="message-icon"
          @click="$router.push('/beeNotice')"
        />
      </div>
      <header-banner />
    </div>
    <farm-card :home-date="homeDate" />
    <new-product :home-date="homeDate" />
    <action-card />
    <limit-card :home-date="homeDate" />
    <public-action />
    <farm-product :home-date="homeDate" />
    <project-selection :home-date="homeDate" />
    <action-list :home-date="homeDate" />
    <bee-guess />
  </div>
</template>

<script>
import { Grey1 } from '@/styles/index/variables.less'
import { getHome } from '@/api/home'
import headerBanner from './components/headerBanner'
import farmCard from './components/farmCard'
import newProduct from './components/newProduct'
import actionCard from './components/actionCard'
import limitCard from './components/limitCard'
import publicAction from './components/publicAction'
import farmProduct from './components/farmProduct'
import projectSelection from './components/projectSelection'
import actionList from './components/actionList'
import BeeGuess from '@/components/index/BeeGuess'
// import wxapi from '@/utils/wxapi'
export default {
  components: {
    headerBanner,
    farmCard,
    newProduct,
    actionCard,
    limitCard,
    publicAction,
    farmProduct,
    projectSelection,
    actionList,
    BeeGuess
  },
  props: {},
  data() {
    return {
      Grey1,
      beeIcon: {
        nav_icon_search: require('@/assets/icon/category/nav_icon_search@2x.png'),
        home_img_logo: require('@/assets/icon/home/index/home_img_logo@2x.png'),
        home_img_top_bg: require('@/assets/icon/home/index/home_img_top_bg@2x.png'),
        home_icon_message: require('@/assets/icon/home/index/home_icon_message@2x.png'),
        home_icon_message_prompt: require('@/assets/icon/home/index/home_icon_message_prompt@2x.png')
      },
      homeDate: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = true
    this.getHomeData()
    // wxapi.wxRegister(this.wxRegCallback)
  },
  methods: {
    async getHomeData() {
      const res = await getHome()
      this.homeDate = res.data.home
    },
    wxRegCallback() {
      // 用于微信JS-SDK回调
      // this.wxShareTimeline()
      // this.wxShareAppMessage()
    }
  }
}
</script>

<style scoped lang="less">
.home-page {
  margin-bottom: 60px;
  .header-content {
    background-size: contain;
    height: 4rem;
    .home-header {
      height: 0.64rem;
      padding: 0.24rem;
      display: flex;
      align-items: center;
      .logo-content {
        height: 0.4rem;
        width: 1.16rem;
      }
      .search-input {
        background-color: #fff;
        flex: 1;
        height: 0.64rem;
        border-radius: 0.4rem;
        overflow: hidden;
        margin: 0 0.16rem;
        display: flex;
        align-items: center;
        color: @Grey9;
        font-size: 0.28rem;

        .van-icon {
          margin: 0 0.24rem 0 0.3rem;
        }
      }
      .message-icon {
        font-size: 0.6rem;
        margin-left: 0.16rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
