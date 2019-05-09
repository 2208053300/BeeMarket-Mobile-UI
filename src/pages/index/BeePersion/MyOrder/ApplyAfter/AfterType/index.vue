<template>
  <div class="apply-after">
    <div class="after-content">
      <div class="commodity-card">
        <div class="commodity-detail">
          <div class="commodity-img">
            <img
              :src="commodity.previewImg"
              alt=""
            >
          </div>
          <div class="commodity-info">
            <div class="name-unit">
              <div class="name">
                {{ commodity.name }}
              </div>
              <div class="price-num">
                ￥{{ commodity.price }}
              </div>
            </div>
            <div class="sku-price">
              <div class="sku-text">
                {{ commodity.sku }}
              </div>
              <div class="num">
                x{{ commodity.num }}
              </div>
            </div>
          </div>
        </div>
        <div class="footer-info">
          <div class="select-num">
            <span>申请数量</span>
          </div>
          <van-stepper v-model="selectNum" />
        </div>
      </div>
      <div class="after-type">
        <van-cell-group>
          <van-cell
            icon="shop-o"
            is-link
            :to="{path:'/persion/order/applyAfter/refund',query:{selectNum:selectNum}}"
          >
            <template slot="title">
              <span>退货</span>
            </template>
            <div class="type-value">
              已收到货，需要退回商品
            </div>
          </van-cell>
          <van-cell
            icon="shop-o"
            is-link
            :to="{path:'/persion/order/applyAfter/exchange',query:{selectNum:selectNum}}"
          >
            <template slot="title">
              <span>换货</span>
            </template>
            <div class="type-value">
              已收到货，需要更换商品
            </div>
          </van-cell>
          <van-cell
            icon="shop-o"
            is-link
            :to="{path:'/persion/order/applyAfter/fill',query:{selectNum:selectNum}}"
          >
            <template slot="title">
              <span>补寄</span>
            </template>
            <div class="type-value">
              商家发的商品有遗漏商品
            </div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getCommodityDetail } from '@/api/user'
export default {
  // NOTE 根据选择条件更改title
  metaInfo: {
    title: '选择售后类型'
  },
  components: {},
  props: {},
  data() {
    return {
      commodity: {},
      selectNum: 1
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getCommodityDetailData()
  },
  methods: {
    async getCommodityDetailData() {
      const res = await getCommodityDetail()
      this.commodity = res.data.commodity
    }
  }
}
</script>

<style scoped lang="less">
.apply-after {

  .after-content {
    padding-top: 0.3rem;
    .commodity-card {
      margin: 0 0.16rem 0.2rem;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.2rem;
      overflow: hidden;
      .commodity-detail {
        display: flex;
        padding: 0.3rem;
        .commodity-img {
          width: 1.72rem;
          height: 1.72rem;
          border-radius: 0.04rem;
          overflow: hidden;
          margin-right: 0.2rem;
        }
        .commodity-info {
          flex: 1;
          margin-top: 0.08rem;
          .name-unit {
            display: flex;
            justify-content: space-between;
            .name {
              font-size: 0.22rem;
              max-width: 3.5rem;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .price-num {
              font-size: 0.24rem;
            }
          }
          .sku-price {
            display: flex;
            justify-content: space-between;
            margin-top: 0.2rem;
            font-size: 0.22rem;
            color: @Grey1;
            .num {
              font-size: 0.24rem;
              color: @Grey1;
            }
          }
        }
      }
      .footer-info {
        padding: 0.32rem 0.32rem 0.4rem;
        border-top: 0.02rem solid @Grey6;
        font-size: 0.28rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .after-type {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.2rem;
      overflow: hidden;
      margin: 0 0.16rem;
      .van-cell {
        padding: 0.4rem 0.32rem;
        &:not(:last-child)::after {
          left: 0;
        }
      }
    }
  }
}
</style>
