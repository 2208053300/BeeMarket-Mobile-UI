<template>
  <div class="commodity-details">
    <commodity-pre :commodity-data="commodityData" />
    <div
      class="commodity-container"
      :class="{limitProduct:1}"
    >
      <commodity-overview :commodity-data="commodityData" />
      <other-info
        :commodity-data="commodityData"
        @sku-done="skuDone"
        @sku-add="skuAdd"
      />
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
    <goods-action
      ref="goodsAction"
      :commodity-data="commodityData"
    />
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
import BeeGuess from '@/components/BeeGuess'
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
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
      commodityData: {},
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.cart.skuId = 0
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getProductDetailData(this.$route.query.pid, this.$route.query.target)
  },
  methods: {
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: this.commodityData.pname,
        desc: '我在蜂集市发现了一个惊呆了的商品，赶紧一起来看看吧。',
        imgUrl: this.commodityData.album[0].qUrl,
        // link: window.location.href + '&uid=' + this.uid
        link: this.commodityData.share.link
      })
    },
    // 获取商品详情
    async getProductDetailData(pid, target) {
      try {
        const res = await getProductDetail({ pid, target })
        this.commodityData = res.data
        // NOTE 先放这里

        // NOTE 获取商品详情后调用分享
        this.loadUID()
      } catch (error) {
        this.$toast({
          message: '商品已售罄或已下架！',
          onClose: () => {
            this.$router.go(-1)
          }
        })
      }
    },
    // SKU选择完成
    skuDone() {
      this.$refs['goodsAction'].skuDone()
    },
    skuAdd() {
      this.$refs['goodsAction'].addShopcartProductData()
    }
  },
  // 路由更新之前获取商品详情
  beforeRouteUpdate(to, from, next) {
    this.$store.state.cart.skuId = 0
    this.getProductDetailData(to.query.pid, to.query.target)
    next()
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
