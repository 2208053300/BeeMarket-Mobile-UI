<template>
  <div class="home-page">
    <img
      :src="beeIcon.home_img_top_bg_under"
      class="top-bg"
    >
    <winning-roll style="position: fixed; top: 1.4rem;left: 0.3rem;z-index: 100" type="home" />
    <div class="header-content">
      <div class="home-header">
        <div class="logo-content">
          <img
            :src="beeIcon.home_img_logo"
            alt=""
          >
        </div>
        <div
          class="search-input"
          @click="$router.push('/category/SearchCommodity')"
        >
          <van-icon
            slot="left-icon"
            :name="beeIcon.nav_icon_search"
            :color="Grey1"
          />
          <span>蜂集市，让生活蜂富起来</span>
        </div>
        <van-icon
          :name="$store.state.user.have_no_read?beeIcon.home_icon_message_prompt:beeIcon.home_icon_message"
          class="message-icon"
          @click="authRoute('/beeNotice')"
        />
      </div>
      <header-banner :home-data="homeData" />
    </div>
    <operation-card />
    <bee-product :home-data="homeData" />
    <everyday-product :home-data="homeData" />
    <healthy-life :home-data="homeData" />
    <bee-product2 :home-data="homeData" />
    <farm-product :home-data="homeData" />
    <bottom-card :home-data="homeData" />
    <new-product :home-data="homeData" />
    <action-list :home-data="homeData" />
    <guess-like :guess-data="homeData.random_product" />
    <!-- <actionPop /> -->
  </div>
</template>

<script>
import { getUID } from '@/api/BeeApi/user'
import { Grey1 } from '@/styles/index/variables.less'
import { getHome } from '@/api/BeeApi/home'
import headerBanner from './components/headerBanner'
import operationCard from './components/operationCard'
import everydayProduct from './components/everydayProduct'
import bottomCard from './components/bottomCard'
import beeProduct from './components/beeProduct'
import beeProduct2 from './components/beeProduct2'
import newProduct from './components/newProduct'
import farmProduct from './components/farmProduct'
import healthyLife from './components/healthyLife'
import actionList from './components/actionList'
import guessLike from './components/guessLike'
// import actionPop from './components/actionPop'
import { isLogin } from '@/utils/auth'
import wxapi from '@/utils/wxapi'
import { getOs } from '@/utils'
import WinningRoll from '@/components/BeeWinningRoll/index'
export default {
  metaInfo() {
    return {
      title: '首页'
    }
  },
  components: {
    headerBanner,
    operationCard,
    beeProduct,
    beeProduct2,
    everydayProduct,
    bottomCard,
    newProduct,
    farmProduct,
    actionList,
    guessLike,
    // actionPop,
    WinningRoll,
    healthyLife
  },
  props: {},
  data() {
    return {
      Grey1,
      beeIcon: {
        nav_icon_search: require('@/assets/icon/category/nav_icon_search@2x.png'),
        home_img_logo: require('@/assets/icon/home/index/home_img_logo@2x.png'),
        home_icon_message: require('@/assets/icon/home/index/home_icon_new@2x.png'),
        home_icon_message_prompt: require('@/assets/icon/home/index/home_icon_message_prompt@2x.png'),
        home_img_top_bg_under: require('@/assets/icon/home/index/home_img_top_bg_under@2x.png')
      },
      homeData: {
        banner: [],
        daily_product: {
          products: [],
          slogan: '集市每天都会为你推荐好货'
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
        new_user: {
          show_image: ''
        },
        charity_action: {
          action: {}
        },
        feature: {
          top: [
            {
              share_data: []
            }
          ],
          other: [
            {
              products: []
            },
            {
              share_data: []
            }
          ]
        }
      },
      osObj: getOs(),
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = true
    this.loadUID()
    this.getHomeData()
    // 获取用户消息
    this.$store.dispatch('GerUserMsg')
  },
  methods: {
    async getHomeData() {
      const res = await getHome()
      this.homeData = res.data
    },
    // 跳转到需要登录的路由
    async authRoute(path) {
      if (!(await isLogin())) {
        this.$router.push('/login')
      } else {
        this.$router.push(path)
      }
    },
    // 获取uid
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid
      if (this.osObj.isWx) {
        wxapi.wxShare({
          title: '蜂集市-让生活蜂富起来！',
          desc: '能省能免能赚，共享电商平台',
          imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          link: window.location.href.split('#')[0] + '#' + `/?uid=${this.uid}`
        })
      }
      // 分享链接如果带/#/必须使用手动截取
      //  window.location.href.split('#')[0] + '#' +window.location.href.split('#')[1]
    }
  }
}
</script>

<style scoped lang="less">
.home-page {
  margin-bottom: 60px;
  .top-bg {
    width: 100%;
    height: 3.7rem;
    position: absolute;
    top: 0;
  }
  .header-content {
    position: relative;
    background-size: contain;
    .home-header {
      height: 0.64rem;
      padding: 0.18rem 0.24rem;
      display: flex;
      align-items: center;
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
