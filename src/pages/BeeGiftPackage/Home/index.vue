<template>
  <div class="bee-index">
    <bee-header @on-rule="onRule" />
    <winning-roll style="position: fixed; top: 1.95rem;left: 0.28rem" />
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
    <img
      v-if="giftPackage.package_recharge_balance===0"
      :src="beeIcon.recharge_icon"
      class="recharge"
      alt="去充值"
      @click="goRecharge"
    >
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
  </div>
</template>

<script>
import { getIndexData, packageAdd, recharge } from '@/api/BeeApi/giftPackage'
import { mapState } from 'vuex'
import BeeHeader from './components/header'
import ProductItem from './components/productItem'
import GiftPackageBar from '../components/giftPackageBar'
import sku from '../components/Sku'
import GiftPackageList from '../components/giftPackageList'
import Rule from './components/rule'
import goPayFromPayInfo from '../PaySelf/goPayFromPayInfo'
import WinningRoll from '@/components/BeeWinningRoll/index'
export default {
  metaInfo: {
    title: '农礼包产品'
  },
  components: { GiftPackageList, BeeHeader, ProductItem, GiftPackageBar, sku, Rule, WinningRoll },
  props: {},
  data() {
    return {
      beeIcon: {
        headImg: require('@/assets/icon/giftPackage/farm_pic_banner@2x.png'),
        recharge_bg: require('@/assets/icon/giftPackage/farm_pic_recharge.png'),
        recharge_icon: require('@/assets/icon/giftPackage/farm_pic_button.png')
      },
      products: [],
      showSku: false,
      skuProduct: {},
      pNumber: 1,
      pid: 0,
      giftListVisible: false,
      ruleVisible: false,
      zIndex: 2500,
      maxMoney: 599
    }
  },
  computed: {
    ...mapState(['giftPackage'])
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
    },
    // 去充值
    async goRecharge() {
      const res = await recharge()
      goPayFromPayInfo(res.data)
    }
  }
}
</script>

<style scoped lang="less">
.bee-index {
  padding-top: 46px;
  background: #ffe1ba;
  text-align: center;
  .recharge {
    position: fixed;
    right: 0.28rem;
    bottom: 2.5rem;
    width: 1.77rem;
    height: auto;
  }
}
.product-list {
  padding: 0 0.28rem 2.56rem 0.2rem;
}
</style>
