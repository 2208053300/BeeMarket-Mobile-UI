<template>
  <div class="ticket">
    <div class="subsidy text-center">
      <p :class="{price: total_amount2}">
        {{ total_amount2 }}元
      </p>
      <p class="txt">
        {{ text }}
      </p>
    </div>
    <!-- 补贴券列表 -->
    <div class="ticket-box">
      <p class="title text-center">
        补贴提现
      </p>
      <van-row>
        <!-- type 类型 1可提现 2可转为余额 -->
        <!-- status 状态 1未获得 2已使用 3立即使用 4立即提现 5转为余额 -->
        <van-col v-for="(item, index) in listData" :key="index" span="12">
          <div class="ticket-item text-center" :class="{used: item.status===2}">
            <img v-if="item.type===1 && [1,3,4,5].includes(item.status)" :src="beeIcon.toCash" class="corner-img">
            <img v-if="item.type===1 && item.status===2" :src="beeIcon.notCash" class="corner-img">
            <img v-if="item.type===2 && [1,3,4,5].includes(item.status)" :src="beeIcon.canTurn" class="corner-img">
            <img v-if="item.type===2 && item.status===2" :src="beeIcon.notTurn" class="corner-img">
            <p class="ticket-price">
              {{ item.amount }}<span>元</span>
            </p>
            <div class="flex flex-center">
              <button v-if="[1,2].includes(item.status)" class="btn flex flex-center align-center not-get">
                <span>{{ item.status_text }}</span>
              </button>
              <button v-else class="btn flex flex-center align-center" @click="btnAction(item.id,item.status)">
                <span>{{ item.status_text }}</span>
                <img :src="beeIcon.arrow" class="icon-img">
              </button>
            </div>
            <p class="tip">
              邀请直接蜂友购买<span>1箱</span>立即激活
            </p>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 底部 type  2 分享、1 去购买 按钮 -->
    <div class="bottom">
      <img v-if="type===1" :src="beeIcon.buyBtn" class="btn-img" @click="goIndex">
      <img v-if="type===2" :src="beeIcon.shareBtn" class="btn-img" @click="goShare">
    </div>

    <!-- 微信分享提示遮罩 -->
    <van-popup
      v-model="showWxTip"
      class="share-tip-box"
      position="top"
    >
      <img
        :src="beeIcon.shareTipImg"
        class="share-tip-img"
      >
    </van-popup>
  </div>
</template>

<script>
// import Rule from './components/rule'
// import Cookies from 'js-cookie'
import { getUID } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { getTicketListData, toBalance, toCash } from '@/api/BeeApi/alcohol'

export default {
  metaInfo: {
    title: '领券中心'
  },
  components: { },
  props: {},
  data() {
    return {

      beeIcon: {
        arrow: require('@/assets/icon/alcohol/liqueur_red_envelope_icon_triangle.png'),
        toCash: require('@/assets/icon/alcohol/liqueur_red_envelope_label_mention_n.png'), // 可提现
        notCash: require('@/assets/icon/alcohol/liqueur_red_envelope_label_mention_d.png'), // 不可提现
        canTurn: require('@/assets/icon/alcohol/liqueur_red_envelope_label_turn_n.png'), // 可转余额
        notTurn: require('@/assets/icon/alcohol/liqueur_red_envelope_label_turn_d.png'), // 不可转余额
        buyBtn: require('@/assets/icon/alcohol/liqueur_red_envelope_button_buy.png'), // 不可转余额
        shareBtn: require('@/assets/icon/alcohol/liqueur_red_envelope_button_share.png'), // 不可转余额
        shareTipImg: require('@/assets/icon/share/guide1.png') // 不可转余额
      },

      uid: 0,
      // listData
      listData: [],
      text: '',
      total_amount2: 0,
      type: 0, // 1 分享，2购买
      // 获取 os 平台
      osObj: getOs(),
      // 微信分享提示
      showWxTip: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getUid()
    this.getListData()
    // 此页面不显示header
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 获取现金券列表数据
    async getListData() {
      const res = await getTicketListData()
      this.text = res.data.text
      this.total_amount2 = res.data.total_amount
      this.listData = res.data.lists
      this.type = res.data.type
    },
    // 列表按钮操作 id:现金券id status: 3 立即使用 4 立即提现 5 转为余额
    async btnAction(id, status) {
      let res
      if (status === 3) {
        // this.$router.push('/')
        if (this.osObj.isApp) {
          this.$router.push('/')
        } else {
          this.$router.push({
            path: '/beeAlcohol'
          })
          // window.location.href = window.location.origin + '/beeAlcohol'
        }
      } else if (status === 4) {
        res = await toCash({ id })
        if (res.status_code === 200) {
          window.location.href = window.location.origin + '/beeFriends#/pay'
        } else {
          this.getListData()
        }
      } else if (status === 5) {
        res = await toBalance({ id })
        this.$toast(res.message)
        setTimeout(() => {
          this.getListData()
        }, 2000)
      } else {
        console.log('其他，出问题了额，status:', status)
      }
    },
    // 获取uid
    async getUid() {
      const res = await getUID()
      this.uid = res.data.uid
    },
    // 去购买
    goIndex() {
      if (this.osObj.isApp) {
        this.$router.push('/')
      } else {
        this.$router.push({
          path: '/beeAlcohol'
        })
      }
    },

    // 分享
    async goShare() {
      if (this.osObj.isWx) {
        this.showWxTip = true
        wxapi.wxShare({
          title: '年终狂欢 瓜分1亿',
          desc: '购茅台一箱，送现金一万',
          imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          link: location.origin + '/#/beeAlcohol?uid=' + this.uid
        })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: '年终狂欢 瓜分1亿',
          desc: '购茅台一箱，送现金一万',
          img_path: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          // 地址应该放 web 站 网页
          url: location.origin + '/#/beeAlcohol?uid=' + this.uid
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          '年终狂欢 瓜分1亿',
          '购茅台一箱，送现金一万',
          'https://img.fengjishi.com/app/images/share_logo.jpg',
          location.origin + '/#/beeAlcohol?uid=' + this.uid
        )
      } else {
        console.log('other')
      }
    }
  }
}
</script>

<style scoped lang="less">
.ticket {
  width:100%;
  height: 100%;
  position: fixed;
  top: 0;
  overflow-y: auto;
  box-sizing: border-box;
   background:linear-gradient(to top, rgba(232,99,58,1),rgba(213,24,14,1));
  .subsidy{
    background: url(../../../assets/icon/alcohol/liqueur_red_envelope_banner.png) no-repeat;
    background-size: 100% 100%;
    width: 7.5rem;
    height:3.16rem;
    position: relative;
    box-sizing: border-box;
    padding-top: 0.5rem;
  }
  .price{
    font-size: 1.2rem;
    margin:0 auto 0.1rem;
    font-weight: 600;
    color: #E57F35;
    background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    }
  .txt{font-size: .28rem;color:#ef5821; margin: 0;font-weight: 600;}

  .van-col{ margin-bottom: 0.2rem;}
  .ticket-box{
    margin-bottom: 1.2rem;
    .title{
      color:#CD9761;
      font-size: .36rem;
      font-weight: 600;
      background:url(../../../assets/icon/alcohol/liqueur_red_envelope_decoration.png) no-repeat;
      background-size: 5.39rem 0.15rem;
      background-position: center;
      margin: .4rem auto;
      display: block;
      width:5.39rem;
    }
    .ticket-item{
      background:url(../../../assets/icon/alcohol/liqueur_red_envelope_bg_n.png) no-repeat;
      background-size: 3.19rem 3.9rem;
      width:3.19rem;
      height:3.9rem;
      margin: 0 auto;
      position: relative;
      box-sizing: border-box;
      padding-top: 0.5rem;

      .corner-img{
        position: absolute;
        top: 0;
        left: 0;
        width:.93rem;
        height:.93rem;
      }
      .ticket-price{
        font-size: .92rem;
        color: #EE833B;
        font-weight: 800;
        margin: 0 auto 0.2rem;
        span{ font-size: .34rem}
      }
      .btn{width: 2.52rem; height: 0.6rem; background-color:#E57F35; font-size:.28rem ;color:#fff; border: none;border-radius: 0.5rem;
        .icon-img{
          width: .14rem;height: .16rem;margin-left: .1rem;
        }
      }
      .btn.not-get{
        background-color: #999;
      }
      .tip{
        font-size:.22rem ;color:#999;
        padding: 0 0.4rem;
        margin: 0.75rem auto 0;
        span{color:#E57F35;}
      }
    }
    .ticket-item.used{
      background:url(../../../assets/icon/alcohol/liqueur_red_envelope_bg_d.png) no-repeat;
      background-size: 3.19rem 3.9rem;
      .ticket-price{
        color: #999;
      }
      .btn{background-color:#999;color:#fff;}
      .tip{
        font-size:.22rem ;color:#999;
        padding: 0 0.4rem;
        margin: 0.75rem auto 0;
        span{color:#999;}
      }
    }
  }
  .bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width:7.5rem;
    height: 1.1rem;
  }
.van-popup.share-tip-box {
  background-color: rgba(0, 0, 0, 0);
  text-align: right;
}
.share-tip-img {
  width: 3.3rem;
  height: 2.28rem;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
}
}
</style>
