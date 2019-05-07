<template>
  <div>
    <van-nav-bar
      title="用户协议"
      left-arrow
      fixed
      @click-left="back"
    />
    <div class="container">
      用户协议
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  metaInfo: {
    title: '用户协议'
  }
}
</script>

<style scoped lang="less">
.container{margin-top: 56px;}
</style>
