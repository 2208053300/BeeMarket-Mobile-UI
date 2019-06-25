<template>
  <div class="bee-guess">
    <div class="guess-title">
      <span>猜你喜欢</span>
    </div>
    <van-list
      v-model="loading"
      finished-text="我也是有底线的 o(´^｀)o"
      class="guess-container"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
    >
      <div
        v-for="(item,index) in guessData"
        :key="index"
        class="guess-card"
        @click="goDetail(item.product_id,item.target)"
      >
        <img
          :src="item.thumb_url"
          :alt="item.product_name"
          class="preview-img"
        >
        <div class="guess-details">
          <div class="product-name">
            {{ item.product_name }}
          </div>
          <div class="product-tag">
            <div
              v-if="item.area"
              class="area-tag"
            >
              商品来自：{{ item.area }}
            </div>
          </div>
          <div class="product-currentPrice">
            <span style="font-size:0.24rem">￥</span><span>{{ item.selling_price }}</span>
          </div>
          <div class="product-originalPrice">
            ￥{{ item.marketing_price }}
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getHome } from '@/api/BeeApi/home'

export default {
  components: {},
  props: {
    guessData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // FIXME 此处有加载两次的问题
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getHome({ page: this.page })
        this.guessData.push(...res.data.random_product)
        this.page++
        this.loading = false
        if (res.data.random_product.length === 0) {
          this.finished = true
        }
      }, 500)
    },
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
.bee-guess {
  margin-top: 0.2rem;
  padding: 0 0.3rem 0.3rem;
  background-color: #ffffff;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .guess-title {
    padding: 0.4rem 0;
    font-size: 0.36rem;
  }
  .guess-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.14rem;
    grid-row-gap: 0.2rem;
    .guess-card {
      width: 100%;
      border: 1px solid rgb(229, 229, 229);
      border-radius: 0.1rem;
      overflow: hidden;
      .preview-img {
        width: 100%;
        height: 3.3rem;
      }
      .guess-details {
        margin: 0.2rem;
        position: relative;
        .product-name {
          max-width: 3rem;
          font-size: 0.26rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .product-tag {
          height: 0.5rem;
          display: flex;
          align-items: flex-end;
          .area-tag {
            padding: 0.04rem 0.08rem;
            box-sizing: border-box;
            font-size: 0.2rem;
            text-align: center;
            color: @Red1;
            border: 0.02rem solid @Red1;
            margin-right: 0.12rem;
            border-radius: 0.04rem;
          }
        }
        .product-currentPrice {
          color: @BeeDefault;
          font-size: 0.34rem;
          margin: 0.05rem 0;
        }
        .product-originalPrice {
          font-size: 0.18rem;
          color: @Grey1;
          position: absolute;
          right: 0;
          bottom: 0;
          text-decoration: line-through;
        }
      }
    }
  }
  .van-list__finished-text {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
