<template>
  <div class="free-gift-history">
    <!-- <div class="head-msg">
      <van-swipe :autoplay="3000" :show-indicators="showIndicators" vertical class="swiper">
        <van-swipe-item v-for="(item, index) in head_msg" :key="index" class="no-wrap">
          {{ item.desc }}
        </van-swipe-item>
      </van-swipe>
    </div> -->
    <p class="history-title">
      送礼记录
    </p>
    <div class="product-list">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="immediateCheck"
        finished-text="我也是有底线的 o(´^｀)o"
        @load="getIndexData"
      >
        <div v-for="(product, index) in products" :key="index" class="product flex flex-between">
          <img :src="product.thumb_url" class="product-img">
          <div class="product-info flex flex-column flex-between">
            <div>
              <p class="product-name">
                {{ product.pname }}
              </p>
            </div>
            <!-- 开奖提示 -->
            <div class="result-tip">
              <!-- fail -->
              <p v-if="product.status===-1" class="fail-tip text-right">
                未达到开奖人数
              </p>
              <!-- ing -->
              <div v-if="product.status===0" class="ing-tip flex flex-between">
                <p class="flex">
                  <span><DownTime :time="product.remain_time" :rid="product.rid" @changeStatus="changeStatus" /></span>后送礼失败
                </p>
                <span>还差{{ product.still_need_num }}人开奖</span>
              </div>
              <!-- success -->
              <div v-if="product.status===1" class="success-tip flex flex-between">
                <p class="flex align-center">
                  领取礼物好友 <img class="success-friend-img" :src="product.receive_friend_head_img">
                </p>
                <span>送礼成功</span>
              </div>
            </div>
            <!-- 操作按钮 -->
            <div class="action flex flex-between">
              <van-button class="detail-btn" size="mini" @click="goPrizeDraw(product.rid)">
                送礼详情
              </van-button>
              <van-button v-if="[1,-1].includes(product.status)" class="re-btn" size="mini" @click="reGift">
                再次赠礼
              </van-button>
              <van-button v-if="product.status===0" class="share-btn" size="mini" @click="shareMore(product)">
                送给更多朋友
              </van-button>
            </div>
          </div>
          <!-- 结果标志 -->
          <img v-if="product.status===1" class="result-img" :src="icon.successImg" alt="">
          <img v-if="product.status===-1" class="result-img" :src="icon.failImg" alt="">
        </div>
      </van-list>
    </div>
    <!-- 微信分享提示遮罩 -->
    <van-popup v-model="showWxTip" class="share-tip-box" position="top">
      <img :src="icon.shareTipImg" class="share-tip-img">
    </van-popup>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { getUID } from '@/api/BeeApi/user'
import { getHistoryData } from '@/api/BeeApi/freeGift'
import DownTime from './components/DownTime'
export default {
  metaInfo: {
    title: '送礼记录'
  },
  components: {
    DownTime
  },
  props: {},
  data() {
    return {
      // 不显示顶部轮播导航
      showIndicators: false,
      head_msg: [],
      loading: false,
      finished: false,
      immediateCheck: false,
      products: [],
      page: 1,
      pageSize: 10,
      // 图标
      icon: {
        defaultAvatar: require('@/assets/icon/beeFriends/home/bee_firends_icon_firends.png'),
        shareTipImg: require('@/assets/icon/share/guide1.png'),
        successImg: require('@/assets/icon/freeGift/freegift_record_img_success.png'),
        failImg: require('@/assets/icon/freeGift/freegift_record_img_failure.png')
      },
      // 获取 os 平台
      osObj: getOs(),
      // 测试倒计时
      time: 1562553053,
      // 微信分享遮罩
      showWxTip: false,
      // 分享数据
      share_data: {
        title: '',
        desc: '',
        img_path: '',
        url: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    document.body.style.backgroundColor = '#FFA62B'
  },
  beforeDestroy() {
    document.body.style.backgroundColor = '#F5F5F5'
  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getIndexData()

    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
  },
  methods: {
    // 获取商品数据
    async getIndexData() {
      const res = await getHistoryData({ page: this.page, pageSize: this.pageSize })
      this.page++
      this.loading = false
      // this.head_msg = res.data.head_msg
      this.products.push(...res.data)
      if (res.data.length < this.pageSize) {
        this.finished = true
      }
    },

    // NOTE 送礼详情
    goPrizeDraw(rid) {
      this.$router.push({
        path: 'prizeDraw',
        query: {
          id: rid
        }
      })
    },

    // NOTE 送给更多朋友
    shareMore(product) {
      console.log(product)

      if (this.osObj.isWx) {
        this.showWxTip = true
        wxapi.wxShare({
          title: product.pname,
          desc: product.pname,
          imgUrl: product.thumb_url,
          link: 'http://192.168.0.90:8080/beeFreeGift#/prizeDraw?id=' + product.rid
        })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: product.pname,
          desc: product.pname,
          img_path: product.thumb_url,
          // 地址应该放 web 站 网页
          url: 'http://192.168.0.90:8080/beeFreeGift#/prizeDraw?id=' + product.rid
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          product.pname,
          product.pname,
          product.thumb_url,
          'http://192.168.0.90:8080/beeFreeGift#/prizeDraw?id=' + product.rid// this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        this.showWxTip = true
        wxapi.wxShare({
          title: product.pname,
          desc: product.pname,
          imgUrl: product.thumb_url,
          link: 'http://192.168.0.90:8080/beeFreeGift#/prizeDraw?id=' + product.rid
        })
      }
    },

    // NOTE 剩余时间归零后，该条送礼记录状态改为失败
    changeStatus(rid) {
      this.products.map(item => {
        if (item.rid === rid) {
          item.status = -1
        }
      })
    },

    // NOTE 再次赠送
    reGift() {
      this.$router.push({
        name: 'beeFreeGift'
      })
    },

    // 微信分享
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: this.share_data.title,
        desc: this.share_data.desc,
        imgUrl: this.share_data.img,
        link: this.share_data.link
      })
    }

  }
}
</script>

<style   lang="less">
.free-gift-history {
  // background: #FFA62B;
  p {
    margin: 0;
  }
  .head-msg {
    background: #FFEBB1;
    padding: 0 0.3rem;
  }
  .swiper{height: 0.6rem; line-height: 0.6rem; font-size: 0.26rem; color: #333;}
  .history-title{
    // margin-top: 0.3rem;
    font-size: .3rem;
    color:#fff;
    position: relative;
    padding-top: .3rem;
    padding-left:0.3rem;
    &::before{
      position: absolute;
      top: 0.3rem;
      left: 0;
      content: '';
      width:3px;
      height: 0.3rem;
      background: #fff;
      border-radius: 0.1rem;
    }
  }
  .product-list {
    padding: 0.3rem;
    .product {
      position: relative;
      background-color: white;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;
      .product-img {
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 0.1rem;
      }
      .product-info {
        width:4.2rem;
        .product-name {
          font-size: 0.26rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .result-tip{font-size: 0.24rem;}
      .fail-tip{color:@BeeDefault;}
      .ing-tip{
         color:#666;
        .success-friend-img{width:0.24rem;height:0.24rem;}
        span{color:@BeeDefault;}
      }
      .success-tip{
        color:#666;
        .success-friend-img{width:0.24rem;height:0.24rem;}
        span{color:@BeeDefault;}
      }
      .action{
        .num{font-size: .22rem; color: @BeeDefault;}
        .van-button{font-size: .28rem; color:#fff; background-color: @BeeDefault; padding: 0 0.3rem;
         height: 0.64rem;
        //  line-height: 0.62rem;
          border-radius: 0.1rem
        }
        .detail-btn{color:@BeeDefault; border-color:@BeeDefault; background:#fff;}
        .share-btn{color:#fff; border:none;background:linear-gradient(180deg,rgba(68,235,75,1),rgba(48,214,56,1),rgba(12,208,26,1));}
      }
      .result-img{position: absolute; top: 0; right: 0 ;width:1.71rem;height:1.71rem;border-radius: 50%; }
    }
  }
  .van-list__finished-text{
    color: #eee
  }
  .van-popup.share-tip-box{background-color: rgba(0, 0, 0, 0); text-align: right;}
  .share-tip-img{width:3.3rem;height: 2.28rem; margin-right: 0.2rem;margin-top: 0.2rem;}
}

</style>
