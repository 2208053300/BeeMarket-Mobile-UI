<template>
  <div class="active-tpl">
    <!-- 导航 -->
    <!-- <van-tabs v-model="active" sticky @scroll="tabScroll"> -->
    <van-tabs
      v-show="activity.navigate_data.length>1"
      v-model="active"
      @click="navClick"
    >
      <van-tab
        v-for="(item, index) in activity.navigate_data"
        :key="index"
        :title="item.name"
      />
    </van-tabs>
    <!-- 顶部大图 -->
    <div class="top-img">
      <img :src="activity.background_img">
    </div>
    <div class="content">
      <div
        v-for="(item, index) in activity.product_navigate"
        :key="index"
        class="nav-content"
      >
        <!-- 标题图片 -->
        <img
          v-if="activity.product_navigate.length>1"
          :src="item.navigate_img"
          class="title-img"
        >
        <!-- 主商品 -->
        <div class="main-product">
          <img
            v-for="(item1, index1) in item.topping_product"
            :key="index1"
            :src="item1.show_image"
            class="main-item"
            @click="goDetail(item1.pid,item1.target)"
          >
          <!-- <img src="" alt="" class="main-pro1"> -->
          <!-- 两个主商品 -->
          <!-- <img src="" alt="" class="main-pro2">
          <img src="" alt="" class="main-pro2"> -->
        </div>

        <!-- 四个商品列表 -->
        <!-- :style="{ backgroundImage: 'url(' + actionDetails.background_image_url + ')' }" -->
        <!-- :style="{backgroundColor:item.baColor}" -->
        <ul class="pro-list flex flex-between flex-wrap">
          <li
            v-for="(item1, index1) in item.product_list"
            :key="index1"
            class="item"
          >
            <div class="pro">
              <div
                class="pro-img"
                @click="goDetail(item1.pid,item1.target)"
              >
                <img :src="item1.thumb_url">
              </div>
              <div class="info text-center flex flex-column">
                <span class="desc no-wrap">{{ item1.product_desc }}</span>
                <span class="name  no-wrap">{{ item1.product_name }}</span>
                <span class="price "><span class="mark">￥</span>{{ item1.sell_price }}</span>
                <div class="action">
                  <van-button
                    class="buy-btn"
                    @click="goDetail(item1.pid,item1.target)"
                  >
                    立即购买
                  </van-button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { getUID } from '@/api/BeeApi/user'
import { activityDetail } from '@/api/BeeApi/action'

export default {
  metaInfo() {
    // title: '活动模板1'
    return {
      title: this.activity.title
    }
  },
  components: {},
  props: {},
  data() {
    return {
      // 获取app cookies中的 token
      test1: '',
      // 活动标题
      activity: {
        id: '',
        title: '　',
        background_img: '',
        navigate_data: [],
        product_navigate: [
          {
            product_list: [],
            topping_product: []
          }
        ],
        share_data: {}
      },
      finished: false,
      // 导航选中选
      active: 0,
      // 标签tabs距离顶部的距离
      top: '0',
      // 获取 os 平台
      osObj: getOs(),
      // 顶部导航栏的高度 固定头部 和 tabs
      topH: 0
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
    // 取消监听
    document.removeEventListener('scroll', this.scrollCallback, false)
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    this.getActivityDetailData()

    const vanDom = document.querySelector('.van-tabs__wrap')
    // console.log('公共头部：', document.querySelector('.fixed-header'))
    if (document.querySelector('.fixed-header')) {
      // console.log('有 showHeader')
      // document.querySelector('.showHeader').style.paddingTop = '0'
      if (vanDom) {
        vanDom.style.top = '44px'
      }
      this.topH = 90
    } else {
      this.topH = 44
      if (vanDom) {
        vanDom.style.top = '0'
      }
    }

    // if ((this.osObj.isIphone && this.osObj.isApp) || (this.osObj.isAndroid && this.osObj.isApp)) {
    //   vanDom.style.top = '0'
    // } else {
    //   vanDom.style.top = '44px'
    // }
    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare

    if (this.osObj.isWx) {
      //
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(true)
    } else {
      //
    }
  },
  methods: {
    // 获取活动数据
    async getActivityDetailData() {
      const res = await activityDetail({ id: this.$route.query.id })
      this.activity = res.data
      this.loadUID()
      if (this.activity.navigate_data.length > 1) {
        console.log('需要监听滚动')
        document.addEventListener('scroll', this.scrollCallback, false)
      }
    },
    // 微信分享
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: this.activity.share_data.title,
        desc: this.activity.share_data.desc,
        imgUrl: this.activity.share_data.img,
        link: this.activity.share_data.link
      })
    },
    test() {
      console.log('gundnggg')
    },
    // 滚动监听的函数
    scrollCallback() {
      var self = this
      // self.debounce(function() {
      const navContents = document.querySelectorAll('.nav-content')
      const heightArr = []
      navContents.forEach(item => {
        heightArr.push(item.offsetTop - self.topH)
      })
      // console.log(navContents, heightArr)

      var top = document.documentElement.scrollTop || document.body.scrollTop // 设置变量top,表示当前滚动条到顶部的值
      // var tt = document.getElementsByClassName('nav-content')[0].clientHeight // 设置变量tt,表示当前滚动窗口高度的值
      // console.log(top, tt)

      // const vanTabs = document.querySelector('.van-tabs__wrap')
      // if (top > 44) {
      //   self.$store.state.app.beeHeader = true
      //   vanTabs.style.top = '44px'
      // } else {
      //   self.$store.state.app.beeHeader = true

      //   vanTabs.style.top = '44px'
      // }
      var num = 0
      for (var n = 0; n < heightArr.length; n++) {
        // 在此处通过判断滚动条到顶部的值和当前窗口高度的关系
        // （当前窗口的n倍 <= top <= 当前窗口的n+1倍）来取得和导航索引值的对应关系
        if (top >= heightArr[n] && top < heightArr[n + 1]) {
          num = n
          // console.log('判断序号：', n)
        } else if (top >= heightArr[heightArr.length - 1]) {
          num = heightArr.length - 1
        }
        self.active = num
        // console.log('当前序号：', self.active)
      }
      // for (var n = 0; n < self.navList.length; n++) {
      //   // 在此处通过判断滚动条到顶部的值和当前窗口高度的关系
      //   // （当前窗口的n倍 <= top <= 当前窗口的n+1倍）来取得和导航索引值的对应关系
      //   if (top >= n * tt && top <= (n + 1) * tt) {
      //     num = n
      //   }
      //   self.active = num
      // }
      // }, 100)
    },
    // 跳转到商品详情页
    // 此处判断浏览器环境，做出跳转
    goDetail(pid, target) {
      const osObj = getOs()
      if (osObj.isWx) {
        window.location.href =
          this.$store.state.app.homeUri +
          '/category/details?' +
          'pid=' +
          pid +
          '&target=' +
          target
        // this.$router.push({
        //   path: '/category/details',
        //   query: {
        //     pid,
        //     target
        //   }
        // })
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToProductDetail.postMessage({
          pid: pid,
          target: target
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToProductDetail(pid, target)
      } else {
        window.location.href =
          this.$store.state.app.homeUri +
          '/category/details?' +
          'pid=' +
          pid +
          '&target=' +
          target
      }
    },
    // tabScroll
    tabScroll(scrollTop) {
      console.log(scrollTop)

      // {scrollTop:146px,isFixed:true}
    },
    // 防抖
    debounce(func, wait, immediate) {
      var timeout, args, context, timestamp, result
      var later = function() {
        // 据上一次触发时间间隔
        var last = new Date() - timestamp
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args)
            if (!timeout) context = args = null
          }
        }
      }

      return function() {
        context = this
        args = arguments
        timestamp = new Date()
        var callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
          result = func.apply(context, args)
          context = args = null
        }

        return result
      }
    },

    
    // 点击导航
    // navClick(e) {
    navClick(index, title) {
      console.log('点击的是第几个:', index);
      
      // 用 class="nav-content" 添加锚点
      const jump = document.querySelectorAll('.nav-content')
      console.log('所有的.nav-content:', jump);
      console.log('jump[index]:', jump[index]);
      const total = jump[index].offsetTop
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop
      console.log(total, distance)

      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50
      if (total > distance) {
        smoothDown()
      } else {
        const newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
      function smoothDown() {
        if (distance < total) {
          distance += step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothDown, 0)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothUp, 0)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
    },

    // 分享
    appShare() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.activity.share_data.title,
          desc: this.activity.share_data.desc,
          img_path: this.activity.share_data.img,
          // 地址应该放 web 站 网页
          url: this.activity.share_data.link
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.activity.share_data.title,
          this.activity.share_data.desc,
          this.activity.share_data.img,
          this.activity.share_data.link
          // this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        //
      }
    }
  }
}
</script>

<style  lang="less">
.active-tpl {
  .van-tab {
    color: rgb(51, 51, 51);
    font-size: 0.28rem;
  }
  .van-tab--active {
    color: #fff;
    background: @BeeDefault;
  }
  .van-tabs > .van-tabs__wrap {
    top: 0;
    position: fixed;
    z-index: 999;
  }
  .van-tabs__line {
    background: rgba(3, 0, 0, 0);
  }
  .top-img {
    width: 100%;
    // height: 8.88rem;
  }
  // .title-img{
  // height: 1.56rem;
  // }
  .main-product {
    img {
      width: 100%;
    }
    // .main-item:nth-of-type(1){
    //   height: 6.04rem;
    // }
    // .main-item:nth-of-type(2),.main-item:nth-of-type(3){
    //   height: 4.72rem;
    // }
  }
  // .main-pro1{
  //   width: 100%;
  //   height: 6.04rem;
  // }
  // .main-pro2{
  //   width: 100%;
  //   height: 4.72rem;
  // }
  .pro-list {
    background: #faeee8;
    padding: 0.2rem;
    .item {
      width: 3.48rem;
      margin-bottom: 0.15rem;
      .pro-img {
        width: 3.48rem;
        height: 3.48rem;
        background: #d4baab;
        border-top-left-radius: 0.1rem;
        border-top-right-radius: 0.1rem;
      }
      .info {
        padding: 0.3rem;
        background: #fff;
        border-bottom-left-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
      }
      .desc {
        font-size: 0.2rem;
        color: #999;
        margin-bottom: 0.1rem;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      .name {
        font-size: 0.28rem;
        color: #333;
      }
      .price {
        color: @BeeDefault;
        font-size: 0.36rem;
        margin: 0.15rem auto 0.2rem;
        .mark {
          font-size: 0.24rem;
        }
      }
      .buy-btn {
        border-radius: 0.1rem;
        padding: 0 0.6rem;
        background: @BeeDefault;
        color: #fff;
        font-size: 0.24rem;
        font-weight: 600;
        height: 0.52rem;
        line-height: 0.52rem;
      }
    }
  }
}
</style>
