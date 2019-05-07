<template>
  <div class="article-content">
    文章详情
  </div>
</template>

<script>
// import { getArticleList } from '@/api/discover'
export default {
  metaInfo: {
    title: '文章详情'
  },
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
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // this.getArticleDetailData()
  },
  methods: {
    // async getArticleDetailData() {
    //   const res = await getArticleDetail()
    //   this.articleList = res.data.articleData
    // }
  }
}
</script>

<style scoped lang="less">
.article-content {
  margin-top: 46px;
}
</style>
