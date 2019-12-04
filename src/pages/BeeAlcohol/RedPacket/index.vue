<template>
  <div class="earning-way">
    <bee-winning-roll
      v-if="showSwipe"
      style="position: fixed; top: 0.15rem;left: 0.3rem;z-index: 100;"
      type="alcohol"
    />
    <img :src="beeIcon.titleImg" class="title-img">
    <div class="content">
      <!-- avatar -->
      <div class="avatar text-center">
        <div class="avatar-img text-center">
          <img :src="cashInfo.head_image_url" alt="">
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
        <div v-if="cashInfo.total_amount>0" class="money-detail flex flex-around">
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
        <div v-if="cashInfo.total_amount>0" class="has flex flex-center">
          <button v-if="cashInfo.activate_amount===0" class="btn to-cash can-not" type="button">
            提现
          </button>
          <button v-if="cashInfo.activate_amount>0" class="btn to-cash" type="button" @click="goCash">
            提现
          </button>
          <button class="btn go-use" type="button" @click="showBuy=true">
            使用
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
  </div>
</template>

<script>
import { getOs } from '@/utils'
import { newToCash, getCashInfo } from '@/api/BeeApi/alcohol'
import BeeWinningRoll from '@/components/BeeWinningRoll'
import SelectNum from '../index/components/SelectNum'
import wait from '@/utils/wait'
export default {
  metaInfo: {
    title: '年终狂欢 瓜分10亿'
  },
  components: { BeeWinningRoll, SelectNum },
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
        decorate: require('@/assets/icon/alcohol/decorate.png')
      },
      uid: 0,
      // 获取 os 平台
      osObj: getOs(),

      cashInfo: {
        amount: 0,
        head_image_url: require('@/assets/icon/alcohol/avatar.png'),
        total_amount: 0,
        use_amount: 0,
        withdraw_amount: 0,
        activate_amount: 0
      },

      showBuy: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  destroyed() {
    this.$store.commit('SET_BACKTOP_HIDE', false)
    window.onresize = undefined
  },
  mounted() {
    this.$store.commit('SET_BACKTOP_HIDE', true)
    // 在APP页面显示header
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    this.getRedPacketData()

    const that = this
    window.onresize = async() => {
      that.showSwipe = false
      await wait(500)
      that.showSwipe = true
    }
  },
  methods: {
    // 获取红包数据
    async getRedPacketData() {
      const res = await getCashInfo()
      this.cashInfo = res.data
    },
    // 去提现
    async goCash() {
      const res = await newToCash()
      if (res.status_code === 200) {
        if (this.osObj.isApp) {
          window.location.href = window.location.origin + '/#/beeFriends/pay'
        } else {
          window.location.href = window.location.origin + '/beeFriends#/pay'
        }
      } else {
        this.getRedPacketData()
      }
    },
    // 去使用、去参与
    goIndex() {
      if (this.osObj.isApp) {
        window.location.href = window.location.origin + '/#/beeAlcohol'
      } else {
        window.location.href = window.location.origin + '/beeAlcohol'
      }
    }
  }
}
</script>

<style scoped lang="less">
p {
  margin: 0;
}
.earning-way {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #ea583d, #cd281c);
  padding-top: 0.56rem;
  .swiper-box1{
    position: fixed; top: 0.15rem;left: 0.3rem;z-index: 100;
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
    img{width: 100%; height: 100%; border-radius: 50%;}
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
    .has{}
    .has-not{}
    .btn {
      border: none;
      width: 2.32rem;
      height: 0.72rem;
      font-size: .42rem;
      color: #fff;
      border-radius: .36rem;
    }
    .to-cash {
       background: linear-gradient(
        180deg,
        rgba(255, 220, 31, 1),
        rgba(253, 150, 11, 1)
      );
      margin-right: .44rem;
    }
    .to-cash.can-not{
      opacity: .8;
    }
    .go-use {
      border: 1px solid rgba(251, 246, 237, 1);
      border-radius: 36px;
      background: transparent;
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
  .decorate{
      position: fixed;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
}
}
</style>
