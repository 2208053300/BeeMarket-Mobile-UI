<template>
  <div class="commodity-details">
    <van-nav-bar
      right-text="按钮"
      left-arrow
      fixed
      class="commodity-nav"
    />
    <commodity-pre :commodity-data="commodityData" />
    <div class="commodity-container">
      <commodity-overview :commodity-data="commodityData" />
      <other-info :commodity-data="commodityData" />
      <div class="advertisement">
        广告位
        <img
          src=""
          alt=""
        >
      </div>
      <user-assessment :commodity-data="commodityData" />
      <store-details :commodity-data="commodityData" />
      <rich-details :commodity-data="commodityData" />
      <bee-guess />
    </div>
    <goods-action />
  </div>
</template>

<script>
import { getCommodityDetails } from '@/api/category'
import commodityPre from './components/commodityPre'
import goodsAction from './components/goodsAction'
import commodityOverview from './components/commodityOverview'
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
    this.getCommodityDetails()
  },
  methods: {
    async getCommodityDetails() {
      const res = await getCommodityDetails()
      this.commodityData = res.data.commodityData
      // NOTE 先放这里
      this.$store.state.app.beeFooter.show = false
    }
  }
}
</script>

<style scoped lang="less">
.commodity-details {
  height: 100%;
  padding-top: 46px;
  box-sizing: border-box;
  .commodity-nav {
    background-color: transparent;
    top: 46px;
  }
  .commodity-container {
    padding-bottom: 50px;
    .advertisement {
      margin-top: 0.2rem;
      background-color: #fff;
      height: 1.6rem;
      width: 100%;
    }
  }
}
</style>
