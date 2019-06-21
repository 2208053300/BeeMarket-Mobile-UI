<template>
  <div class="everyday-product">
    <div class="card-top">
      <div class="card-title">
        <div class="everyday-icon">
          <img
            :src="beeIcon.home_icon_everyday"
            alt="每日好货"
          >
        </div>
        <div class="title-text">
          每日好货
        </div>
        <div class="title-tips">
          {{ homeData.daily_product.slogan }}
        </div>
      </div>
      <div class="product-list">
        <div
          v-for="(item,index) in homeData.daily_product.products"
          :key="index"
          class="product-content"
          @click="goDetail(item.product_id, item.target)"
        >
          <div class="product-img">
            <img
              :src="item.thumb_url"
              alt="商品缩略图"
            >
          </div>
          <div class="price1">
            ￥{{ item.selling_price }}
          </div>
          <div class="price2">
            ￥{{ item.marketing_price }}
          </div>
        </div>
      </div>
    </div>
    <div class="card-bottom">
      <div class="left-action">
        <img
          :src="homeData.limited_plan.left.show_image"
          alt="限量蜂抢"
          @click="$router.push('/beeLimit')"
        >
      </div>
      <div class="right-action">
        <img
          :src="homeData.limited_plan.right.show_image"
          alt="集市活动"
          @click="$router.push({path:'/beeActiveTpl',query:{id:homeData.limited_plan.right.plan_id}})"
        >
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
          daily_product: {
            products: [],
            slogan: '集市每天都会为你推荐好货1'
          },
          limited_plan: {
            left: {
              show_image: ''
            },
            right: {
              show_image: ''
            }
          }
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
.everyday-product {
  margin: 0.2rem 0.16rem 0;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.2rem @Grey6;
  overflow: hidden;
  .card-top {
    padding: 0.24rem 0.12rem 0.2rem;
    .card-title {
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      .everyday-icon {
        width: 0.28rem;
        height: 0.3rem;
        img {
          vertical-align: inherit;
        }
      }
      .title-text {
        margin: 0 0.3rem 0 0.12rem;
      }
      .title-tips {
        font-size: 0.26rem;
        color: @Grey1;
        align-self: flex-end;
      }
    }
    .product-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 0.44rem;
      margin-top: 0.2rem;
      .product-content {
        text-align: center;
        .product-img {
          height: 1.4rem;
          width: 1.4rem;
          border-radius: 0.08rem;
          overflow: hidden;
        }
        .price1 {
          margin-top: 0.09rem;
          font-size: 0.3rem;
          color: @BeeDefault;
        }
        .price2 {
          margin-top: 0.05rem;
          font-size: 0.28rem;
          color: @Grey1;
          text-decoration: line-through;
        }
      }
    }
  }
  .card-bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1.86rem;
  }
}
</style>
