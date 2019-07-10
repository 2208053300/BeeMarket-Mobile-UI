<template>
  <div class="commodity-overview">
    <div
      class="product-detail"
      :style="{backgroundImage:'url('+beeIcon.product_detail_pic_b+')'}"
    >
      <div class="product-name">
        {{ commodityData.pname }}
      </div>
      <div class="product-price">
        <span class="section-price">
          <span class="rmb">￥</span>{{ commodityData.section_price }}
        </span>
        <span class="line-price">
          <span class="rmb">￥</span>{{ commodityData.line_price }}
        </span>
      </div>
      <div class="com-free">
        公益值可免单
      </div>
    </div>
    <div
      class="product-desc"
    >
      <div
        v-if="commodityData.intro"
        class="desc-text"
      >
        {{ commodityData.intro }}
      </div>
      <div
        class="product-operating"
      >
        <!-- 加减按钮 -->
        <div v-if="commodityData.g_selected_qty" class="p-add-remove">
          <img :src="beeIcon.minus" @click.stop="minus">
          <span>{{ commodityData.g_selected_qty }}</span>
          <img :src="beeIcon.plus" @click.stop="plus">
        </div>
        <!-- 加入礼包按钮 -->
        <div
          v-else
          class="add-to-pack-btn"
          @click.stop="plus"
        >
          <van-icon name="plus" />
          加入礼包
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { packageEdit } from '@/api/BeeApi/giftPackage'
export default {
  components: {},
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
      beeIcon: {
        product_detail_pic_b: require('@/assets/icon/product/product_detail_pic_b@2x.png'),
        product_detail_icon_attention_pressed: require('@/assets/icon/product/product_detail_icon_attention_pressed@2x.png'),
        minus: require('@/assets/icon/giftPackage/farm_icon_minus_small@2x.png'),
        plus: require('@/assets/icon/giftPackage/farm_details_icon_plus_big@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    minus() {
      if (this.commodityData.gid) {
        packageEdit({
          gid: this.commodityData.gid,
          number: this.commodityData.g_selected_qty - 1
        }).then(() => {
          this.item.g_selected_qty--
          this.$store.dispatch('GET_GIFT_PACKAGE_INFO')
        }).catch((e) => {
          this.$toast.fail(e)
        })
      } else {
        this.$emit('minus', this.item)
      }
    },
    plus() {
      this.$emit('plus')
    }
  }
}
</script>

<style scoped lang="less">
.commodity-overview {
  .product-detail {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 2.5rem;
    box-sizing: border-box;
    padding: 0.2rem 1rem 0.24rem;
    text-align: center;
    .product-name {
      font-size: 0.3rem;
      line-height: 0.38rem;
      min-height: 0.72rem;
    }
    .product-price {
      margin-top: 0.3rem;
      .rmb {
        font-size: 0.22rem;
      }
      .section-price {
        font-size: 0.3rem;
        color: @BeeDefault;
        margin-right: 0.32rem;
        font-weight: bold;
      }
      .line-price {
        text-decoration: line-through;
        font-size: 0.24rem;
        color: @Grey2;
      }
    }
    .com-free {
      height: 0.28rem;
      line-height: 0.28rem;
      width: 1.6rem;
      color: @BeeDefault;
      border: 0.02rem solid @BeeDefault;
      border-radius: 0.2rem;
      margin: auto;
      font-size: 0.2rem;
      background-color: rgba(255, 164, 47, 0.1);
      margin-top: 0.06rem;
    }
  }
  .product-desc {
    margin: 0 auto 0.2rem;
    width: 4.84rem;
    background-color: #fff;
    padding: 0 1rem 0.24rem;
    text-align: center;
    .desc-text {
      font-size: 0.24rem;
      color: @Grey1;
      margin-bottom: 0.16rem;
    }
    .product-operating {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .p-add-remove {
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        color: @Grey12;
        span {
          margin: 0 0.2rem;
        }
        img {
          width: 0.4rem;
        }
      }
      .add-to-pack-btn {
        display: flex;
        align-items: center;
        color: white;
        background: @BeeDefault;
        height: 0.4rem;
        border-radius: 1rem;
        font-size: 0.2rem;
        padding: 0 0.2rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
