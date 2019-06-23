<template>
  <!-- v-lazy-container="{ selector: 'img' }" -->
  <div class="rich-details">
    <div class="product-desc">
      <!-- eslint-disable-next-line -->
      <iframe
        id="productIframe"
        ref="productIframe"
        :src="commodityData.desc_url"
        :onload="setHeight()"
        frameborder="0"
        class="desc-iframe"
        scrolling="no"
      />
    </div>
    <!-- TODO 没有商品详情富文本时显示 -->
    <div
      v-if="!commodityData.desc_url"
      class="no-details"
    >
      <img
        :src="beeIcon.product_detail_pic_nodetails"
        alt=""
      >
      暂无商品详情
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
        product_detail_pic_nodetails: require('@/assets/icon/product/product_detail_pic_nodetails@2x.png')
      },
      iHeight: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // console.log(this.$refs.productIframe.contentDocument.querySelectAll('img'))
  },
  methods: {
    // 设置详情高度
    setHeight() {
      const iframe = document.querySelector('#productIframe')
      if (iframe) {
        const iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow
        if (iframeWin.document.body) {
          iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
          console.log('计算高度:', iframe.height)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.rich-details {
  margin-top: 0.2rem;
  background-color: #fff;
  .no-details {
    padding: 1.5rem 2rem;
    text-align: center;
    font-size: 0.28rem;
    color: @Grey2;
    img {
      margin-bottom: 0.2rem;
    }
  }
  .product-desc {
    .desc-iframe {
      height: 0;
      width: 100%;
    }
  }
}
</style>
