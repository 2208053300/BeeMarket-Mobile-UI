<template>
  <div class="bee-farm">
    <div class="farm-title">
      <van-tabs
        v-model="active"
        background="transparent"
        :color="BeeDefault"
        :line-width="30"
        swipeable
        @click="getCateId"
        @change="getCateId"
      >
        <van-tab
          v-for="item in farmCategory"
          :key="item.cid"
          :title="item.cname"
        />
      </van-tabs>
      <van-icon
        name="arrow-down"
        class="show-filter"
        @click="showAllCate=true"
      />
    </div>

    <!-- 农副产品列表 -->
    <farm-list ref="farmList" :show-area="showArea" />
    <!-- 遮罩 -->
    <van-popup v-model="showAllCate" />
    <!-- 全部分类列表 -->
    <div v-show="showAllCate" class="all-cate">
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
          v-for="(item,index) in farmCategory"
          :key="index"
        >
          <!-- :class="{active: index==condition.cid}" -->
          <button
            class="cate-btn"
            :class="{active: index==active}"
            type="button"
            @click="getCateIdFromAll(index,item.cname)"
          >
            {{ item.cname }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import farmList from './components/farmList'

import { getSecondCategory } from '@/api/BeeApi/product'

export default {
  metaInfo: {
    title: '农副产品'
  },
  components: {
    farmList
  },
  props: {},
  data() {
    return {
      BeeDefault,
      actionList: [],
      active: 0,
      farmCategory: [],
      // 是否显示全部分类
      showAllCate: false,

      // 地区筛选遮罩
      showArea: false

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getSecondCategoryData()
  },
  methods: {
    // 获取农副产品分类数据
    async getSecondCategoryData() {
      const res = await getSecondCategory({ cid: 1, t: 'produce' })
      this.farmCategory = res.data.cats
      // this.condition.cid = this.farmCategory[0].cid
      this.$refs.farmList.condition.cid = this.farmCategory[0].cid
      this.$refs.farmList.getProductListData()
    },
    // 从全部分类点击分类获取分类 id
    getCateIdFromAll(index, title) {
      this.getCateId(index, title)
      this.showAllCate = false
    },
    // 获取商品列表
    getCateId(index, title) {
      console.log(index, title)
      this.farmCategory.map(item => {
        if (item.cname === title) {
          this.$refs.farmList.commodityList = []
          this.$refs.farmList.condition.cid = item.cid
          this.$refs.farmList.condition.sort = ''
          this.$refs.farmList.condition.order = ''
          this.$refs.farmList.condition.page = 1
          this.$refs.farmList.getProductListData()
        }
      })
      this.active = index
    }

  }
}
</script>

<style lang="less">
.bee-farm {
  .farm-title {
    display: flex;
    .van-tabs {
      flex: 1;
    }
    .show-filter {
      height: 100%;
      padding: 0 0.2rem;
      line-height: 45px;
    }
  }
  .van-hairline--top-bottom::after {
    border: none;
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
