<template>
  <div>
    <van-popup
      v-model="visible"
      position="bottom"
      class="rule"
      :close-on-click-overlay="false"
      @close="handleClose()"
      @click-overlay="handleClose()"
    >
      <div class="rule-container">
        <div class="rule-item">
          <div class="number">
            <img :src="beeIcon.number">
            <div>1</div>
          </div>
          <div class="text">
            选购 “助农礼包” 可立升 2星 合伙人，标准为组合支付 ¥599 以上（以实际选购订单金额为准）；
          </div>
        </div>

        <div class="rule-item">
          <div class="number">
            <img :src="beeIcon.number">
            <div>2</div>
          </div>
          <div class="text">
            分享蜂友选购农礼，可立得 “助农补贴”（由各贫困县乡供应单位发放，第三方律师事务所监管支付），随时提现上不封顶；
          </div>
        </div>

        <div class="rule-item">
          <div class="number">
            <img :src="beeIcon.number">
            <div>3</div>
          </div>
          <div class="text">
            “助农补贴” 发放标准为 69 / 100 / 120（直接蜂友）+ 20 / 50 / 60（间接蜂友），分别对应 1星 / 2星 / 3星 合伙人身份；
          </div>
        </div>

        <div class="rule-item">
          <div class="number">
            <img :src="beeIcon.number">
            <div>4</div>
          </div>
          <div class="text">
            因农副产品生鲜易腐且来自不同贫困县乡，选购后将以多个包裹发出，请注意查收，同时为保农产品质量助农礼包不支持无理由退换。
          </div>
        </div>
        <div class="btn" @click="handleClose">
          我明白了
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      beeIcon: {
        number: require('@/assets/icon/giftPackage/farm_rule_digital_bg@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less">
.rule {
  p {
    margin: 0;
  }
  border-top-right-radius: 0.24rem;
  border-top-left-radius: 0.24rem;
  background: url('../../../../assets/icon/giftPackage/farm_rule_bg@2x.png') top;
  background-size: cover;
  .rule-container {
    margin-top: 1.32rem;
    height: 7.5rem;
    overflow: scroll;
    padding: 0 0.88rem 0.48rem 0.8rem;
    .rule-item {
      margin-top: 0.28rem;
      display: flex;
      position: relative;
      .number {
        padding-right: 0.2rem;
        img {
          width: 0.5rem;
          height: 0.8rem;
        }
        div {
          text-align: left;
          color: white;
          position: absolute;
          left: 0.17rem;
          top: 0.35rem;
          font-size: 0.24rem;
        }
      }
      .text {
        line-height: 1.6;
        font-size: 0.3rem;
        color: @Grey12;
        text-align: left;
        margin-top: 0.25rem;
      }
    }
    .btn {
      display: inline-block;
      width: 3.36rem;
      line-height: 0.8rem;
      border-radius: 5rem;
      background: linear-gradient(to right,#ffbd2f,@BeeDefault);
      margin-top: 0.64rem;
      color: white;
    }
  }
}
</style>
