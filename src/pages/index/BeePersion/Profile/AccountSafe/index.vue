<template>
  <div class="profile">
    <ul class="cell-list bg-white">
      <li>
        <div class="item flex flex-between align-center" @click="changePhone">
          <span class="title">修改手机号码</span>
          <div class="link-icon  flex align-center">
            <span class="tip">手机号码更改请及时修改</span>
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <li>
        <div class="item flex flex-between align-center" @click="changeLoginPw">
          <span class="title">修改登录密码</span>
          <div class="link-icon  flex align-center">
            <span class="tip">建议定期更改以保密码安全</span>
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <li>
        <div class="item flex flex-between align-center" @click="setPayPw">
          <span v-if="!paypwd_set" class="title">设置支付密码</span>
          <span v-else class="title">重置支付密码</span>
          <div class="link-icon flex align-center">
            <span class="tip">用于蜂集市支付等验证</span>
            <van-icon name="arrow" size="0.26rem" color="#666" class="icon" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { security } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '账户安全'
  },
  components: {

  },
  props: {

  },
  data() {
    return {
      avatarImg: require('@/assets/icon/personalCenter/head_default.png'),
      // 是否已有支付密码
      mobile_bind: false,
      paypwd_set: false
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    this.isSet()
  },
  methods: {
    // 判断是否已设置支付密码、是否绑定了手机号码
    async isSet() {
      const res = await security()
      if (res.code === 1 && res.status_code === 200) {
        this.mobile_bind = res.data.mobile_bind
        this.paypwd_set = res.data.paypwd_set
        // 如果没有绑定手机号码，调转到绑定手机号码页面,带路由路径便于绑定号码后跳回
        if (!this.mobile_bind) {
          this.confirm()
        }
      }
    },
    // 修改手机号码
    changePhone() {
      if (this.mobile_bind) {
        this.$router.push('/persion/profile/changePhone')
      } else {
        this.confirm()
      }
    },
    // 修改登录密码
    changeLoginPw() {
      if (this.mobile_bind) {
        this.$router.push('/persion/profile/setLoginPw')
      } else {
        this.confirm()
      }
    },

    // 设置支付密码
    setPayPw() {
      if (this.mobile_bind) {
        // 是否设置了密码，设置了就重设
        if (this.paypwd_set) {
          this.$router.push('/persion/profile/setPayPw')
        } else {
          // 设置
          this.$router.push({
            name: 'setPayPwGetSms'
          })
        }
      } else {
        this.confirm()
      }

      // if (this.paypwd_set) {
      //   this.$router.push('/persion/profile/setPayPw')
      //   // 首次设置
      // } else {
      //   this.$router.push('/persion/profile/setPayPw/setPw')
      // }
    },

    // 提示确认弹框
    confirm() {
      this.$dialog.confirm({
        title: '提示',
        message: '请先绑定手机号码！'
      }).then(() => {
        this.$router.push({
          path: '/persion/profile/accountBind/bindPhone',
          query: {
            path: '/persion/profile/accountSafe'
          }
        })
      }).catch(() => {
        // on cancel
      })
    }

  }
}
</script>

<style scoped lang="less">
.profile{
  padding-top: .2rem;
  li{
    padding-left:.3rem;
    box-sizing: border-box;
    .item{padding: .3rem .2rem .3rem 0; border-bottom: 1px solid #eee;}

    &:last-child{
      .item{border-bottom:none;}
    }
  }
  .title{font-size: .3rem;color:#333;}
  .avatar{width: 1rem;height: 1rem; margin-right: .2rem;}
  .tip{font-size:0.26rem ;color:#999; margin-right: 0.2rem;}
}
</style>
