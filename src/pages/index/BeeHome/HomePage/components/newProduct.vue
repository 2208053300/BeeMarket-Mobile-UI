<template>
  <div class="new-product">
    <div class="product-title">
      <div class="bee-icon">
        <img
          :src="beeIcon.home_icon_everyday"
          alt="新品首发"
        >
      </div>
      新品首发
    </div>
    <div class="product-list">
      <div
        v-for="(product,index) in homeData.new_product"
        :key="index"
        class="product-detail"
        @click="goDetail(product.product_id,product.target)"
      >
        <div class="product-img">
          <img
            :src="product.thumb_url ||$store.state.app.defaultImg2"
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
        return {
          new_product: []
        }
      }
    }
  },
  data() {
    return {
      beeIcon: {
        home_icon_everyday: require('@/assets/icon/home/index/home_icon_everyday@2x.png')
      }
    }
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
.new-product {
  margin: 0.2rem 0.16rem 0;
  padding: 0.32rem 0.16rem;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.2rem @Grey6;
  .product-title {
    font-size: 0.34rem;
    .bee-icon {
      width: 0.28rem;
      height: 0.3rem;
      display: inline-block;
      img {
        vertical-align: inherit;
      }
    }
  }
  .product-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.08rem;
    margin-top: 0.3rem;
    .product-detail {
      display: inline-block;
      border-radius: 0.08rem;
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
