<template>
  <div class="persion-center">
    <div
      class="person-header"
      :style="{backgroundImage:'url('+beeIcon.mine_img_avatar_bg+')'}"
    >
      <div class="nav-right">
        <div class="message-content">
          <van-icon
            :name="beeIcon.mine_icon_message"
            size="20px"
            @click="$router.push('/beeNotice')"
          />
          <div
            v-if="$store.state.user.have_no_read"
            class="red-dot"
          />
        </div>
        <van-icon
          :name="beeIcon.mine_icon_qrcode"
          size="20px"
          @click="$router.push('/persion/myQrcode')"
        />
      </div>
      <div @click="clickHead">
        <van-row
          class="head-user"
          type="flex"
          align="center"
        >
          <van-col span="4">
            <div class="head-img">
              <img
                :src="$store.state.user.userInfo.head_image || beeIcon.head_default"
                alt="头像"
              >
            </div>
          </van-col>
          <van-col
            span="16"
            offset="2"
          >
            <div class="head-name">
              {{ isLogin ? $store.state.user.userInfo.nickname : '未登录' }}
            </div>
            <div
              v-if="userInfo.personal_info && userInfo.personal_info.is_partner"
              class="head-type"
            >
              <van-icon
                v-for="(item,index) in userInfo.personal_info.grade"
                :key="index"
                :name="beeIcon.mine_icon_star_partner"
              />
              <span>合伙人</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="container">
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      >
        <div
          v-if="userInfo.bee_charity"
          class="cherity-img"
          :style="{backgroundImage:'url('+userInfo.bee_charity.image_url+')'}"
          @click="$router.push('/persion/BeeCommonweal')"
        />
      </van-row>
      <bee-order
        :express-info="userInfo.express_info"
        :order-status="userInfo.order_status"
      />
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      >
        <div
          v-if="userInfo.bee_circle"
          class="cherity-img"
          :style="{backgroundImage:'url('+userInfo.bee_circle.image_url+')'}"
          @click="$router.push('/beeFriends')"
        />
      </van-row>
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      >
        <div
          v-if="userInfo.bee_class"
          class="cherity-img"
          :style="{backgroundImage:'url('+userInfo.bee_class.image_url+')'}"
          @click="$router.push('/beeClassroom')"
        />
      </van-row>
      <div class="more-op">
        <van-row>
          <van-col span="8">
            <div @click="$router.push('/persion/myCollected')">
              <van-icon :name="beeIcon.mine_icon_favorite" />
              <span>我的收藏</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="$router.push('/persion/addressSetting?mode=manage')">
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
            <div @click="$router.push({name:'ServiceHelperIndex'})">
              <van-icon :name="beeIcon.mine_icon_customer" />
              <span>客服帮助</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="$router.push('/persion/beeAbout')">
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
import { isLogin } from '@/utils/auth'

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
        mine_icon_set: require('@/assets/icon/personalCenter/mine_icon_set@2x.png'),
        head_default: require('@/assets/icon/personalCenter/head_default.png'),
        mine_icon_star_partner: require('@/assets/icon/personalCenter/mine_icon_star_partner@2x.png')
      },
      userInfo: {
        personal_info: {
          head_img: this.$store.state.user.userInfo.head_image,
          nickname: this.$store.state.user.userInfo.nickname
        }
      },
      isLogin: isLogin()
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = true
    this.$store.dispatch('GerUserMsg')
    this.getPersionalCenterData()
  },
  methods: {
    async getPersionalCenterData() {
      const res = await getPersionalCenter()
      this.userInfo = res.data
      // 如果个人信息发生了改变,则更新vuex中的用户信息
      if (isLogin()) {
        const info = this.userInfo.personal_info
        const userState = this.$store.state.user.userInfo
        let changed = false
        if (info.head_img !== userState.head_image) {
          userState.head_image = info.head_img
          changed = true
        }
        if (info.nickname !== userState.nickname) {
          userState.nickname = info.nickname
          changed = true
        }
        if (changed) {
          this.$store.commit('SET_USER_INFO', userState)
        }
      }
    },
    // 点击用户信息区域
    clickHead() {
      // TODO 跳转到个人信息页面
      if (!isLogin()) {
        this.$router.push('/login')
      } else {
        this.$router.push('/persion/profile')
      }
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
      .message-content {
        margin-right: 0.4rem;
        display: inline-block;
        position: relative;
        .red-dot {
          position: absolute;
          right: -0.05rem;
          top: -0.05rem;
          height: 0.15rem;
          width: 0.15rem;
          background-color: #fc4545;
          border-radius: 50%;
        }
      }
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
        font-weight: bold;
        font-size: 0.36rem;
        color: #ffffff;
      }
      .head-type {
        font-size: 0.18rem;
        color: #ffffff;
        background-color: #7f5723;
        display: inline-block;
        margin-top: 0.2rem;
        padding: 0.06rem 0.2rem;
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
    .cherity-img {
      height: 100%;
      width: 100%;
      background-size: cover;
    }
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
