<template>
  <div class="bee-farm">
    <div class="farm-title">
      <van-tabs
        v-model="active"
        background="transparent"
        :color="BeeDefault"
        :line-width="30"
        @change="changeList"
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
    <!-- 筛选排序 -->
    <FilterBox @getFilter="getFilter" @showWay="showWay" @changeArea="changeArea" />
    <!-- 农副产品列表 -->
    <farm-list ref="farmList" :condition="condition" :show-area="showArea" />
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
          <button
            class="cate-btn"
            :class="{active: index==condition.cid}"
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
import FilterBox from './components/FilterBox'
import { getSecondCategory } from '@/api/BeeApi/product'

export default {
  metaInfo: {
    title: '农副产品'
  },
  components: {
    farmList,
    FilterBox
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
      // 请求数据条件
      condition: {
        // 当前选中分类id
        cid: 0,
        // 筛选条件  sell_price 售价，sold 销量
        sort: '',
        // asc 顺序 还是 desc 倒序
        order: '',
        // 页码
        page: 1
      },
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
      this.condition.cid = this.farmCategory[0].cid
    },
    // 获取当前二级分类下的商品列表
    changeList(index) {
      this.condition.cid = this.farmCategory[index].cid
      // this.$refs.farmList.formData.cid = cid
      // this.$refs.farmList.getProductListData(this.condition)
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
          this.condition.cid = item.cid
          console.log(this.condition.cid)
        }
      })
      this.active = index
    },
    // 单排展示还是双排展示
    showWay(val) {
      this.$refs.farmList.gridList = val
    },
    // 选择地区
    changeArea(val) {
      this.$refs.farmList.showArea = val
    },
    // 筛选条件 // 0按综合获取 1销量 2价格
    getFilter(type) {
      if (type === 0) {
        this.condition.sort = ''
        this.condition.order = ''
      } else if (type === 1) {
        this.condition.sort = 'sold'
        this.condition.order = ''
      } else if (type === 2) {
        this.condition.sort = 'price'
      } else if (typeof type === 'object') {
        this.condition.sort = 'price'
        this.condition.order = type.order
      }
      // console.log('返回的筛选条件：', type)
      // console.log('返回后的condition：', this.condition)
      this.$refs.farmList.condition = this.condition
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
