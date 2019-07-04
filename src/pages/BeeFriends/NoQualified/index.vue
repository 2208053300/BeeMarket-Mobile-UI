<template>
  <div class="factory-body">
    <div class="factory to-partner">
      <img
        src="../../../assets/icon/beeFriends/noQualified/qualified_title.png"
        class="top-img"
      >
      <div class="info">
        <p>共创共享，我们一起成就事业！</p>
        <p>普惠四方，我们一起回馈社会！</p>
        <p>蜂集市，让生活蜂富起来！</p>

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
            <img :src="icon.img" class="house-img">
            <div class="title-box text-center">
              <p class="main-title">
                您尚不具备申请条件
              </p>
              <p class="sub-title">
                需完成购物体验,即可申请开启合伙人
              </p>
            </div>
            <div class="content">
              <p>在蜂集市海量商品中，任选商品完成一次消费体验，即刻获得开启<br>蜂友圈资格。</p>
            </div>
          </form>
        </div>
      </div>
      <div class="submit">
        <div class="btn-box active">
          <button
            id="submitP"
            type="button"
            class="btn no-select"
            @click="submit"
          >
            去体验
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '去逛逛'
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
      number: '',
      numberError: false,

      // 是否同意 合伙人共创协议
      isAgree: true,

      icon: {
        halfCircle: require('@/assets/icon/joinFactory/factory_img_circle.png'),
        img: require('@/assets/icon/beeFriends/noQualified/img.png')

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
      window.location.href = this.$store.state.app.homeUri
    }

  }
}
</script>

<style scoped  lang="less">
.factory-body {
  background: #fed559 !important;
  height: auto !important;
  padding-bottom:0.8rem;
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
    padding: 0 0.2rem 0.1rem;
  }

  .submit {
    // height: 1.5rem;
    width: 100%;
    background: url(../../../assets/icon/joinFactory/factory_bottom_img.png)
      no-repeat;
    background-size: 100% 100%;
    text-align: center;
    margin-top: 0.7rem;
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
    border-radius: 0.1rem;
    display: none;
    position: relative;
    background-image: url(../../../assets/icon/beeFriends/noQualified/bg1.png),url(../../../assets/icon/beeFriends/noQualified/bg2.png);
    background-position:  left top,right bottom;
    background-repeat: no-repeat, no-repeat;
    background-size: contain, contain;
    .half-circle{
      position: absolute;
      width: 0.16rem;
      height: 0.44rem;
      top: 37%;
      z-index: 9;
    }
    .left{
      left: 0;
      transform: rotate(180deg)
    }
    .right{
      right:0;
    }
    .house-img{
        position: absolute;
        width: 2.44rem;
        height: 2rem;
        bottom:-1rem;
        right: 0;
        z-index: 9;
    }
  }
  .form.active {
    display: block;
  }

  .btn-box.active {
    display: block;
  }
  .btn {
    margin: 0.3rem auto;
  }

  .title-box{
    border-bottom: 1px dashed #ddd;
    padding: 0.4rem;
    p{margin: 0}
    .main-title{font-size:0.36rem; font-weight: 600; color: #333; margin-bottom: 0.2rem;}
    .sub-title{font-size:0.34rem; font-weight: 400; color: @BeeDefault;}
  }
  .content{
    font-size: 0.28rem;
    color:#333;
    font-weight: 500;
    padding: 0.2rem 0.4rem;
    line-height: 1.7;
  }
}
</style>
