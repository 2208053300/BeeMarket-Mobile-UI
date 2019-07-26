<template>
  <div class="freeze">
    <!-- 个人信息 -->
    <div class="personal-info">
      <!-- 头像 姓名 -->
      <div class="avatar flex">
        <img :src="icon.avatar" class="img">
        <div class="info">
          <p class="name">
            {{ freeze.nickname }}
          </p>
          <div class="role flex">
            <div class="stars">
              <img v-for="item in freeze.partner_level" :key="item" :src="icon.star" class="star-img">
            </div>
            <span>合伙人</span>
          </div>
        </div>
      </div>
      <!-- 数据 -->
      <!-- 金额 -->
      <div class="money text-center">
        <p class="tip">
          可收取金额
        </p>
        <p class="num">
          {{ freeze.can_receive_balance }}
        </p>
      </div>
      <!-- 余额 蜂友 厂商 -->
      <ul class="oher-data flex flex-between  text-center">
        <li>
          <p class="label">
            余额（元）
          </p>
          <p class="num">
            {{ freeze.sup_balance }}
          </p>
        </li>
        <li>
          <p class="label">
            蜂友（人）
          </p>
          <p class="num">
            {{ freeze.friends_num }}
          </p>
        </li>
        <li>
          <p class="label">
            厂商（家）
          </p>
          <p class="num">
            {{ freeze.merchart_mun }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 解冻提示 -->
    <ul class="freeze-tip text-center bg-white">
      <li>
        <div class="item">
          <img :src="icon.freezeImg1" class="img freeze-img">
          <p class="title">
            您的蜂友圈账户已被冻结
          </p>
          <p class="en">
            —freeze the account—
          </p>
          <p class="des">
            由于您90天内未有消费，现已将您的蜂友圈冻结
          </p>
        </div>
      </li>
      <li>
        <div class="item">
          <img :src="icon.freezeImg2" class="img">
          <p class="title">
            任意消费，解冻账户
          </p>
          <p class="en">
            —Thaw account—
          </p>
          <p class="des">
            如果您在2019年6月13日之前进行消费集市将自动为您解冻
          </p>
          <van-button class="btn" @click="goSortList">
            去逛逛
          </van-button>
        </div>
      </li>
      <li>
        <div class="item">
          <img :src="icon.freezeImg3" class="img">
          <p class="title">
            账户注销
          </p>
          <p class="en">
            —Account cancellation—
          </p>
          <p class="des">
            如果您在2019年9月13日之前没有进行消费集市将注销您的蜂友圈账户
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { goHome, getOs } from '@/utils'
import { getFreezeData } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {},
  data() {
    return {
      // 图标
      icon: {
        avatar: require('@/assets/icon/beeFriends/freeze/frozen_account_icon_one.png'),
        star: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_star.png'),
        freezeImg1: require('@/assets/icon/beeFriends/freeze/frozen_account_icon_one.png'),
        freezeImg2: require('@/assets/icon/task/talent/talent_bg_title2@2x.png'),
        freezeImg3: require('@/assets/icon/task/talent/talent_bg_title3@2x.png')
      },
      // 获取 os 平台
      osObj: getOs(),
      // 冻结数据
      freeze: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.clearHistory()
    this.getFreeze()
  },
  methods: {
    // 此处判断浏览器环境，跳转到商品分类页面
    goSortList() {
      const osObj = getOs()
      if (osObj.isWx) {
        // 微信直接跳转路由
        goHome()
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToCatList.postMessage(1)
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToCatList()
      } else {
        goHome()
      }
    },
    // 清除历史
    clearHistory() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.clearHistory.postMessage({ url: window.location.href })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.clearHistory()
      } else {
        //
      }
    },
    // 获取 冻结蜂友圈数据
    async getFreeze() {
      try {
        const res = await getFreezeData()
        console.log(res)
        this.icon.avatar = res.data.head_image_url
        this.freeze = res.data
      } catch (error) {
        this.$toast(error)
      }
    }
  },
  metaInfo() {
    return {
      title: '蜂友圈已冻结'
    }
  }
}
</script>

<style scoped lang="less">
.freeze {
  p {
    margin: 0;
  }
  .personal-info {
    padding: 0.2rem 0.2rem 0.6rem;
    background-color: @BeeDefault;
    background-image: url(../../../assets/icon/beeFriends/info/bee_firend_img_top_bg.png);
    background-size: 100% 100%;
  }
  .avatar {
    .img {
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }
    .name {
      font-size: 0.32rem;
      color: #fff;
      margin-bottom: 0.2rem;
    }
    .role {
      font-size: 0.24rem;
      color: #fff;
      background: #fecc50;
      padding: 0.1rem;
      border-radius: 0.1rem;
    }
    .star-img {
      width: 0.24rem;
      height: 0.24rem;
      margin-right: 0.2rem;
    }
  }
  .money {
    margin-top: 0.5rem;
    margin-bottom: 0.4rem;
    color: #fff;
    .tip {
      font-size: 0.24rem;
      margin-bottom: 0.3rem;
    }
    .num {
      font-size: 0.9rem;
    }
  }
  .oher-data {
    padding: 0 0.7rem;
    .label {
      font-size: 0.26rem;
      margin-bottom: 0.3rem;
      color: rgba(255, 255, 255, 0.5);
    }
    .num {
      font-size: 0.32rem;
      color: #fff;
    }
  }

  .freeze-tip {
    border-radius: 0.1rem;
    position: relative;
    margin: -0.4rem auto 0.5rem;
    width: 7.2rem;
    li {
      padding: 0 0.4rem;
      box-sizing: border-box;
      .item {
        padding: 0.6rem 0;
        //  border:1px dashed @BeeDefault;
        border-bottom: 1px dashed @BeeDefault;
        width: 100%;
        box-sizing: border-box;
        .img {
          width: 0.46rem;
          height: 0.5rem;
          margin-bottom: 0.3rem;
        }
        .freeze-img {
          width: 0.62rem;
          height: 0.73rem;
        }
        .title {
          font-size: 0.36rem;
          color: #333;
          font-weight: 600;
        }
        .title {
          font-size: 0.36rem;
          color: #333;
          font-weight: 600;
        }
        .en {
          font-size: 0.14rem;
          color: @BeeDefault;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          margin: 0.1rem auto 0.4rem;
        }
        .des {
          font-size: 0.22rem;
          color: #999;
          line-height: 1.7;
          width: 4rem;
          margin: 0 auto 0.2rem;
        }
        .btn {
          font-size: 0.3rem;
          color: #fff;
          border-radius: 0.1rem;
          width: 2rem;
          height: 0.64rem;
          line-height: 0.64rem;
          background-color: @BeeDefault;
          background-image: linear-gradient(
            90deg,
            rgba(255, 189, 47, 1),
            rgba(255, 164, 47, 1)
          );
        }
      }
      &:last-child .item {
        border-bottom: none;
      }
    }
  }
}
</style>
