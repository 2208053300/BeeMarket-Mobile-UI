<template>
  <div class="prize-draw">
    <!-- top -->
    <!-- {{ $store.state.cart.sid }}
    {{ $store.state.user.is_bind_mobile }} -->
    <Swiper :block="false" :type="type" :bg-color="bgColor" :font-color="fontColor" />
    <div class="title">
      <div class="top-time">
        <p class="tip text-center">
          {{ detail.top_data.status_desc }}
        </p>
        <div v-if="detail.status===4" class="down-time flex flex-center align-center" @finish="finished">
          <span>剩余领取时间：</span>
          <van-count-down :time="detail.top_data.remain_time">
            <template v-slot="timeData">
              <span class="item">{{ timeData.days }}</span>天
              <span class="item">{{ timeData.hours }}</span>小时
              <span class="item">{{ timeData.minutes }}</span>分
              <!-- <span class="item">{{ timeData.seconds }}</span>秒 -->
            </template>
          </van-count-down>
        </div>
      </div>
      <div class="shared-man text-center">
        <img :src="detail.top_data.head_image_url" class="share-avatar">
        <div class="box">
          <p>
            {{ detail.top_data.title }}
            <!-- <span>{{ linkData.nickname }}</span>送出一份礼物给大家 -->
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

      <!-- 失效文案 -->
      <p v-if="detail.status === -1" class="un-valid text-center bg-white">
        3个小时内没有足够的用户参与抽奖，已失效
      </p>

      <!-- 参与者 -->
      <!-- <div v-else class="participant bg-white"> -->
      <div v-else-if="detail.status!==1" class="participant bg-white">
        <!-- 中奖者信息 -->
        <p v-if="[3,4,5,6].includes(detail.status)" class="getter-tip text-center">
          {{ detail.join_data.winning_desc }}
        </p>
        <p v-if="[3,4,5,6].includes(detail.status)" class="time-tip  text-center">
          {{ detail.join_data.winning_time }}
        </p>
        <!-- 参与人数 -->
        <p class="tip text-center">
          已有<span>{{ detail.join_data.join_num }}</span>人参与，<span>{{ detail.join_data.lottery_qty }}</span>人参与立即开奖
        </p>
        <!-- 中奖者头像 -->
        <div v-if="[3,4,5,6].includes(detail.status)" class="getter-man">
          <img
            :src="detail.join_data.winning_user_head_image"
            class="getter-avatar"
          >
          <img :src="icon.crown" class="crown">
        </div>
        <ul
          class="men flex flex-center flex-wrap"
          :class="{ small: [3,4,5,6].includes(detail.status) }"
        >
          <li
            v-for="(item, index) in detail.join_data.join_user_head_images"
            :key="index"
          >
            <img :src="item">
          </li>
        </ul>
        <!-- 头像超过15个 ，隐藏超出部分，通过点击切换显示与否 -->
        <p v-if="isShowArrow" class="text-center">
          <van-icon
            v-show="isMore === false"
            name="arrow-down"
            @click="showMore(true)"
          />
          <van-icon
            v-show="isMore === true"
            name="arrow-up"
            @click="showMore(false)"
          />
        </p>
      </div>
      <!-- 操作按钮 -->
      <!-- 中奖 -->
      <div>
        <van-button v-if="detail.status === 4" class="action-btn" size="large" @click="getGift">
          <span>我要领取礼物</span>
        </van-button>
        <van-button v-else class="action-btn" size="large" @click="goFreeGiftIndex">
          <span>我也要免费送礼物</span>
        </van-button>
      </div>
    </div>
    <!-- 免费送礼商品列表 -->
    <Products />

    <!-- 抽奖弹框 -->
    <van-popup
      v-model="showPopup"
      class="draw-popup"
      :close-on-click-overlay="closeOnClickOverlay"
    >
      <div class="info text-center">
        <img :src="linkData.head_image_url" class="avatar">
        <p class="name">
          {{ linkData.nickname }}
        </p>
        <p class="tip">
          发起一个送礼，满{{ linkData.lottery_qty }}人参与开奖
        </p>
        <p class="remark">
          <span>{{ linkData.desc }}</span>
        </p>
        <van-button round class="draw-btn" @click="drawLucky">
          快来抽!
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { security } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { confirmOrder } from '@/api/BeeApi/order'
import { linkData, participate, getDetail, getShareData } from '@/api/BeeApi/freeGift'

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
          title_desc: '',
          remain_time: null
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
    this.getDetailData()
    this.securityData()

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
    async getLinkData() {
      try {
        const res = await linkData({ id: this.$route.query.id })

        this.linkData = res.data

        this.showPopup = true
        // is_show 是否显示抽奖弹窗 1 显示 0 隐藏
        if (this.linkData.is_show === 0) {
          this.closePop()

          this.onlywxShare()
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 关闭抽奖弹框
    async closePop() {
      this.showPopup = false
      if (document.querySelector('.van-overlay')) {
        document.querySelector('.van-overlay').style.backgroundColor = 'rgba(0,0,0,.7)'
      }
      this.getDetailData()
    },
    // 抽奖
    async drawLucky() {
      try {
        const res = await participate({ id: this.linkData.id })
        console.log('参与活动：', res)
        if (res.status_code === 200) {
          // this.getDetailData()
          this.closePop()
        }
      } catch (error) {
        console.log('nage:', error)
        this.$toast.fail(error)
      }
    },

    // 开奖详情
    async getDetailData() {
      try {
        const res = await getDetail({ id: this.$route.query.id })
        console.log('开奖详情：', res)
        this.detail = res.data
        this.detail.top_data.remain_time = this.detail.top_data.remain_time * 1000
        if (this.detail.join_data.join_num > 15) {
          this.showMen = 15
        } else {
          this.isShowArrow = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 跳转到免费送礼首页
    goFreeGiftIndex() {
      console.log(123456)

      this.$router.push({
        name: 'beeFreeGift'
      })
    },

    // 点击我要领取礼物
    async getGift() {
      if (!this.$store.state.user.is_bind_mobile) {
        this.$store.dispatch('setSid', this.$route.query.id)
        window.location.href = window.location.origin + '/#/persion/profile/accountBind'
        return
      }
      // TODO 跳转下单 参考免费领取茅台和燕窝
      const res = await confirmOrder(
        JSON.stringify({
          os: 'general|present',
          sid: this.$route.query.id || this.$store.state.cart.sid
        })
      )
      if (res.status_code === 200) {
        this.$store.state.order.orderDetail = res.data
        this.$store.state.order.addrDetail = res.data.addr
        this.$router.push({
          name: 'confirmOrder',
          query: {
            target: 'general|present',
            sid: this.$route.query.id || this.$store.state.cart.sid
          }
        })
      }
    },

    async securityData() {
      const res = await security()
      this.is_mobile_bind = res.data.mobile_bind
      this.$store.dispatch('IsBindMobile', res.data.mobile_bind)
    },
    // 显示/隐藏更多参与者头像
    showMore(type) {
      this.isMore = type
      if (type) {
        this.showMen = this.men
      } else {
        this.showMen = 15
      }
    },

    // 领取时间倒计时结束
    finished() {
      // window.location.reload()
      this.getDetailData()
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
  .title{background:#F5F5F5;
    .tip{ font-size: 0.38rem;color:@BeeDefault; margin-top: 1.3rem; }
    .top-time{
      margin-bottom: 1rem;
    }
    .down-time{
      margin-top: 0.2rem;
      font-size: 0.24rem;
      color: #333;
      .van-count-down{
         font-size: 0.24rem;
         color: #333;
      }
      .item{
         color: @BeeDefault;
      }
    }
    .shared-man{
      width: 7.18rem;
      height: 1.76rem;
      margin: 0 auto;
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
    .un-valid{
      border-radius: 0.1rem;
      margin: 0.2rem auto;
      height: 1.3rem;
      line-height: 1.3rem;
      font-size: 0.3rem;
      color: #333;
    }
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
    .participant{
      padding-top: 0.5rem;
      padding-bottom:.5rem;
      border-radius: 0.1rem;
      background-color: #fff;
      .getter-tip{
        font-size:.32rem ;
        color: @BeeDefault;
      }
      .time-tip{
         font-size: .22rem;
        color: #666;
        margin: 0.2rem auto;
      }
      .tip{font-size:.3rem; margin-bottom:.2rem;}
      .getter-man{
        position: relative;
        width: 1rem;
        margin: 0.5rem auto 0;
        .getter-avatar{
          border: 0.02rem solid #fdd354;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          box-sizing: border-box;
        }
        .crown{position: absolute;top: -0.33rem; left: 50%; width:.64rem;height: 0.38rem;transform: translateX(-50%);}
      }
      .men{
        padding: 0.2rem 0.3rem;
        li{
          margin-right: 0.2rem;
          margin-bottom: 0.2rem;
          &:nth-child(5n),&:last-child{margin-right: 0;}
        }
        img{
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          border: 1px solid #ddd;
          box-sizing: border-box;
        }
        .van-icon{font-size: .4rem; color: #999}
      }
      .men.small{
        width: 60%;
        margin: 0 auto;
        img{
          width:0.64rem;
          height: 0.64rem;
        }
      }
    }

    .action-btn{background:@BeeDefault; font-size: .34rem;color: #fff; border-radius: 0.5rem; margin-top:.4rem; pointer-events: auto;
      span{display: block;}
    }

  }

  .draw-popup{width:6.69rem; height: 7.35rem;
   background:url(../../../assets/icon/freeGift/freegift_wechat_popup.png) no-repeat;
   background-size: 100% 100%;
   p{margin: 0}
   .info{margin-top: 0.55rem;}
   .avatar{width:1rem;height:1rem ;border-radius: 50%;}
   .name{font-size:0.34rem ;color:#fff ; margin: 0.2rem auto 0.3rem;}
   .tip{font-size: .26rem; color: #fff; margin-bottom: 0.54rem;}
   .remark{width: 5.18rem; height: 1.23rem; font-size: .28rem;color: @BeeDefault; line-height: 1.7;
    padding:0 .5rem ;
    margin: 0 auto .58rem;
    box-sizing: border-box;
    background: url(../../../assets/icon/freeGift/freegift_details_img_text_small_bg.png) no-repeat;
    background-size: 5.18rem 1.23rem;
    display: flex;
    span{margin: auto;}
   }
   .draw-btn{ font-size: .34rem;color: @BeeDefault;background-color:#FBFAE7; width: 4.44rem;height: 0.74rem;line-height:0.7rem ;}
  }
}
</style>
