<template>
  <div>
    <ul class="hor-list flex flex-wrap">
      <li v-for="(item, index) in goodsList" :key="index" class="item">
        <HorizontalListItem :item="item" />
      </li>
    </ul>
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
      goodsList: []
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
      getCategoryGoodsList(data).then(res => {
        console.log('水平list:', res)

        this.goodsList = res.data.goodsList
      })
    }
  }
}
</script>

<style scoped lang="less">
.hor-list{
  padding: 0 0.3rem;
}
.item{
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;

  &:nth-of-type(2n){
    margin-right:0;
  }
}
</style>
