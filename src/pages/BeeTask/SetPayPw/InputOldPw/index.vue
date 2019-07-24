<template>
  <div class="set-pw">
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="*请输入原支付密码"
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
</template>

<script>
import { verifyOldPayPw } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {},
  data() {
    return {
      value: '',
      showKeyboard: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    async onInput(key) {
      this.value = (this.value + key).slice(0, 6)
      if (this.value.length === 6) {
        try {
          const res = await verifyOldPayPw({ orig: this.value })
          if (res.status_code === 200) {
            this.$router.push({
              path: '/setPayPw/setPw',
              query: {
                sign: res.data.sign
              }
            })
          }
        } catch (error) {
          this.$toast(error)
        }
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    }
  },
  metaInfo() {
    return {
      title: '设置支付密码'
    }
  }
}
</script>

<style scoped lang="less">
.set-pw {
  padding-top: 1rem;
  .van-password-input__info {
    text-align: left;
    font-size: 0.28rem;
  }
  .van-password-input__security {
    border: 1px solid #999;
    border-radius: 0.1rem;
  }
  .van-password-input__security li {
    border-right: 1px solid #999;
    background: none;
  }
  .van-password-input__security li:first-child {
    border-top-left-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
  }
  .van-password-input__security li:last-child {
    border-right: none;
    border-top-right-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
