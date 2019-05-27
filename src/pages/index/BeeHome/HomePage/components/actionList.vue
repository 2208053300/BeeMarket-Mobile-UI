<template>
  <div class="action-list">
    <div
      v-for="action in homeDate.actionList"
      class="action-card"
      :key="action.name"
    >
      <div class="action-img">
        <img
          :src="action.actionImg"
          alt=""
        >
      </div>
      <div class="product-list">
        <div
          v-for="product in homeDate.limitProduct"
          :key="product.name"
          class="product-detail"
        >
          <div class="product-img">
            <img
              :src="product.previewImg"
              alt=""
            >
          </div>
          <div class="product-text">
            <div class="product-name">
              {{ product.name }}
            </div>
            <div class="product-price1">
              ￥{{ product.currentPrice }}
              <span class="product-price2">
                ￥{{ product.oldPrice }}
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
    homeDate: {
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
