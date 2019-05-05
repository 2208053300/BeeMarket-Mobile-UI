<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="loading"
      @refresh="getActionListData"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="item in articleList"
          :key="item.title"
          class="article-content"
        >
          <div class="article-img">
            <img
              :src="item.img"
              alt=""
            >
          </div>
          <div class="article-title">
            {{ item.title }}
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/discover'
export default {
  components: {},
  props: {},
  data() {
    return {
      articleList: [],
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getArticleListData()
  },
  methods: {
    async getArticleListData() {
      const res = await getArticleList()
      this.articleList = res.data.articleData
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
}
</style>
