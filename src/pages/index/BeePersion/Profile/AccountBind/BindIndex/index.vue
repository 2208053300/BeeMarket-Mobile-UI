<template>
  <div class="profile">
    <ul class="cell-list bg-white">
      <li>
        <div class="item flex flex-between align-center" @click="goBindPhone">
          <span class="title">手机绑定</span>
          <div class="link-icon  flex align-center">
            <span v-if="mobile_bind" class="tip">已绑定</span>
            <span v-else class="tip">请尽快绑定您的手机号码</span>
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <!-- <li>
        <div class="item flex flex-between align-center">
          <span class="title">微信绑定</span>
          <div class="link-icon  flex align-center">
            <span class="tip">请尽快绑定您的微信</span>
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <li>
        <div class="item flex flex-between align-center">
          <span class="title">qq绑定</span>
          <div class="link-icon flex align-center">
            <span class="tip">请尽快绑定您的QQ</span>
            <van-icon name="arrow" size="0.26rem" color="#666" class="icon" />
          </div>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { security } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '账户绑定'
  },
  components: {

  },
  props: {

  },
  data() {
    return {
      mobile_bind: false
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
        console.log('是否绑定手机：', res)

        this.mobile_bind = res.data.mobile_bind
        // this.paypwd_set = res.data.paypwd_set
        // 如果没有绑定手机号码，调转到绑定手机号码页面,带路由路径便于绑定号码后跳回
      }
    },
    //
    goBindPhone() {
      if (!this.mobile_bind) {
        // this.$store.dispatch('ChangePushName', 'accountBind')
        this.$router.replace({ path: '/persion/profile/accountBind/bindPhone' })
      }
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
