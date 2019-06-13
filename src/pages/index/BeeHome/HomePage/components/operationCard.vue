<template>
  <div class="operation-card">
    <div class="op-item">
      <div class="img-content">
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
      @click="$router.push('beeTask')"
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
      @click="$router.push('beeFriends')"
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
      @click="$router.push('discover')"
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
    <div class="op-item">
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
  methods: {}
}
</script>

<style scoped lang="less">
.operation-card {
  margin: 0 0.16rem;
  height: 1.5rem;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.2rem @Grey6;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  .op-item {
    text-align: center;
    .img-content {
      width: 0.69rem;
      height: 0.76rem;
      margin: auto;
    }
    .op-text {
      font-size: 0.24rem;
      padding: 0;
      margin: 0;
      margin-top: 0.12rem;
    }
  }
}
</style>
