<template>
  <div>
    <div v-if="isVertical">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
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
        finished-text="没有更多了"
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
export default {
  components: {
    HorizontalListItem,
    VerticalListItem
  },
  props: {
    isVertical: { type: Boolean, default: true },
    condition: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      // 三级分类下的商品列表
      goodsList: [],
      // 加载状态，true 正在加载
      loading: false,
      // 是否全部加载完毕
      finished: false,
      page: 1,
      pageSize: 2,
      immediate: false,
      offset: 300
    }
  },
  computed: {},
  watch: {
    condition: {
      handler(newCondition, old) {
        console.log('条件改变了', newCondition)
        this.getGoodsList(newCondition)
      },
      deep: true
    }

  },
  created() {},
  mounted() {
    this.getGoodsList(this.condition)
  },
  methods: {
    // 获取二级分类下商品列表
    getGoodsList(data) {
      data = this.filterParams(data)
      setTimeout(async() => {
        const res = await getProductList(data)

        this.goodsList.push(...res.data.products)
        this.page++
        this.loading = false

        if (res.data.products.length === 0) {
          this.finished = true
        }
      }, 500)
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
