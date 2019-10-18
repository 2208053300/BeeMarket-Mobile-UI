<template>
  <div class="my-rights">
    <div
      class="rights-header"
      :style="{backgroundImage:'url('+beeIcon.interests_pic_bg+')'}"
    >
      <div class="user-img">
        <img
          :src="tempData.head_image_url"
          alt=""
        >
      </div>
      <div class="partner-level">
        <div
          v-for="(item,index) in tempData.level"
          :key="index"
          class="star-img"
        >
          <img
            :src="beeIcon.interests_icon_star_white"
            alt=""
          >
        </div>
        <span v-if="tempData.level">合伙人</span>
        <span v-else>普通用户</span>
      </div>
    </div>
    <div class="rights-body">
      <div class="partner-tab rights-card">
        <div
          class="tab-header"
          :style="{backgroundImage:'url('+getTab()+')'}"
        >
          <div
            class="tab-part"
            @click="changeTab(0)"
          />
          <div
            class="tab-part"
            @click="changeTab(1)"
          />
          <div
            class="tab-part"
            @click="changeTab(2)"
          />
        </div>
        <div class="tab-content">
          <div class="unlock-way">
            <div
              v-if="(tempData.level>activeTab)||tempData.level===3"
              class="lock-status"
            >
              <div class="status-img">
                <img
                  :src="beeIcon.interests_icon_lock_complete"
                  alt=""
                >
              </div>
              <span>已解锁</span>
            </div>
            <div
              v-else
              class="lock-status lockStatus2"
            >
              <div class="status-img">
                <img
                  :src="beeIcon.interests_icon_lock_disabled"
                  alt=""
                >
              </div>
              <span>待解锁</span>
            </div>
            <span v-if="activeTab===1">解锁方式（2选1）</span>
            <span v-else>解锁方式</span>
          </div>
          <div
            v-if="activeTab===0"
            class="unlock-desc"
          >
            <div
              class="task-content1"
              :style="{backgroundImage:'url('+beeIcon.interests_pic_bg_one+')'}"
            >
              <p class="task-title">
                完成一次购物体验（含免单）
              </p>
              <p class="task-desc">
                即可开启蜂友圈并成为合伙人
              </p>
              <van-button
                class="task-handle"
                round
                @click="goCategory"
              >
                立即选购
              </van-button>
            </div>
          </div>
          <div
            v-if="activeTab===1"
            class="unlock-desc unlock-desc2"
          >
            <div
              class="task-content2"
              :style="{backgroundImage:'url('+beeIcon.interests_pic_bg_two_farm+')'}"
            >
              <p class="task-title">
                参与消费助农
              </p>
              <p class="task-desc">
                购买1次农礼包
              </p>
              <div class="progress-bar">
                <div
                  class="progress-content"
                  :style="{width:(Number(tempData.total_amount)/599)*100+'%'}"
                />
              </div>
              <p class="task-num">
                ￥{{ Number(tempData.total_amount) }} / ￥599
              </p>
              <van-button
                class="task-handle"
                round
                @click="goFarm"
              >
                选购农礼包
              </van-button>
            </div>
            <div
              class="task-content2"
              :style="{backgroundImage:'url('+beeIcon.interests_pic_bg_two_order+')'}"
            >
              <p class="task-title">
                订单数 ≥ 1000
              </p>
              <p class="task-desc">
                个人+直接蜂友订单总和
              </p>
              <div class="progress-bar">
                <div
                  class="progress-content"
                  :style="{width:(tempData.order_count/1000)*100+'%'}"
                />
              </div>
              <p class="task-num">
                {{ tempData.order_count }} / 1000
              </p>
              <van-button
                class="task-handle"
                round
                @click="goCategory"
              >
                立即选购
              </van-button>
            </div>
          </div>
          <div
            v-if="activeTab===2||activeTab===3"
            class="unlock-desc"
          >
            <div
              class="task-content3"
              :style="{backgroundImage:'url('+beeIcon.interests_pic_bg_three+')'}"
            >
              <p class="task-title">
                直接蜂友达到二星合伙人的数量≥100人
              </p>
              <div class="progress-bar">
                <div
                  class="progress-content"
                  :style="{width:(tempData.partner_count/100)*100+'%'}"
                />
              </div>
              <p class="task-num">
                {{ tempData.partner_count }} / 100
              </p>
              <van-button
                class="task-handle"
                round
                @click="$router.push({name:'beeFriends'})"
              >
                进入蜂友圈
              </van-button>
            </div>
          </div>
        </div>
      </div>
      <earn-table class="rights-card" />
    </div>
  </div>
</template>

<script>
import EarnTable from './components/EarnTable'
import { getOs } from '@/utils'
import { getEquity } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '我的权益'
  },
  components: {
    EarnTable
  },
  props: {},
  data() {
    return {
      activeTab: 0,
      beeIcon: {
        interests_pic_bg: require('@/assets/icon/beeFriends/rights/interests_pic_bg.png'),
        interests_icon_star_gray: require('@/assets/icon/beeFriends/rights/interests_icon_star_gray.png'),
        interests_icon_star_white: require('@/assets/icon/beeFriends/rights/interests_icon_star_white.png'),
        interests_icon_star_orange: require('@/assets/icon/beeFriends/rights/interests_icon_star_orange.png'),
        interests_icon_lock_disabled: require('@/assets/icon/beeFriends/rights/interests_icon_lock_disabled.png'),
        interests_icon_lock_complete: require('@/assets/icon/beeFriends/rights/interests_icon_lock_complete.png'),
        interests_pic_bg_one: require('@/assets/icon/beeFriends/rights/interests_pic_bg_one.png'),
        interests_pic_bg_two_farm: require('@/assets/icon/beeFriends/rights/interests_pic_bg_two_farm.png'),
        interests_pic_bg_two_order: require('@/assets/icon/beeFriends/rights/interests_pic_bg_two_order.png'),
        interests_pic_bg_three: require('@/assets/icon/beeFriends/rights/interests_pic_bg_three.png')
      },
      nav_bg: {
        0: require('@/assets/icon/beeFriends/rights/interests_nav_one.png'),
        1: require('@/assets/icon/beeFriends/rights/interests_nav_two.png'),
        2: require('@/assets/icon/beeFriends/rights/interests_nav_three.png')
      },
      tempData: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getEquityData()
  },
  methods: {
    async getEquityData() {
      try {
        const res = await getEquity()
        this.tempData = res.data
        this.activeTab = this.tempData.level
      } catch (error) {
        this.$router.push({ name: 'freeze' })
      }
    },
    getTab() {
      if (this.activeTab === 3) {
        return this.nav_bg[2]
      }
      return this.nav_bg[this.activeTab]
    },
    // TODO 请求接口
    changeTab(active) {
      this.activeTab = active
    },
    // 跳转到分类购买商品
    goCategory() {
      const osObj = getOs()
      if (osObj.isWx) {
        this.$router.push('/category')
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToCatList.postMessage(1)
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToCatList()
      } else {
        this.$router.push('/category')
      }
    },
    goFarm() {
      const osObj = getOs()
      if (osObj.isWx) {
        this.$router.push('/beeGiftPackage')
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToProducePackage.postMessage({
          alertRule: false
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToPackage(false)
      } else {
        this.$router.push('/beeGiftPackage')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-rights {
  .rights-header {
    height: 3.88rem;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding-top: 1.2rem;
    box-sizing: border-box;
    .user-img {
      width: 0.96rem;
      height: 0.96rem;
      border-radius: 50%;
      overflow: hidden;
      border: 0.02rem solid #ffffff;
      margin: auto;
    }
    .partner-level {
      margin-top: 0.2rem;
      font-size: 0.28rem;
      color: #ffffff;
      .star-img {
        width: 0.28rem;
        height: 0.28rem;
        margin-right: 0.1rem;
        vertical-align: text-top;
        display: inline-block;
        position: relative;
        top: -0.04rem;
      }
    }
  }
  .rights-body {
    position: relative;
    top: -0.4rem;
    margin: 0 0.16rem;
    .rights-card {
      border-radius: 0.16rem;
      margin-bottom: 0.2rem;
      overflow: hidden;
    }
    .partner-tab {
      .tab-header {
        width: 100%;
        height: 1.08rem;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
      .tab-content {
        background-color: #fff;
        padding: 0.4rem 0 0.1rem;
        .unlock-way {
          font-size: 0.28rem;
          margin: 0 0.32rem;
          .lock-status {
            width: 1.56rem;
            height: 0.4rem;
            box-sizing: border-box;
            border: 0.02rem solid @BeeDefault;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.22rem;
            border-radius: 0.2rem;
            display: inline-block;
            color: @BeeDefault;
            margin-right: 0.2rem;
            background-color: #fff9f2;
            .status-img {
              width: 0.29rem;
              height: 0.3rem;
              margin-right: 0.1rem;
              display: inline-block;
              position: relative;
              top: -0.02rem;
              // FIXME 图片莫名其妙错位
            }
          }
          .lockStatus2 {
            border-color: @Grey1;
            color: @Grey1;
            background-color: rgba(244, 244, 244, 1);
            .status-img {
              width: 0.21rem;
            }
          }
        }
        .unlock-desc {
          margin-top: 0.2rem;
          .task-content1 {
            width: 7rem;
            height: 3.12rem;
            margin: auto;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            padding: 0.64rem 0.56rem;
            box-sizing: border-box;
          }
          .task-title {
            font-size: 0.32rem;
            font-weight: bold;
          }
          .task-desc {
            font-size: 0.24rem;
            color: @Grey2;
            margin-top: 0.15rem;
          }
          .task-handle {
            width: 2.62rem;
            height: 0.64rem;
            line-height: 0.64rem;
            margin-top: 0.6rem;
            font-size: 0.28rem;
            color: #c2a36b;
            box-shadow: 0 0.03rem 0.07rem 0 rgba(159, 85, 133, 0.35);
            font-weight: bold;
          }
          .task-content2 {
            height: 4.12rem;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            box-sizing: border-box;
            padding: 0.56rem 0.48rem;
            .task-handle {
              margin-top: 0.4rem;
            }
          }
          .progress-bar {
            width: 100%;
            height: 0.2rem;
            background: rgba(194, 163, 107, 0.3);
            position: relative;
            border-radius: 0.1rem;
            margin: 0.48rem 0 0.1rem;
            .progress-content {
              background-color: #c2a36b;
              border-radius: 0.1rem;
              position: absolute;
              top: 0;
              left: 0;
              height: 0.2rem;
              max-width: 100%;
            }
          }
          .task-num {
            color: rgba(51, 51, 51, 0.8);
            font-size: 0.22rem;
          }
          .task-content3 {
            height: 3.7rem;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            box-sizing: border-box;
            padding: 0.64rem 0.56rem;
            .progress-bar {
              width: 4.32rem;
            }
            .task-handle {
              margin-top: 0.4rem;
            }
          }
        }
        .unlock-desc2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
}
</style>
