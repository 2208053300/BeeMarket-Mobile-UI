<template>
  <div class="set-pw">
    <div v-if="!isConfirm" class="new">
      <!-- 密码输入框 -->
      <van-password-input
        :value="value"
        info="*请输入新的支付密码"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </div>
    <div v-else class="confirm-new">
      <!-- 密码输入框 -->
      <van-password-input
        :value="value1"
        info="*请输入新的支付密码"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput1"
        @delete="onDelete1"
        @blur="showKeyboard1 = false"
      />
    </div>
  </div>
</template>

<script>
import { setPayPw } from '@/api/BeeApi/user'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      // 签名
      sign: this.$route.query.sign,
      // 新的支付密码
      value: '123',
      showKeyboard: true,
      // 确认再次输入新的支付密码
      value1: '123',
      showKeyboard1: true,
      // 是否是确认
      isConfirm: false
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
  },
  methods: {
    // 新密码
    onInput(key) {
      this.value = (this.value + key).slice(0, 6)
      if (this.value.length === 6) {
        this.isConfirm = true
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    // 确认新密码
    async onInput1(key) {
      this.value1 = (this.value1 + key).slice(0, 6)
      if (this.value1.length === 6 && this.value1 === this.value) {
        try {
          const res = await setPayPw({
            paypwd: this.value1,
            sign: this.sign
          })
          if (res.status_code === 200) {
            this.$toast(res.message)
            this.$router.push({
              path: '/persion/profile/accountSafe'
            })
          }
        } catch (error) {
          this.$toast(error)
        }
      } else {
        this.isConfirm = false
        this.value = ''
        this.value1 = ''
        this.$toast('两次密码不一致，请重新输入')
      }
    },
    onDelete1() {
      this.value1 = this.value.slice(0, this.value1.length - 1)
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
.set-pw{
  padding-top: 1rem;
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
}
</style>
