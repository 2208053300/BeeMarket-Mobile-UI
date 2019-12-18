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
          身份信息对应关联的提现微信账户， 请务必填写本人
          <!-- 真实姓名， 以及 -->
          真实身份证号，否则将无法提现金额！
        </p>
      </form>
      <div class="text-center">
        <!-- <van-button type="buttom" class="submit-btn active" :disabled="!valiName() && !valiIdNo()"> -->
        <van-button type="buttom" class="submit-btn" :class="{active: canNext}" @click="submitFir">
          下一步
        </van-button>
      </div>
    </div>
    <!-- 提现到微信 -->
    <div v-else class="to-cash">
      <div class="info">
        <div class="to-wx">
          <span>提现到微信零钱钱包</span>
          <div class="img">
            <img :src="wxIcon">
          </div>
        </div>
        <div class="num-info bg-white">
          <div class="input-box">
            <div class="input-div">
              <span class="mark">￥</span>
              <input id="inputNum" v-model.trim="money" type="Number" min="1" :disabled="isInput">
              <span class="all" :class="{disable: isInput}" @click="money = totalNum">全部</span>
              <span
                v-show="showBalance"
                class="tip"
              >可提现{{ totalCashNum }}元</span>
            </div>
            <div v-show="showError" class="error to-cash-error">
              {{ cashTip }}
            </div>
          </div>
          <div class="tip-info">
            <p>
              <span>有<span id="num">{{ no_sup_balance }}</span>元不可提现</span>
            </p>
            <span class="all-to-cash" @click="reason = true">查看原因</span>
          </div>
        </div>
      </div>
      <p class="text-center">
        今日还可提现{{ amount_limit }}元，剩余可提现次数{{ count_limit }}次！
      </p>
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
      </div>
      <p class="text-center rule-btn" @click="rule = true">
        交易规则
      </p>
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
    <!-- 不可提现提示 -->
    <van-popup
      v-model="reason"
      class="reason-popup"
      @closed="closed"
    >
      <p>不可提现的金额为集市留存资金，可在 “蜂集市”APP 中购买商品任意抵扣。</p>
      <van-button class="btn" @click="reason = false">
        明白了
      </van-button>
    </van-popup>
    <!-- 规则 -->
    <van-popup
      v-model="rule"
      class="rule-box"
      @closed="closed"
    >
      <p class="text-center" style="margin-top:0;">
        <label>免费提现</label>
      </p>
      <p>1.“蜂集市”提供免费提现功能；</p>
      <p>2.用户所提现金额会自动提现至其绑定微信的零钱钱包之中。</p>
      <p class="text-center">
        <label>提现规则</label>
      </p>
      <p>1.提现金额及次数等相应条例，依据微信支付规则而定；</p>
      <p>1.1.集市用户享受每日至多 5 次提现机会（单次 100 - 20000元）；</p>
      <p>1.2.集市用户每日最多 20000 元。</p>
      <div class="text-center">
        <van-button class="btn" @click="rule = false">
          明白了
        </van-button>
      </div>
    </van-popup>
    <!-- 最大金额提示 -->
    <van-popup
      v-model="maxMoneyTip"
      class="reason-popup"
      @closed="closed"
    >
      <p>由于微信支付金额限制，每位用户单日最高提现额度为20000元！</p>
      <van-button class="btn" @click="maxMoneyTip = false">
        确定
      </van-button>
    </van-popup>
    <van-popup v-model="showTips" class="download-tip flex">
      <div class="info text-center">
        <img :src="tipImg" class="tip-img" alt="交易提示">
        <!--eslint-disable-next-line-->
        <p class="txt" v-html="tipsText"/>
        <button class="download-btn" @click="showTips = false">
          <span>知道了</span>
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import { getWithdrawNum, toCash, getMobile, getCashInfo } from '@/api/BeeApi/user'

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },
  components: {},
  props: {},
  data() {
    return {
      tipImg: require('@/assets/icon/beeFriends/info/tip_img.png'),
      title: '提现',
      // 是否可以输入
      isInput: false,
      // 姓名
      name: '',
      nameError: false,
      idNo: '',
      idNoError: false,
      canNext: false,
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
      // 单此提现金额最少100，最多20000
      MIN_MONEY: 100,
      MAX_MONEY: 0,

      // 可提现总金额
      totalCashNum: 0,
      // 单日可提现总金额
      totalNum: 0,
      // 不可提现金额
      no_sup_balance: 0,
      // 次数限制
      count_limit: 0,
      // 金额限制
      amount_limit: 0,
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
      osObj: getOs(),
      // 查看原因开关
      reason: false,
      // 最大金额提示
      maxMoneyTip: false,
      // 交易规则弹框
      rule: false,
      // 提示可提现余额
      showBalance: true,
      showError: false,
      // 激活id
      activate_id: this.$route.query.id || null,

      showTips: false,
      tipsText: ''

    }
  },
  computed: {},
  watch: {
    money(curVal, oldVal) {
      this.showBalance = false
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.adjustMoney1()
      }, 500)
    }
  },
  created() {},
  mounted() {
    this.getCanWithdraw()
    if (this.osObj.isWx) {
      //
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
            if (this.isActive) {
              this.getSms()
            } else {
              this.$toast('提现金额不规范！')
            }
          }
        } catch (error) {
          this.$toast(error)
        }
      }
    },
    // 第三步 获取短信验证码
    async getSms() {
      try {
        if (this.countDown <= 0) {
          const res = await toCash({
            status: 3
          })
          if (res.status_code === 200) {
            this.$toast(res.message)
            this.changeCountDoen()
          }
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
        if (this.countDown <= 0) {
          window.clearInterval(clock)
          this.countDown = 0
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
        let data
        if (this.activate_id) {
          data = {
            status: 4,
            money: this.money,
            sms_code: this.sms,
            activate_id: this.activate_id
          }
        } else {
          data = {
            status: 4,
            money: this.money,
            sms_code: this.sms
          }
        }
        const res = await toCash(data)
        if (res.code === 1 && res.status_code === 200) {
          this.$toast(res.message)
          this.show = false
          // this.totalNum = this.totalNum - this.money
          // this.isActive = false
          setTimeout(() => {
            this.getCanWithdraw()
          }, 1000)
        }
      } catch (error) {
        this.tipsText = error
        this.showTips = true
        // this.$toast.fail(error)
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

    // 获取 (不)可提现数量
    async getCanWithdraw1() {
      try {
        const res = await getWithdrawNum()
        if (res.code === 1 && res.status_code === 200) {
          this.totalNum = res.data.sup_balance
          this.no_sup_balance = res.data.no_sup_balance
          this.phone = res.data.phone
          this.canNext = true
        } else {
          this.canNext = false
        }
      } catch (error) {
        this.$toast.fail(error)
        this.canNext = false
      }
    },
    // 获取 (不)可提现数量
    async getCanWithdraw() {
      try {
        const res = await getCashInfo({
          activate_id: this.id
        })
        if (res.code === 1 && res.status_code === 200) {
          this.MAX_MONEY = res.data.amount
          this.totalCashNum = res.data.total_amount
          this.totalNum = res.data.amount
          this.no_sup_balance = res.data.no_amount
          this.phone = res.data.mobile
          this.count_limit = res.data.count_limit
          this.amount_limit = res.data.amount_limit
          this.canNext = true
          if (+this.count_limit === 0 || +this.totalNum === 0) {
            this.isInput = true
            this.isActive = false
          }
        } else {
          this.canNext = false
        }
      } catch (error) {
        this.$toast.fail(error)
        this.canNext = false
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
      this.countDown = 0
    },

    // 调整金额
    adjustMoney1() {
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
      this.money = +this.money
      console.log('this.money:', this.money, typeof this.money)
      // 判断金额是否在范围内
      // if (this.money > this.MAX_MONEY) {
      //   this.maxMoneyTip = true
      // }
      if (this.money >= this.totalNum) {
        this.maxMoneyTip = true
        this.money = this.totalNum
        if (this.totalNum < this.MIN_MONEY) {
          this.isActive = false
          this.showError = true
          this.cashTip = '提现金额至少' + this.MIN_MONEY + '!'
        } else if (
          this.totalNum >= this.MIN_MONEY &&
          this.totalNum <= this.MAX_MONEY
        ) {
          this.isActive = true
          this.money = this.totalNum
          this.showError = false
          this.cashTip = '可以提现！'
        } else if (this.totalNum > this.MAX_MONEY) {
          this.isActive = true
          this.money = this.MAX_MONEY
          this.showError = false
          this.cashTip = '可以提现！'
        }
      } else {
        if (this.money >= this.MIN_MONEY && this.money <= this.MAX_MONEY) {
          this.isActive = true
          this.showError = false
          this.cashTip = '可以提现！'
        } else if (this.money > this.MAX_MONEY) {
          this.isActive = true
          this.money = this.MAX_MONEY
          this.showError = true
          this.cashTip = '提现金额至多' + this.MAX_MONEY + '!'
        } else if (this.money < this.MIN_MONEY) {
          this.isActive = false
          this.showError = true
          this.cashTip = '提现金额至少' + this.MIN_MONEY + '!'
        }
      }
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
        font-size: 0.3rem;
        color: #999;
      }
      .img {
        width: 0.6rem;
        height: 0.6rem;
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
      .input-box {
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 0.2rem;
      }
      .input-div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .mark {
          font-size: 1rem;
          color: #221814;
        }
        input {
          font-size: 1rem;
          padding-left: 0.1rem;
          height: 1.2rem;
          width: 4.9rem;
          border: none;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          color: #221814;
          position: relative;
          z-index: 22;
          background-color: transparent;
        }
        input::-webkit-input-placeholder {
          color: #ccc;
          font-size: 0.3rem;
        }
        input::-moz-placeholder {
          color: #ccc;
          font-size: 0.3rem;
        }
        input:-ms-input-placeholder {
          color: #ccc;
          font-size: 0.3rem;
        }
        .all {
          font-size: 0.3rem;
          color: #ffa42f;
          pointer-events: auto;
        }
        .all.disable{
          pointer-events: none;
        }
        .tip {
          position: absolute;
          z-index: 2;
          left: 1rem;
          color: #999;
          font-size: 0.3rem;
        }
      }
      .error {
        color: #ff3f3f;
        font-size: 0.3rem;
        margin-left: 0.15rem;
      }
      .tip-info {
        font-size: 0.26rem;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.2rem;

        .all-to-cash {
          color: #ffa42f;
        }
      }
    }
    .btn-div {
      .btn {
        background: rgba(255, 164, 47, 0.5);
        font-size: 0.32rem;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 0.1rem;
        width: 6.3rem;
        // padding: 0.3rem 0;
        margin-top: 1.2rem;
        pointer-events: none;
        transition: all 0.3s linear;
      }
      .btn.active {
        pointer-events: auto;
        background: rgba(255, 164, 47, 1);
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
      flex: 1;
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
.reason-popup {
  text-align: center;
  font-size: 0.32rem;
  p {
    color: #333;
    line-height: 1.5;
  }
  .btn {
    color: #fff;
    border-radius: 0.1rem;
    width: 2.8rem;
    background-color: #ffa42f;
  }
}
.rule-box{
  font-size: 0.3rem;
  label{font-size:.32rem; }
  p {
    color: #333;
    line-height: 1.5;
  }
  .btn {
    color: #fff;
    border-radius: 0.1rem;
    width: 2.8rem;
    background-color: #ffa42f;
  }
}
.rule-btn{
  text-decoration: underline;
  font-style: italic;
}
.download-tip {
    background: #fff;
    width: 5.8rem;
    height: 5.2rem;
    border-radius: .1rem;
    .info{
      margin: auto;
    }
    .tip-img{
      width: 3.21rem;
      height: .63rem;
    }
    .txt{
      font-size: .28rem;
      color: #333;
      line-height: 1.5;
      margin: .9rem auto .62rem;
      white-space: pre-wrap;
    }
    .download-btn {
      border: none;
      color: #fff;
      width: 3.2rem;
      height: 0.72rem;
      background: linear-gradient(
        180deg,
        rgba(255, 220, 31, 1),
        rgba(253, 150, 11, 1)
      );
      border-radius: 0.5rem;
      font-size: 0.32rem;
      span {
        display: block;
        height: 100%;
        width: 100%;
        line-height: 0.72rem;
      }
    }
  }
</style>
