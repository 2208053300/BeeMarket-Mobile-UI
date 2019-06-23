<template>
  <div class="pay">
    <!-- 身份认证 -->
    <div v-if="status===1" class="auth">
      <p class="title">
        请填写真实的个人信息
      </p>
      <form id="formInfo" class="auth-form">
        <div class="form-box bg-white">
          <div class="form-group">
            <label for="user_name">用户姓名</label>
            <div class="input-box">
              <input id="user_name" v-model.trim="name" type="text" placeholder="请填写真实姓名" @input="valiName()">
              <p v-show="nameError" class="error name-error">
                请正确输入姓名！
              </p>
            </div>
          </div>
          <div class="form-group">
            <label for="user_ID">身份证号</label>
            <div class="input-box">
              <input id="user_ID" v-model.trim="idNo" type="text" placeholder="请填写真实的身份证号码" value="" @input="valiIdNo()">
              <p v-show="idNoError" class="error id-error">
                请正确输入身份证号码！
              </p>
              <!--<img src="/static/src/Img/icon_close.png" class="clear-img"/>-->
            </div>
          </div>
        </div>
        <p class="tip">
          身份信息对应关联的提现微信账户，请务必填写本人真实姓名， 以及真实身份证号，否则将无法提现金额！
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
    <div v-if="status===2" class="to-cash">
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
            <input id="inputNum" v-model.trim="money" type="number" min="1" placeholder="金额">
            <span>(元)</span>
          </div>
          <div class="tip-info">
            <p>
              <span>最多可提现余额<span id="num">0</span>元</span>
              <span class="error to-cash-error">请输入提现金额！</span>
            </p>
            <span class="all-to-cash">全部提现</span>
          </div>
        </div>
      </div>
      <div class="btn-div text-center">
        <van-button id="TencentCaptcha" type="button" class="btn cash-btn active" data-appid="2001213699" data-cbfn="callback">
          <!-- <van-button id="TencentCaptcha" type="button" class="btn cash-btn active" data-appid="2049348716" data-cbfn="callback"> -->
          确认提现
        </van-button>
        <p>每天只能提现一次，一次至少100元，最多1000元!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toCash } from '@/api/BeeApi/user'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
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
      status: 2,
      // pic
      wxIcon: require('@/assets/icon/beeFriends/info/icon_wx.png')
    }
  },
  computed: {

  },
  watch: {
    // name: {
    //   handel(newVal, old) {
    //     clearTimeout(this.timeout)
    //     this.timeout = setTimeout(() => {
    //       this.valiName()
    //     }, 300)
    //   }
    // },
    // idNo: {
    //   handel(newVal, old) {
    //     clearTimeout(this.timeout)
    //     this.timeout = setTimeout(() => {
    //       this.valiIdNo()
    //     }, 300)
    //   }
    // }
    money(curVal, oldVal) {
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.money = parseInt(this.money)
        console.log(this.money)
      }, 300)
    }
  },
  created() {
    // if (window.TencentCaptCha === undefined) {
    //   const script = document.createElement('script')
    //   const head = document.getElementsByTagName('head')[0]
    //   script.type = 'text/javascript'
    //   script.charset = 'UTF-8'
    //   script.src = 'https://ssl.captcha.qq.com/TCaptcha.js'
    //   head.appendChild(script)
    // }
  },
  mounted() {
    // 点击提交触发 腾讯防水墙
    window.callback = this.callback
  },
  methods: {
    // 提交第一步
    async submitFir() {
      if (!this.valiName() && !this.valiIdNo()) {
        console.log(11111111)

        // this.$toast('请正确填写姓名、身份证号码')
        return false
      }
      console.log(22222222)

      const res = await toCash({
        status: this.status,
        name: this.name,
        idNo: this.idNo
      })
      if (res.status_code === 200) {
        this.status = 2
      }
    },
    // 防水墙方法
    callback(res) {
      console.log('防水墙')
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
    // 提现页面实时判断输入框的值
    getNum() {
      var value = this.money
      console.log(value)

      // if (value == '' || value == null || isNaN(value)) {
      //   flagNum = false
      //   $('.cash-btn').removeClass('active')
      //   $('.to-cash-error').text('请输入有效数值！')
      // } else {
      //   if (value > totalNum) {
      //     $('#inputNum').val(totalNum)
      //     flagNum = true
      //     $('.cash-btn').addClass('active')
      //     $('.to-cash-error').text('可以提现！')
      //   } else {
      //     flagNum = true
      //     $('.cash-btn').addClass('active')
      //     $('.to-cash-error').text('可以提现！')
      //   }
      // }
    }
  },
  meteInfo() {
    return {

      title: '提现'
    }
  }
}

window.callback = function(res) {
  console.log(res)
  // res（用户主动关闭验证码）= {ret: 2, ticket: null}
  // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
  if (res.ret === 0) {
    alert(res.ticket) // 票据
  }
}
</script>

<style scoped lang="less">
.pay{
  .auth{font-size: 0.24rem; color: #999; display: block;
    .title{ padding-left: 0.3rem; height: 0.64rem; line-height: 0.64rem;}
    .form-box{padding-left: 0.3rem;}
    .form-group{ display: flex; justify-content: space-between; align-items: center;  padding: 0.2rem 0;
        label{font-size: 0.28rem; width: 1.25rem;}
        .input-box{width: 5.4rem; padding-right: 0.3rem;}
        input{width: 100%; font-size: 0.3rem; color: #333; border: none; outline: none; height: 0.6rem; line-height: 0.6rem;-webkit-tap-highlight-color:transparent;
              margin-bottom: 0.1rem; padding-left: 0.2rem;}
        .error{ padding-left: 0.2rem; color: red; margin: 0;}
    }
    .form-group:nth-of-type(1){border-bottom: 1px solid #e5e5e5;}
    .tip{padding-left: 0.3rem; line-height: 1.7; margin-top: 0.3rem;}
    .submit-btn{background: #ccc; font-size: 0.32rem; color: #fff; border: none; outline: none; border-radius: 0.1rem; width:6.3rem;
                // padding: 0.3rem 0;
                 margin-top: 0.5rem; pointer-events: none; transition: background 0.3s ease-in;}
    .submit-btn.active{ background:#f49822 ;  pointer-events: auto;}
}
.to-cash{font-size: 0.24rem; color: #999; border-radius: 0.1rem; margin-top: 0.2rem;
    .info{background: #fbfbfb;}
     .to-wx{display: flex;justify-content: space-between; align-items: center; padding: 0.3rem 0.4rem;
            span{height: 0.25rem;}
            .img{width:0.57rem ;height: 0.57rem;}
            img{width: 100%;}
        }
     .num-info{padding: 0.3rem 0.4rem;
        .title{font-size: 0.3rem ; color: #221814;margin-bottom: 0.3rem;}
        .input-div{ display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e5e5; padding-bottom: 0.2rem;
            input{font-size: 1rem; padding-left:0.1rem; height: 1.2rem; width: 5.6rem; border: none; outline: none; -webkit-tap-highlight-color:transparent;}
            input::-webkit-input-placeholder{
                    color: #ccc;
            }
            input::-moz-placeholder{
                    color: #ccc;
            }
            input:-ms-input-placeholder{
                    color: #ccc;
            }
            span{ font-size: 0.3rem;}
        }
        .tip-info{font-size: 0.26rem; color: #666; display: flex; align-items: center; justify-content: space-between; margin-top: 0.2rem;
            .error{color: #cf3815; margin-left: 0.15rem;}
            .all-to-cash{color: #ffa42f;}
        }
     }
     .btn-div{
         .btn{background: #ccc; font-size: 0.32rem; color: #fff; border: none; outline: none; border-radius: 0.1rem; width:6.3rem;
                // padding: 0.3rem 0;
                 margin-top: 0.5rem;pointer-events: none;}
         .btn.active{pointer-events: auto; background: #f49822;}
         p{margin-top: 0.2rem;}
     }
}
}
</style>
