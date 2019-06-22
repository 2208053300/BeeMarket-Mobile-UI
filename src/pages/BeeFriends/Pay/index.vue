<template>
  <div class="pay">
    <!-- 身份认证 -->
    <div class="auth">
      <p class="title">
        请填写真实的个人信息
      </p>
      <form id="formInfo" class="auth-form">
        <div class="form-box bg-white">
          <div class="form-group">
            <label for="user_name">用户姓名</label>
            <div class="input-box">
              <input id="user_name" type="text" oninput="valiName(event,'user_name')" placeholder="请填写真实姓名">
              <p class="error name-error">
                请正确输入姓名！
              </p>
            </div>
          </div>
          <div class="form-group">
            <label for="user_ID">身份证号</label>
            <div class="input-box">
              <input id="user_ID" type="text" oninput="valiID(event,'user_ID')" placeholder="请填写真实的身份证号码" value="">
              <p class="error id-error">
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
        <button type="buttom" class="submit-btn">
          下一步
        </button>
      </div>
    </div>

    <!-- 提现到微信 -->
    <div class="to-cash">
      <div class="info">
        <div class="to-wx">
          <span>提现到微信</span>
          <div class="img">
            <img src="/static/src/Img/icon_wx.png">
          </div>
        </div>
        <div class="num-info bg-white">
          <p class="title">
            提现余额数
          </p>
          <div class="input-div">
            <input id="inputNum" type="number" oninput="getNum(event)" min="1" placeholder="金额">
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
        <button id="TencentCaptcha" type="button" class="btn cash-btn" data-appid="2049348716" data-cbfn="callback">
          确认提现
        </button>
        <p>每天只能提现一次，一次至少100元，最多1000元!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
  meteInfo() {
    return {

      title: '提现'
    }
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
        .error{ padding-left: 0.2rem; color: red; display: none;}
    }
    .form-group:nth-of-type(1){border-bottom: 1px solid #e5e5e5;}
    .tip{padding-left: 0.3rem; line-height: 1.7; margin-top: 0.3rem;}
    .submit-btn{background: #ccc; font-size: 0.32rem; color: #fff; border: none; outline: none; border-radius: 0.1rem; width:6.3rem;
                padding: 0.3rem 0; margin-top: 0.5rem; pointer-events: none; transition: background 0.3s ease-in;}
    .submit-btn.active{ background:#f49822 ;  pointer-events: auto;}
}
.to-cash{font-size: 0.24rem; color: #999; display: none; border-radius: 0.1rem; margin-top: 0.2rem;
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
                padding: 0.3rem 0; margin-top: 0.5rem;pointer-events: none;}
         .btn.active{pointer-events: auto; background: #f49822;}
         p{margin-top: 0.2rem;}
     }
}
}
</style>
