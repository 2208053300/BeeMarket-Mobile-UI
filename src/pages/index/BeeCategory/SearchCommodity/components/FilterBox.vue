<template>
  <div>
    <div class="filter-box flex flex-between">
      <ul class="condition-list flex">
        <li
          class="item"
          :class="{ active: nowIndex === 0 }"
          @click="getList(0)"
        >
          <span class="name">综合</span>
        </li>
        <li
          class="item"
          :class="{ active: nowIndex === 1 }"
          @click="getList(1)"
        >
          <span class="name">销量</span>
        </li>
        <li
          class="item flex align-center"
          :class="{ active: nowIndex === 2 }"
          @click="getList(2)"
        >
          <span class="name">价格</span>
          <img
            v-show="order==='asc'"
            class="price-icon"
            src="@/assets/category/list_icon_price_low.png"
            alt=""
          >
          <img
            v-show="order==='desc'"
            class="price-icon"
            src="@/assets/category/list_icon_price_high.png"
            alt=""
          >
        </li>
      </ul>
      <div class="change-show" @click="showListWay">
        <img
          v-show="isVertical"
          src="@/assets/category/list_icon_vertical.png"
          alt=""
        >
        <img
          v-show="!isVertical"
          src="@/assets/category/list_icon_horizontal.png"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      nowIndex: 0, // 筛选条件
      order: 'asc', // 价格升降序 asc 顺序  desc 倒序
      isVertical: true,
      // 点击价格次数
      count: 0
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    getList(type) {
      this.nowIndex = type
      // 0按综合获取 1销量 2价格
      if (type === 0) {
        // console.log(type, this.nowIndex)
        this.$emit('getFilter', type)
        this.order = false
        this.count = 0
      } else if (type === 1) {
        // console.log(type, this.nowIndex)
        this.$emit('getFilter', type)
        this.order = false
        this.count = 0
      } else if (type === 2) {
        this.count++
        // console.log(type, this.nowIndex, this.count)
        this.$emit('getFilter', type)
        if (this.count > 1) { // this.count == 1 是选中价格，>1 时筛选按价格升序还是降序
          this.count % 2 === 0 ? this.order = 'desc' : this.order = 'asc'
          this.$emit('getFilter', { type, order: this.order })
        }
      }
    },
    showListWay() {
      this.isVertical = !this.isVertical
      this.$emit('showWay', this.isVertical)
    }
  }

}
</script>

<style scoped lang="less">
.filter-box{padding: 0.3rem 0.5rem;}
.item{margin-right: 0.8rem;
  font-size: 0.28rem ;
  color: #666;
  &.active{color: @BeeDefault}
}
.price-icon{margin-left: 0.05rem; width: 0.12rem;height:0.19rem;}
.change-show{
  img{width: 0.25rem; height:0.25rem ;}
}
</style>
