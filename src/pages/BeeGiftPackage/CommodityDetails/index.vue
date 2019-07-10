<template>
  <div class="commodity-details">
    <bee-header />
    <commodity-pre :commodity-data="commodityData" />
    <div
      class="commodity-container"
      :class="{limitProduct:1}"
    >
      <commodity-overview
        :commodity-data="commodityData"
        @plus="beforeAddProduct"
        @minus="openGiftList"
      />
      <!-- <div class="advertisement">
        广告位
        <img
          src=""
          alt=""
        >
      </div> -->
      <rich-details :commodity-data="commodityData" />
      <bee-guess />
    </div>
    <gift-package-bar ref="giftBar" @open-list="openGiftList" />
    <sku
      :show-sku.sync="showSku"
      :pid="pid"
      :p-number.sync="pNumber"
      @get-sku-id="addProduct"
    />
    <gift-package-list
      ref="giftList"
      :visible.sync="giftListVisible"
      @close="packageListClose"
      @gift-change="getNumberOfGift"
    />

    <package-build :visible.sync="packageVisible" />
  </div>
</template>

<script>
import { getProductDetail } from '@/api/BeeApi/product'
import commodityPre from './components/commodityPre'
import commodityOverview from './components/commodityOverview2'
import richDetails from './components/richDetails'
import BeeGuess from '@/components/index/BeeGuess'
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'

import PackageBuild from '../components/packageBuild'
import GiftPackageBar from '../components/giftPackageBar'
import sku from '../components/Sku'
import GiftPackageList from '../components/giftPackageList'
import { packageAdd } from '@/api/BeeApi/giftPackage'
import { mapState } from 'vuex'

import BeeHeader from './components/header'

export default {
  metaInfo: {
    title: '商品详情'
  },
  components: {
    commodityPre,
    commodityOverview,
    richDetails,
    BeeGuess,
    PackageBuild,
    GiftPackageBar,
    sku,
    GiftPackageList,
    BeeHeader
  },
  props: {},
  data() {
    return {
      commodityData: {},
      uid: 0,
      packageVisible: false,
      zIndex: 2500,
      giftListVisible: false,
      showSku: false,
      pNumber: 1,
      pid: 0,
      maxMoney: 599
    }
  },
  computed: {
    ...mapState(['giftPackage']),
    canSettlement() {
      return this.giftPackage.selectedTotalAmount >= this.maxMoney
    }
  },
  watch: {
    canSettlement() {
      if (this.giftPackage.selectedTotalAmount >= this.maxMoney) {
        this.packageVisible = true
      }
    }
  },
  created() {},
  mounted() {
    this.$store.state.cart.skuId = 0
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    this.getProductDetailData(this.$route.query.pid, this.$route.query.target)
    this.$store.dispatch('GET_GIFT_PACKAGE_INFO')
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
      const res = await getProductDetail({ pid, target })
      this.commodityData = res.data
      // NOTE 先放这里

      // NOTE 获取商品详情后调用分享
      this.loadUID()
    },
    // SKU选择完成
    skuDone() {
      this.$refs['goodsAction'].skuDone()
    },
    async updateGid() {
      const res = await getProductDetail({
        pid: this.$route.query.pid,
        target: this.$route.query.target
      })
      this.commodityData.gid = res.data.gid
    },
    // 添加商品到我的礼包
    async addProduct(skuId) {
      try {
        await packageAdd({
          sid: skuId,
          number: this.pNumber
        })
        this.updateGid()
        await this.$store.dispatch('GET_GIFT_PACKAGE_INFO')
        this.commodityData.g_selected_qty = parseInt(this.commodityData.g_selected_qty) + this.pNumber
      } catch (e) {
        this.$toast.fail(e)
      }
    },
    // 我的礼包列表关闭
    packageListClose() {
      this.$store.commit('SET_SHOW_TIP', true)
    },
    openGiftList() {
      if (this.giftPackage.selectedTotalNum === 0) {
        return
      }
      this.$store.commit('SET_SHOW_TIP', false)
      this.$refs.giftBar.$el.style.zIndex = this.zIndex
      this.zIndex += 4
      this.giftListVisible = true
    },
    // 获取添加商品相关信息
    async beforeAddProduct() {
      this.$refs.giftBar.$el.style.zIndex = 2000
      this.pid = this.commodityData.pid
      this.pNumber = 1
      this.showSku = true
    },
    getNumberOfGift() {
      console.log('清空')
      this.commodityData.g_selected_qty = 0
      for (const product of this.giftPackage.productList) {
        if (product.pid === this.commodityData.pid) {
          this.commodityData.g_selected_qty += product.number
        }
      }
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
  padding-top: 46px;
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
