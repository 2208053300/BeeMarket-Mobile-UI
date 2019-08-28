<template>
  <div>
    <van-popup v-model="showGift" class="gift-box" @close="closeShowGift">
      <div class="bg-white">
        <p class="title text-center">
          蜂集市送礼新方式
        </p>
        <div class="product flex flex-between">
          <img :src="product.tUrl" class="product-img">
          <div class="product-info flex flex-column flex-between">
            <div>
              <p class="product-name">
                {{ product.pname }}
              </p>
              <!-- <p class="product-desc no-wrap">
                {{ product.intro }}
              </p> -->
              <p class="prop">
                {{ product.props_name }}
              </p>
            </div>
            <div class="action">
              <p class="product-price">
                <span class="sell-price"><span style="font-size:.35rem;">￥</span>{{ product.sell_price }}</span>
              </p>
              <span class="num">满{{ product.lottery_num }}人参与，立刻开奖</span>
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
          <input v-model.trim="remark" type="text" placeholder="我从蜂集市上选了一件礼物送大家!">
        </div>
      </div>
      <van-button class="share-btn" size="large" @click="getShareData">
        邀请好友抢礼物
      </van-button>
      <img :src="icon.closeImg" class="close-img" @click="closeShowGift">
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
import { freeGiftInvite } from '@/api/BeeApi/freeGift'
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
    },
    sid: {
      type: Number,
      default: 0
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
        imgUrl: '',
        link: ''
      },

      // 传达心意，送句祝福
      remark: '',
      nowShowGift: false
    }
  },
  computed: {

  },
  watch: {
    remark: {
      handler(oldVal, newVal) {
        if (this.remark.length > 20) {
          this.remark = newVal.slice(0, 20)
        }
      }
    }
  },
  created() {

  },
  mounted() {
    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
  },
  methods: {
    // 关闭弹窗
    closeShowGift() {
      this.$parent.showGift = false
    },
    // 点击邀请好友抢礼物
    async getShareData() {
      try {
        const res = await freeGiftInvite({
          sid: this.sid,
          target: this.product.target,
          desc: this.remark
        })
        if (res.status_code === 200) {
          this.share_data = res.data
          this.appShare()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // NOTE 邀请好友抢礼物 调用app、微信分享
    appShare() {
      this.$parent.showGift = false
      this.$parent.showSku = false
      if (this.osObj.isWx) {
        this.loadUID()
        this.showWxTip = true
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.share_data.title,
          desc: this.share_data.desc,
          img_path: this.share_data.imgUrl,
          // 地址应该放 web 站 网页
          url: this.share_data.link
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.share_data.title,
          this.share_data.desc,
          this.share_data.imgUrl,
          this.share_data.link,
          // this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        this.loadUID()
        this.showWxTip = true
      }
    },

    // 微信分享
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid
      console.log('分享信息', this.share_data)

      // alert('调用微信分享')
      // alert('title', this.share_data.title)
      // alert('desc', this.share_data.desc)
      // alert('imgUrl', this.share_data.imgUrl)
      // alert('link', this.share_data.link)

      wxapi.wxShare({
        title: this.share_data.title,
        desc: this.share_data.desc,
        imgUrl: this.share_data.imgUrl,
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
    p{margin: 0}
    .title{margin-bottom: 0.5rem; margin-top: 0.5rem;}
    .product {
      background-color: white;
      border-radius:0.1rem;
      margin-bottom:0.1rem;
      .product-img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.1rem;
      }
      .product-info {
        width:2.8rem;
        .product-name {
          margin-top:0.1rem;
          margin-bottom:0.2rem;
          font-size: 0.26rem;

          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;

        }
        .prop{font-size: 0.24rem; color:#999;}
        .product-desc {
          font-size: 0.2rem;
          color: #999;
          margin-top:0.1rem;
        }
        .product-price {
          margin-top:0.1rem;
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
