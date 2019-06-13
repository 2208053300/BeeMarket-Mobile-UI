<template>
  <div class="after-list">
    <!-- 有售后单 -->
    <div v-if="afterList.length>0" class="list-content">
      <div
        v-for="item in afterList"
        :key="item.storeName"
        class="order-card"
        @click="$router.push({path:'/persion/order/afterList/afterDetail',query:{aid:item.aid}})"
      >
        <div class="order-title">
          <div class="store-name">
            {{ item.store_name }}
            <van-icon name="arrow" />
          </div>
          <span class="aftre-type">{{ item.type }}</span>
        </div>
        <div class="commodity-details">
          <div class="commodity-img">
            <img
              :src="item.thumb_url"
            >
          </div>
          <div class="commodity-info">
            <div class="name-unit">
              <div class="name">
                {{ item.product_name }}
              </div>

              <div class="price-cnum">
                <div class="price-num">
                  ￥{{ item.price }}
                </div>
                <!-- FIXME 这里不知道有无数量 -->
                <!-- <span class="num">
                  x{{ item.number }}
                </span> -->
              </div>
            </div>
            <div class="sku-price">
              <div class="sku-text">
                申请数量：{{ item.number }}
              </div>
            </div>
          </div>
        </div>
        <div class="after-status">
          {{ item.apply_status }}
        </div>
      </div>
    </div>
    <!-- 无售后单 -->
    <div v-else class="no-order text-center">
      <img :src="noOrderImg" alt="">
    </div>
  </div>
</template>

<script>
import { getAfterList } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '我的售后单'
  },
  components: {},
  props: {},
  data() {
    return {
      // 无订单缺省图
      noOrderImg: require('@/assets/icon/cart/shopping_cart_pic_no@2x.png'),
      // 售后单列表
      afterList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getAfterListData()
  },
  methods: {
    async getAfterListData() {
      const res = await getAfterList()
      this.afterList = res.data
    }
  }
}
</script>

<style scoped lang="less">
.after-list {

  .list-content {
    margin: 0 0.16rem;
    padding-top: 0.3rem;
    .order-card {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.2rem;
      overflow: hidden;
      padding: 0.32rem 0.32rem 0.4rem;
      margin-bottom: 0.2rem;
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
            align-items: center;
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
          .sku-price {
            display: flex;
            justify-content: space-between;
            margin-top: 0.2rem;
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
  }

  .no-order{
    padding-top: 3rem;
    img{width:2.88rem;height: 2.68rem;}
  }
}
</style>
