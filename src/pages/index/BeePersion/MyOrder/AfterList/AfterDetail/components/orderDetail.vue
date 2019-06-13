<template>
  <div class="order-detail">
    <div
      v-if="afterDetail.product_info"
      class="order-card"
    >
      <div class="order-title">
        <div class="store-name">
          {{ afterDetail.product_info.store_name }}
          <van-icon name="arrow" />
        </div>
        <span class="aftre-type">{{ afterDetail.product_info.type_name }}</span>
      </div>
      <div class="commodity-details">
        <div class="commodity-img">
          <img
            :src=" afterDetail.product_info.thumb_url"
            alt=""
          >
        </div>
        <div class="commodity-info">
          <div class="name-unit">
            <div class="name">
              {{ afterDetail.product_info.pname }}
            </div>

            <div class="price-cnum">
              <div class="price-num">
                ￥{{ afterDetail.product_info.price }}
              </div>
              <!-- FIXME 这里不知道有无数量 -->
              <!-- <span class="num">
                x{{ afterDetail.product_info.apply_number }}
              </span> -->
            </div>
          </div>
          <div class="sku-price">
            <div class="sku-text">
              {{ afterDetail.product_info.props_name }}
            </div>
          </div>
          <div class="apply-num">
            申请数量：{{ afterDetail.product_info.apply_number }}
          </div>
        </div>
      </div>
    </div>
    <div class="detail-text">
      <div class="detail-text2">
        售后编号： <span class="text3">{{ afterDetail.product_info.apply_no }}</span>
      </div>
      <div class="detail-text2">
        售后类型： <span class="text3">{{ afterDetail.product_info.type_name }}</span>
      </div>
      <div v-if="[1,2].includes(afterDetail.type_code)" class="detail-text2">
        申请理由： <span class="text3">{{ afterDetail.product_info.apply_reason }}</span>
      </div>
      <div v-if="[1].includes(afterDetail.type_code)" class="detail-text2">
        申请金额： <span class="text3">{{ afterDetail.product_info.apply_cash }}</span>
      </div>
      <div v-if="[1].includes(afterDetail.type_code)" class="detail-text2">
        申请公益值： <span class="text3">{{ afterDetail.product_info.apply_pwv }}</span>
      </div>
    </div>
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
.order-detail {
  .order-card {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.2rem;
    overflow: hidden;
    padding: 0.32rem 0.32rem 0.4rem;
    border-bottom: 0.02rem solid @Grey6;
    .order-title {
      font-size: 0.24rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-icon {
        margin-left: 0.2rem;
        vertical-align: middle;
      }
      .aftre-type {
        color: @BeeDefault;
      }
    }
    .commodity-details {
      margin-top: 0.3rem;
      display: flex;
      .commodity-img {
        width: 1.72rem;
        height: 1.72rem;
        border-radius: 0.04rem;
        overflow: hidden;
        margin-right: 0.2rem;
      }
      .commodity-info {
        flex: 1;
        margin-top: 0.08rem;
        .name-unit {
          display: flex;
          justify-content: space-between;
          .name {
            font-size: 0.22rem;
            margin-right: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .price-cnum {
            text-align: right;
            .price-num {
              font-size: 0.24rem;
            }
            .num {
              font-size: 0.24rem;
              color: @Grey1;
            }
          }
        }
        .apply-num {
          margin-top: 0.08rem;
          font-size: 0.22rem;
        }
        .sku-price {
          display: flex;
          justify-content: space-between;
          margin-top: 0.16rem;
          font-size: 0.24rem;
          color: @Grey1;
        }
      }
    }
    .after-status {
      margin-top: 0.4rem;
      font-size: 0.24rem;
    }
  }
  .detail-text {
    padding: 0.4rem 0.3rem 0.3rem;
    .detail-text2 {
      font-size: 0.26rem;
      color: @Grey1;
      &:not(:last-child){
        margin-bottom: 0.1rem;
      }
      .text3{
        color: @Grey2;
      }
    }
  }
}
</style>
