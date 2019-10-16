<template>
  <div class="prize-draw">
    <Swiper :block="false" :type="type" :bg-color="bgColor" :font-color="fontColor" />
    <div class="title">
      <p class="tip text-center">
        <!-- {{ detail.top_data.status_desc }} -->
      </p>
      <div class="shared-man text-center">
        <img :src="detail.top_data.head_image_url" class="share-avatar">
        <div class="box">
          <p>
            {{ detail.top_data.title }}
          </p>
          <p>
            {{ detail.top_data.title_desc }}
          </p>
        </div>
      </div>
    </div>
    <!-- content -->
    <div class="content">
      <!-- 产品信息 -->
      <div class="product flex flex-between">
        <img :src="detail.product_data.tUrl" class="product-img">
        <div class="product-info flex flex-column flex-between">
          <div>
            <p class="product-name">
              {{ detail.product_data.pname }}
            </p>
            <!-- <p class="product-desc no-wrap">
              {{ product.desc }}
            </p> -->
            <p class="prop">
              {{ detail.product_data.props_name }}
            </p>
          </div>
          <div class="action flex flex-between">
            <p class="product-price">
              <span
                class="sell-price"
              >￥{{ detail.product_data.sell_price }}</span>
              <span
                class="line-price"
              >￥{{ detail.product_data.line_price }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="btns">
        <van-button round size="large" class="re-btn" @click="goDownloadApp">
          查看并领取礼物
        </van-button>
        <van-button round size="large" class="go-market-btn" @click="goDownloadApp">
          我也要免费送礼
        </van-button>
      </div>
    </div>
    <!-- 免费送礼商品列表 -->
    <Products :can-click="false" />
  </div>
</template>

<script>
// import { security } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
// import { confirmOrder } from '@/api/BeeApi/order'
import { getShareData, downInfo } from '@/api/BeeApi/freeGift'

import Products from '../components/Products'
import Swiper from '../components/Swiper'
export default {
  metaInfo: {
    title: '免费送礼'
  },
  components: {
    Products,
    Swiper
  },
  props: {},
  data() {
    return {
      // 中奖信息滚动所需数据
      bgColor: 'rgba(0, 0, 0, .46)',
      fontColor: '#fff',
      type: 2,
      // 不显示顶部轮播导航
      showIndicators: false,
      head_msg: '恭喜你中奖率',
      icon: {
        avatar: require('@/assets/icon/freeGift/freegift_wechat_popup.png'),
        crown: require('@/assets/icon/freeGift/crown.png')
      },

      men: 18,
      showMen: 0,
      // 是否显示展开箭头
      isShowArrow: true,
      isMore: false,
      // 抽奖弹框
      showPopup: false,
      closeOnClickOverlay: false,

      linkData: {},
      // 获取 os 平台
      osObj: getOs(),
      // 是否绑定了手机号码
      is_mobile_bind: false,
      // 分享数据
      share_data: {
        title: '',
        desc: '',
        imgUrl: '',
        link: ''
      },
      // 开奖详情
      detail: {
        top_data: {
          status_desc: '',
          head_image_url: '',
          title: '',
          title_desc: ''
        },
        product_data: {},
        join_data: {}
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {

  },
  created() {},
  beforeDestroy() {
    if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(false)
    }
  },
  mounted() {
    // this.getLinkData()
    // // 判断是否绑定手机号码
    // this.securityData()

    this.getDetailData()
    this.onlywxShare()

    this.$store.dispatch('setSid', this.$route.query.id)
    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.shareMore

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

    // 开奖详情
    async getDetailData() {
      try {
        const res = await downInfo({ id: this.$route.query.id })
        console.log('开奖详情：', res)
        this.detail = res.data
        if (this.detail.join_data.join_num > 15) {
          this.showMen = 15
        } else {
          this.isShowArrow = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 跳转到提示下载
    goDownloadApp() {
      console.log(121313)
      this.$router.push({
        name: 'downloadApp'
      })
    },

    // NOTE 微信分享
    async onlywxShare() {
      const res = await getShareData({
        rid: this.$route.query.id
      })
      this.share_data = res.data
      wxapi.wxShare({
        title: this.share_data.title,
        desc: this.share_data.desc,
        imgUrl: this.share_data.imgUrl,
        link: this.share_data.link
      })
    },
    // NOTE app分享更多朋友
    async shareMore() {
      const res = await getShareData({
        rid: this.$route.query.id
      })
      this.share_data = res.data
      if (this.osObj.isWx) {
        this.showWxTip = true
        wxapi.wxShare({
          title: this.share_data.title,
          desc: this.share_data.desc,
          imgUrl: this.share_data.imgUrl,
          link: this.share_data.link
        })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.share_data.title,
          desc: this.share_data.desc,
          img_path: this.share_data.imgUrl,
          url: this.share_data.link
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.share_data.title,
          this.share_data.desc,
          this.share_data.imgUrl,
          this.share_data.link,
        )
      } else {
        this.showWxTip = true
        wxapi.wxShare({
          title: this.share_data.title,
          desc: this.share_data.desc,
          imgUrl: this.share_data.imgUrl,
          link: this.share_data.link
        })
      }
    }
  }
}
</script>

<style  lang="less">
.prize-draw{
  .van-overlay{background-color:#000; }
  p{margin: 0}

  .head-msg {
    background:rgba(0,0,0,.46);
    padding: 0 0.3rem;
    position: fixed;
    top: .3rem;
    left: .2rem;
    width: 3.79rem;
    z-index: 999;
    border-radius: 20px;
  }
  // .swiper {
  //   height: 0.6rem;
  //   line-height: 0.6rem;
  //   font-size: 0.26rem;
  //   color: #fff;
  // }
  // .swiper-img{
  //   width:.44rem;
  //   height:.44rem;
  //   margin-right: 0.1rem;
  //   border-radius: 50%;
  // }
  .title{background:#F5F5F5;
    .tip{ font-size: 0.38rem;color:@BeeDefault; margin-top: 0.6rem; margin-bottom: 1rem;}
    .shared-man{
      width: 7.18rem;
      height: 1.76rem;
      margin: 1.3rem auto 0;
      position: relative;
      background: url(../../../assets/icon/freeGift/freegift_details_img_text_bg.png) no-repeat;
      background-size: 7.18rem 1.76rem;
      font-size: 0.28rem;
      box-sizing: border-box;
      padding: 0 0.4rem;
      display: flex;
      .box{margin: auto;}
      .share-avatar{width:.96rem;height: .96rem;position: absolute; top: -.58rem; left: 50%; transform: translateX(-50%);border-radius: 50%;}
      p:nth-of-type(1){color: #333;margin-bottom: .1rem;}
      p:nth-of-type(2){color: @BeeDefault}
    }
  }

  .content{
    padding: 0.5rem 0.3rem;
    background: url(../../../assets/icon/freeGift/freegift_details_img_top.png) no-repeat;
    background-size: 100% auto;

    .product {
      background-color: white;
      border-radius: 0.1rem;
      padding: 0.3rem;
      margin-bottom: 0.1rem;
      .product-img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.1rem;
      }
      .product-info {
        width:3.66rem;
        .product-name {
          margin-top: 0.1rem;
          font-size: 0.26rem;
           text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .product-desc {
          font-size: 0.2rem;
          color: #999;
          margin-top: 0.1rem;
        }
        .prop{font-size: 0.24rem; color:#999; margin-top:0.2rem;}

      }
      .action{
         .product-price {
          margin-top: 0.1rem;
        }
        .sell-price{ font-size: 0.4rem;color:@BeeDefault; margin-right: .1rem;}
        .line-price{ font-size: 0.22rem;color:#999; text-decoration: line-through}
      }
    }

    .btns{
      margin: 0.5rem auto .3rem;
      width:6.48rem;

      .van-button{font-size: .32rem;}
      .re-btn{background: @BeeDefault; color: #fff; margin-bottom:0.2rem;}
      .go-market-btn{border-color:@BeeDefault; color: @BeeDefault}
    }

  }

}
</style>
