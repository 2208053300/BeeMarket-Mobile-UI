<template>
  <div>
    <van-nav-bar
      :left-text="beeHeader.lextText"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="setMethods(beeHeader.clickRight,)"
    >
      <van-icon
        slot="right"
        name="search"
      />
      <van-search
        slot="title"
        placeholder="请输入搜索关键词"
        style="padding:0"
      />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    beeHeader: {
      get() {
        return this.$store.state.app.beeHeader
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // NOTE 动态设置header的方法
    setMethods(methodsName, ...parameters) {
      this[methodsName](...parameters)
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
</style>
