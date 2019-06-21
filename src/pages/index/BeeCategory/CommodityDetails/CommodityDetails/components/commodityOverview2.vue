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
    <div class="product-desc">
      <div class="desc-text">
        <!-- 安排见谁都阿吉豆爱上你都暗示你打死你电脑上DNA -->
        {{ commodityData.intro }}
      </div>
      <div class="product-tags">
        <div
          v-for="(item,index) in commodityData.tags"
          :key="index"
          class="bee-tag"
          :class="{hotTag:item.tag_name==='热销'}"
        >
          {{ item.tag_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        product_detail_icon_attention_pressed: require('@/assets/icon/product/product_detail_icon_attention_pressed@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
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
    .com-free{
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
    margin: 0 0.3rem 0.2rem;
    background-color: #fff;
    padding: 0 1rem 0.24rem;
    text-align: center;
    .desc-text {
      font-size: 0.24rem;
      color: @Grey1;
    }
    .product-tags {
      margin-top: 0.16rem;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .bee-tag {
        display: inline-block;
        font-size: 0.2rem;
        color: @BeeDefault;
        border: 0.02rem solid @BeeDefault;
        border-radius: 0.2rem;
        padding: 0.05rem 0.1rem;
        &:not(:last-child) {
          margin-right: 0.12rem;
        }
      }
      .hotTag {
        border-color: #ffffff;
        color: #ffffff;
        background: linear-gradient(to right, @BeeDefault, #ff7116);
      }
    }
  }
}
</style>
