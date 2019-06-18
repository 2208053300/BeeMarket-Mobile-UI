<template>
  <div class="rule-card">
    <van-popup
      v-model="showRule"
      position="bottom"
      :close-on-click-overlay="false"
      @click-overlay="closeRule"
      @close="closeRule"
    >
      <div class="rule-content">
        <div class="rule-title">
          规则
          <van-icon
            name="cross"
            @click="closeRule"
          />
        </div>
        <div class="rule-detail">
          <div class="rule-part">
            <p class="rule-tiele2">
              1.公益值是什么？
            </p>
            <p class="rule-text1">
              公益值是蜂集市为回馈用户，而给予用户的奖励
            </p>
            <p class="rule-text1">
              公益值可积累，不可转让，赠送，售卖与提现
            </p>
          </div>
          <div class="rule-part">
            <p class="rule-tiele2">
              2.公益值有什么用？
            </p>
            <p class="rule-text1">
              公益值可以用于购买商品时，抵扣订单金额
            </p>
          </div>
          <div class="rule-part">
            <p class="rule-tiele2">
              3.公益值可以通过那些途径获得？
            </p>
            <p class="rule-text1">
              1.可以参与蜂任务，完成相应的指标，可获得相应公益值
            </p>
            <p class="rule-text1">
              2.购买集市内任一商品，并确认收货后，可获得相应公益值
            </p>
            <p class="rule-text1">
              3.参与公益行动助力或发起助力成功，可获得相应公益值
            </p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    showRule: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closeRule() {
      // FIXME 暂时忽略报错
      this.$emit('update:showRule', false)
    }
  }
}
</script>

<style scoped lang="less">
.rule-card {
  .van-popup {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }
  .rule-content {
    height: 9.2rem;
    background-color: #fff;
    .rule-title {
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.32rem;
      border-bottom: 0.02rem solid @Grey4;
      position: relative;
      .van-icon {
        color: @Grey1;
        position: absolute;
        right: 0.32rem;
        top: 0.3rem;
      }
    }
    .rule-detail {
      padding: 0.3rem;
      box-sizing: border-box;
      .rule-part {
        margin-bottom: 0.6rem;
      }
      .rule-tiele2 {
        padding: 0;
        margin: 0;
        font-size: 0.32rem;
      }
      .rule-text1 {
        color: @Grey2;
        font-size: 0.28rem;
        padding: 0;
        margin: 0.15rem 0 0 0.3rem;
      }
    }
  }
}
</style>
