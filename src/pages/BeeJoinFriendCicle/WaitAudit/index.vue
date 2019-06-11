<template>
  <div class="audit-wait">
    <img src="../../../assets/icon/joinFactory/partner_request_wait1.png">
  </div>
</template>

<script>
// import { getArticleDetail } from '@/api/BeeApi/action'

export default {
  metaInfo: {
    title: '审核中'
  },
  components: {},
  props: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // this.getArticleDetailData()
  },
  methods: {

    goProduct(pid) {
      // 判断是否来自webApp
      if (this.$route.query.origin) {
        window.location.href = `/#/category/details?pid=${pid}`
      } else {
        console.log('本地应用')
        this.$router.push({
          path: '/category/details',
          query: { pid }
        })
      }
    }

  }
}
</script>

<style scoped  lang="less">
.audit-wait{
  display: flex; background: #fff; height: 100%;padding-top:2.5rem;
  img{ margin: auto; width: 100%;}
}
</style>
