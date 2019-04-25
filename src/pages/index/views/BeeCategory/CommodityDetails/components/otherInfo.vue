<template>
  <div class="other-info">
    <van-cell-group>
      <van-cell
        is-link
        class="other1 sku-select"
        @click="selectCommodity"
      >
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">已选</span>
          <span class="cell-content">木头色 大号</span>
        </p>
        <p class="cell-value">
          选择
        </p>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell class="other1">
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">配送</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
      <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">活动</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
      <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">运费</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
      <van-cell>
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">备注</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        is-link
        class="other1"
      >
        <p
          slot="title"
          class="cell-title"
        >
          <span class="title-text">服务</span>
          <span class="cell-content">木头色 大号</span>
        </p>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    commodityData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    selectCommodity() {}
  }
}
</script>

<style scoped lang="less">
@import "../../../../styles/variables.less";
.other-info {
  .sku-select {
  }
  .other1 {
    margin-top: 0.2rem;
  }
  .van-cell {
    .cell-title {
      margin: 0;
      .title-text {
        font-size: 0.24rem;
        color: @Grey1;
        margin-right: 0.36rem;
      }
    }
    .cell-value {
      margin: 0;
    }
  }
}
</style>
