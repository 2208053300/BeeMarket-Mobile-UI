<template>
  <!-- v-lazy-container="{ selector: 'img' }" -->
  <div class="rich-details">
    <div class="product-desc">
      <!-- eslint-disable-next-line -->
      <div ref="productDesc" />
    </div>
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
    <div class="explain-img">
      <img
        :src="beeIcon.priceExplain"
        alt="价格说明"
      >
    </div>
  </div>
</template>

<script>
// 导入获取商品描述接口
import { getProductDesc } from '@/api/BeeApi/product'
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
        product_detail_pic_nodetails: require('@/assets/icon/product/product_detail_pic_nodetails@2x.png'),
        priceExplain: require('@/assets/icon/product/priceExplain.png')
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
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 加载描述html
    async loadDesc() {
      try {
        const res = await getProductDesc({
          pid: this.commodityData.pid,
          source: 'H5'
        })
        // 将服务器返回的html转换为虚拟dom
        const html = res.data.desc
        const dom = document.createElement('div')
        dom.innerHTML = html
        // 处理img标签，用于图片懒加载
        const imgs = dom.querySelectorAll('img')
        imgs.forEach(img => {
          img.setAttribute('alt', `loading`)
          img.setAttribute('data-src', img.src)
          img.setAttribute(
            'src',
            'https://api.fengjishi.com/assets/images/loading.gif'
          )
        })
        // 将处理好的html设置到div
        this.$refs['productDesc'].innerHTML = dom.innerHTML
        // 将新的img标签初始化懒加载
        this.lazy()
      } catch (e) {
        this.descHtml = `<p>${e}</p>`
      }
    },
    // 设置商品详情描述的图片懒加载
    lazy() {
      const Echo = (function(window, document) {
        'use strict'
        const store = []
        let offset // 加载距离
        let throttle // 加载图片时间
        let firstnum // 首页显示图片数量
        let poll
        const _inView = function(el, num) {
          let inView
          if (num <= firstnum) {
            inView = true
          } else {
            const coords = el.getBoundingClientRect()
            inView =
              (coords.top >= 0 && coords.left >= 0 && coords.top) <=
              (window.innerHeight || document.documentElement.clientHeight) +
                parseInt(offset)
          }
          return inView
        }

        const _pollImages = function() {
          let num = 0
          for (let i = 0; i < store.length; i++) {
            const self = store[i]
            num++
            if (_inView(self, num)) {
              self.src = self.getAttribute('data-src')
            }
          }
          const nodes = document.querySelectorAll('.wscnph')
          if (nodes && nodes.length < 3) {
            for (let j = 0; j < nodes.length; j++) {
              nodes[j].style.height = 'auto'
            }
          } else {
            for (let k = 0; k < 3; k++) {
              nodes[k].style.height = 'auto'
            }
          }
        }
        const _throttle = function() {
          clearTimeout(poll)
          poll = setTimeout(_pollImages, throttle)
        }
        const init = function(obj) {
          const nodes = document.querySelectorAll('.wscnph')
          const opts = obj || {}
          offset = opts.offset || 0
          throttle = opts.throttle || 250
          firstnum = opts.firstnum || 0
          for (let i = 0; i < nodes.length; i++) {
            store.push(nodes[i])
          }
          _throttle()
          if (document.addEventListener) {
            window.addEventListener('scroll', _throttle, true)
          } else {
            window.attachEvent('onscroll', _throttle)
          }
        }
        return {
          init: init,
          render: _throttle
        }
      })(window, document)
      Echo.init({
        offset: 1000,
        throttle: 200,
        firstnum: 3
      })
    }
  }
}
</script>

<style lang="less">
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
    p {
      margin: 0;
    }
  }
  .explain-img {
    height: 3rem;
  }
}
</style>
