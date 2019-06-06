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
              v-if="productList.length === 0"
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
                ref="productList"
                :finished="productFinished"
                :product-list="productList"
                @load="getProductCollected"
                @change="reGetProduct"
              />
            </div>
          </div>
        </van-tab>
        <van-tab :title="store_title">
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
              ref="storeList"
              :finished="storeFinished"
              :store-list="storeList"
              @load="getStoreCollected"
              @change="reGetStore"
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
      productFinished: false,
      storeFinished: false,
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
    },
    store_title() {
      if (this.storeNum) {
        return `店铺(${this.storeNum})`
      } else {
        return '店铺'
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
        this.reGetStore()
      } else {
        this.reGetProduct()
      }
    },
    getTempData() {
      return [
        {
          store_id: 1,
          store_name: '刊菲服饰',
          store_logo: 'https://img.fengjishi.com.cn/product/album/2019/05/21161350WT7PDophpem7cPw.jpeg',
          is_upper: true,
          new_upper: 36
        },
        {
          store_id: 2,
          store_name: '完美世界',
          store_logo: 'https://img.fengjishi.com.cn/product/album/2019/05/21161350WT7PDophpem7cPw.jpeg',
          is_upper: false,
          new_upper: 10
        },
        {
          store_id: 3,
          store_name: '蒸汽动力',
          store_logo: 'https://img.fengjishi.com.cn/product/album/2019/05/21161350WT7PDophpem7cPw.jpeg',
          is_upper: true,
          new_upper: 12
        },
        {
          store_id: 4,
          store_name: '这家店铺名字有点长',
          store_logo: 'https://img.fengjishi.com.cn/product/album/2019/05/21161350WT7PDophpem7cPw.jpeg',
          is_upper: true,
          new_upper: 32
        },
        {
          store_id: 5,
          store_name: '蒸汽动力',
          store_logo: 'https://img.fengjishi.com.cn/product/album/2019/05/21161350WT7PDophpem7cPw.jpeg',
          is_upper: true,
          new_upper: 92
        }
      ]
    },
    async getStoreCollected() {
      const res = await getCollected({
        page: this.storePage,
        page_size: this.pageSize,
        type: 2
      })
      this.storeNum = res.data.store_num
      if (this.storePage > 1) {
        // 追加数据
        res.data.store_list.forEach(item => {
          this.storeList.push(item)
        })
      } else {
        this.storeList = res.data.store_list
      }

      // 判断是否还有下一页
      if ((this.storeNum - (this.storePage * this.pageSize)) > 0) {
        this.storeFinished = false
        this.storePage += 1
      } else {
        this.storeFinished = true
      }
      if (this.$refs.storeList) {
        this.$refs.storeList.loading = false
      }
    },
    reGetProduct() {
      this.productPage = 1
      this.productNum = 0
      this.getProductCollected()
    },
    reGetStore() {
      this.storePage = 1
      this.storeNum = 0
      this.getStoreCollected()
    },
    async getProductCollected() {
      const res = await getCollected({
        page: this.productPage,
        page_size: this.pageSize,
        type: 1
      })
      this.productNum = res.data.product_num
      this.storeNum = res.data.store_num
      if (this.productPage > 1) {
        // 追加数据
        res.data.product_list.forEach(item => {
          this.productList.push(item)
        })
      } else {
        this.productList = res.data.product_list
      }
      // 判断是否还有下一页
      if ((this.productNum - (this.productPage * this.pageSize)) > 0) {
        this.productFinished = false
        this.productPage += 1
      } else {
        this.productFinished = true
      }
      if (this.$refs.productList) {
        this.$refs.productList.loading = false
      }
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
