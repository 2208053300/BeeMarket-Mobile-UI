<template>
  <div class="commodity-details">
    <commodity-pre :commodity-data="commodityData" />
    <div
      class="commodity-container"
      :class="{limitProduct:1}"
    >
      <commodity-overview :commodity-data="commodityData" />
      <other-info :commodity-data="commodityData" />
      <!-- <div class="advertisement">
        广告位
        <img
          src=""
          alt=""
        >
      </div> -->
      <user-assessment :commodity-data="commodityData" />
      <store-details :commodity-data="commodityData" />
      <rich-details :commodity-data="commodityData" />
      <bee-guess />
    </div>
    <goods-action :commodity-data="commodityData" />
  </div>
</template>

<script>
import { getProductDetail } from '@/api/BeeApi/product'
import commodityPre from './components/commodityPre'
import goodsAction from './components/goodsAction'
import commodityOverview from './components/commodityOverview2'
import otherInfo from './components/otherInfo'
import userAssessment from './components/userAssessment'
import storeDetails from './components/storeDetails'
import richDetails from './components/richDetails'
import BeeGuess from '@/components/index/BeeGuess'

export default {
  metaInfo: {
    title: '商品详情'
  },
  components: {
    commodityPre,
    goodsAction,
    commodityOverview,
    otherInfo,
    userAssessment,
    storeDetails,
    richDetails,
    BeeGuess
  },
  props: {},
  data() {
    return {
      commodityData: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getProductDetailData()
  },
  methods: {
    async getProductDetailData() {
      const res = await getProductDetail({
        pid: this.$route.query.pid,
        target: this.$route.query.target
      })
      this.commodityData = res.data
      // NOTE 先放这里
    }
  }
}
</script>

<style scoped lang="less">
.commodity-details {
  height: 100%;
  box-sizing: border-box;
  .commodity-container {
    padding-bottom: 50px;
    position: relative;
    top: -0.24rem;
    .advertisement {
      margin-top: 0.2rem;
      background-color: #fff;
      height: 1.6rem;
      width: 100%;
    }
  }
  .limitProduct {
    padding-bottom: 1.5rem;
  }
}
</style>
