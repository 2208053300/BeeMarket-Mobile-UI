<template>
  <div class="operation-card">
    <div class="op-item">
      <div
        class="img-content"
        @click="$router.push('/beeClassroom')"
      >
        <img
          :src="beeIcon.home_icon_classroom"
          alt="集市课堂"
        >
      </div>
      <p class="op-text">
        集市课堂
      </p>
    </div>
    <!-- <div class="op-item">
      <div
        class="img-content"
        @click="$router.push('/beeTask')"
      >
        <img
          :src="beeIcon.home_icon_task"
          alt="新手专享"
        >
      </div>
      <p class="op-text">
        新手专享
      </p>
    </div> -->
    <div class="op-item">
      <div
        class="img-content"
        @click="$router.push('beeAlcohol')"
      >
        <img
          :src="beeIcon.home_icon_billion"
          alt="瓜分10亿"
        >
      </div>
      <p class="op-text">
        瓜分10亿
      </p>
    </div>
    <div
      class="op-item"
      @click="authRoute('beeFriends')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_circle"
          alt="蜂友圈"
        >
      </div>
      <p class="op-text">
        蜂友圈
      </p>
    </div>
    <div
      class="op-item"
      @click="goSinglePage('beeFreeGift')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_free"
          alt="免费送礼"
        >
      </div>
      <p class="op-text">
        免费送礼
      </p>
    </div>
    <div
      class="op-item"
      @click="$router.push('/discover/actionList')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_paction"
          alt="助力公益"
        >
      </div>
      <p class="op-text">
        助力公益
      </p>
    </div>
    <div
      class="op-item"
      @click="$router.push('/beeLimit')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_bee_robbing"
          alt="限量蜂抢"
        >
      </div>
      <p class="op-text">
        限量蜂抢
      </p>
    </div>
    <div
      class="op-item"
      @click="$router.push('/beeSpokesman')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_endorsement"
          alt="代言集市"
        >
      </div>
      <p class="op-text">
        代言集市
      </p>
    </div>
    <div
      class="op-item"
      @click="$router.push('/beeGiftPackage')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_gift_package"
          alt="农礼包"
        >
      </div>
      <p class="op-text">
        农礼包
      </p>
    </div>

    <div class="op-item" @click="goSinglePage('lcEnrolling#/')">
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_medical"
          alt="医疗服务"
        >
      </div>
      <p class="op-text">
        医疗服务
      </p>
    </div>
    <div
      class="op-item"
      @click="$router.push('beeFactory')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_settled"
          alt="商家入驻"
        >
      </div>
      <p class="op-text">
        商家入驻
      </p>
    </div>
  </div>
</template>

<script>
import { isLogin } from '@/utils/auth'

export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        home_icon_classroom: require('@/assets/icon/home/index/home_icon_classroom@2x.png'),
        home_icon_task: require('@/assets/icon/home/index/home_icon_task@2x.png'),
        home_icon_circle: require('@/assets/icon/home/index/home_icon_circle@2x.png'),
        home_icon_free: require('@/assets/icon/home/index/home_icon_free@2x.png'),
        home_icon_paction: require('@/assets/icon/home/index/home_icon_paction@2x.png'),
        home_icon_bee_robbing: require('@/assets/icon/home/index/home_icon_bee_robbing@2x.png'),
        home_icon_endorsement: require('@/assets/icon/home/index/home_icon_endorsement@2x.png'),
        home_icon_gift_package: require('@/assets/icon/home/index/home_icon_farm@2x.png'),
        home_icon_medical: require('@/assets/icon/home/index/home_icon_medical.png'),
        home_icon_settled: require('@/assets/icon/home/index/home_icon_settled@2x.png'),
        home_icon_billion: require('@/assets/icon/home/index/home_icon_billion.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async authRoute(path) {
      if (!(await isLogin())) {
        this.$router.push('/login')
      } else {
        this.$router.push(path)
      }
    },
    async goSinglePage(path, isNeedLogin = true) {
      if (isNeedLogin && !(await isLogin())) {
        this.$router.push('/login')
      } else {
        console.log(window.location.origin + '/' + path)

        window.location.href = window.location.origin + '/' + path
      }
    }
  }
}
</script>

<style scoped lang="less">
.operation-card {
  margin: 0.4rem 0.16rem 0.3rem;
  border-radius: 0.2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  background: white;
  padding: 0.28rem 0.2rem;
  grid-gap: 0.3rem;
  .op-item {
    text-align: center;
    .img-content {
      width: 0.66rem;
      height: 0.65rem;
      margin: auto;
    }
    .op-text {
      font-size: 0.24rem;
      padding: 0;
      margin: 0;
      margin-top: 0.1rem;
    }
  }
}
</style>
