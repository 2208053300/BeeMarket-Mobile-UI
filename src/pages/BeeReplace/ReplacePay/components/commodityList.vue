<template>
  <div class="product-list">
    <div
      v-for="item in productDetail.product"
      :key="item.storeName"
      class="product-content"
    >
      <div class="store-name">
        <van-icon name="shop-o" />
        <span class="name">{{ item.storeName }}</span>
      </div>
      <div
        v-for="item2 in item.product"
        :key="item2.id"
        class="detail-content"
      >
        <div class="product-img">
          <img
            :src="item2.previewImg"
            alt=""
          >
        </div>
        <div class="product-detail">
          <div class="product-name">
            <div class="name">
              {{ item2.name }}
            </div>
            <div class="num">
              x{{ item2.num }}
            </div>
          </div>
          <div class="product-sku">
            <div class="sku">
              {{ item2.sku }}
            </div>
            <div class="price">
              ￥{{ item2.currentPrice }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    productDetail: {
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
.product-list {
  .product-content {
    margin-top: 0.2rem;
    background-color: #fff;
    padding: 0.4rem 0.3rem;
    .store-name {
      font-size: 0.3rem;
      margin-bottom: 0.1rem;
      .van-icon {
        vertical-align: middle;
        margin-right: 0.04rem;
      }
    }
    .detail-content {
      margin-top: 0.2rem;
      display: flex;
      .product-img {
        width: 1.46rem;
        height: 1.46rem;
        margin-right: 0.2rem;
        border-radius: 4px;
      }
      .product-detail {
        flex: 1;
        .product-name {
          margin-top: 0.2rem;
          display: flex;
          justify-content: space-between;
          .name {
            flex: 2;
            font-size: 0.28rem;
          }
          .num {
            flex: 1;
            text-align: right;
            font-size: 0.28rem;
            color: @Grey1;
          }
        }
        .product-sku{
          display: flex;
          justify-content: space-between;
          margin-top: 0.27rem;
          .sku{
            font-size: 0.24rem;
            color: @Grey1;
          }
          .price{
            font-size: 0.24rem;
            color: @BeeDefault;
          }
        }
      }
    }
  }
}
</style>
