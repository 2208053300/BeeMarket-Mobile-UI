<template>
  <div class="products bg-white">
    <div class="text-center">
      <img :src="icon.titleImg" class="title-img">
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我也是有底线的 o(´^｀)o"
      @load="getIndexData"
    >
      <div class="flex flex-between flex-wrap">
        <div v-for="(product, index) in products" :key="index" class="product flex flex-column">
          <img :src="product.tUrl" class="product-img">
          <div class="product-info flex flex-column flex-between">
            <div>
              <p class="product-name no-wrap">
                {{ product.pname }}
              </p>
            </div>
            <div class="action flex flex-between align-center">
              <p class="product-price">
                <span class="sell-price">￥{{ product.section_price }}</span>
              </p>
              <van-button round size="mini" @click="showSkuPopup(index)">
                免费送礼
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </van-list>

    <!-- 免费送礼弹窗 -->
    <ShowGift :show-gift="showGift" :product="nowProduct" />

    <!-- sku -->
    <Sku :show-sku="showSku" :pid="pid" :props-id="propsId" :p-number="pNumber" :limit-num="limitNum" />
  </div>
</template>

<script>
import Sku from '../components/Sku'
import ShowGift from '../components/ShowGift'
import { getIndexData } from '@/api/BeeApi/freeGift'
export default {
  components: {
    Sku,
    ShowGift
  },
  props: {

  },
  data() {
    return {
      icon: {
        titleImg: require('@/assets/icon/freeGift/freegift_details_text_gift.png')
      },
      loading: false,
      finished: false,
      products: [],
      page: 1,
      pageSize: 10,

      // 送礼弹框
      showGift: false,
      nowProduct: {},

      // 显示sku
      showSku: false,
      pid: 16934,
      propsId: [],
      pNumber: 0,
      limitNum: 0
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.getIndexData()
  },
  methods: {
    // 获取商品数据
    async getIndexData() {
      const res = await getIndexData()
      this.page++
      this.loading = false
      this.products.push(...res.data.products)
      // if (res.data.products.length < this.pageSize) {
      if (this.page > 4) {
        this.finished = true
      }
    },

    // NOTE 点击立即送礼,选择sku,sku 确定获取分享数据
    showSkuPopup(index) {
      console.log(index, 456456456)

      this.showSku = true

      this.nowProduct = this.products[index]
      // this.showGift = true
      console.log('立即送礼')
    }

  }
}
</script>

<style scoped lang="less">
.products{
   border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  .title-img{width:6.05rem;height: 0.35rem;margin:.5rem auto}
   .product {
      background-color: white;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;
      width:3.3rem;
      .product-img {
        width: 3.3rem;
        height: 3.3rem;
        border-radius: 0.1rem;
      }
      .product-info {
        width:3.3rem;
        .product-name {
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
          font-size: 0.26rem;
        }

        .product-price {
          // margin-top: 0.2rem;
          margin: 0
        }
        .sell-price{ font-size: 0.34rem;color:@BeeDefault; margin-right: .1rem; margin: 0}

      }
      .action{
        .num{font-size: .22rem; color: @BeeDefault;}
        .van-button{font-size: .22rem; color:#fff; background-color: @BeeDefault; height: 0.54rem; line-height: 0.5rem; padding: 0 0.3rem;}
      }
    }

}
</style>
