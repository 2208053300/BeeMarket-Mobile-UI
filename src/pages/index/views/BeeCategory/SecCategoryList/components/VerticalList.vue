<template>
  <div class="vertical-list">
    <VerticalListItem v-for="(item, index) in goodsList" :key="index" :item="item" class="item" />
  </div>
</template>

<script>
import { getCategoryGoodsList } from '@/api/category'
import VerticalListItem from './VerticalListItem'
export default {
  components: {
    VerticalListItem
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
        console.log('list:', res)

        this.goodsList = res.data.goodsList
      })
    }
  }
}
</script>

<style scoped lang="less">
.vertical-list{
  padding: 0 0.3rem;
}
.item{margin-bottom:0.1rem;}
</style>
