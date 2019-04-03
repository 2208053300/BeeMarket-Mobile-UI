<template>
  <div>
    <van-nav-bar
      title="使用帮助"
      left-arrow
      fixed
      @click-left="back"
    />
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
  }
}
</script>

<style scoped lang="less">

</style>
