<template>
  <div class="complete-info">
    <div class="header bg-white text-center">
      <img src="../../../assets/icon/completeInfo/data_icon_smile@2x.png" class="top-img">
      <p>
        <span>关注“蜂集市”</span>公众号，即可<span>获取公益值10个</span>同时也可享受蜂集市更多权益
      </p>
    </div>
    <div class="info bg-white">
      <!-- 绑定微信 -->
      <section v-if="isBindWx===true">
        <div class="text flex">
          <img src="../../../assets/icon/completeInfo/data_icon_1@2x.png" class="text-img">
          <span>点击下方按钮进入账户绑定界面绑定微信。（如果您已绑定微信，可直接进行第2步）</span>
        </div>
        <div class="content text-center">
          <van-button class="bind-btn" @click="bindWx">
            <img src="../../../assets/icon/completeInfo/data_icon_weixin@2x.png" class="wx-img">
            <span>去绑定微信</span>
          </van-button>
        </div>
      </section>
      <!-- 绑定手机 -->
      <section v-if="isBindWx===false">
        <div class="text flex">
          <img src="../../../assets/icon/completeInfo/data_icon_1@2x.png" class="text-img">
          <span>点击下方按钮进入账户绑定手机号页面。（如果您已绑定，可直接进行第2步）</span>
        </div>
        <div class="content text-center">
          <van-button class="bind-btn" @click="bindPhone">
            <img src="../../../assets/icon/completeInfo/data_icon_phone@2x.png" class="phone-img">
            <span>去绑定手机号</span>
          </van-button>
        </div>
      </section>

      <section>
        <div class="text flex">
          <img src="../../../assets/icon/completeInfo/data_icon_2@2x.png" class="text-img">
          <span>打开微信，搜索并关注公众号“蜂集市”，点击【关注】即可完成该任务，获取相应权益。</span>
        </div>
        <div class="content">
          <img src="../../../assets/icon/completeInfo/data_pic_description@2x.png" alt="">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isBindWx: false
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为灰色
    document.querySelector('body').style.background = '#f4f4f4'
  },
  beforeDestroy() {
    // 销毁之前把灰色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 绑定微信
    bindWx() {
      // TODO
    },
    // 绑定手机号
    bindPhone() {
      // TODO
      this.$router.push({
        path: '/login'
      })
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

<style scoped lang="less">
.complete-info{
  padding: 0.2rem;
  .header{
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
    .top-img{ width: 0.98rem;height:0.98rem; }
    p{
      line-height: 1.7;
      font-size: 0.3rem;
      color:#333;
      font-weight: 600;
      span{
        color:@BeeDefault
      }
    }
  }
  section:first-of-type{
    margin-bottom: 0.6rem;
  }
  .info{
    padding: 0.6rem 0.32rem;
  }
  .text{
    font-size: 0.26rem;
    color:#333;
    line-height: 1.7;
  }
  .text-img{width:0.47rem;height:0.52rem; margin-right: 0.2rem}
  .content{
    margin-top: 0.4rem;
  }
  .bind-btn{background:@BeeDefault;font-size:0.32rem ;color: #fff; height: 0.88rem;
    width:4.6rem;border-radius:0.1rem;
    img{margin-right: 0.2rem}
    .wx-img{width:0.42rem; height: 0.34rem;}
    .phone-img{width:0.27rem; height: 0.4rem;}
  }
}
</style>
