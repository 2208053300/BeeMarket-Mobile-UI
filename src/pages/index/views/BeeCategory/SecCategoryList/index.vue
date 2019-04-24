<template>
  <div class="sec-category">
    <BeeHeader />
    <div class="container position-ab-top-56">
      <van-search placeholder="请输入搜索关键词" />
      <van-tabs swipeable>
        <van-tab v-for="index in 8" :key="index" :title="'三级分类 ' + index">
          <!-- 筛选条件 -->
          <FilterBox />
          <!-- 商品列表 -->
          <VerticalList />
          <HorizontalList />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BeeHeader from '../../../components/BeeHeader'
import FilterBox from './components/FilterBox'
import VerticalList from './components/VerticalList'
import HorizontalList from './components/HorizontalList'
export default {
  components: {
    BeeHeader,
    FilterBox,
    VerticalList,
    HorizontalList
  },
  props: {

  },
  data() {
    return {
      title: '二级分类'
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeFooter.show = false
  },
  methods: {

  },
  meteInfo() {
    return {
      title: this.title
    }
  }
}
</script>

<style  lang="less">
@import url(../../../styles/variables.less);
.sec-category{
  .van-tabs__nav{
    background:#f4f4f4;

  }
  .van-tabs__content{
    margin-top: 0.2rem;

    background: #fff;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }
  .van-tabs--line .van-tabs__wrap{
    height: 1rem;
  }
  .van-tab{
    font-size: 0.28rem;
    line-height:1rem;
  }
  .van-tabs__nav--line{
    padding-bottom:0.2rem;
  }
  .van-tabs__line{
    background: @BeeDefault;
    bottom:0.3rem
  }
}
</style>
