<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="loading"
      @refresh="getArticleListData"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="(item,index) in articleList"
          :key="item.title"
          :class="{articleContent2:index%2==0}"
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
      this.loading = false
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getArticleList()
        this.articleList.push(...res.data.articleData)
        // 数据全部加载完成
        if (this.articleList.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  margin-top: 0.04rem;
  .article-content {
    margin-top: 0.2rem;
    background-color: #fff;
    border-radius: 0.16rem;
    overflow: hidden;
    padding: 0.2rem;
    box-sizing: border-box;
    .article-img {
      border-radius: 0.16rem;
      overflow: hidden;
      margin-bottom: 0.2rem;
    }
    .article-title{
      font-size: 0.32rem;
    }
  }
  .articleContent2 {
    display: flex;
    align-items: center;
    .article-img{
      width: 2.4rem;
      height: 1.9rem;
      margin-right: 0.24rem;
      margin-bottom: 0;
    }
  }
}
</style>
