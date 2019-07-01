<template>
  <div class="operation-card">
    <div class="op-item">
      <div class="img-content" @click="$router.push('/beeClassroom')">
        <img
          :src="beeIcon.home_icon_classroom"
          alt="集市课堂"
        >
      </div>
      <p class="op-text">
        集市课堂
      </p>
    </div>
    <div
      class="op-item"
      @click="authRoute('beeTask')"
    >
      <div class="img-content">
        <img
          :src="beeIcon.home_icon_task"
          alt="新手专享"
        >
      </div>
      <p class="op-text">
        新手专享
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
      @click="$router.push({ path: '/discover', query: { active: 1 }})"
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
    <div class="op-item" @click="$router.push('beeFactory')">
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
        home_icon_paction: require('@/assets/icon/home/index/home_icon_paction@2x.png'),
        home_icon_settled: require('@/assets/icon/home/index/home_icon_settled@2x.png')
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
    }
  }
}
</script>

<style scoped lang="less">
.operation-card {
  margin: 0.4rem 0.16rem 0.2rem;
  border-radius: 0.2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  .op-item {
    text-align: center;
    .img-content {
      width: 0.66rem;
      height: 0.63rem;
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
