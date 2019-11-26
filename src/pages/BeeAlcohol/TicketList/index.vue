<template>
  <div class="ticket">
    <div class="subsidy text-center">
      <p class="price">
        10000元
      </p>
      <p class="txt">
        红包补贴已到账
      </p>
    </div>
    <!-- 补贴券列表 -->
    <div class="ticket-box">
      <p class="title text-center">
        红包提现
      </p>
      <van-row>
        <van-col span="12">
          <div class="ticket-item text-center">
            <img :src="beeIcon.toCash" class="corner-img">
            <p class="ticket-price">
              2000<span>元</span>
            </p>
            <div class="flex flex-center">
              <button class="btn flex flex-center align-center">
                <span>立即提现</span>
                <img :src="beeIcon.arrow" class="icon-img">
              </button>
            </div>
            <p class="tip">
              邀请直接蜂友购买<span>1箱</span>立即激活
            </p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="ticket-item text-center used">
            <img :src="beeIcon.toCash" class="corner-img">
            <p class="ticket-price">
              2000<span>元</span>
            </p>
            <div class="flex flex-center">
              <button class="btn flex flex-center align-center">
                <span>立即提现</span>
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
    <!-- 底部 分享、去购买 按钮 -->
    <div class="bottom">
      <img :src="beeIcon.buyBtn" class="btn-img">
      <!-- <img :src="beeIcon.shareBtn" class="btn-img"> -->
    </div>
  </div>
</template>

<script>
// import Rule from './components/rule'
import Cookies from 'js-cookie'
import { getUID } from '@/api/BeeApi/user'
import { showShareIcon, setShareOptions } from '@/utils/share'

export default {
  metaInfo: {
    title: '领券中心'
  },
  components: { },
  props: {},
  data() {
    return {
      showControls: false,
      beeIcon: {
        arrow: require('@/assets/icon/alcohol/liqueur_red_envelope_icon_triangle.png'),
        toCash: require('@/assets/icon/alcohol/liqueur_red_envelope_label_mention_n.png'), // 可提现
        notCash: require('@/assets/icon/alcohol/liqueur_red_envelope_label_mention_d.png'), // 不可提现
        canTurn: require('@/assets/icon/alcohol/liqueur_red_envelope_label_turn_n.png'), // 可转余额
        notTurn: require('@/assets/icon/alcohol/liqueur_red_envelope_label_turn_d.png'), // 不可转余额
        buyBtn: require('@/assets/icon/alcohol/liqueur_red_envelope_button_buy.png'), // 不可转余额
        shareBtn: require('@/assets/icon/alcohol/liqueur_red_envelope_button_share.png') // 不可转余额
      },
      showRule: false,
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.initShare()
    // 如果有store说明该页面作为组件在webApp显示
    if (this.$store) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
    // if (this.$route.query.uid) {
    //   Cookies.set('uid', this.$route.query.uid)
    // }
    // showShareIcon()
  },
  methods: {

    // 分享
    async initShare() {
      try {
        const res = await getUID()
        this.uid = res.data.uid
        setShareOptions({
          title: '年终狂欢 瓜分1亿',
          desc: '购茅台一箱，送现金一万',
          link: this.uid ? location.origin + '/beeAlcohol#/?usid=' + this.uid : location.origin + '/beeAlcohol#/'
        })
      } catch (error) {
        console.log(error)
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
  box-sizing: border-box;
   background:linear-gradient(to top, rgba(232,99,58,1),rgba(213,24,14,1));
  .subsidy{
    background: url(../../../assets/icon/alcohol/liqueur_red_envelope_banner.png) no-repeat;
    background-size: 100% 100%;
    width: 7.5rem;
    height:3.16rem;
    position: relative;
    box-sizing: border-box;
    padding-top: 0.4rem;
  }
  .price{
    font-size: 1.2rem;
    margin:0 auto 0.1rem;
    font-weight: 600;
    background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent; }
  .txt{font-size: .28rem;color:#ef5821; margin: 0;font-weight: 600;}

  .ticket-box{
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
}
</style>
