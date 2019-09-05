<template>
  <div class="input-password">
    <van-popup v-model="isShow" position="bottom" style="height: 73%" @closed="onClosed">
      <div class="title">
        <van-icon class="icon" name="cross" size="0.34rem" @click="isShow=false" />
        <span>输入密码</span>
      </div>
      <div class="money">
        <span>￥</span>
        <span>{{ payInfo.pay_amount }}</span>
      </div>
      <van-password-input
        :value="password"
      />
      <div class="reset-password">
        <span @click="resetPassword">忘记密码？</span>
      </div>
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="true"
        @input="onInput"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import { orderPay } from '@/api/BeeApi/order'
import { isSetPw } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {
    payInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShow: false,
      password: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async pay() {
      // 检查是否设置支付密码
      const res = await isSetPw()
      if (res.data.set) {
        this.isShow = true
      } else {
        try {
          await this.$dialog.confirm({
            title: '暂未设置支付密码',
            message: '未设置支付密码将无法完成支付',
            confirmButtonText: '去设置',
            confirmButtonColor: '#f49822'
          })
          this.$router.push('/persion/profile/setPayPw/getSms')
        } catch (e) {
          console.log('取消设置支付密码')
        }
      }
    },
    // 弹出框关闭动画结束回调
    onClosed() {
      this.password = ''
    },
    // 密码删除事件
    onDelete() {
      this.password = this.password.slice(0, this.password.length - 1)
    },
    // 密码键盘输入事件
    async onInput(key) {
      this.password = this.password = (this.password + key).slice(0, 6)
      if (this.password.length === 6) {
        try {
          await this.startPay()
        } catch (error) {
          this.$toast(error)
          this.password = ''
        }
      }
    },
    // 开始支付
    async startPay() {
      try {
        const res = await orderPay({
          trade_no: this.payInfo.trade_no,
          pay_method: 'blpay',
          paypwd: this.password
        })
        if (res.status_code === 200) {
          alert(this.payInfo.trade_no)
          alert('blpay')
          alert(res.data.extra_url)
          if (res.data.extra_url) {
            this.$emit('success', { url: res.data.extra_url, trade_no: this.payInfo.trade_no, pay_method: 'blpay' }) // 发出支付成功事件
          } else {
            this.$emit('success', { url: '', trade_no: this.payInfo.trade_no, pay_method: 'blpay' }) // 发出支付成功事件
          }
          this.isShow = false
        }
      } catch (e) {
        this.$toast(e)
        this.password = ''
      }
    },
    // 进入重置支付密码页面
    resetPassword() {
      this.$router.push('/persion/profile/setPayPw')
    }
  }
}
</script>

<style scoped lang="less">
.input-password {
  .title {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 0.24rem;
    }
    span {
      font-size: 0.34rem;
      color: @Grey12;
    }
  }
  .money {
    padding: 0.22rem 0.3rem 0.3rem 0.3rem;
    text-align: center;
    color: @Grey12;
    span:first-child {
      font-size: 0.3rem;
    }
    span:last-child {
      vertical-align: text-top;
      font-size: 0.6rem;
    }
  }
  .reset-password {
    padding-right: 0.8rem;
    text-align: right;
    padding-top: 0.2rem;
    span {
      color: @BeeDefault3;
      font-size: 0.24rem;
    }
  }
  .van-password-input__info{
    text-align: left;
    font-size: .28rem;
  }
  .van-password-input__security{
    border: 1px solid #999;
    border-radius: 0.1rem;
  }
  .van-password-input__security li{
    border-right: 1px solid #999;
    background: none;
  }
  .van-password-input__security li:first-child{

    border-top-left-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
  }
  .van-password-input__security li:last-child{
    border-right: none;
    border-top-right-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
  }
  [class*=van-hairline]::after{
    border: none;
  }
  .van-password-input {
    margin: 0 0.8rem;
  }
}
</style>
