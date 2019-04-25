<template>
  <div>
    <!-- <ul class="hor-list flex flex-wrap"> -->
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
    <!-- </ul> -->
  </div>
</template>

<script>
import { getCategoryGoodsList } from '@/api/category'

import HorizontalListItem from './HorizontalListItem'
export default {
  components: {
    HorizontalListItem
  },
  props: {
    condition: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 三级分类下的商品列表
      goodsList: [],
      // 加载状态，true 正在加载
      loading: false,
      // 是否全部加载完毕
      finished: false,
      nowPage: 1,
      pageSize: 2,
      immediate: false,
      offset: 300
    }
  },
  computed: {

  },
  watch: {
    condition: {
      handler(newCondition, oldCondition) {
        this.condition = newCondition
        this.getGoodsList(newCondition)
      },
      immediate: true,
      deep: true
    }
  },
  created() {

  },
  mounted() {
    this.getGoodsList(this.condition)
  },
  methods: {
    // 获取三级分类下商品列表
    getGoodsList(data) {
      setTimeout(async() => {
        const res = await getCategoryGoodsList(data)

        this.goodsList.push(...res.data.goodsList)
        this.nowPage++
        this.loading = false

        if (this.nowPage > 4) {
          console.log(this.nowPage)
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.hor-list{
  padding: 0 0.3rem;
}

</style>
