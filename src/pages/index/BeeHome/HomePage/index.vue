<template>
  <div>
    <div class="container">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
      >
        <!-- 轮播 -->
        <Carousel class="carousel" />

        <!-- 农产品推荐 -->
        <FarmRecom />

        <!-- 广告位 -->
        <div class="ad-place margin-t-b-20">
          <img src="http://temp.im/640x260">
        </div>

        <!-- 公益项目 -->
        <PublicBinefit />

        <!-- 限量蜂抢 -->
        <LimitSale />

        <!-- 新品首发 -->
        <NewGoods />

        <!-- 专题精选 -->
        <ProjectSelection />

        <!-- 专题列表 -->
        <ProjectList />

        <!-- 猜你喜欢 -->
        <GuessList />
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import FarmRecom from './components/FarmRecom'
import PublicBinefit from './components/PublicBinefit'
import LimitSale from './components/LimitSale'
import NewGoods from './components/NewGoods'
import ProjectSelection from './components/ProjectSelection'
import ProjectList from './components/ProjectList'
import GuessList from './components/GuessList'
export default {
  components: {
    Carousel,
    FarmRecom,
    PublicBinefit,
    LimitSale,
    NewGoods,
    ProjectSelection,
    ProjectList,
    GuessList
  },
  props: {},
  data() {
    return {
      // 是否在下拉刷新中
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  margin-bottom: 50px;
}
.banner {
  background: #ddd;
  height: 200px;
}
.farm-recom {
  .banner {
    height: 150px;
  }
}
.farm-list {
  width: 100%;
  overflow-x: scroll;
  display: -webkit-box;
  li {
    width: 33%;
    padding: 0 10px;
  }
  .item-box {
    width: 100%;
    background: #f3f3f3;
  }
}
.carousel {
  height: 2rem;
}
</style>
