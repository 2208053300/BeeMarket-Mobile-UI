<template>
  <div
    v-if="guessData.length"
    class="bee-guess"
  >
    <template v-if="guessData.length">
      <div
        v-if="guessData[0].area"
        class="farm-title"
      >
        <div class="img-content">
          <img
            :src="beeIcon.bee_commonweal_text_agricultural_products"
            alt="农副产品"
          >
        </div>
        <div
          class="show-more"
          @click="showList"
        >
          更多
        </div>
      </div>
    </template>
    <div
      v-else
      class="guess-title"
    >
      <span>- 猜你喜欢 -</span>
    </div>
    <div class="guess-container">
      <div
        v-for="item in guessData"
        :key="item.pid"
        class="guess-card"
        @click="showDetail(item.pid,item.target)"
      >
        <img
          :src="item.tUrl"
          :alt="item.pname"
          class="preview-img"
        >
        <div class="guess-details">
          <div class="product-name">
            {{ item.pname }}
          </div>
          <div class="product-tag">
            <div
              v-if="item.area"
              class="area-tag"
            >
              商品来自：{{ item.area }}
            </div>

            <template v-if="item.area&&item.tags.length>0">
              <div
                class="bee-tag"
                :class="{hotTag:item.tags[0]==='热销'}"
              >
                {{ item.tags[0] }}
              </div>
            </template>
            <template v-else>
              <div
                v-for="item2 in item.tags"
                :key="item2"
                class="bee-tag"
                :class="{hotTag:item2==='热销'}"
              >
                {{ item2 }}
              </div>
            </template>
          </div>
          <div class="product-currentPrice">
            <span style="font-size:0.24rem">￥</span><span>{{ item.price }}</span>
          </div>
          <div class="product-originalPrice">
            ￥{{ item.line_price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
export default {
  components: {},
  props: {
    guessData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      beeIcon: {
        bee_commonweal_text_agricultural_products: require('@/assets/icon/common/commonweal/bee_commonweal_text_agricultural_products.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showList() {
      const osObj = getOs()
      if (osObj.isWx) {
        // FIXME 跳转到农副产品页
        this.$router.push({
          path: '/beeFarm'
        })
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToAgriculturalProducts.postMessage('')
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToAgriculturalProducts()
      } else {
        this.$router.push({
          path: '/beeFarm'
        })
      }
    },
    showDetail(pid, target) {
      const osObj = getOs()
      if (osObj.isWx) {
        // FIXME 跳转到农副产品页
        this.$router.push({
          path: '/category/details',
          query: {
            pid: pid
          }
        })
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToProductDetail.postMessage({
          pid: pid,
          target: target
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToProductDetail(pid, target)
      } else {
        this.$router.push({
          path: '/category/details',
          query: {
            pid: pid
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.bee-guess {
  margin-top: 0.2rem;
  padding: 0 0.3rem 0.3rem;
  background-color: #ffffff;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .farm-title {
    padding: 0.4rem 0;
    display: flex;
    justify-content: space-between;
    .img-content {
      width: 1.63rem;
      height: 0.28rem;
    }
    .show-more {
      font-size: 0.22rem;
      color: @Grey1;
    }
  }
  .guess-title {
    text-align: center;
    padding: 0.4rem 0;
    font-size: 0.28rem;
  }
  .guess-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.14rem;
    grid-row-gap: 0.2rem;
    .guess-card {
      width: 100%;
      border: 1px solid rgb(229, 229, 229);
      border-radius: 0.1rem;
      overflow: hidden;
      .preview-img {
        width: 100%;
        height: 3.3rem;
      }
      .guess-details {
        margin: 0.2rem;
        position: relative;
        .product-tag {
          height: 0.6rem;
          display: flex;
          align-items: flex-end;
          .area-tag {
            padding: 0.04rem 0.08rem;
            box-sizing: border-box;
            font-size: 0.2rem;
            text-align: center;
            color: @Red1;
            border: 0.02rem solid @Red1;
            margin-right: 0.12rem;
            border-radius: 0.04rem;
          }
          .bee-tag {
            display: inline-block;
            font-size: 0.2rem;
            color: @BeeDefault;
            border: 0.02rem solid @BeeDefault;
            border-radius: 0.2rem;
            box-sizing: border-box;
            height: 0.3rem;
            line-height: 0.3rem;
            width: 0.6rem;
            text-align: center;
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

        .product-name {
          max-width: 3rem;
          font-size: 0.26rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .product-currentPrice {
          color: @BeeDefault;
          font-size: 0.34rem;
          margin: 0.05rem 0;
        }
        .product-originalPrice {
          font-size: 0.18rem;
          color: @Grey1;
          position: absolute;
          right: 0;
          bottom: 0;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
