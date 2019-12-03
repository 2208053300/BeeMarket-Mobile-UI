<template>
  <!-- NOTE 好物优选 -->
  <div class="best-goods">
    <div class="banner">
      <div class="title-box">
        <img class="title" :src="icon.titleImg">
        <p class="sub-title text-center">
          好物优选宣传文案
        </p>
      </div>
      <div class="swiper-box1">
        <Swiper
          :block="false"
          :type="type"
          :bg-color="bgColor"
          :font-color="fontColor"
        />
      </div>
      <div class="rule-btn flex">
        <span>活动规则</span>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="produce-list">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in commodityList"
          :key="index"
          class="commodity-details"
          @click="goDetail(item.pid, item.target)"
        >
          <div class="flex">
            <div class="commodity-img">
              <img :src="item.tUrl" alt="">
            </div>
            <div class="commodity-info flex flex-column flex-between">
              <div>
                <div class="name">
                  {{ item.pname }}
                </div>
                <div class="mark flex">
                  <span>超值价</span>
                </div>
              </div>
              <div class="flex flex-between">
                <div class="price">
                  <div class="now-price">
                    ￥<span>{{ item.sell_price }}</span>
                  </div>
                  <span class="old-price"> ￥{{ item.line_price }} </span>
                </div>

                <button
                  class="go-buy"
                  type="button"
                  @click.stop="goDetail(item.pid, item.target)"
                >
                  <span>去抢购</span>
                </button>
              </div>
            </div>
          </div>
          <div class="item-swiper">
            <Swiper
              :block="false"
              :type="type"
              :bg-color="bgColor1"
              :font-color="fontColor1"
            />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { getUID } from '@/api/BeeApi/user'
import { getPreferenceData } from '@/api/BeeApi/home'
import Swiper from '../components/Swiper'
export default {
  metaInfo() {
    // title: '活动模板1'
    return {
      title: this.title
    }
  },
  components: {
    Swiper
  },
  props: {},
  data() {
    return {
      title: '好物优选',

      // 中奖信息滚动所需数据
      bgColor: 'RGBA(100, 16, 32, .7)',
      bgColor1: 'rgba(244,244,244,1)', // 商品列表swiper bg
      fontColor: '#fff',
      fontColor1: '#999',
      type: 2,

      loading: false,
      finished: false,
      page: 1,
      commodityList: [],
      icon: {
        titleImg: require('@/assets/icon/bestGoods/title.png')
      },
      osObj: getOs()
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
    this.onLoad()
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
    onLoad() {
      console.log('好物优选fdsfdf：')
      // 异步更新数据
      setTimeout(async() => {
        // if (this.productData.total === this.commodityList.length) {
        //   this.finished = true
        //   this.loading = false
        //   return
        // }
        const res = await getPreferenceData({ page: this.page })
        console.log('好物优选：', res.data)

        this.commodityList.push(...res.data)
        this.page++
        this.loading = false
        // 数据全部加载完成
        // if (res.data.product_list.length === 0) {
        //   this.finished = true
        // }
      }, 500)
    },

    // 获取活动数据
    // async getActivityDetailData() {
    //   const res = await activityDetail({ id: this.$route.query.id })
    //   this.activity = res.data
    //   this.loadUID()
    // },
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

<style scoped  lang="less">
.best-goods {
  background-image: linear-gradient(to right, #9f2440, #610710);
  .banner {
    width: 7.5rem;
    // height: 4.78rem;
    height: 3.45rem;
    margin: 0 auto;
    position: relative;
    background: url(../../../assets/icon/bestGoods/banner_bg.png) no-repeat;
    background-size: cover;
    .rule-btn {
      position: absolute;
      top: 0.2rem;
      right: 0;
      width: 1.25rem;
      height: 0.5rem;
      background-image: linear-gradient(to right, #e8cdbe, #e8b395);
      font-size: 0.24rem;
      color: #fff;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      span {
        margin: auto;
      }
    }
  }
  .title-box {
    padding-top: 0.81rem;
    p {
      margin: 0;
    }
  }
  .title {
    display: block;
    width: 50%;
    height: 0.84rem;
    margin: 0 auto 0.32rem;
  }
  .swiper-box1 {
    width: 3.7rem;
    margin: 0.2rem auto 0;
    border-radius: 0.3rem;
  }
  .produce-list {
    width: 7.1rem;
    margin: 0 auto;
  }
  .commodity-details {
    margin-bottom: 0.3rem;
    background-color: #fff;
    padding: .2rem;
    border-radius: 0.1rem;
    .commodity-img {
      width: 2.14rem;
      height: 2.14rem;
      border-radius: 0.04rem;
      overflow: hidden;
      margin-right: 0.2rem;
    }
    .commodity-info {
      flex: 1;
      overflow: hidden;
      padding: 0.08rem 0;
      .mark {
        margin-top: .2rem;
        width: 0.84rem;
        height: 0.32rem;
        font-size: 0.2rem;
        color: #ffa42f;
        border: 1px solid #ffa42f;
        border-radius: 0.05rem;
        span {
          margin: auto;
        }
      }
      .name {
        font-size: 0.3rem;
        color: #333;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        font-size: 0.2rem;
        .now-price {
          display: inline-block;
          color: #ffa42f;
          margin-right: 0.2rem;
          span {
            font-size: 0.4rem;
          }
        }
        .old-price {
          color: @Grey1;
          text-decoration: line-through;
        }
      }
      .go-buy {
        display: flex;
        border: none;
        width: 1.32rem;
        height: 0.48rem;
        line-height: 0.48rem;
        color: #fff;
        background-color: @BeeDefault;
        border-radius: 0.1rem;
        font-size: 0.28rem;
        span {
          margin: auto;
        }
      }

    }
     .item-swiper{
        width:100%;
        margin-top: .2rem;
        border-radius: .3rem;
      }
  }
}
</style>
