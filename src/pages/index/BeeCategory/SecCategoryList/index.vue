<template>
  <div class="sec-category">
    <div class="container position-ab-top-46">
      <!-- 搜索栏 -->
      <!-- <van-search
        placeholder="请输入搜索关键词"
        style="position:relative; z-index:9998;"
        @click="goSearchPage"
      /> -->
      <!-- 二级导航 -->
      <van-tabs
        v-model="nowThirdIndex"
        swipeable
        @click="getCateId"
        @change="getCateId"
      >
        <!-- 展示全部分类图片开关 -->
        <div
          class="show-all-cate"
          @click="showAll"
        >
          <img
            src="@/assets/category/list_icon_more.png"
            alt=""
          >
        </div>
        <!-- 全部分类列表 -->
        <div
          v-show="showAllCate"
          class="all-cate"
        >
          <div class="title flex flex-between align-center">
            <span>全部分类</span>
            <div
              class="collapse"
              @click="showAllCate=false"
            >
              <img src="@/assets/category/list_icon_collapse.png">
            </div>
          </div>
          <ul class="cate-list flex flex-wrap">
            <li
              v-for="(item,index) in categoryThirdList"
              :key="index"
            >
              <!-- :class="{active: index==condition.cid}" -->
              <button
                class="cate-btn"
                :class="{active: index==nowThirdIndex}"
                type="button"
                @click="getCateIdFromAll(index,item.cname)"
              >
                {{ item.cname }}
              </button>
            </li>
          </ul>
        </div>
        <!-- tabs 标签 -->
        <van-tab
          v-for="(item,index) in categoryThirdList"
          :key="index"
          :title="item.cname"
        >
          <!-- 筛选条件 -->
          <!-- <FilterBox
            @getFilter="getFilter"
            @showWay="showWay"
          /> -->
        </van-tab>
        <!-- 商品列表 -->
        <ProductsList ref="ProductsList" />
      </van-tabs>
    </div>
    <!-- 遮罩 -->
    <van-popup v-model="showAllCate" />
  </div>
</template>

<script>
import { getSecondCategory } from '@/api/BeeApi/product'

import ProductsList from './components/ProductsList'

export default {
  components: {
    ProductsList
  },
  props: {},
  data() {
    return {
      // 页面名称
      title: '二级分类',
      // 二级分类数据
      categoryThirdList: [],
      // 是否显示全部分类
      showAllCate: false,
      // 是否显示遮罩
      overlay: false,
      // 当前选中分类index
      nowThirdIndex: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // this.$nextTick(() => {
    //   this.getThird(this.nowIndex)
    // })
    this.getSecondCategoryData()
  },
  methods: {
    // 获取二级分类列表
    async getSecondCategoryData() {
      let cateData = {}
      if (this.$route.query.target) {
        cateData = {
          cid: this.$route.query.cid,
          target: this.$route.query.target
        }
      } else {
        cateData = {
          cid: this.$route.query.cid
        }
      }
      const res = await getSecondCategory(cateData)
      this.categoryThirdList = res.data.cats
      // this.condition.cid = this.categoryThirdList[0].cid

      this.$refs.ProductsList.condition.cid = this.categoryThirdList[0].cid
      this.$refs.ProductsList.getGoodsList()
    },
    // 获取商品列表
    getCateId(index, title) {
      console.log(index, title)
      this.categoryThirdList.map(item => {
        if (item.cname === title) {
          this.$refs.ProductsList.goodsList = []
          this.$refs.ProductsList.condition.cid = item.cid
          this.$refs.ProductsList.condition.sort = ''
          this.$refs.ProductsList.condition.order = ''
          this.$refs.ProductsList.condition.page = 1
          this.$refs.ProductsList.getGoodsList()
        }
      })
      this.nowThirdIndex = index
    },

    // 从全部分类点击分类获取分类 id
    getCateIdFromAll(index, title) {
      this.getCateId(index, title)
      this.showAllCate = false
    },
    // 显示所有分类
    showAll() {
      this.showAllCate = true
    },
    // 跳转到搜索页
    goSearchPage() {
      this.$router.push({
        path: ''
      })
    }
  },
  metaInfo() {
    return {
      title: this.title
    }
  }
}
</script>

<style  lang="less">
.sec-category {
  .van-tabs__wrap {
    z-index: 0;
  }
  .van-tabs__nav {
    background: #f4f4f4;
  }
  .van-tabs__content {
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    background: #fff;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 1rem;
  }
  .van-tab {
    font-size: 0.28rem;
    line-height: 1rem;
  }
  .van-tabs__nav--line {
    padding-bottom: 0.2rem;
  }
  .van-tabs__line {
    background: @BeeDefault;
    bottom: 0.3rem;
  }

  .show-all-cate {
    position: absolute;
    top: 0;
    right: 0;

    height: 1rem;
    width: 1rem;
    display: flex;
    background-image: linear-gradient(
      to right,
      rgba(245, 245, 245, 0.7),
      rgb(245, 245, 245, 1)
    );
    img {
      margin: auto;
      width: 0.24rem;
      height: 0.13rem;
    }
  }
  .all-cate {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background: #fff;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .title {
      margin-bottom: 0.4rem;
      font-size: 0.28rem;
      color: #666;
      .collapse {
        padding: 0.2rem;
      }
      img {
        width: 0.24rem;
        height: 0.13rem;
      }
    }
    li {
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
    }
    .cate-btn {
      border: 1px solid #999;
      background: #fff;
      border-radius: 0.1rem;
      padding: 0.1rem 0.2rem;
      font-size: 0.26rem;
      color: #666;
      &.active {
        border-color: @BeeDefault;
        color: @BeeDefault;
      }
    }
  }
}
</style>
