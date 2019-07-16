<template>
  <div class="bee-index">
    <bee-header @on-rule="onRule" />
    <img :src="beeIcon.headImg">
    <div class="product-list">
      <div class="item flex flex-wrap">
        <product-item
          v-for="(item, index) in products"
          :key="index"
          :item="item"
          @plus="beforeAddProduct"
          @minus="removeProduct"
        />
      </div>
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
    />
    <rule :visible.sync="ruleVisible" />
    <package-build :visible.sync="packageVisible" />
  </div>
</template>

<script>
import { getIndexData, packageAdd } from '@/api/BeeApi/giftPackage'
import { mapState } from 'vuex'
import BeeHeader from './components/header'
import ProductItem from './components/productItem'
import GiftPackageBar from '../components/giftPackageBar'
import sku from '../components/Sku'
import GiftPackageList from '../components/giftPackageList'
import Rule from './components/rule'
import PackageBuild from '../components/packageBuild'
export default {
  metaInfo: {
    title: '农礼包产品'
  },
  components: { GiftPackageList, BeeHeader, ProductItem, GiftPackageBar, sku, Rule, PackageBuild },
  props: {},
  data() {
    return {
      beeIcon: {
        headImg: require('@/assets/icon/giftPackage/farm_pic_banner@2x.png')
      },
      products: [],
      showSku: false,
      skuProduct: {},
      pNumber: 1,
      pid: 0,
      giftListVisible: false,
      ruleVisible: false,
      packageVisible: false,
      zIndex: 2500,
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
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = '#ffe1ba'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    this.getList()
    this.$store.dispatch('GET_GIFT_PACKAGE_INFO')

    if (+this.$route.query.showRule === 1) {
      this.onRule()
    }
  },
  methods: {
    onRule() {
      this.$refs.giftBar.$el.style.zIndex = 2000
      this.ruleVisible = true
    },
    async getList() {
      const res = await getIndexData()
      this.products = res.data.product_list
    },
    // 获取添加商品相关信息
    async beforeAddProduct(product) {
      this.$refs.giftBar.$el.style.zIndex = 2000
      this.pid = product.pid
      this.skuProduct = product
      this.pNumber = 1
      this.showSku = true
    },
    // 添加商品到我的礼包
    async addProduct(skuId) {
      try {
        await packageAdd({
          sid: skuId,
          number: this.pNumber
        })
        this.getList()
        await this.$store.dispatch('GET_GIFT_PACKAGE_INFO')
        this.skuProduct.selected_qty = parseInt(this.skuProduct.selected_qty) + this.pNumber
      } catch (e) {
        this.$toast.fail(e)
      }
    },
    async removeProduct(product) {
      this.openGiftList()
    },
    // 我的礼包列表关闭
    packageListClose() {
      this.getList()
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
    }
  }
}
</script>

<style scoped lang="less">
.bee-index {
  padding-top: 46px;
  background: #ffe1ba;
  text-align: center;
}
.product-list {
  padding: 0 0.28rem 2rem 0.28rem;
}
</style>
