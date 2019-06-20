<template>
  <div class="factory-body">
    <div class="factory to-partner">
      <img
        src="../../../assets/icon/joinFactory/partner_form_top.png"
        class="top-img"
      >
      <div class="info">
        <p>共创共享，</p>
        <p>我们一起成就事业！</p>
        <p>普惠四方，</p>
        <p>我们一起回馈社会！</p>
        <p>蜂集市，</p>
        <p>与您携手共建理想！</p>

        <img
          src="../../../assets/icon/joinFactory/factory_img1.png"
          class="info-img info-img1"
          alt=""
        >
        <img
          src="../../../assets/icon/joinFactory/factory_img2.png"
          class="info-img info-img2"
          alt=""
        >
      </div>

      <div class="form-box">
        <span
          class="form-title"
          :class="{ active: isPersonal === true }"
          @click="isPersonal = true"
        >个人资料填写</span>

        <div class="form-tab">
          <!-- 个人申请表单 -->
          <form
            id="formP"
            action=""
            class="form personal bg-white"
            :class="{ active: isPersonal === true }"
          >
            <img :src="icon.halfCircle" alt="" class="half-circle left">
            <img :src="icon.halfCircle" class="half-circle right">
            <div class="form-group">
              <label for="personalName"><span>*</span>本人姓名</label>
              <div class="form-control">
                <input
                  id="personalName"
                  v-model.trim="personalName"
                  type="text"
                  name="name"
                  placeholder="（必填）"
                  @input="changePersonalName"
                >
                <p v-if="personalNameError" class="help-text name-tip">
                  请重新输入姓名！
                </p>
              </div>
            </div>
            <div class="form-group">
              <label for="personalCard"><span>*</span>身份证号</label>
              <div class="form-control">
                <input
                  id="personalCard"
                  v-model.trim="card_no"
                  type="text"
                  name="card_no"
                  placeholder="（必填）"
                  @input="changePersonalCard"
                >
                <p v-if="card_noError" class="help-text card-tip">
                  请重新输入身份证号！
                </p>
              </div>
            </div>
            <div class="form-group">
              <label for="personTell"><span>*</span>联系电话</label>
              <div class="form-control">
                <input
                  id="personTell"
                  v-model.trim="number"
                  type="tel"
                  class="form-control"
                  name="number"
                  placeholder="（请输入注册号码）"
                  @input="changePersonTell"
                >
                <p v-if="numberError" class="help-text tel-tip">
                  请重新输入手机号码！
                </p>
              </div>
            </div>

            <div class="form-group">
              <label for="comName"><span>*</span>微信号码</label>
              <div class="form-control">
                <input
                  id="pwxAccount"
                  v-model.trim="wx_account"
                  type="text"
                  name="wx_account"
                  placeholder="（必填）"
                  @input="changeWxAccount"
                >
                <p v-if="wx_accountError" class="help-text wx-tip">
                  请重新输入微信号码！
                </p>
              </div>
            </div>
            <div class="form-group">
              <label for="brandName1"><span>*</span>联络地址</label>
              <div class="form-control">
                <textarea
                  id="brandName1"
                  v-model.trim="address"
                  type="text"
                  class="form-control"
                  name="address"
                  placeholder="请填写详细地址"
                  @input="changeAddress"
                />
                <p v-if="addressError" class="help-text address-tip">
                  地址不能为空!
                </p>
              </div>
            </div>
            <input id="token" type="hidden" value="{$token}">
            <input type="hidden" name="type" value="1">
          </form>
        </div>
        <div class="submit">
          <div class="btn-box active">
            <div class="agreement">
              <div class="check-action">
                <img
                  v-show="isAgree"
                  :src="icon.agreeImg"
                  class="check-img js-agreement"
                  @click="isAgree = !isAgree"
                >
                <img
                  v-show="!isAgree"
                  :src="icon.notAgreeImg"
                  class="check-img js-agreement"
                  @click="isAgree = !isAgree"
                >
                <span
                  class="text"
                >已阅读并同意<a
                  href="/partner/partnerAgreement"
                >合伙人共创协议</a></span>
              </div>
              <p class="help-text agreement-tip">
                请阅读并同意蜂集市合伙人共创协议
              </p>
            </div>
            <button
              id="submitP"
              type="button"
              class="btn no-select"
              @click="submit"
            >
              提交资料
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { applyBeeFriend } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '申请合伙人'
  },
  components: {},
  props: {},
  data() {
    return {
      // 是个人 true 还是商家 false
      isPersonal: true,
      // 个人申请字段验证
      personalName: '',
      personalNameError: false,
      card_no: '',
      card_noError: false,
      number: '',
      numberError: false,
      wx_account: '',
      wx_accountError: false,
      address: '',
      addressError: false,

      // 是否同意 合伙人共创协议
      isAgree: true,

      icon: {
        halfCircle: require('@/assets/icon/joinFactory/factory_img_circle.png'),
        agreeImg: require('@/assets/icon/joinFactory/checked_red.png'),
        notAgreeImg: require('@/assets/icon/joinFactory/unchecked_red.png')
      }
    }
  },
  computed: {},
  watch: {
  },
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 提交
    async submit() {
      // 个人申请
      console.log(
        this.personalNameError,
        this.card_noError,
        this.numberError,
        this.wx_accountError,
        this.addressError
      )

      if (
        this.personalName &&
          !this.personalNameError &&
          this.card_no &&
          !this.card_noError &&
          this.number &&
          !this.numberError &&
          this.wx_account &&
          !this.wx_accountError &&
          this.address &&
          !this.addressError
      ) {
        // 验证通过
        if (this.isAgree) {
          this.$toast('可以提交！')
          const data = {
            name: this.personalName,
            card_no: this.card_no,
            number: this.number,
            wx_account: this.wx_account,
            address: this.address
          }
          // 执行提交表单请求
          const res2 = await applyBeeFriend(data)
          if (res2.status_code === 200) {
            await this.$store.dispatch('GerUserStatus')
            this.$router.push({ name: 'beeFriends' })
          }
        } else {
          this.$toast('请同意合伙人共创协议')
        }
      } else {
        // 验证失败
        this.$toast('请正确填写个人资料表单！')
      }
    },

    // 个人资料验证
    changePersonalName() {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/.test(this.personalName)) {
        this.personalNameError = true
      } else {
        this.personalNameError = false
      }
    },
    changePersonalCard() {
      if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        this.card_no
      )) {
        this.card_noError = true
      } else {
        this.card_noError = false
      }
    },
    changePersonTell() {
      if (!/^1[3456789]\d{9}$/.test(this.number)) {
        this.numberError = true
      } else {
        this.numberError = false
      }
    },
    changeWxAccount() {
      var preg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/
      var preg1 = /^((13[0-9])|(14[5|7])|(15[0-3|5-9])|(166)|(17[0|1|3|5-8])|(18[0-9])|(19[0-9])|(147))\d{8}$/
      var preg2 = /^[1-9][0-9]{4,14}$/
      if (!preg.test(this.wx_account) && !preg1.test(this.wx_account) && !preg2.test(this.wx_account)) {
        this.wx_accountError = true
      } else {
        this.wx_accountError = false
      }
    },
    changeAddress() {
      if (!this.address) {
        this.addressError = true
      } else {
        this.addressError = false
      }
    },

    // 防抖
    debounce(func, wait) {
      let timeout = ''
      return v => {
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          func(v)
        }, wait)
      }
    },
    //  示例
    goProduct(pid) {
      // 判断是否来自webApp
      if (this.$route.query.origin) {
        window.location.href = `/#/category/details?pid=${pid}`
      } else {
        console.log('本地应用')
        this.$router.push({
          path: '/category/details',
          query: { pid }
        })
      }
    }

  }
}
</script>

<style  lang="less">
.factory-body {
  background: #fed559;
  height: auto !important;
  .van-cell:not(:last-child)::after {
    content: " ";
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 15px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: none;
  }
  .van-cell {
    display: flex;
    justify-content: space-between;
  }
  .van-field__label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 0.3rem;
    font-size: 0.3rem;
    color: #333;
    font-weight: 800;
    width: 2rem;
    text-align: right;
    .required {
      color: #ff4918;
    }
  }
  .van-field__control {
    border-radius: 0.05rem;
    width: 3.8rem;
    height: 0.74rem;
    line-height: 0.74rem;
    background: #eee;
    border: none;
    font-size: 0.28rem;
    color: #333;
    padding: 0 0.2rem;
  }
  .comment-img {
    width: 1.6rem;
    height: 1.6rem;
    position: relative;
    img {
      border-radius: 0.05rem;
    }
    .del-img {
      position: absolute;
      top: -0.1rem;
      right: -0.1rem;
    }
  }
  .add-shop-pic {
    width: 1.6rem;
    height: 1.6rem;
  }
}
.factory {
  width: 6.8rem;
  margin: 0 auto;
  padding-top: 0.6rem;
  //      font-family: 'qnhg';
  .top-img {
    width: 100%;
    margin: 0 auto 0.3rem;
    display: block;
  }

  .info {
    background: #fff;
    font-size: 0.28rem;
    color: #414650;
    position: relative;
    border-radius: 0.1rem;
    padding: 0.4rem;
    // p{line-height: 1.7;}
  }
  .join {
    margin-top: 0.4rem;
  }
  .join-btn {
    margin-right: 1.5rem;
    font-size: 0.28rem;
    background: none;
    display: inline-block;
    color: #444;
    padding: 0.2rem;
    background: #fed559;
    border-radius: 0.1rem;
  }

  .jt {
    color: #444;
  }
  .info-img {
    position: absolute;
  }
  .info-img1 {
    width: 1.17rem;
    height: 1.48rem;
    top: -0.1rem;
    right: 0.2rem;
  }
  .info-img2 {
    width: 1.86rem;
    height: 2.08rem;
    bottom: -0.7rem;
    right: -0.1rem;
  }

  .form-box {
    margin: 0.5rem auto 0;
    padding-bottom: 0.4rem;
  }
  .form-title {
    background: #986c4c;
    font-size: 0.38rem;
    color: #fed559;
    padding: 0.25rem;
    border-top-left-radius: 0.08rem;
    border-top-right-radius: 0.08rem;
    margin-left: 0.1rem;
    display: inline-block;
  }
  .form {
    // background: url(../../../assets/icon/joinFactory/factory_form_bg.png)
    //   no-repeat;
    // background-size: 100% 100%;
    padding: 0.4rem 0.2rem 0.1rem;
  }
  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
    label {
      font-size: 0.3rem;
      color: #333;
      font-weight: 800;
      width: 2rem;
      text-align: right;
      span {
        color: #ff4918;
      }
    }
    input,
    select {
      width: 3.8rem;
      height: 0.74rem;
      line-height: 0.74rem;
      background: #eee;
      border: none;
      font-size: 0.28rem;
      color: #333;
      padding: 0 0.2rem;
    }
    textarea {
      width: 4.2rem;
      background: #eee;
      border: none;
      font-size: 0.28rem;
      color: #333;
      padding: 0.2rem;
    }
  }
  .pic-box {
    width: 3.8rem;
    height: 1.6rem;
    position: relative;
    margin: 0.2rem auto;
    // overflow: hidden;
    text-align: left;
    .preview {
      width: 1.6rem;
      height: 100%;
      background: url(../../../assets/icon/joinFactory/add_shop_pic.png)
        no-repeat;
      background-size: cover;
    }
    img {
      width: 100%;
      height: 100%;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      height: 100%;
      width: 100%;
    }
  }

  .submit {
    height: 1.5rem;
    width: 100%;
    background: url(../../../assets/icon/joinFactory/factory_bottom_img.png)
      no-repeat;
    background-size: 100% 100%;
    text-align: center;
    margin-top: 0.5rem;
    .btn {
      font-size: 0.48rem;
      color: #fed559;
      padding: 0.2rem 0.7rem;
      border: none;
      border-radius: 1rem;
      background: #fff;
      box-shadow: 0 0.2rem 0 rgba(226, 182, 51, 0.34);
      font-weight: 800;
      outline: none;
    }
  }

  .sel_mask {
    position: relative;
    width: 4.2rem;
    height: 0.74rem;
    line-height: 0.74rem;
    background: #eee;
    border-radius: 5px;
    font-size: 0.28rem;
    color: #333;
    padding: 0 0.2rem;
    //              box-shadow:1px 1px 5px #169BD5;
    display: inline-block;
    text-decoration: none;
    .icon {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      background: #ffe084;
      width: 0.76rem;
      height: 100%;
    }
    img {
      width: 0.29rem;
      margin: auto;
    }
    select {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

    select option {
      border-bottom: 1px solid red;
    }
  }
  .help-text {
    font-size: 0.24rem;
    color: red;
    margin-top: 0.1rem;
    margin-bottom: 0;
    // display: none;
  }
}
//partnerForm.html
.to-partner {
  .top-img {
    margin-bottom: 0;
  }
  .form-title {
    background: #c7c7c7;
    color: #fff;
  }
  .form-title.active {
    background: #986c4c;
    color: #fed559;
  }
  .form {
    display: none;
    position: relative;
    .half-circle{
      position: absolute;
      width: 0.16rem;
      height: 0.44rem;
      top: 40%;
      z-index: 9;
    }
    .left{
      left: 0;
      transform: rotate(180deg)
    }
    .right{
      right:0;
    }
  }
  .form.active {
    display: block;
  }
  .form {
    label {
      width: 1.62rem;
      text-align: right;
    }
    textarea {
      width: 3.8rem;
    }
  }

  .form-pic {
    display: flex;
    justify-content: space-around;
    label {
      font-size: 0.3rem;
      color: #333;
      font-weight: 800;
      span {
        color: red;
      }
    }
    .pic-box {
      width: 1.6rem;
      height: 1.6rem;
      position: relative;
      margin: 0.2rem auto;
      // overflow: hidden;
      .preview {
        width: 100%;
        height: 100%;
        background: url(../../../assets/icon/joinFactory/add_shop_pic.png)
          no-repeat;
        background-size: cover;
      }
      img {
        width: 100%;
        height: 100%;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
  .agreement {
    display: flex;
    //       display: none;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    .help-text {
      font-size: 0.24rem;
      color: red;
      margin-top: 0.1rem;
      display: none;
    }
  }
  .check-action {
    display: flex;
    align-items: center;
    .check-img {
      width: 0.28rem;
      margin-right: 0.1rem;
    }
    .text {
      font-size: 0.28rem;
    }
    a {
      color: red;
    }
  }
  .btn-box {
    display: none;
  }
  .btn-box.active {
    display: block;
  }
  .btn {
    margin: 0.3rem auto;
  }
}
</style>
