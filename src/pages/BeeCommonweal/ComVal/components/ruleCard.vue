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
              1. 公益值是什么？
            </p>
            <p class="rule-text1">
              公益值是蜂集市为回馈蜂友用户，不断发放的免单购物权益，所有用户均可获取，但不可转让、赠送，提现。
            </p>
          </div>
          <div class="rule-part">
            <p class="rule-tiele2">
              2. 公益值怎么用？
            </p>
            <p class="rule-text1">
              可用于蜂集市中，所有商品的自由选购，畅享免单。
            </p>
          </div>
          <div class="rule-part">
            <p class="rule-tiele2">
              3. 公益值怎么获得？
            </p>
            <p class="rule-text1">
              A. 集市商品均加入公益宝贝，用户所有正常消费，都将获得等额公益值；
            </p>
            <p class="rule-text1">
              B. 和集市一起支持消费助农，超值选购各地区农副产品，也将获得等额公益值；
            </p>
            <p class="rule-text1">
              C. 为公益助力，点点手指关注分享集市相关公益活动，同样可以获赠大量公益值。
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
