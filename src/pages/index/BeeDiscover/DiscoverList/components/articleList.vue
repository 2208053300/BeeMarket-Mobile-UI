<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="loading"
      @refresh="reLoad"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        @load="getArticleListData"
      >
        <div
          v-for="(item, index) in articleList"
          :key="index"
          :class="{articleContent2:item.is_article}"
          class="article-content"
          @click="goDetail(item.is_article,item.id)"
        >
          <!-- @click="$router.push(`/discover/article/${item.id}`)" -->
          <div class="article-img">
            <img
              :src="item.show_img"
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
import { getArticleList } from '@/api/BeeApi/action'
export default {
  components: {},
  props: {},
  data() {
    return {
      articleList: [],
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.getArticleListData()
  },
  methods: {
    async getArticleListData() {
      const res = await getArticleList({ page: this.page, pageSize: this.pageSize })
      this.articleList.push(...res.data)
      // 判断是否还有下一页
      if (res.data.length >= this.pageSize) {
        this.finished = false
        this.page += 1
      } else {
        this.finished = true
      }
      this.loading = false
    },
    reLoad() {
      // 刷新数据
      this.articleList = []
      this.page = 1
      this.getArticleListData()
    },
    // 跳转到详情
    goDetail(is_article, id) {
      // 是否是文章
      if (is_article) {
        console.log('这是文章:', is_article)

        this.$router.push({
          path: `/discover/article/${id}`
        })
      } else {
        console.log('这是活动:', is_article)
        this.$router.push({
          path: '/beeActiveTpl',
          query: {
            id
          }
        })
      }
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
    box-shadow: 0 0 0.1rem 0.04rem @Grey7;
    .article-img {
      border-radius: 0.16rem;
      overflow: hidden;
      margin-bottom: 0.2rem;
    }
    .article-title {
      font-size: 0.32rem;
    }
  }
  .articleContent2 {
    display: flex;
    align-items: center;
    .article-img {
      flex-shrink: 0;
      width: 2.4rem;
      height: 1.9rem;
      margin-right: 0.24rem;
      margin-bottom: 0;
      overflow: hidden;
      img {
        object-fit: cover;
      }
    }
  }
}
</style>
