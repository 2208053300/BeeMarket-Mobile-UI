<template>
  <div class="discover-container">
    <van-tabs
      v-model="active"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :line-width="60"
      background="transparent"
    >
      <van-tab>
        <div slot="title">
          公益行动
        </div>
        <action-list />
      </van-tab>
      <van-tab>
        <div slot="title">
          集市动态
        </div>
        <article-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import actionList from './components/actionList'
import articleList from './components/articleList'
export default {
  components: {
    actionList,
    articleList
  },
  props: {},
  data() {
    return {
      BeeDefault,
      active: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = true
  },
  methods: {}
}
</script>

<style lang="less">
.discover-container {
  padding: 0.1rem 0.3rem 60px;
  box-sizing: border-box;
  .van-tabs {
    .van-tabs__wrap{
      margin: 0 0.6rem;
    }
    .van-hairline--top-bottom::after{
      border:none;
    }
  }
}
</style>
