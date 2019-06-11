<template>
  <div class="home-page">
    <div class="header-content">
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
      <header-banner :home-data="homeData" />
    </div>
    <operation-card />
    <bee-product :home-data="homeData" />
    <everyday-product :home-data="homeData" />
    <new-product :home-data="homeData" />
    <public-action :home-data="homeData" />
    <farm-product :home-data="homeData" />
    <project-selection :home-data="homeData" />
    <action-list :home-data="homeData" />
    <bee-guess />
  </div>
</template>

<script>
import { Grey1 } from '@/styles/index/variables.less'
import { getHome } from '@/api/BeeApi/home'
import headerBanner from './components/headerBanner'
import operationCard from './components/operationCard'
import everydayProduct from './components/everydayProduct'
import beeProduct from './components/beeProduct'
import newProduct from './components/newProduct'
import publicAction from './components/publicAction'
import farmProduct from './components/farmProduct'
import projectSelection from './components/projectSelection'
import actionList from './components/actionList'
import BeeGuess from '@/components/index/BeeGuess'
// import wxapi from '@/utils/wxapi'
export default {
  components: {
    headerBanner,
    operationCard,
    beeProduct,
    everydayProduct,
    newProduct,
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
        home_icon_message: require('@/assets/icon/home/index/home_icon_message_n@2x.png'),
        home_icon_message_prompt: require('@/assets/icon/home/index/home_icon_message_prompt@2x.png')
      },
      homeData: {
        banner: [],
        daily_product: {
          products: [],
          slogan: '集市每天都会为你推荐好货1'
        },
        limited_plan: {
          left: {
            show_image: ''
          },
          right: {
            show_image: ''
          }
        },
        plan: {
          show_image: ''
        },
        charity_action: {
          action: {}
        }
      },
      pageForm: {}
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
      this.homeData = res.data
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
    .home-header {
      height: 0.64rem;
      padding: 0.18rem 0.24rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      .logo-content {
        height: 0.4rem;
        width: 1.16rem;
      }
      .search-input {
        background-color: @Grey7;
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
