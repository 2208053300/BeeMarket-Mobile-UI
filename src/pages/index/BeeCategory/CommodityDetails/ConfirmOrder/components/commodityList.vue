<template>
  <div class="commodity-list">
    <div
      v-for="item in order.orderDetail.stores"
      :key="item.mid"
      class="commodity-card"
    >
      <div class="store-name">
        <van-icon name="shop-o" />
        <span class="name">{{ item.store_name }}</span>
      </div>
      <div class="commodity-content">
        <div
          v-for="item2 in item.products"
          :key="item2.sid"
          class="commodity-details"
        >
          <div class="commodity-card2">
            <div class="commodity-img">
              <img
                :src="item2.tUrl"
                alt=""
              >
            </div>
            <div class="commodity-info">
              <div class="name-unit">
                <div class="name">
                  {{ item2.pname }}
                </div>
                <span class="num">
                  x{{ item2.number }}
                </span>
              </div>
              <div class="sku-price">
                <div class="sku-text">
                  {{ item2.props_name }}
                </div>
                <span class="price-num">
                  ￥{{ item2.sell_price }}
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="buy-num">
            <span class="buy-text">购买数量</span>
            <van-stepper v-model="item2.number" />
          </div> -->
        </div>
        <div class="commodity-message">
          <span class="message-text">留言：</span>
          <van-field
            v-model="item.note"
            autosize
            placeholder="选填您的要求"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['order'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
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
        .commodity-card2 {
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
              .sku-text {
                font-size: 0.24rem;
                color: @Grey1;
              }
              .price-num {
                font-size: 0.28rem;
                color: @BeeDefault;
              }
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
      }
      .commodity-message {
        display: flex;
        align-items: center;
        .message-text {
          white-space: nowrap;
          font-size: 0.28rem;
        }
        .van-field {
          font-size: 0.28rem;
          color: @Grey1;
        }
      }
    }
  }
}
</style>
