<template>
  <div class="br-fixed">
    <van-circle
      v-model="currentRate"
      color="#FF9E22"
      size="1.10rem"
      layer-color="#A26A20"
    />
    <div class="percent">
      <span class="num">100</span>%
    </div>
    <div class="isHarvest">
      可收取
    </div>
    <div class="center-img">
      <div class="img-content">
        <img
          :src="beeIcon.bee_firend_icon_moregold"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      currentRate: 10,
      beeIcon: {
        bee_firend_icon_moregold: require('@/assets/icon//beeFriends/home/bee_firend_icon_moregold.png')
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
.br-fixed {
  position: fixed;
  bottom: 0.6rem;
  right: 0.5rem;
  z-index: 100;
  .percent {
    position: absolute;
    bottom: 0;
    left: 0.15rem;
    width: 0.8rem;
    height: 0.3rem;
    background-color: @Brown;
    border-radius: 0.15rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.18rem;
    color: #ffffff;
    z-index: 100;
    .num {
      font-size: 0.28rem;
      font-weight: bold;
    }
  }
  .isHarvest {
    height: 0.3rem;
    width: 0.8rem;
    box-sizing: border-box;
    font-size: 0.2rem;
    color: #ffffff;
    border: 0.04rem solid #ffffff;
    line-height: 0.3rem;
    text-align: center;
    border-radius: 0.15rem;
    position: absolute;
    left: -0.3rem;
    top: 0;
    background-color: @Red4;
    z-index: 100;
  }
  .center-img {
    width: 0.92rem;
    height: 0.92rem;
    line-height: 0.92rem;
    position: absolute;
    top: 0.09rem;
    left: 0.09rem;
    background-color: #4a2717;
    border-radius: 50%;
    .img-content {
      margin: auto;
      height: 0.63rem;
      width: 0.75rem;
    }
  }
}
</style>
