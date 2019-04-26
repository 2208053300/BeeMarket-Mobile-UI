<template>
  <div class="other-info">
    <van-cell-group>
      <van-cell
        is-link
        class="other1 sku-select"
        @click="selectCommodity"
      >
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">已选</span>
          <span class="cell-content">木头色 大号</span>
        </p>
        <p class="cell-value">
          选择
        </p>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell class="other1">
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">配送</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
      <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">活动</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
      <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">运费</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
      <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">备注</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        is-link
        class="other1"
        @click="showPromise=true"
      >
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">服务</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
    </van-cell-group>
    <van-actionsheet v-model="showPromise">
      <div class="service-promise">
        <div class="service-title">
          服务承诺
        </div>
        <div class="promise-content">
          <div class="promise-item">
            <div class="promise-img">
              <img
                src=""
                alt=""
              >
              正
            </div>
            <div class="promise-right">
              <div class="promise-title">
                正品保证
              </div>
              <div class="promise-desc">
                商家在售商品均持续加入保险承保范围予以正品保证
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                src=""
                alt=""
              >
              速
            </div>
            <div class="promise-right">
              <div class="promise-title">
                极速发货
              </div>
              <div class="promise-desc">
                订单支付后，集市商家将在48小时内为您发货（遇节假日等特殊情况除外）
              </div>
            </div>
          </div>
        </div>
        <div class="promise-button">
          <van-button
            type="default"
            round
            @click="showPromise=false"
          >
            确定
          </van-button>
        </div>
      </div>
    </van-actionsheet>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    commodityData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      showPromise: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    selectCommodity() {}
  }
}
</script>

<style scoped lang="less">
@import "../../../../styles/variables.less";
.other-info {
  .other1 {
    margin-top: 0.2rem;
  }
  .van-cell {
    .cell-title {
      margin: 0;
      .title-text {
        font-size: 0.24rem;
        color: @Grey1;
        margin-right: 0.36rem;
      }
    }
    .cell-value {
      margin: 0;
    }
  }
  .van-actionsheet {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    .service-promise {
      min-height: 10.28rem;
      overflow: hidden;
      padding: 0 0.56rem 0.16rem 0.3rem;
      position: relative;
      .service-title {
        text-align: center;
        font-size: 0.32rem;
        color: @BeeDefault;
        padding: 0.4rem 0;
      }
      .promise-content {
        .promise-item {
          display: flex;
          .promise-img {
            width: 0.3rem;
            margin-right: 0.24rem;
          }
          .promise-right {
            .promise-title {
              font-size: 0.3rem;
            }
            .promise-desc {
              font-size: 0.24rem;
              color: @Grey2;
              margin: 0.24rem 0 0.28rem;
            }
          }
        }
      }
      .promise-button{
        position: absolute;
        bottom: 0.16rem;
        .van-button{
          width: 6.92rem;
          height: 0.88rem;
          line-height: 0.88rem;
          font-size: 0.3rem;
          color: #ffffff;
          background-color: @BeeDefault;
          border-color: #ffffff;
        }
      }
    }
  }
}
</style>
