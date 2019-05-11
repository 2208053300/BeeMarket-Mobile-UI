<template>
  <div class="after-op">
    <van-button
      v-if="[0].indexOf(afterDetail.status)!==-1"
      round
      @click="cancelPop=true"
    >
      删除售后单
    </van-button>
    <van-button
      v-if="[1].indexOf(afterDetail.status)!==-1"
      round
      @click="cancelPop=true"
    >
      修改申请
    </van-button>
    <van-button
      v-if="[2].indexOf(afterDetail.status)!==-1"
      round
      @click="cancelPop=true"
    >
      填写物流单号
    </van-button>
    <van-button
      v-if="[1].indexOf(afterDetail.status)!==-1"
      round
      @click="cancelPop=true"
    >
      撤销申请
    </van-button>
    <van-button
      round
      @click="cancelPop=true"
    >
      联系客服
    </van-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    afterDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.after-op {
  position: fixed;
  bottom: 0;
  height: 1rem;
  background-color: #fff;
  border-top: 0.02rem solid @Grey6;
  box-sizing: border-box;
  width: 100%;
  z-index: 1;
  padding: 0 0.32rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .van-button {
    width: 1.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0;
    margin-left: 0.2rem;
    font-size: 0.26rem;
    color: @Grey2;
    border-color: @Grey2;
  }
}
</style>
