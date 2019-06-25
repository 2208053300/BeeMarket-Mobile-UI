<template>
  <div class="order-content">
    <van-list
      class="guess-container"
    >
      <div
        class="order-card"
      >
        <!-- @click="$router.push({path:'/persion/order/orderDetail',query:{order_no:card.order_no}})" -->

        <div class="card-title">
          <div class="store-name">
            {{ store_name }}
            <!-- 店铺名称 -->
            <van-icon name="arrow" />
          </div>
          <div class="order-status">
            <!-- TODO 状态之后根据接口再V-IF -->
            <!-- <span>{{ card.status_name }}</span> -->
            <span>待评价</span>
          </div>
        </div>
        <div class="card-content">
          <!-- 示例布局，接入数据后删除 -->
          <!-- <div class="product-content">
            <div class="flex flex-between">
              <div class="product-img">
                <img
                  src=""
                >
              </div>
              <div class="product-details">
                <div class="name-price">
                  <div class="product-name">
                    这里是商品名称
                  </div>
                  <span class="product-price">￥500</span>
                </div>
                <div class="sku-num">
                  <div class="product-sku">
                    这是是sku巴啦啦
                  </div>
                </div>
              </div>
            </div>
            <div class="action text-right">
              <van-button class="btn commented">
                已评价
              </van-button>
              <van-button class="btn">
                去评价
              </van-button>
            </div>
          </div> -->
          <!--  -->
          <div v-for="(product,index2) in productList" :key="index2" class="product-content">
            <div class="flex flex-between">
              <div class="product-img">
                <img
                  :src="product.tUrl"
                >
              </div>
              <div class="product-details">
                <div class="name-price">
                  <div class="product-name">
                    {{ product.pname }}
                  </div>
                  <span class="product-price">￥{{ product.sell_price }}</span>
                </div>
                <div class="sku-num">
                  <div class="product-sku">
                    {{ product.props_name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="action text-right">
              <van-button v-if="product.commented" class="btn commented">
                已评价
              </van-button>
              <van-button v-else class="btn" @click="goComment(product.sku_id,product.tUrl)">
                去评价
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { uncomment } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {
  },
  data() {
    return {
      //  订单编号
      order_no: this.$router.query.order_no,
      productList: [],
      store_name: ''

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      const res = await uncomment({ order_no: this.order_no })
      this.productList = res.data.products
      this.store_name = res.data.store_name
    },
    // 去评价
    goComment(sku_id, thumb_url) {
      this.$router.push({
        name: 'CommentProduct',
        query: {
          sku_id,
          order_no: this.order_no,
          thumb_url
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.order-content {
  margin: 0.32rem 0.12rem;
  .order-card {
    background-color: #fff;
    padding: 0.3rem 0.32rem;
    box-sizing: border-box;
    border-radius: 0.2rem;
    // margin-bottom: 0.2rem;
    .card-title {
      display: flex;
      justify-content: space-between;
      margin-bottom:0.3rem;
      .store-name {
        font-size: 0.24rem;
        .van-icon {
          vertical-align: middle;
        }
      }
      .order-status {
        font-size: 0.24rem;
        color: @BeeDefault;
      }
    }
    .card-content {
      margin: 0.3rem 0 0.4;

      .product-content {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.3rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid #999;
        &:last-child {
          margin-bottom: 0;
          border-bottom:none;
          padding-bottom:0;
        }
        .product-img {
          border-radius: 0.1rem;
          overflow: hidden;
          width: 1.72rem;
          height: 1.72rem;
          margin-right: 0.2rem;
        }
        .product-details {
          box-sizing: border-box;
          padding-top: 0.1rem;
          flex: 1;
          .name-price {
            display: flex;
            justify-content: space-between;
            font-size: 0.22rem;
            .product-name {
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-right: 0.5rem;
            }
          }
          .sku-num {
            display: flex;
            font-size: 0.22rem;
            margin-top: 0.2rem;
            color: @Grey1;
            justify-content: space-between;
            .product-sku {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .action{margin-top: 0.2rem;
          .btn{width:1.6rem; height:.56rem;line-height:.56rem; border: 1px solid @BeeDefault; color:@BeeDefault; font-size: 0.26rem;border-radius: 0.1rem }
          .commented{border: 1px solid #999; color:#999;}
        }
      }
    }
    .order-total {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      font-size: 0.24rem;
      margin-bottom: 0.4rem;
      .total-details {
        display: flex;
        align-items: flex-end;

        .total-num {
          margin-right: 0.2rem;
        }
        .total-price {
          .price-num {
            font-size: 0.3rem;
          }
        }
      }
    }
    .order-op {
      display: flex;
      justify-content: flex-end;
      .order-button {
        padding: 0;
        font-size: 0.24rem;
        width: 1.4rem;
        height: 0.56rem;
        line-height: 0.56rem;
        margin-left: 0.2rem;
        color: @BeeDefault;
        border-color: @BeeDefault;
      }
    }
  }
}
</style>
