<template>
  <div>
    <van-popup v-model="show" :style="{background: 'transparent'}">
      <div class="enroll-container">
        <div style="height: 0.85rem">
          <img :src="require('@/assets/icon/enrolling/icon_x.png')" class="close" @click="show=false">
        </div>
        <div class="enroll-card">
          <div style="text-align: center">
            <img
              :src="require('@/assets/icon/enrolling/competition_pic_title.png')"
              style="width: 3rem; margin: 0.6rem 0 0.24rem 0"
            >
          </div>
          <form id="form">
            <div class="form-filed">
              <label><span>*</span>姓名</label>
              <input v-model="form.name" placeholder="(请输入您的姓名)">
            </div>
            <div class="form-filed">
              <label><span>*</span>电话</label>
              <input v-model="form.tel" placeholder="(请输入您的手机号码)" type="tel">
            </div>
            <div class="form-filed">
              <label><span>*</span>验证码</label>
              <input v-model="form.code" type="tel" placeholder="(请输入验证码)" style="width: 2.12rem;margin-right: 0.14rem">
              <button
                class="get-ver"
                type="button"
                :style="{cursor: countdown === 0 ? 'default' : 'not-allowed', background: getCodeEnable ? '#E8A812' : 'rgba(232, 168, 18, 0.2)'}"
                @click="getVerify"
              >
                {{ getCodeText }}
              </button>
            </div>
            <div class="protocol">
              <van-checkbox
                v-model="checked"
                checked-color="#e6a92c"
                icon-size="18px"
              >
                <span style="color: #666666;font-size: 0.24rem">
                  已阅读并同意蜂集市
                  <router-link :to="{name: 'lcUserAgreement'}" style="color: #e8a812">
                    《联创大赛用户参赛协议》
                  </router-link>
                </span>
              </van-checkbox>
            </div>
          </form>
          <div style="display: flex;justify-content: center">
            <button class="btn-submit" @click="submit">
              提交资料
            </button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getSmsCode, join } from '@/api/BeeApi/lcEnrollingApi'
import { getOs } from '@/utils'
export default {
  props: {},
  data() {
    return {
      show: false,
      form: {
        name: '',
        tel: '',
        code: '',
        uid: this.$route.query.uid
      },
      checked: false,
      countdown: 0,
      countdownInterval: -1
    }
  },
  computed: {
    getCodeText() {
      if (this.countdown === 0) {
        return '获取验证码'
      } else {
        return `${this.countdown}s`
      }
    },
    getCodeEnable() {
      return /^(?:(?:\+|00)86)?1\d{10}$/.test(this.form.tel) && this.countdown === 0
    }
  },
  methods: {
    showDialog() {
      this.show = true
    },
    async submit() {
      if (this.form.name === '') {
        Toast.fail('请务必填写姓名')
        return
      }
      if (this.form.name.length > 10) {
        Toast.fail('姓名长度不能超过10个字')
        return
      }
      if (!/^[\u4e00-\u9fa5]{0,}$/.test(this.form.name)) {
        Toast.fail('仅支持中文姓名')
        return
      }
      if (this.form.tel === '') {
        Toast.fail('请务必填写手机号码')
        return
      }
      if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(this.form.tel)) {
        Toast.fail('请正确填写手机号')
        return
      }
      if (this.form.code === '') {
        Toast.fail('请务必填写验证码')
        return
      }
      if (!/^\d{6,6}$/.test(this.form.code)) {
        Toast.fail('验证码错误')
        return
      }
      if (!this.checked) {
        Toast.fail('请先同意协议')
        return
      }
      if (this.form.uid === 'undefined') {
        delete this.form.uid
      }
      await join(this.form)
      if (getOs().isApp) {
        this.$router.replace({ name: 'lcEnrollingSucceedWechat' })
      } else {
        this.$router.replace({ name: 'lcEnrollingSucceed' })
      }
    },
    async getVerify() {
      if (this.countdown > 0) {
        return
      }
      try {
        await getSmsCode({
          tel: this.form.tel
        })
        Toast.success('已向您发送短信验证码')
        // 开始倒计时
        this.countdown = 60
        this.countdownInterval = setInterval(() => {
          this.countdown -= 1
          if (this.countdown === 0) {
            clearInterval(this.countdownInterval)
          }
        }, 1000)
      } catch (e) {
        this.countdown = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enroll-container {
  width: 6.42rem;
  .close {
    padding-bottom: 0.4rem;
    width: 0.45rem;
    height: 0.45rem;
    float: right;
  }
  .enroll-card {
    width: 6.42rem;
    height: 7.47rem;
    background: url("https://img.fengjishi.com/lianchuang/enrolling/competition_pic_background.png");
    background-size: cover;
    .card-title {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e8a812;
      font-size: 0.36rem;
      text-align: center;
      font-family: "sans-serif";
      padding-top: 0.36rem;
      font-weight: 600;
      .line {
        margin: 0 0.2rem;
        width: 0.7rem;
        height: 2px;
        display: inline-block;
        background: #e8a812;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .form-filed {
      margin-top: 0.36rem;
      display: flex;
      justify-content: center;
      label {
        color: @Grey12;
        font-size: 0.32rem;
        font-weight: bold;
        width: 1.15rem;
        text-align: right;
        line-height: 0.74rem;
        display: inline-block;
        padding-right: 0.18rem;
        span {
          color: #e8a812;
        }
      }
      input {
        width: 3.98rem;
        height: 0.74rem;
        border: 0.3px rgba(153, 153, 153, 0.28) solid;
        padding: 0 0 0 0.22rem;
        border-radius: 0.04rem;
        background: #eeeeee;
        font-size: 0.28rem;
        &::placeholder {
          color: #c4c3c3;
          opacity: 1;
        }
      }
      .get-ver {
        width: 1.72rem;
        line-height: 0.74rem;
        text-align: center;
        font-size: 0.24rem;
        border: none;
        padding: 0;
        color: white;
        background: rgba(232, 168, 18, 0.2);
        border-radius: 0.04rem;
      }
    }
  }

  .protocol {
    padding: 0 0.2rem;
    display: flex;
    margin-top: 0.36rem;
    margin-bottom: 0.66rem;
    justify-content: center;
    align-items: center;
  }
  .btn-submit {
    border: none;
    border-radius: 100px;
    background: #e8a812;
    line-height: 0.88rem;
    width: 4.2rem;
    color: white;
    margin-top: 0.45rem;
    font-size: 0.3rem;
    position: relative;
    bottom: 0.44rem;
    transition: all 100ms;
    &:active {
      background: #ffb713;
    }
  }
}
</style>
