<template>
  <div class="bee-farm">
    <div class="farm-title">
      <van-tabs
        v-model="active"
        background="transparent"
        :color="BeeDefault"
        :line-width="30"
      >
        <van-tab title="标签 1" />
        <van-tab title="标签 2" />
        <van-tab title="标签 3" />
        <van-tab title="标签 4" />
        <van-tab title="标签 1" />
        <van-tab title="标签 2" />
        <van-tab title="标签 3" />
        <van-tab title="标签 4" />
      </van-tabs>
      <van-icon
        name="arrow-down"
        class="show-filter"
      />
    </div>
    <farm-list :action-list="actionList" />
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import farmList from './components/farmList'

export default {
  metaInfo: {
    title: '农副产品'
  },
  components: {
    farmList
  },
  props: {},
  data() {
    return {
      BeeDefault,
      actionList: [],
      active: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {

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
}
</style>
