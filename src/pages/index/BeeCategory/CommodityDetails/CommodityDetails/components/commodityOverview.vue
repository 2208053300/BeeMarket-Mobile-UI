<template>
  <div class="commodity-overview">
    <van-row
      type="flex"
      justify="space-between"
    >
      <van-col>
        <p class="new_price">
          <span class="rmb">￥</span>{{ commodityData.section_price }}
        </p>
        <p class="old_price">
          原价<span class="rmb">￥{{ commodityData.line_price }}</span>
        </p>
      </van-col>
      <van-col>
        <!-- TODO 已收藏变换颜色 -->
        <div
          v-if="commodityData.favor"
          class="followed unfollowed"
          @click="handleUnFollow"
        >
          <van-icon :name="beeIcon.product_detail_icon_attention_pressed" />
          <span class="followed-text1">已收藏</span>
        </div>
        <div
          v-else
          class="followed "
          @click="handleFollow"
        >
          <van-icon :name="beeIcon.product_detail_icon_attention_normat" />
          <span class="followed-text1">收藏</span>
        </div>
      </van-col>
    </van-row>
    <p class="commodity-name">
      {{ commodityData.pname }}
    </p>
    <p>{{ commodityData.tags }}</p>
    <p class="commodity-desc">
      {{ commodityData.intro }}
    </p>
    <!-- TODO 农副产品，商品来自西南地区 -->
  </div>
</template>

<script>
import { collectProduct, cancelCollect } from '@/api/BeeApi/product'
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
        product_detail_icon_attention_normat: require('@/assets/icon/product/product_detail_icon_attention_normat@2x.png'),
        product_detail_icon_attention_pressed: require('@/assets/icon/product/product_detail_icon_attention_pressed@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async handleFollow() {
      const res = await collectProduct({
        contentId: this.commodityData.pid,
        type: 1
      })
      this.commodityData.favor = 1
      this.$toast(res.message)
    },
    async handleUnFollow() {
      const res = await cancelCollect({
        content_ids: this.commodityData.pid,
        type: 1
      })
      this.commodityData.favor = 0
      this.$toast(res.message)
    }
  }
}
</script>

<style scoped lang="less">
.commodity-overview {
  padding: 0.24rem 0.3rem;
  background-color: #fff;
  .new_price {
    color: @BeeDefault;
    font-size: 0.4rem;
    padding: 0;
    margin: 0;
    .rmb {
      font-size: 0.28rem;
    }
  }
  .old_price {
    padding: 0;
    margin: 0;
    font-size: 0.24rem;
    color: @Grey1;
    .rmb {
      text-decoration: line-through;
    }
  }
  .followed {
    background-color: @GreyBg;
    width: 1.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    position: relative;
    left: 0.3rem;
    .van-icon {
      vertical-align: text-top;
      color: @Grey1;
      font-size: 0.3rem;
      margin-right: 0.05rem;
    }
    .followed-text1 {
      font-size: 0.24rem;
      color: @Grey1;
    }
  }
  .unfollowed {
    background: linear-gradient(to right, #fec108, #fe9907);
    .followed-text1 {
      color: #fff;
    }
  }
  .commodity-name {
    padding-top: 0.24rem;
    margin: 0;
    font-size: 0.32rem;
  }
  .commodity-desc {
    margin: 0;
    padding-top: 0.2rem;
    font-size: 0.24rem;
    color: @Grey1;
  }
}
</style>
