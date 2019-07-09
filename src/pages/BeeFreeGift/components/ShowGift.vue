<template>
  <div>
    <van-popup v-model="showGift" class="gift-box">
      <div class="bg-white">
        <p class="title text-center">
          蜂集市送礼新方式
        </p>
        <div class="product flex flex-between">
          <img :src="product.tUrl" class="product-img">
          <div class="product-info flex flex-column flex-between">
            <div>
              <p class="product-name no-wrap">
                {{ product.pname }}
              </p>
              <p class="product-desc no-wrap">
                {{ product.intro }}
              </p>
            </div>
            <div class="action">
              <p class="product-price">
                <span class="sell-price"><span style="font-size:.35rem;">￥</span>{{ product.section_price }}</span>
              </p>
              <span class="num">满5人参与，立即开奖</span>
            </div>
          </div>
        </div>
        <p class="tip">
          *参与到达设定人数自动开奖，必有1位好友中奖
        </p>
        <div class="input">
          <p class="tip1">
            传达心意，送句祝福
          </p>
          <input type="text" placeholder="我从蜂集市上选了一件礼物送大家!">
        </div>
      </div>
      <van-button class="share-btn" size="large" @click="appShare">
        邀请好友抢礼物
      </van-button>
      <img :src="icon.closeImg" class="close-img" @click="showGift = false">
    </van-popup>

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
export default {
  components: {

  },
  props: {
    showGift: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 图标
      icon: {
        closeImg: require('@/assets/icon/freeGift/bee_firends_invite_icon_off.png'),
        shareTipImg: require('@/assets/icon/share/guide1.png')
      },
      // 获取 os 平台
      osObj: getOs(),
      // 微信分享提示
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
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
  },
  methods: {
    // NOTE 邀请好友抢礼物 调用app、微信分享
    appShare() {
      this.$parent.showGift = false
      console.log(45645456456)
      if (this.osObj.isWx) {
        this.loadUID()
        this.showWxTip = true
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.share_data.title,
          desc: this.share_data.desc,
          img_path: this.share_data.img,
          // 地址应该放 web 站 网页
          url: this.share_data.link
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.share_data.title,
          this.share_data.desc,
          this.share_data.img,
          this.share_data.link,
          // this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        //
        console.log(444444444444)
        this.showWxTip = true
      }
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

<style scoped lang="less">
 .gift-box{
    width: 6.93rem;
    height: 9.68rem;
    padding: 0.64rem;
    box-sizing: border-box;
    overflow-y: visible;
    background:url(../../../assets/icon/freeGift/freegift_popup.png) no-repeat;
    background-size:6.93rem 9.68rem;
    .title{margin-bottom: 0.5rem; margin-top: 0.5rem;}
    .product {
      background-color: white;
      border-radius: 10px;
      margin-bottom: 10px;
      .product-img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.1rem;
      }
      .product-info {
        width:2.8rem;
        .product-name {
          margin-top: 10px;
          font-size: 0.26rem;
        }
        .product-desc {
          font-size: 0.2rem;
          color: #999;
          margin-top: 10px;
        }
        .product-price {
          margin-top: 10px;
        }
        .sell-price{ font-size: 0.5rem;color:@BeeDefault; margin-right: .1rem;
        }

      }
      .action{
        .num{font-size: .24rem; color: @BeeDefault;}
      }
    }
    .tip{font-size: 0.22rem;color:#FF3F3F; background-color:#FFEDD7; text-align: center; height: 0.62rem; line-height: 0.62rem; border-radius: .1rem;
      margin-bottom:0.5rem; margin-top: 0.5rem;
    }
    .input{
      .tip1{ font-size:0.24rem ;color:#666; margin-bottom: 0.1rem;}
      input{border: 1px solid #999; font-size: 0.24rem; height: 0.6rem;line-height:0.6rem; width: 100%; border-radius: 0.1rem; padding: 0 0.3rem; box-sizing: border-box;}
    }
    .share-btn{
      position: absolute;
      bottom: 0.48rem;
      width:100%;
      left: 0;
      opacity: 0;
    }
    .close-img{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: -0.5rem;
      right: 0;
    }

  }
   .van-popup.share-tip-box{background-color: rgba(0, 0, 0, 0); text-align: right;}
  .share-tip-img{width:3.3rem;height: 2.28rem; margin-right: 0.2rem;margin-top: 0.2rem;}
</style>
