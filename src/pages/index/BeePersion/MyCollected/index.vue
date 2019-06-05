<template>
  <div>
    <div class="collected-container">
      <van-tabs
        v-model="activeTab"
        @click="changeTab"
      >
        <van-tab :title="produce_title">
          <div class="bee-above">
            <div
              v-if="productNum === 0"
              class="null-collected"
            >
              <div
                class="null-img"
                :style="{backgroundImage:'url('+beeIcon.mine_collection_img_default+')'}"
              />
              <span class="null-text">还没有添加收藏的商品呦</span>
              <van-button
                type="default"
                class="add-btn"
              >
                逛逛分类
              </van-button>
            </div>
            <div
              v-else
              class="collected-list"
            >
              <product-collected
                ref="ProductCollected"
                :loading="productLoading"
                :finished="productFinished"
                :product-list="productList"
                @load="getProductCollected"
                @change="reGetProduct"
              />
            </div>
          </div>
        </van-tab>
        <van-tab title="店铺">
          <div class="bee-above">
            <div
              v-if="storeList.length===0"
              class="null-collected"
            >
              <div
                class="null-img"
                style="margin-top:2.8rem;"
                :style="{backgroundImage:'url('+beeIcon.mine_address_img_default+')'}"
              />
              <span class="null-text">还没有添加关注的店铺哟</span>
            </div>
            <store-collected
              v-else
              :store-list="storeList"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import StoreCollected from './components/StoreCollected'
import ProductCollected from './components/ProductCollected'
import { getCollected } from '@/api/BeeApi/user'

export default {
  metaInfo: {
    title: '我的收藏'
  },
  components: {
    StoreCollected,
    ProductCollected
  },
  props: {},
  data() {
    return {
      activeTab: 0,
      storeList: [],
      productList: [],
      beeIcon: {
        mine_collection_img_default: require('@/assets/icon/personalCenter/func/mine_collection_img_default@2x.png'),
        mine_address_img_default: require('@/assets/icon/personalCenter/func/mine_address_img_default@2x.png')
      },
      productLoading: false,
      productFinished: false,
      productNum: 0,
      productPage: 1,
      storeNum: 0,
      storePage: 1,
      pageSize: 10
    }
  },
  computed: {
    produce_title() {
      if (this.productNum) {
        return `商品(${this.productNum})`
      } else {
        return '商品'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getProductCollected()
    document.querySelector('.van-tabs__wrap').style.position = 'fixed'
    document.querySelector('.van-tabs__wrap').style.top = `46px`
  },
  beforeDestroy() {
    document.querySelector('.van-tabs__wrap').style.position = ''
    document.querySelector('.van-tabs__wrap').style.top = ``
  },
  methods: {
    changeTab(index, title) {
      // NOTE 如果切换到店铺列表
      if (index) {
        this.getStoreCollected()
      } else {
        this.reGetProduct()
      }
    },
    async getStoreCollected() {
      const res = await getCollected()
      this.storeList = res.data.storeList
    },
    reGetProduct() {
      this.productPage = 1
      this.productNum = 0
      this.getProductCollected()
    },
    async getProductCollected() {
      const res = await getCollected({
        page: this.productPage,
        page_size: this.pageSize,
        type: 1
      })
      this.productNum = res.data.product_num
      if (this.productPage > 1) {
        // 追加数据
        res.data.product_list.forEach(item => {
          this.productList.push(item)
        })
      } else {
        this.productList = res.data.product_list
        this.productList.forEach(item => {
          item.zone = '商品来自：西南地区'
          item.is_hot = true
          item.tag_name = ['新品', '爆款']
        })
      }
      // 判断是否还有下一页
      if ((this.productNum - (this.productPage * this.pageSize)) > 0) {
        this.productFinished = false
        this.productPage += 1
      } else {
        this.productFinished = true
      }
      this.productLoading = false
    }
  }
}
</script>

<style lang="less">
.van-nav-bar {
  // NOTE 需要在新增蒙版之上
  z-index: 101 !important;
}
[class*="van-hairline"]::after {
  content: none;
}
.collected-container {
  margin: 0 0 60px;
  .van-tabs {
    .van-tabs__line {
      width: 0.9rem !important;
      height: 0.04rem;
      left: 0.45rem;
      background-color: @BeeDefault;
    }
    .van-tab {
      .van-ellipsis {
        color: @ProductName;
        font-size: 0.28rem;
      }
    }
    .van-tab--active {
      .van-ellipsis {
        color: @BeeDefault;
        font-size: 0.28rem;
      }
    }
  }
  .bee-above {
    .null-collected {
      text-align: center;
      .null-img {
        width: 4rem;
        height: 3.6rem;
        margin: 0.82rem auto 0.3rem;
        background-size: 100% 100%;
      }
      .null-text {
        font-size: 0.28rem;
        color: rgb(122, 122, 122);
        display: block;
      }
      .add-btn {
        font-size: 0.26rem;
        border: 1px solid @BeeDefault;
        background-color: transparent;
        border-radius: 0.1rem;
        color: @BeeDefault;
        height: 0.54rem;
        line-height: 0.54rem;
        width: 1.8rem;
        margin: 1.2rem 0 1rem;
      }
    }
    .collected-list {
      position: relative;
    }
  }
  .bee-below {
    width: 100%;
  }
}
</style>
