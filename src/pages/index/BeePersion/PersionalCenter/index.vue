<template>
  <div class="persion-center">
    <div
      class="person-header"
      :style="{backgroundImage:'url('+beeIcon.mine_img_avatar_bg+')'}"
    >
      <div class="nav-right">
        <van-icon
          :name="beeIcon.mine_icon_message"
          size="20px"
          style="margin-right:0.5rem;"
          @click="$router.push('/beeNotice')"
        />
        <van-icon
          :name="beeIcon.mine_icon_qrcode"
          size="20px"
          @click="$router.push('/persion/myQrcode')"
        />
      </div>
      <van-row
        class="head-user"
        type="flex"
        align="center"
      >
        <van-col span="4">
          <div class="head-img">
            <img
              :src="userInfo.personal_info.head_img"
              alt="头像"
            >
          </div>
        </van-col>
        <van-col
          span="16"
          offset="2"
        >
          <span class="head-name">
            {{ userInfo.personal_info.nickname }}
          </span>
          <div class="head-type">
            <van-icon name="vip-card-o" />
            <span>合伙人</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="container">
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      >
        <van-button
          type="default"
          @click="$router.push('/persion/BeeCommonweal')"
        >
          蜂公益
        </van-button>
      </van-row>
      <bee-order />
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      />
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      />

      <div class="more-op">
        <van-row>
          <van-col span="8">
            <div @click="$router.push('/persion/myCollected')">
              <van-icon :name="beeIcon.mine_icon_favorite" />
              <span>我的收藏</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="$router.push('/persion/addressSetting')">
              <van-icon :name="beeIcon.mine_icon_address" />
              <span>地址管理</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="$router.push('/persion/history')">
              <van-icon :name="beeIcon.mine_icon_pug" />
              <span>历史足迹</span>
            </div>
          </van-col>
        </van-row>
        <van-row style="margin-top:0.5rem;">
          <van-col span="8">
            <div @click="$router.push('/persion/ServiceHelper')">
              <van-icon :name="beeIcon.mine_icon_customer" />
              <span>客服帮助</span>
            </div>
          </van-col>
          <van-col span="8">
            <div>
              <van-icon :name="beeIcon.mine_icon_favorite" />
              <span>关于集市</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="$router.push('/persion/BeeSetting')">
              <van-icon :name="beeIcon.mine_icon_set" />
              <span>功能设置</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import BeeOrder from './components/BeeOrder'
import { getPersionalCenter } from '@/api/BeeApi/user'
export default {
  components: {
    BeeOrder
  },
  props: {},
  data() {
    return {
      BeeDefault,
      beeIcon: {
        mine_img_avatar_bg: require('@/assets/icon/personalCenter/mine_img_avatar_bg@2x.png'),
        mine_icon_qrcode: require('@/assets/icon/personalCenter/mine_icon_qrcode@2x.png'),
        mine_icon_message: require('@/assets/icon/personalCenter/mine_icon_message@2x.png'),
        mine_icon_favorite: require('@/assets/icon/personalCenter/mine_icon_favorite@2x.png'),
        mine_icon_address: require('@/assets/icon/personalCenter/mine_icon_address@2x.png'),
        mine_icon_pug: require('@/assets/icon/personalCenter/mine_icon_pug@2x.png'),
        mine_icon_customer: require('@/assets/icon/personalCenter/mine_icon_customer@2x.png'),
        mine_icon_set: require('@/assets/icon/personalCenter/mine_icon_set@2x.png')
      },
      userInfo: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = true
    if (!this.$store.state.user.userInfo.hasOwnProperty('personal_info')) {
      this.getPersionalCenterData()
    } else {
      this.userInfo = this.$store.state.user.userInfo
    }
  },
  methods: {
    async getPersionalCenterData() {
      const res = await getPersionalCenter()
      this.userInfo = res.data
      // 同时保存到缓存
      this.$store.commit('SET_USER_INFO', this.userInfo)
      // 接口不同
      // this.$store.state.user.userInfo = res.data
    }
  }
}
</script>

<style scoped lang="less">
.persion-center {
  margin-bottom: 0.6rem;
  .person-header {
    padding: 0.8rem 0.32rem 0.32rem;
    min-height: 3.8rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    .nav-right {
      text-align: right;
    }
    .head-user {
      height: 1.58rem;
      background-color: transparent;
      .head-img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        margin-left: 0.16rem;
      }
      .head-name {
        font-size: 0.36rem;
        color: #ffffff;
      }
      .head-type {
        font-size: 0.18rem;
        color: #ffffff;
        background-color: #7f5723;
        display: inline-block;
        margin-top: 0.2rem;
        padding: 0.06rem 0.3rem;
        border-radius: 0.5rem;
        .van-icon {
          vertical-align: text-top;
          margin-right: 0.06rem;
        }
      }
    }
  }
  .container {
    width: auto;
    margin: 0 0.16rem 50px;
    position: relative;
    top: -1rem;
    .van-row {
      margin: 0.1rem 0;
      border-radius: 0.2rem;
      overflow: hidden;
    }

    .persion-op {
      height: 1.58rem;
      background-color: #fff;
    }
    .more-op {
      margin: 0.1rem 0;
      border-radius: 0.2rem;
      overflow: hidden;
      background-color: #fff;
      padding: 0.32rem 0;
      text-align: center;
      font-size: 0.26rem;
      .van-icon {
        display: block;
        font-size: 0.5rem;
        margin: 0 auto 0.2rem;
      }
      .van-row {
        position: relative;
        .van-col:not(:last-child) {
          border-right: 0.01rem solid @Grey4;
        }
      }
    }
  }
}
</style>
