<template>
  <div class="join-success flex flex-column align-center">
    <!-- 助力成功提示页面 -->
    <img :src="successImg" alt="" class="sucess-tip-img">
    <p class="title">
      助力成功
    </p>
    <p class="val flex align-center">
      <img :src="smileImg" class="smile-img">
      为感谢您的参与，蜂集市送您<span>10</span>公益值
    </p>
    <p class="tip">
      进入商城即可领取
    </p>
    <van-button round class="btn" @click="goHome">
      进入商城
    </van-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      successImg: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_pic_value@2x.png'),
      smileImg: require('@/assets/icon/discover/smile.jpg')
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
    // 进入商城首页
    goHome() {
      this.$router.push({
        path: '/'
      })
    }
  },
  meteInfo() {
    return {
      title: '助力成功'
    }
  }
}
</script>

<style scoped lang="less">
.join-success {
  p {
    margin: 0;
  }
  .sucess-tip-img {
    width: 1.06rem;
    height: 1.06rem;
    margin: 1rem auto;
  }
  .title {
    font-size: 0.6rem;
    color: @BeeDefault;
    margin-bottom: 0.4rem;
  }
  .val {
    font-size: 0.3rem;
    color: #666;
    font-weight: #666;
    span {
      color: @BeeDefault;
      font-size: 0.22rem;
    }
    .smile-img {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .tip {
    font-size: 0.26rem;
    color: @BeeDefault;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }
  .btn {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 5.8rem;
    font-size: 0.32rem;
    color: #fff;
    background-image: linear-gradient(to right, #fe9907, #fec108);
  }
}
</style>
