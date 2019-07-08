<template>
  <div class="bee-index">
    <bee-header @on-rule="onRule" />
    <img :src="beeIcon.headImg">
    <div class="product-container">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        class="product-list"
        @load="getList"
      >
        <div class="item flex flex-wrap">
          <product-item
            v-for="(item, index) in products"
            :key="index"
            :item="item"
          />
        </div>
      </van-list>
    </div>
    <gift-package-bar />
  </div>
</template>

<script>
import { getIndexData } from '@/api/BeeApi/giftPackage'
import BeeHeader from './components/header'
import ProductItem from './components/productItem'
import GiftPackageBar from '../components/giftPackageBar'
export default {
  metaInfo: {
    title: ''
  },
  components: { BeeHeader, ProductItem, GiftPackageBar },
  props: {},
  data() {
    return {
      loading: false,
      finished: false,
      beeIcon: {
        headImg: require('@/assets/icon/giftPackage/farm_pic_banner@2x.png')
      },
      query: {
        page: 1,
        pageSize: 10
      },
      products: []
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = '#ffe1ba'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {},
  methods: {
    onRule() {
      console.log('弹出规则弹窗')
    },
    async getList() {
      const res = await getIndexData(this.query)
      this.query.page++
      this.products.push(...res.data.product_list)
      this.products[0].selected_qty = 1
      this.loading = false
      if (res.data.product_list.length < this.query.pageSize) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.bee-index {
  padding-top: 46px;
  text-align: center;
}
.product-list {
  padding: 0 0.28rem 1.6rem 0.28rem;
}
</style>
