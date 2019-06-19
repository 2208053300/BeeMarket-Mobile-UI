<template>
  <div class="remind-pw bg-white">
    <p class="tip text-center">
      您是否记得当前账户：{{ phone }}的支付密码
    </p>
    <div class="group flex flex-column  align-center">
      <van-button round class="btn remind-btn" @click="$router.push('/persion/profile/setPayPw/inputOldPw')">
        记得
      </van-button>
      <van-button round class="btn not-remind-btn" @click="getSms">
        不记得
      </van-button>
    </div>

    <!-- 遮罩 -->
    <van-popup v-model="show" @closed="closed">
      <div class="sms bg-white">
        <p class="sms-tip text-center">
          请输入{{ phone }}的短信验证码
        </p>
        <van-field v-model="sms" placeholder="请输入短信验证码" class="input" />
        <div class="btn-group flex flex-column  align-center">
          <van-button round class="btn comfirm-btn" @click="submit">
            确定
          </van-button>
          <van-button round class="btn cancel" @click="show=false">
            取消
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getMobile, sendSms, smsVerify } from '@/api/BeeApi/user'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      // 是否显示遮罩
      show: false,
      // 验证码
      sms: '',
      phone: ''
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

    this.getMobileNum()
  },
  methods: {
    // 提交短信验证码
    async submit() {
      console.log('tijiao')
      if (this.sms.length === 6) {
        const res = await smsVerify({
          smsCode: this.sms,
          type: 'paypwd',
          t: Date.parse(new Date()).toString().substr(0, 10)
        })
        if (res.status_code === 200) {
          // NOTE 请求接口，成功跳转到设置密码页面
          this.$router.push({
            path: '/persion/profile/setPayPw/setPw',
            query: {
              sign: res.data.sign
            }
          })
        }
      }
    },
    // 获取短信验证码
    async getSms() {
      this.show = true
      const res = await sendSms({
        type: 'paypwd'
      })
      this.$toast(res.message)
    },
    // 获取手机号码
    async getMobileNum() {
      const res = await getMobile()
      console.log('获取手机号码：', res)
      this.phone = res.data.mobileNum
    },
    // 关闭弹出
    closed() {
      this.sms = ''
    }
  },
  meteInfo() {
    return {

      title: '设置支付密码'
    }
  }
}
</script>

<style scoped lang="less">
.remind-pw {
  margin-top: .2rem;
  padding-top:.52rem;
  padding-bottom:.5rem;
  .tip{
    font-size: .3rem;
    margin: 0 auto .9rem;
  }
  .btn{width:3.4rem; height: .84rem;line-height:.84rem;font-size: .28rem; }
  .remind-btn{ background-color:@BeeDefault; color:#fff; margin-bottom: .3rem}
  .not-remind-btn{ background-color:none; border: 1px solid @BeeDefault; color:@BeeDefault; }

  .van-popup{
    border-radius: .1rem;
    padding: .6rem .6rem .4rem;
    width:80%;
    box-sizing: border-box;
  }
  .sms{
    .input{ font-size: .26rem;color:#333;}
    .sms-tip{
      font-size: .28rem;
      margin: 0 auto 1.2rem;
    }
    .comfirm-btn{background-color:@BeeDefault; color:#fff; margin: .6rem auto .3rem}
    .cancel-btn{background-color:none; border: 1px solid #999; color:#999; }
  }
}
</style>
