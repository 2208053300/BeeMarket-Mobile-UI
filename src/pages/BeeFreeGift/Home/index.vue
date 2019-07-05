<template>
  <div class="free-gift-index">
    <div class="head-msg">
      {{ head_msg }}
    </div>
    <div class="header">
      <div class="rule">
        活动规则
      </div>
      <div class="history-btn">
        <van-button round :to="{path: 'history'}">
          我的送礼记录 >
        </van-button>
      </div>
    </div>
    <div class="product-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        @load="getIndexData"
      >
        <div v-for="(product, index) in products" :key="index" class="product">
          <img :src="product.tUrl" class="product-img">
          <div class="product-info">
            <p class="product-name">
              {{ product.name }}
            </p>
            <p class="product-desc">
              {{ product.desc }}
            </p>
            <p class="product-price">
              <span>￥</span><span>{{ product.sell_price }}</span>
              <span>￥</span><span>{{ product.line_price }}</span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getIndexData } from '@/api/BeeApi/freeGift'
export default {
  metaInfo: {
    title: '免费送礼'
  },
  components: {},
  props: {},
  data() {
    return {
      head_msg: '',
      loading: false,
      finished: false,
      products: [],
      page: 1,
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getIndexData()
  },
  methods: {
    // 获取商品数据
    async getIndexData() {
      const res = await getIndexData()
      this.page++
      this.loading = false
      this.head_msg = res.data.head_msg
      this.products.push(...res.data.products)
      if (res.data.products.length < this.pageSize) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.free-gift-index {
  p {
    margin: 0;
  }
  .head-msg {
    overflow: hidden;
    background: #ffbd2f;
    padding: 10px 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .header {
    position: relative;
    height: 200px;
    background: rgba(255, 167, 32, 0.18);
    .rule {
      color: white;
      position: absolute;
      right: 0;
      top: 10px;
      background: #ffbd2f;
      padding: 5px 10px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }
    .history-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 20px;
      .van-button {
        background: #ffbd2f;
        color: white;
      }
    }
  }
  .product-list {
    padding: 15px;
    .product {
      background-color: white;
      border-radius: 10px;
      padding: 10px;
      display: flex;
      margin-bottom: 10px;
      .product-img {
        width: 50px;
        height: 50px;
      }
      .product-info {
        flex-grow: 1;
        .product-name {
          margin-top: 10px;
        }
        .product-desc {
          color: #999999;
          margin-top: 10px;
        }
        .product-price {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
