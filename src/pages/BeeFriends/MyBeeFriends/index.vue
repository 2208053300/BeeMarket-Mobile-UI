<template>
  <div class="my-friends">
    <div
      class="user-fixed"
      @click="$router.push('/myEarn')"
    >
      头像
    </div>
    <div class="rule-fixed">
      规则
    </div>
    <div class="rt-fixed">
      <div class="rt-item">
        推荐奖
      </div>
      <div class="rt-item">
        推广奖
      </div>
      <div class="rt-item">
        股权奖
      </div>
    </div>
    <div class="bottom-fixed1">
      蜂友
    </div>
    <div class="bottom-fixed2">
      收余额
      <div class="get-num">
        520个
      </div>
    </div>
    <div class="br-fixed">
      <van-circle
        v-model="currentRate"
        color="#07c160"
        size="1.10rem"
        layer-color="#ebedf0"
        :rate="100"
        :speed="100"
        :clockwise="false"
        :stroke-width="60"
      />
    </div>
    <Honeycomb :detail-card.sync="detailCard" />
    <User-card :detail-card.sync="detailCard" />
  </div>
</template>

<script>
import Honeycomb from './components/Honeycomb'
import UserCard from './components/UserCard'

export default {
  components: {
    Honeycomb,
    UserCard
  },
  props: {},
  data() {
    return {
      detailCard: false,
      currentRate: 50
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
.my-friends {
  height: 100%;
  background-color: #fdd354;
  position: relative;
  .user-fixed {
    position: fixed;
    top: 0.32rem;
    left: 0.22rem;
    height: 0.9rem;
    width: 2.14rem;
    background-color: #fff;
    z-index: 100;
  }
  .rule-fixed {
    position: fixed;
    top: 1.5rem;
    left: 0.22rem;
    height: 0.9rem;
    width: 0.74rem;
    background-color: #fff;
    z-index: 100;
  }
  .rt-fixed {
    position: fixed;
    top: 0.32rem;
    right: 0.3rem;
    z-index: 100;
    .rt-item {
      height: 0.9rem;
      width: 0.74rem;
      margin-bottom: 0.3rem;
      background-color: #fff;
    }
  }
  .bottom-fixed1 {
    position: fixed;
    bottom: 0.6rem;
    left: 0.4rem;
    height: 1rem;
    width: 1rem;
    background-color: #fff;
    z-index: 100;
  }
  .bottom-fixed2 {
    position: fixed;
    bottom: 0.6rem;
    left: 1.8rem;
    height: 1rem;
    width: 1rem;
    background-color: #fff;
    z-index: 100;
    .get-num {
      position: absolute;
      top: 0;
      right: -0.3rem;
      height: 0.3rem;
      min-width: 0.7rem;
      text-align: center;
      line-height: 0.3rem;
      border-radius: 0.2rem;
      background-color: #fb1e1e;
      box-sizing: border-box;
      border: 0.02rem solid #fff;
      font-size: 0.2rem;
      color: #fff;
    }
  }
  .br-fixed {
    position: fixed;
    bottom: 0.6rem;
    right: 0.5rem;
    z-index: 100;
  }
}
</style>
