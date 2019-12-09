<template>
  <div class="earning-way">
    <!-- <transition name="van-slide-right">
      <div
        v-if="!osObj.isApp && showShare"
        class="share-icon"
        @click="$router.push({ name: 'shareActive' })"
      >
        <van-icon name="share" />
      </div>
    </transition> -->
    <bee-winning-roll
      v-if="showSwipe"
      style="position: fixed; top: 0.15rem;left: 0.3rem;z-index: 100;"
      type="alcohol"
      width="200px"
      :autoplay="2000"
    />
    <img :src="beeIcon.titleImg" class="title-img">
    <div class="content">
      <!-- avatar -->
      <div class="avatar text-center">
        <div class="avatar-img text-center">
          <img v-if="cashInfo.head_image_url" :src="cashInfo.head_image_url">
        </div>
        <p class="txt1">
          累计已领取（元）
        </p>
        <p class="money">
          {{ cashInfo.total_amount }}
        </p>
      </div>
      <!-- money-info -->
      <div class="money-info">
        <div
          v-if="cashInfo.total_amount > 0"
          class="money-detail flex flex-around"
        >
          <div class="item">
            <p class="txt">
              已使用
            </p>
            <p class="num">
              {{ cashInfo.use_amount }}
            </p>
          </div>
          <div class="line" />
          <div class="item rest">
            <p class="txt flex">
              <span>剩 余</span>
            </p>
            <p class="num">
              {{ cashInfo.amount }}
            </p>
          </div>
          <div class="line" />
          <div class="item">
            <p class="txt">
              已提现
            </p>
            <p class="num">
              {{ cashInfo.withdraw_amount }}
            </p>
          </div>
        </div>
        <div v-else class="has-no-monty-tip text-center">
          您还没有参与活动<br>暂无现金补贴
        </div>
      </div>
      <!-- action -->
      <div class="action">
        <div v-if="cashInfo.total_amount > 0" class="has flex flex-center">
          <button class="btn go-use" type="button" @click="showBuy = true">
            使用
          </button>
          <!-- <button
            v-if="cashInfo.activate_amount === 0"
            class="btn to-cash can-not"
            type="button"
          >
            提现
          </button> -->
          <!-- v-if="cashInfo.activate_amount > 0" -->
          <button
            class="btn to-cash"
            type="button"
            @click="goCash"
          >
            提现
          </button>
        </div>
        <div v-else class="has-not flex flex-center" @click="goIndex">
          <button class="btn go-index" type="button">
            立即参与
          </button>
        </div>
      </div>
    </div>

    <!-- 装饰图片 -->
    <img :src="beeIcon.decorate" class="decorate">

    <select-num v-model="showBuy" />

    <!-- 可提现提示弹窗 -->
    <van-popup v-model="showPopup" class="tip-popup">
      <div class="tip-content text-center">
        <img v-if="cashInfo.activate_amount > 0" :src="beeIcon.txt" class="txt-img">
        <img v-if="cashInfo.activate_amount === 0" :src="beeIcon.txtNoCash" class="txt-img" style="height: .6rem;">
        <p v-if="cashInfo.activate_amount > 0" class="num">
          ￥ {{ cashInfo.activate_amount }}
        </p>
        <div v-if="cashInfo.activate_amount === 0" class="no-cash-tip text-center">
          分享好友，立即提现！
        </div>
        <button class="btn" type="button">
          <span
            v-if="cashInfo.activate_amount > 0"
            @click="toBalance"
          >提入余额</span>
          <span
            v-if="cashInfo.activate_amount === 0"
            @click="goShare"
          >立即分享</span>
        </button>
        <p v-if="cashInfo.activate_amount > 0" class="tip">
          请前往“蜂友圈一我的收益”查看余额
        </p>
      </div>
      <img :src="beeIcon.close" class="close" @click="showPopup = false">
    </van-popup>

    <share ref="share" />
  </div>
</template>

<script>
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { showShareIcon, hideShareIcon } from '@/utils/share'
import wait from '@/utils/wait'
import { newToCash, getCashInfo } from '@/api/BeeApi/alcohol'
import BeeWinningRoll from '@/components/BeeWinningRoll'
import SelectNum from '../index/components/SelectNum'
import { getUID } from '@/api/BeeApi/user'
import Share from '@/pages/BeeAlcohol/RedPacket/components/Share'
export default {
  metaInfo: {
    title: '年终狂欢 瓜分10亿'
  },
  components: { BeeWinningRoll, SelectNum, Share },
  props: {},
  data() {
    return {
      showSwipe: true,
      // 中奖信息滚动所需数据
      bgColor: 'RGBA(100, 16, 32, .7)',
      fontColor: '#fff',
      type: 5,
      beeIcon: {
        titleImg: require('@/assets/icon/alcohol/top_title.png'),
        avatar: require('@/assets/icon/alcohol/avatar.png'),
        decorate: require('@/assets/icon/alcohol/decorate.png'),
        close: require('@/assets/icon/alcohol/red_packge_close.png'),
        txt: require('@/assets/icon/alcohol/tip_text.png'),
        txtNoCash: require('@/assets/icon/alcohol/tip_text_no_cash.png')
      },
      uid: 0,
      // 获取 os 平台
      osObj: getOs(),

      cashInfo: {
        amount: 0,
        head_image_url: '',
        total_amount: 0,
        use_amount: 0,
        withdraw_amount: 0,
        activate_amount: 0
      },

      showBuy: false,
      // 可提现弹窗
      showPopup: false,
      showShare: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  destroyed() {
    this.$store.commit('SET_BACKTOP_HIDE', false)
    hideShareIcon()
  },
  mounted() {
    this.initShare()
    showShareIcon()
    this.$store.commit('SET_BACKTOP_HIDE', true)
    // 在APP页面显示header
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    this.getRedPacketData()
  },
  methods: {
    // 获取红包数据
    async getRedPacketData() {
      const res = await getCashInfo()
      this.cashInfo = res.data
      console.log('s:', res.data.head_image_url)

      this.cashInfo.head_image_url = this.cashInfo.head_image_url.replace('http://', 'https://')
      console.log('end:', res.data.head_image_url)
    },
    // 转余额
    async toBalance() {
      const res = await newToCash()
      if (res.status_code === 200) {
        this.getRedPacketData()
        this.showPopup = false
      }
      this.$toast(res.message)
    },
    // 去提现
    async goCash() {
      this.showPopup = true
    },
    async initShare() {
      try {
        const res = await getUID()
        this.uid = res.data.uid

        const osObj = getOs()
        if (osObj.isWx) {
          wxapi.wxShare({
            title: '年终狂欢，瓜分10亿',
            desc: '茅台免费喝，现金轻松赚！\n全民抢酒，全民抢钱！',
            imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
            link: this.uid
              ? location.origin + '/#/beeAlcohol?uid=' + this.uid
              : location.origin + '/#/beeAlcohol'
          })
          await wait(1000)
          this.showShare = true
        } else {
          window.appShare = () => {
            if (osObj.isIphone) {
              window.webkit.messageHandlers.ToLiquorShare.postMessage('')
            } else if (osObj.isAndroid) {
              window.beeMarket.ToLiquorShare()
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 去使用、去参与
    goIndex() {
      if (this.osObj.isApp) {
        window.location.href = window.location.origin + '/beeAlcohol'
      } else {
        window.location.href = window.location.origin + '/#/beeAlcohol'
      }
    },
    goShare() {
      if (this.osObj.isApp) {
        if (this.osObj.isIphone) {
          window.webkit.messageHandlers.ToLiquorShare.postMessage('')
        } else if (this.osObj.isAndroid) {
          window.beeMarket.ToLiquorShare()
        }
      } else {
        this.showPopup = false
        this.$refs.share.showShare()
      }
    }
  }
}
</script>

<style scoped lang="less">
p {
  margin: 0;
}
.share-icon {
  position: fixed;
  top: 0.2rem;
  right: 0.2rem;
  width: 0.6rem;
  height: 0.6rem;
  color: @BeeDefault;
  text-align: center;
  font-weight: bold;
  font-size: 0.6rem;
  z-index: 100;
  background-color: #fff;
  border-radius: 50%;
}
.earning-way {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #ea583d, #cd281c);
  padding-top: 0.7rem;
  .swiper-box1 {
    position: fixed;
    top: 0.15rem;
    left: 0.3rem;
    z-index: 100;
    width: 3.5rem;
  }
  .title-img {
    width: 5.47rem;
    height: 2.07rem;
    display: block;
    margin: 0 auto 0.24rem;
  }
  .content {
    width: 7.1rem;
    height: 7.94rem;
    margin: 0 auto;
    padding-top: 0.48rem;
    background: url(../../../assets/icon/alcohol/main_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .avatar {
  }
  .avatar-img {
    width: 0.8rem;
    height: 0.8rem;
    margin: 0 auto;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .txt1 {
    font-size: 0.24rem;
    color: #ef5821;
    margin: 0.2rem auto 0.2rem;
  }
  .money {
    font-size: 1.02rem;
    color: #ef5821;
  }
  .money-info {
    margin-top: 1.2rem;
  }
  .money-detail {
    padding: 0 0.6rem;
    .line {
      width: 1px;
      height: 0.8rem;
      background-color: #f9cfad;
    }
    .item {
      text-align: center;
      .txt {
        font-size: 0.28rem;
        color: #ef5821;
        margin-bottom: 0.2rem;
      }
      .num {
        font-size: 0.4rem;
        color: #ef5821;
      }
    }
    .item.rest {
      .txt {
        width: 1.36rem;
        height: 0.51rem;
        border-top-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        font-size: 0.32rem;
        color: #fff;
        background-color: #ff6c4a;
        text-align: center;
        span {
          margin: auto;
        }
      }
      .num {
        font-size: 0.5rem;
        color: #ef5821;
      }
    }
  }
  .has-no-monty-tip {
    font-size: 0.36rem;
    color: #ef5821;
    line-height: 1.5;
  }

  .action {
    margin-top: 1.24rem;
    .has {
    }
    .has-not {
    }
    .btn {
      border: none;
      width: 2.32rem;
      height: 0.72rem;
      font-size: 0.42rem;
      color: #fff;
      border-radius: 0.36rem;
    }
    .to-cash {
      background: linear-gradient(
        180deg,
        rgba(255, 220, 31, 1),
        rgba(253, 150, 11, 1)
      );
    }
    .to-cash.can-not {
      background: rgba(204, 204, 204, 1);
    }
    .go-use {
      border-radius: 36px;
      background: #fff;
      color: #F24032;
      margin-right: 0.44rem;
    }
    .go-index {
      width: 4.2rem;
      height: 0.9rem;
      background: linear-gradient(
        180deg,
        rgba(255, 220, 31, 1),
        rgba(253, 150, 11, 1)
      );
      border-radius: 0.45rem;
      font-size: 0.36rem;
    }
  }
  .decorate {
    position: fixed;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
  }
  .tip-popup {
    background-color: transparent;
    .tip-content {
      width: 7.19rem;
      height: 7.53rem;
      background: url(../../../assets/icon/alcohol/popup_bg.png) no-repeat;
      background-size: 7.19rem 7.53rem;
      padding-top: 3.11rem;
      box-sizing: border-box;
      .txt-img {
        width: 4.21rem;
        height: 0.57rem;
      }
      .num {
        font-size: 0.68rem;
        color: #fff;
        font-weight: 600;
        margin: 0.43rem auto 0.34rem;
      }
      .no-cash-tip {
        width: 3.83rem;
        height: 0.79rem;
        padding-top: 0.14rem;
        box-sizing: border-box;
        margin: 0.51rem auto 0.33rem;
        background: url(../../../assets/icon/alcohol/popup_tip_bg.png) no-repeat;
        background-size: 100%;
        font-size: 0.36rem;
        color: #cc271b;
      }
      .btn {
        border: none;
        color: #fff;
        width: 3.4rem;
        height: 0.95rem;
        background: linear-gradient(
          180deg,
          rgba(255, 220, 31, 1),
          rgba(253, 150, 11, 1)
        );
        border-radius: 0.5rem;
        font-size: 0.36rem;
        span {
          display: block;
          height: 100%;
          width: 100%;
          line-height: 0.95rem;
        }
      }
      .tip {
        margin-top: 0.2rem;
        color: #fff;
        font-size: 0.2rem;
        opacity: 0.6;
      }
    }
    .close {
      margin-left: 50%;
      width: 0.64rem;
      height: 0.64rem;
      transform: translateX(-50%);
    }
  }
}
</style>
