<template>
  <div class="apply-after">
    <div class="after-content">
      <div class="commodity-card">
        <div class="commodity-detail">
          <div class="commodity-img">
            <img
              :src="commodity.thumb_url"
              alt=""
            >
          </div>
          <div class="commodity-info">
            <div class="name-unit">
              <div class="name">
                {{ commodity.product_name }}
              </div>
              <div class="price-num">
                ￥{{ commodity.price }}
              </div>
            </div>
            <div class="sku-price">
              <div class="sku-text">
                {{ commodity.props_name }}
              </div>
              <div class="num">
                x{{ commodity.number }}
              </div>
            </div>
          </div>
        </div>
        <div class="footer-info">
          <div class="select-num">
            <span>申请数量</span>
          </div>
          <van-stepper v-model="selectNum" :max="commodity.number" />
        </div>
      </div>
      <div class="after-type">
        <van-cell-group>
          <van-cell
            is-link
            @click="goApply(1)"
          >
            <template slot="title">
              <div class="flex align-center">
                <img :src="icon.return" class="type-img">
                <span>退货</span>
              </div>
            </template>
            <div class="type-value">
              已收到货，需要退回商品
            </div>
          </van-cell>
          <van-cell
            is-link
            @click="goApply(2)"
          >
            <template slot="title">
              <div class="flex align-center">
                <img :src="icon.exchange" class="type-img">
                <span>换货</span>
              </div>
            </template>
            <div class="type-value">
              已收到货，需要更换商品
            </div>
          </van-cell>
          <van-cell
            is-link
            @click="goApply(3)"
          >
            <template slot="title">
              <div class="flex align-center">
                <img :src="icon.makeup" class="type-img">
                <span>补寄</span>
              </div>
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
import { selectAfterType } from '@/api/BeeApi/user'
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
      // 选择的数量
      selectNum: 1,
      // 首次申请传商品id, 修改申请传 申请单 aid
      order_product_id: this.$route.query.order_product_id,
      // 修改申请传 申请单 aid
      aid: this.$route.query.aid,
      // 售后类型图标
      icon: {
        return: require('@/assets/icon/personalCenter/afterApply/mine_order_types_icon_return@2x.png'),
        exchange: require('@/assets/icon/personalCenter/afterApply/mine_order_types_icon_exchange@2x.png'),
        makeup: require('@/assets/icon/personalCenter/afterApply/mine_order_types_icon_makeup@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    if (this.order_product_id) {
      this.getCommodityDetailData({ order_product_id: this.order_product_id })
    }
    if (this.aid) {
      this.getCommodityDetailData({ aid: this.aid })
    }
  },
  methods: {
    // 获取申请售后的订单商品信息
    async getCommodityDetailData(data) {
      const res = await selectAfterType(data)
      this.commodity = res.data
    },
    // 跳转到申请数据页面，1退 2换 3补  使用同一个页面
    goApply(type) {
      if (this.order_product_id) {
        this.$router.push({
          path: '/persion/order/applyAfter/refund',
          query: {
            apply_number: this.selectNum,
            type_code: type,
            order_product_id: this.order_product_id
          }
        })
      }
      if (this.aid) {
        this.$router.push({
          path: '/persion/order/applyAfter/refund',
          query: {
            apply_number: this.selectNum,
            type_code: type,
            aid: this.aid
          }
        })
      }
    }

  }
}
</script>

<style scoped lang="less">
.apply-after {
  .type-img{width:0.3rem ;height: 0.27rem; margin-right: 0.1rem}
  .type-value{font-size: 0.22rem; color: #999;}
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
