<template>
  <!-- v-lazy-container="{ selector: 'img' }" -->
  <div class="rich-details">
    <div class="product-desc">
      <!-- eslint-disable-next-line -->
      <iframe
        id="productIframe"
        ref="productIframe"
        :srcdoc="descHtml"
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
import axios from 'axios'
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
      iHeight: 0,
      descHtml: '',
      interval: ''
    }
  },
  computed: {},
  watch: {
    commodityData() {
      this.loadDesc()
    }
  },
  created() {},
  mounted() {
    // console.log(this.$refs.productIframe.contentDocument.querySelectAll('img'))
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    // 设置详情高度
    setHeight() {
      if (this.interval) {
        return
      }
      this.interval = setInterval(() => {
        const iframe = document.querySelector('#productIframe')
        if (iframe && this.descHtml) {
          const iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow
          if (iframeWin.document.body) {
            const height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
            iframe.style.height = `${height}px`
            console.log('测量高度', iframe.style.height)
          }
        }
      }, 1000)
    },
    // 加载描述html
    async loadDesc() {
      const service = axios.create({
        baseURL: process.env.BASE_API, // api 的 base_url
        timeout: 50000 // 请求超时时间(现在是50秒)
      })
      const res = await service({
        url: '/product/desc',
        method: 'get',
        params: {
          pid: this.commodityData.pid
        }
      })
      this.descHtml = res.data
      this.setHeight()
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
      width: 100%;
    }
  }
}
</style>
