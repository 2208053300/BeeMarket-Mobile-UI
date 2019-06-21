<template>
  <div>
    <div class="search-history">
      <div class="search-title">
        <span>
          搜索历史
        </span>
        <van-icon :name="beeIcon.cat_icon_delete" />
      </div>
      <div class="history-tag">
        <div
          v-for="item in searchHistory"
          :key="item"
          class="history-item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="recommend-foryou">
      <div class="recommend-title">
        <span>为你推荐</span>
      </div>
      <div class="recommend-tag">
        <div
          v-for="item in recommendData"
          :key="item"
          class="recommend-item"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, getRecommendData } from '@/api/category'
export default {
  components: {},
  props: {
    searchHistory: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // searchHistory: [],
      recommendData: [],
      beeIcon: {
        cat_icon_delete: require('@/assets/icon/category/cat_icon_delete@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // NOTE 如果本地保存了搜索记录则不再获取，否则请求
    // this.getSearchHistory()
    // this.getRecommendData()
  },
  methods: {
    async getSearchHistory() {
      const res = await getSearchHistory()
      this.searchHistory = res.data.searchData
    },
    async getRecommendData() {
      const res = await getRecommendData()
      this.recommendData = res.data.recommendData
    }
  }
}
</script>

<style scoped lang="less">
.search-history {
  padding: 0.3rem;
  background-color: #ffffff;
  .search-title {
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
  }
  .history-tag {
    padding-top: 0.08rem;
    .history-item {
      margin-top: 0.3rem;
      font-size: 0.28rem;
      display: inline-block;
      padding: 0.2rem 0.34rem;
      border-radius: 0.36rem;
      background-color: @GreyBg;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:not(:last-child) {
        margin-right: 0.2rem;
      }
    }
  }
}
.recommend-foryou {
  margin-top: 0.2rem;
  padding: 0.3rem;
  background-color: #ffffff;
  .recommend-title {
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
  }
  .recommend-tag{
    padding-top: 0.08rem;
    .recommend-item {
      max-width: 90%;
      margin-top: 0.3rem;
      font-size: 0.28rem;
      display: inline-block;
      padding: 0.2rem 0.34rem;
      border-radius: 0.36rem;
      background-color: @GreyBg;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:not(:last-child) {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
