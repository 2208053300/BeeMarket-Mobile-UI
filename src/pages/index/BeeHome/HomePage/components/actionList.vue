<template>
  <div class="action-list">
    <div
      v-for="action in homeData.feature.other"
      :key="action.mixed_id"
      class="action-card"
    >
      <div
        class="action-img"
        :style="{backgroundImage:'url('+action.show_img+')'}"
        @click="goDetail1(action)"
      />
      <div class="product-list">
        <div
          v-for="product in action.products"
          :key="product.product_id"
          class="product-detail"
          @click="goDetail2(product.product_id, product.target)"
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
          feature: {
            top: [
              {
                share_data: []
              }
            ],
            other: [
              {
                products: []
              },
              {
                share_data: []
              }
            ]
          }
        }
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
    goDetail1(project) {
      if (project.type === 1) {
        this.$router.push({
          path: '/beeActiveTpl',
          query: { id: project.mixed_id }
        })
      } else if (project.type === 2) {
        console.log(`/discover/article/${project.mixed_id}`)

        this.$router.push({
          path: `/discover/article/${project.mixed_id}`
        })
      }
    },
    goDetail2(pid, target) {
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
.action-list {
  .action-card {
    margin: 0.2rem 0.16rem 0;
    padding: 0.32rem 0.16rem;
    background-color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.2rem @Grey6;
    .action-img {
      height: 2.6rem;
      border-radius: 0.16rem;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }
    .product-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.08rem;
      margin-top: 0.2rem;
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
}
</style>
