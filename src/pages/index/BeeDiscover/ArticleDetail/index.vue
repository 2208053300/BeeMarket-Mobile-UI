<template>
  <div class="article-content">
    <p>
      文章id: {{ $route.params.id }}
    </p>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/BeeApi/action'
export default {
  metaInfo: {
    title: '文章详情'
  },
  components: {},
  props: {},
  data() {
    return {
      article: {},
      finished: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getArticleDetailData()
  },
  methods: {
    async getArticleDetailData() {
      const res = await getArticleDetail({ id: this.$route.params.id })
      this.article = res.data
      this.$store.state.app.beeFooter.show = false
    }
  }
}
</script>

<style scoped lang="less">
.article-content {}
</style>
