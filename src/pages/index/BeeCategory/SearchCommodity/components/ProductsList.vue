<template>
  <div>
    <!-- 筛选条件 -->
    <FilterBox
      @getFilter="getFilter"
      @showWay="showWay"
    />
    <div v-if="isVertical">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        :offset="offset"
        :immediate-check="immediate"
        class="vertical-list"
        @load="getGoodsList(condition)"
      >
        <VerticalListItem v-for="(item, index) in goodsList" :key="index" :item="item" class="item" />
      </van-list>
    </div>
    <div v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        :offset="offset"
        :immediate-check="immediate"
        class="hor-list "
        @load="getGoodsList(condition)"
      >
        <div class="item flex flex-wrap">
          <HorizontalListItem v-for="(item, index) in goodsList" :key="index" :item="item" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/api/BeeApi/product'
import HorizontalListItem from './HorizontalListItem'
import VerticalListItem from './VerticalListItem'
import FilterBox from './FilterBox'
export default {
  components: {
    HorizontalListItem,
    VerticalListItem,
    FilterBox
  },
  props: {
    // isVertical: { type: Boolean, default: true },
    // condition: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      // 是否垂直布局
      isVertical: true,
      // 请求数据条件
      condition: {
        // 当前选中分类id
        cid: 0,
        // 筛选条件  sell_price 售价，sold 销量
        sort: '',
        // asc 顺序 还是 desc 倒序
        order: '',
        // 页码
        page: 1,
        // 搜索关键词
        search: ''
      },
      // 三级分类下的商品列表
      goodsList: [],
      // 加载状态，true 正在加载
      loading: false,
      // 是否全部加载完毕
      finished: false,
      // page: 1,
      pageSize: 2,
      immediate: false,
      offset: 300
    }
  },
  computed: {},
  watch: {
  },
  created() {},
  mounted() {
    // this.getGoodsList(this.condition)
  },
  methods: {
    // 获取二级分类下商品列表
    getGoodsList() {
      const data = this.filterParams(this.condition)
      setTimeout(async() => {
        const res = await getProductList(data)

        this.goodsList.push(...res.data.products)
        this.condition.page++
        this.loading = false

        if (res.data.products.length === 0) {
          this.finished = true
        }
      }, 500)
    },
    // 筛选条件 // 0按综合获取 1销量 2价格
    getFilter(type) {
      console.log(232323232)

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
      console.log('返回后的condition：', this.condition)
      // 清空已有数据，重置页码，获取新的数据
      this.goodsList = []
      this.condition.page = 1

      this.getGoodsList()
    },
    // 布局方式
    showWay(isVertical) {
      this.isVertical = isVertical
      console.log(isVertical)
    },
    // 对象属性过滤函数，去掉属性值为空的属性
    filterParams(obj) {
      // 获取对象属性的个数
      // const length = Object.getOwnPropertyNames(obj).length
      const _newPar = {}
      for (const key in obj) {
        // 如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
        if (
          (obj[key] === 0 || obj[key]) &&
          obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== ''
        ) {
          // 记录属性
          _newPar[key] = obj[key]
        }
      }
      // 返回对象
      return _newPar
    }
  }
}
</script>

<style scoped lang="less">
.hor-list{
  padding: 0 0.3rem;
}
.vertical-list{
  padding: 0 0.3rem;
  .item{margin-bottom:0.1rem;}
}

</style>
