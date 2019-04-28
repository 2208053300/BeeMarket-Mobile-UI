<template>
  <div class="commodity-list">
    <div
      v-for="item in orderCommodity"
      :key="item.storeName"
      class="commodity-card"
    >
      <div class="store-name">
        <van-icon name="shop-o" />
        <span class="name">{{ item.storeName }}</span>
      </div>
      <div class="commodity-content">
        <div
          v-for="item2 in item.product"
          :key="item2.id"
          class="commodity-details"
        >
          <div class="commodity-img">
            <img
              :src="item2.previewImg"
              alt=""
            >
          </div>
          <div class="commodity-info">
            <div class="name-unit">
              <div class="name">
                {{ item2.name }}
              </div>
              <span class="num">
                x{{ item2.num }}
              </span>
            </div>
            <div class="sku-price">
              <div class="sku-text">
                {{ item2.sku }}
              </div>
              <span class="price-num">
                {{ item2.currentPrice }}
              </span>
            </div>
          </div>
        </div>
        <div class="buy-num">
          <span class="buy-text">购买数量</span>
          <van-stepper v-model="buyNum" />
        </div>
        <div class="commodity-message">
          <span class="message-text">留言：</span>
          <van-cell-group>
            <van-field
              v-model="commodityMessage"
              placeholder="选填您的要求"
            />
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderCommodity } from '@/api/category'
export default {
  components: {},
  props: {},
  data() {
    return {
      orderCommodity: [],
      buyNum: 0,
      commodityMessage: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOrderCommodity()
  },
  methods: {
    async getOrderCommodity() {
      const res = await getOrderCommodity()
      this.orderCommodity = res.data.orderCommodity
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../../styles/variables.less";
.commodity-list {
  margin: 0 0.16rem;
  position: relative;
  top: -0.2rem;
  .commodity-card {
    background-color: #fff;
    border-radius: 0.2rem;
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    .store-name {
      .van-icon {
        vertical-align: text-top;
        margin-right: 0.08rem;
      }
      .name {
        font-size: 0.3rem;
      }
    }
    .commodity-content {
      .commodity-details {
        margin-top: 0.28rem;
        display: flex;
        align-items: center;
        .commodity-img {
          width: 1.46rem;
          height: 1.46rem;
          border-radius: 0.04rem;
          overflow: hidden;
          margin-right: 0.2rem;
        }
        .commodity-info {
          flex: 1;
          .name-unit {
            display: flex;
            justify-content: space-between;
            .name {
              font-size: 0.28rem;
              max-width: 3.5rem;
            }
            .num {
              font-size: 0.3rem;
              color: @Grey1;
            }
          }
          .sku-price {
            display: flex;
            justify-content: space-between;
            margin-top: 0.2rem;
          }
        }
      }
      .buy-num {
        margin: 0.4rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .buy-text {
          font-size: 0.28rem;
        }
      }
      .commodity-message {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
