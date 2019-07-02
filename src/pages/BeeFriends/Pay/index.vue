<template>
  <div class="pay">
    <!-- 身份认证 -->
    <div v-if="status === 1" class="auth">
      <p class="title">
        请填写真实的个人信息
      </p>
      <form id="formInfo" class="auth-form">
        <div class="form-box bg-white">
          <div class="form-group">
            <label for="user_name">用户姓名</label>
            <div class="input-box">
              <input
                id="user_name"
                v-model.trim="name"
                type="text"
                placeholder="请填写真实姓名"
                @input="valiName()"
              >
              <p v-show="nameError" class="error name-error">
                请正确输入姓名！
              </p>
            </div>
          </div>
          <div class="form-group">
            <label for="user_ID">身份证号</label>
            <div class="input-box">
              <input
                id="user_ID"
                v-model.trim="idNo"
                type="text"
                placeholder="请填写真实的身份证号码"
                value=""
                @input="valiIdNo()"
              >
              <p v-show="idNoError" class="error id-error">
                请正确输入身份证号码！
              </p>
              <!--<img src="/static/src/Img/icon_close.png" class="clear-img"/>-->
            </div>
          </div>
        </div>
        <p class="tip">
          身份信息对应关联的提现微信账户，请务必填写本人真实姓名，
          以及真实身份证号，否则将无法提现金额！
        </p>
      </form>
      <div class="text-center">
        <!-- <van-button type="buttom" class="submit-btn active" :disabled="!valiName() && !valiIdNo()"> -->
        <van-button type="buttom" class="submit-btn active" @click="submitFir">
          下一步
        </van-button>
      </div>
    </div>

    <!-- 提现到微信 -->
    <div v-else class="to-cash">
      <div class="info">
        <div class="to-wx">
          <span>提现到微信</span>
          <div class="img">
            <img :src="wxIcon">
          </div>
        </div>
        <div class="num-info bg-white">
          <p class="title">
            提现余额数
          </p>
          <div class="input-div">
            <input
              id="inputNum"
              v-model.trim="money"
              type="number"
              min="1"
              placeholder="金额"
            >
            <span>(元)</span>
          </div>
          <div class="tip-info">
            <p>
              <span>最多可提现余额<span id="num">{{ totalNum }}</span>元</span>
              <span class="error to-cash-error">{{ cashTip }}</span>
            </p>
            <span class="all-to-cash" @click="money = totalNum">全部提现</span>
          </div>
        </div>
      </div>
      <div class="btn-div text-center">
        <vueTencentCaptcha
          style="height:42px;"
          :class="{ active: isActive }"
          class="van-button van-button--button van-button--normal btn cash-btn"
          appid="2049348716"
          @callback="tencentCaptcha"
        >
          <span class="van-button__text">
            确认提现
          </span>
        </vueTencentCaptcha>
        <p>每天只能提现一次，一次至少100元，最多1000元!</p>
      </div>
    </div>

    <!-- 短信验证码 -->
    <van-popup v-model="show" @closed="closed">
      <div class="sms bg-white">
        <p class="sms-tip text-center">
          请输入{{ phone }}的短信验证码
        </p>
        <div class="flex flex-between align-center">
          <van-field
            v-model="sms"
            placeholder="请输入短信验证码"
            class="input"
          />
          <van-button
            slot="button"
            size="small"
            class="get-code"
            :disabled="!checkPhoneRight()"
            @click="getSms"
          >
            <!-- TODO 获取短信验证码 -->
            <span
              v-if="countDown === 0"
              class="text1"
              :class="{ text2: checkPhoneRight() }"
            >获取验证码</span>
            <span v-else class="text3">({{ countDown }}s)</span>
          </van-button>
        </div>
        <div class="btn-group flex flex-column  align-center">
          <van-button round class="btn comfirm-btn" @click="confirmSubmit">
            确定
          </van-button>
          <van-button round class="btn cancel" @click="show = false">
            取消
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getOs } from '@/utils'

import {
  getWithdrawNum,
  toCash,
  getMobile
} from '@/api/BeeApi/user'

export default {
  components: {},
  props: {},
  data() {
    return {
      title: '身份验证',
      // 姓名
      name: '',
      nameError: false,
      idNo: '',
      idNoError: false,
      // 金额
      money: null,
      ticket: '',
      rand_str: '',
      // 定时器
      timeout: null,
      // 当前状态 1 验证姓名，2 提现数量
      status: 1,
      // pic
      wxIcon: require('@/assets/icon/beeFriends/info/icon_wx.png'),
      // 是否可提现
      isActive: false,
      // 单此提现金额最少100，最多1000
      MIN_MONEY: 100,
      MAX_MONEY: 1000,
      // 可提现总金额
      totalNum: 0,
      // 金额提示
      cashTip: '请输入提现金额！',
      // 短信验证码弹框
      show: false,
      // 手机号码
      phone: '',
      // 验证码
      sms: '',
      // 倒计时
      countDown: 0,
      osObj: getOs()
    }
  },
  computed: {},
  watch: {
    money(curVal, oldVal) {
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.adjustMoney()
        // this.money = parseInt(this.money)
        // console.log(this.money)
      }, 500)
    }
  },
  created() {},
  mounted() {
    this.getCanWithdraw()
    // this.getMobileNum()
    if (this.osObj.isWx) {
      // this.loadUID()
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(false)
    }
  },
  methods: {
    // 提交第一步
    async submitFir() {
      if (!this.valiName() && !this.valiIdNo()) {
        this.$toast('请正确填写姓名、身份证号码')
        return false
      }
      try {
        const res = await toCash({
          status: this.status,
          name: this.name,
          idNo: this.idNo
        })
        if (res.status_code === 200) {
          this.status = 2
          this.title = '提现'
        }
      } catch (error) {
        this.$toast(error)
      }
    },
    // 第二步 防水墙 验证票据
    async tencentCaptcha(res) {
      // res（未通过验证）= {ret: 1, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}

      // 通过防水墙，发送验证码，验证短信验证码，通过则提交数据
      if (res.ret === 0) {
        // console.log(res)

        this.ticket = res.ticket
        this.rand_str = res.randstr
        try {
          const res1 = await toCash({
            status: 2,
            ticket: res.ticket,
            rand_str: res.randstr
          })
          if (res1.status_code === 200) {
            this.show = true
            this.getSms()
          }
        } catch (error) {
          this.$toast(error)
        }
      }
    },
    // 第三步 获取短信验证码
    async getSms() {
      try {
        const res = await toCash({
          status: 3
        })
        if (res.status_code === 200) {
          this.$toast(res.message)
          this.changeCountDoen()
        }
      } catch (error) {
        this.$toast(error)
      }
    },
    // 开始倒计时
    changeCountDoen() {
      this.countDown = 60
      const clock = window.setInterval(() => {
        this.countDown--
        if (this.countDown === 0) {
          window.clearInterval(clock)
        }
      }, 1000)
    },
    // 提交第四步
    async confirmSubmit() {
      if (!(this.sms && this.sms.length === 6)) {
        this.$toast.fail('请正确填写验证码！')
        return false
      }
      try {
        const res = await toCash({
          status: 4,
          money: this.money,
          sms_code: this.sms
        })
        if (res.status_code === 200) {
          this.$toast(res.message)
          this.show = false
          this.totalNum = this.totalNum - this.money
        }
      } catch (error) {
        this.$toast.fail(error)
      }
    },
    // 验证姓名
    valiName() {
      if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.name)) {
        this.nameError = true
        return false
      }
      this.nameError = false
      return true
    },
    // 验证姓名
    valiIdNo() {
      const myreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/
      if (!myreg.test(this.idNo)) {
        this.idNoError = true
        return false
      }
      this.idNoError = false

      return true
    },

    // 获取 可提现数量
    async getCanWithdraw() {
      try {
        const res = await getWithdrawNum()
        if (res.status_code === 200) {
          this.totalNum = res.data.sup_balance
          this.phone = res.data.phone
        }
      } catch (error) {
        this.$toast.fail(error)
      }
    },

    // 获取手机号码
    async getMobileNum() {
      const res = await getMobile()
      console.log('获取手机号码：', res)
      this.phone = res.data.mobileNum
    },
    checkPhoneRight() {
      // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      // return reg.test(this.phone)
      return true
    },

    // 关闭弹出
    closed() {
      this.sms = ''
    },
    // 调整金额
    adjustMoney() {
      let value = this.money.toString()
      console.log(value, typeof value)

      // 是小数
      if (value.indexOf('.') !== -1) {
        var str = value.split('.')
        var intNum = str[0]
        var floatNum = str[1]
        if (floatNum.length > 2) {
          floatNum = floatNum.substr(0, 2)
          value = intNum + '.' + floatNum
        }
        this.money = +value
      }
      // 只判断是否在最大最小范围内
      if (this.money >= this.MIN_MONEY && this.money <= this.MAX_MONEY) {
        this.isActive = true
      } else {
        this.isActive = false
      }

      // 判断金额是否在范围内
      // if (this.money >= this.totalNum) {
      //   this.money = this.totalNum
      //   if (this.totalNum < this.MIN_MONEY) {
      //     this.isActive = false
      //     this.cashTip = '提现金额至少' + this.MIN_MONEY + '!'
      //   } else if (
      //     this.totalNum >= this.MIN_MONEY &&
      //     this.totalNum <= this.MAX_MONEY
      //   ) {
      //     this.isActive = true
      //     // this.money = this.totalNum

      //     this.cashTip = '可以提现！'
      //   } else if (this.totalNum > this.MAX_MONEY) {
      //     this.isActive = true
      //     this.money = this.MAX_MONEY
      //     this.cashTip = '可以提现！'
      //   }
      // } else {
      //   if (this.money >= this.MIN_MONEY && this.money <= this.MAX_MONEY) {
      //     this.isActive = true
      //     this.cashTip = '可以提现！'
      //   } else if (this.money > this.MAX_MONEY) {
      //     this.isActive = true
      //     this.money = this.MAX_MONEY
      //     this.cashTip = '提现金额至多' + this.MAX_MONEY + '!'
      //   } else if (this.money < this.MIN_MONEY) {
      //     this.isActive = false
      //     this.cashTip = '提现金额至少' + this.MIN_MONEY + '!'
      //   }
      // }
    }
  },
  meteInfo() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="less">
.pay {
  .auth {
    font-size: 0.24rem;
    color: #999;
    display: block;
    .title {
      padding-left: 0.3rem;
      height: 0.64rem;
      line-height: 0.64rem;
    }
    .form-box {
      padding-left: 0.3rem;
    }
    .form-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      label {
        font-size: 0.28rem;
        width: 1.25rem;
      }
      .input-box {
        width: 5.4rem;
        padding-right: 0.3rem;
      }
      input {
        width: 100%;
        font-size: 0.3rem;
        color: #333;
        border: none;
        outline: none;
        height: 0.6rem;
        line-height: 0.6rem;
        -webkit-tap-highlight-color: transparent;
        margin-bottom: 0.1rem;
        padding-left: 0.2rem;
      }
      .error {
        padding-left: 0.2rem;
        color: red;
        margin: 0;
      }
    }
    .form-group:nth-of-type(1) {
      border-bottom: 1px solid #e5e5e5;
    }
    .tip {
      padding-left: 0.3rem;
      line-height: 1.7;
      margin-top: 0.3rem;
    }
    .submit-btn {
      background: #ccc;
      font-size: 0.32rem;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 0.1rem;
      width: 6.3rem;
      // padding: 0.3rem 0;
      margin-top: 0.5rem;
      pointer-events: none;
      transition: background 0.3s ease-in;
    }
    .submit-btn.active {
      background: #f49822;
      pointer-events: auto;
    }
  }
  .to-cash {
    font-size: 0.24rem;
    color: #999;
    border-radius: 0.1rem;
    margin-top: 0.2rem;
    .info {
      background: #fbfbfb;
    }
    .to-wx {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3rem 0.4rem;
      span {
        height: 0.25rem;
      }
      .img {
        width: 0.57rem;
        height: 0.57rem;
      }
      img {
        width: 100%;
      }
    }
    .num-info {
      padding: 0.3rem 0.4rem;
      .title {
        font-size: 0.3rem;
        color: #221814;
        margin-bottom: 0.3rem;
      }
      .input-div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 0.2rem;
        input {
          font-size: 1rem;
          padding-left: 0.1rem;
          height: 1.2rem;
          width: 5.6rem;
          border: none;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }
        input::-webkit-input-placeholder {
          color: #ccc;
        }
        input::-moz-placeholder {
          color: #ccc;
        }
        input:-ms-input-placeholder {
          color: #ccc;
        }
        span {
          font-size: 0.3rem;
        }
      }
      .tip-info {
        font-size: 0.26rem;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.2rem;
        .error {
          color: #cf3815;
          margin-left: 0.15rem;
        }
        .all-to-cash {
          color: #ffa42f;
        }
      }
    }
    .btn-div {
      .btn {
        background: #ccc;
        font-size: 0.32rem;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 0.1rem;
        width: 6.3rem;
        // padding: 0.3rem 0;
        margin-top: 0.5rem;
        pointer-events: none;
      }
      .btn.active {
        pointer-events: auto;
        background: #f49822;
      }
      p {
        margin-top: 0.2rem;
      }
    }
  }
  .van-popup {
    border-radius: 0.1rem;
    padding: 0.6rem 0.6rem 0.4rem;
    width: 80%;
    box-sizing: border-box;
  }
  .sms {
    .input {
      font-size: 0.26rem;
      color: #333;

    }
    .get-code {
      border: none;
      border-left: 0.02rem solid @Grey4;
      font-size: 0.28rem;
      color: @Grey11;
      height: 0.27rem;
      line-height: 0.27rem;
      padding: 0;
      padding-left: 0.18rem;
      width: 2.5rem;
      .text2 {
        color: @ProductName;
      }
      .text3 {
        color: @BeeDefault;
      }
    }
    .sms-tip {
      font-size: 0.28rem;
      margin: 0 auto 1.2rem;
    }
    .btn {
      width: 3.4rem;
      height: 0.84rem;
      line-height: 0.84rem;
      font-size: 0.28rem;
    }
    .comfirm-btn {
      background-color: @BeeDefault;
      color: #fff;
      margin: 0.6rem auto 0.3rem;
    }
    .cancel-btn {
      background-color: none;
      border: 1px solid #999;
      color: #999;
    }
  }
}
</style>
