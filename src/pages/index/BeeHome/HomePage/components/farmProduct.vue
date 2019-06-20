<template>
  <div class="farm-card">
    <div class="card-title">
      <span class="title">
        农副产品
      </span>
      <div
        class="more"
        @click="$router.push('/beefarm')"
      >
        更多
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="product-list">
      <div
        v-for="product in homeData.produce"
        :key="product.product_id"
        class="product-detail"
        @click="goDetail(product.product_id, product.target)"
      >
        <div class="product-img">
          <img
            :src="product.thumb_url"
            alt=""
          >
        </div>
        <div class="product-text">
          <div class="product-name">
            {{ product.product_name }}
          </div>
          <div class="product-price1">
            ￥{{ product.selling_price }}
            <span class="product-price2">
              ￥{{ product.marketing_price }}
            </span>
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
    homeData: {
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
  methods: {
    goDetail(pid, target) {
      this.$router.push({
        path: '/category/details',
        query: { pid: pid, target: target }
      })
      this.$store.state.order.target = target
    }
  }
}
</script>

<style scoped lang="less">
.farm-card {
  margin: 0.2rem 0;
  padding: 0.2rem 0.16rem 0.1rem;
  background-color: #fff;
  box-shadow: 0 0 0.2rem @Grey6;
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 0.34rem;
    }
    .more {
      font-size: 0.26rem;
      color: @Grey1;
      .van-icon {
        vertical-align: middle;
      }
    }
  }
  .product-list {
    margin-top: 0.3rem;
    overflow-x: scroll;
    white-space: nowrap;
    .product-detail {
      display: inline-block;
      border-radius: 0.08rem;
      margin-right: 0.08rem;
      .product-img {
        border-radius: 0.08rem;
        overflow: hidden;
        height: 2.12rem;
        width: 2.12rem;
      }
      .product-text {
        padding: 0.12rem 0.12rem 0.2rem;
        .product-name {
          width: 1.95rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 0.24rem;
        }
        .product-price1 {
          font-size: 0.26rem;
          color: @BeeDefault;
          margin-top: 0.12rem;
        }
        .product-price2 {
          font-size: 0.2rem;
          color: @Grey2;
          margin-top: 0.12rem;
          margin-left: 0.12rem;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
