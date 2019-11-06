<template>
  <div class="other-info">
    <van-cell-group>
      <van-cell
        is-link
        class="other1 sku-select"
        @click="handleSku"
      >
        <p
          slot="title"
          class="cell-title"
        >
          <span
            v-if="skuName.length===0"
            class="title-text"
          >请选择规格及参数</span>
          <span
            v-else
            class="title-text"
          >已选</span>
          <span
            v-if="$store.state.cart.skuId!==0"
            class="cell-content"
          >{{ skuName.join(' ') }}</span>
        </p>
        <p class="cell-value">
          选择
        </p>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="other1">
      <!-- <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">配送</span>
          <span class="cell-content">至 重庆 重庆市渝北区</span>
        </p>
      </van-cell> -->
      <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">活动</span>
          <span class="cell-content">{{ commodityData.charity_get }}</span>
        </p>
      </van-cell>
      <van-cell v-if="commodityData.is_free_freight===1">
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">运费</span>
          <!-- <span class="cell-content">集市所有商品均无条件包邮（特殊地区及活动除外）</span> -->
          <span class="cell-content flex align-center"><span>商品满{{ commodityData.meet_amount_free_freight }}元后可包邮</span><i class="free-postage">店铺活动</i></span>
        </p>
      </van-cell>
      <van-cell v-if="commodityData.remarks">
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">备注</span>
          <span class="cell-content">{{ commodityData.remarks }}</span>
        </p>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        class="service-cell"
        @click="showPromise=true"
      >
        <div class="service-content">
          <img
            :src="beeIcon.product_detail_pic_hook"
            alt="服务"
          >
        </div>
      </van-cell>
    </van-cell-group>
    <van-actionSheet v-model="showPromise">
      <div class="service-promise">
        <div class="service-title">
          服务承诺
        </div>
        <div class="promise-content">
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.product_detail_icon_authentic"
                alt="正"
              >
            </div>
            <div class="promise-right">
              <div class="promise-title">
                正品保证
              </div>
              <div class="promise-desc">
                集市严查杜绝假冒伪劣商品，上架经营商家承诺加入正品保证计划。
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.product_detail_icon_rapidly"
                alt="速"
              >
            </div>
            <div class="promise-right">
              <div class="promise-title">
                极速发货
              </div>
              <div class="promise-desc">
                订单支付后集市商家将在48小时内为您发货（遇节假日等特殊情况除外）。
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.product_detail_icon_change"
                alt="换"
              >
            </div>
            <div class="promise-right">
              <div class="promise-title">
                瑕疵包换
              </div>
              <div class="promise-desc">
                商品收货时如出现运输变质，破损变形等瑕疵情况集市及商家将第一时间为您调换。
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.product_detail_pic_postage"
                alt="邮"
              >
            </div>
            <div class="promise-right">
              <div class="promise-title">
                全场包邮
              </div>
              <div class="promise-desc">
                集市所有商品均无条件包邮（特殊地区及活动除外）
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.product_detail_pic_seven"
                alt="七"
              >
            </div>
            <div class="promise-right">
              <div class="promise-title">
                七天退货
              </div>
              <div class="promise-desc">
                集市商家严格执行七天无理由退货制度，确保用户无忧购物（农品及活动除外）。
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.product_detail_icon_welfare"
                alt="公"
              >
            </div>
            <div class="promise-right">
              <div class="promise-title">
                公益宝贝
              </div>
              <div class="promise-desc">
                您的每笔集市消费，都将参与至持续透明的蜂公益活动中，人人公益将爱传递，愿公益的快乐伴随您每一天
              </div>
            </div>
          </div>
        </div>
        <div class="promise-button">
          <van-button
            type="default"
            round
            @click="showPromise=false"
          >
            确定
          </van-button>
        </div>
      </div>
    </van-actionSheet>
    <bee-sku
      :show-sku.sync="$store.state.cart.showSku"
      :pid="commodityData.pid"
      :props-id.sync="propsId"
      :p-number.sync="pNumber"
      :limit-num="commodityData.remaining"
      :select-type.sync="selectType"
      @get-sku-name="getSkuName"
      @get-sku-id="getSkuId"
      @sku-done="$emit('sku-done')"
      @sku-add="$emit('sku-add')"
    />
  </div>
</template>

<script>
import BeeSku from '@/components/BeeSku'
export default {
  components: {
    BeeSku
  },
  props: {
    commodityData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      showPromise: false,
      selectType: 0,
      skuName: [],
      propsId: [],
      sku_id: 0,
      pNumber: 1,
      beeIcon: {
        product_detail_icon_authentic: require('@/assets/icon/product/product_detail_icon_authentic@2x.png'),
        product_detail_icon_change: require('@/assets/icon/product/product_detail_icon_change@2x.png'),
        product_detail_icon_rapidly: require('@/assets/icon/product/product_detail_icon_rapidly@2x.png'),
        product_detail_icon_review: require('@/assets/icon/product/product_detail_icon_review@2x.png'),
        product_detail_icon_welfare: require('@/assets/icon/product/product_detail_icon_welfare@2x.png'),
        product_detail_pic_hook: require('@/assets/icon/product/product_detail_pic_hook@2x.png'),
        product_detail_pic_seven: require('@/assets/icon/product/product_detail_icon_seven@2x.png'),
        product_detail_pic_postage: require('@/assets/icon/product/product_detail_icon_postage@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getSkuId(id) {
      this.sku_id = id
      this.$store.state.cart.skuId = id
      this.$store.state.cart.pNumber = this.pNumber
    },
    getSkuName(skuName) {
      this.skuName = skuName
    },
    handleSku() {
      if (this.commodityData.offsale) {
        this.$toast('商品已下架！')
        return
      }
      this.selectType = 1
      this.$store.state.cart.showSku = true
    }
  }
}
</script>

<style scoped lang="less">
.other-info {
  .other1 {
    margin-top: 0.2rem;
  }
  .sku-select {
    .van-cell__title {
      flex: 4;
    }
  }
  .service-cell {
    padding: 0;
  }
  .van-cell {
    .cell-title {
      margin: 0;
      .title-text {
        font-size: 0.24rem;
        color: @Grey1;
        margin-right: 0.36rem;
      }
      .cell-content{
        font-size: 0.22rem;
      }
      .free-postage{
        font-style: normal;
        margin-left: 0.1rem;
        max-width: 2.2rem;
        padding: 0.03rem 0.08rem;
        box-sizing: border-box;
        font-size: 0.2rem;
        text-align: center;
        color: @Red1;
        border: 0.02rem solid @Red1;
        margin-right: 0.12rem;
        border-radius: 0.04rem;
      }
    }
    .cell-value {
      margin: 0;
    }
  }
  .van-action-sheet {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    .service-promise {
      min-height: 10.28rem;
      overflow: hidden;
      padding: 0 0.56rem 0.16rem 0.3rem;
      position: relative;
      .service-title {
        text-align: center;
        font-size: 0.32rem;
        color: @BeeDefault;
        padding: 0.4rem 0;
      }
      .promise-content {
        .promise-item {
          display: flex;
          .promise-img {
            width: 0.43rem;
            height: 0.5rem;
            margin-right: 0.24rem;
          }
          .promise-right {
            flex: 1;
            .promise-title {
              font-size: 0.3rem;
            }
            .promise-desc {
              font-size: 0.24rem;
              color: @Grey2;
              margin: 0.24rem 0 0.28rem;
            }
          }
        }
      }
      .promise-button {
        position: absolute;
        bottom: 0.16rem;
        .van-button {
          width: 6.92rem;
          height: 0.88rem;
          line-height: 0.88rem;
          font-size: 0.3rem;
          color: #ffffff;
          background-color: @BeeDefault;
          border-color: #ffffff;
        }
      }
    }
  }
}
</style>
