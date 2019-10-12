<template>
  <div class="commodity-details">
    <commodity-pre :commodity-data="commodityData" />
    <div
      class="commodity-container"
      :class="{limitProduct:1}"
    >
      <commodity-overview :commodity-data="commodityData" />
      <other-info
        ref="otherInfo"
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
    <van-popup
      v-model="showWxTip"
      class="share-tip-box"
      position="top"
    >
      <img
        :src="icon.shareTipImg"
        class="share-tip-img"
      >
    </van-popup>
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
import { postSku, freeGiftInvite } from '@/api/BeeApi/freeGift'
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
      uid: 0,
      showWxTip: false,
      icon: {
        shareTipImg: require('@/assets/icon/share/guide1.png')
      }
    }
  },
  computed: {},
  watch: {
    showWxTip: {
      handler(newVal) {
        if (newVal) {
          this.$store.state.app.beeHeader = false
        } else {
          this.$store.state.app.beeHeader = true
        }
      }
    }
  },
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
        // 拼出正确链接，删除微信自己添加的参数
        link:
          window.location.href
            .split('#')[0]
            .split('&from=groupmessage')
            .join('') +
          '#' +
          this.commodityData.share.link.split('#')[1]
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
    },
    freeGift() {
      this.$refs['otherInfo'].selectType = 2
    },
    // 免费送礼生成记录
    async doneGift() {
      let tempData = null
      try {
        tempData = await postSku({ sid: this.$store.state.cart.skuId })
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await freeGiftInvite({
          sid: tempData.data.s_id,
          target: tempData.data.target,
          desc: tempData.data.product_desc
        })
        if (res.status_code === 200) {
          this.share_data = res.data
          const res2 = await getUID()
          this.uid = res2.data.uid
          wxapi.wxShare({
            title: this.share_data.title,
            desc: this.share_data.desc,
            imgUrl: this.share_data.imgUrl,
            link: this.share_data.link
          })
          this.showWxTip = true
        }
      } catch (error) {
        console.log(error)
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
  .van-popup.share-tip-box {
    background-color: rgba(0, 0, 0, 0);
    text-align: right;
  }
  .share-tip-img {
    width: 3.3rem;
    height: 2.28rem;
    margin-right: 0.2rem;
    margin-top: 0.8rem;
  }
}
</style>
