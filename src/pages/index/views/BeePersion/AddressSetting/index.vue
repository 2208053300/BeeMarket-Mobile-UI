<template>
  <div>
    <van-nav-bar
      title="地址管理"
      left-arrow
    >
      <van-icon
        slot="left"
        name="arrow-left"
        color="#666666"
        @click="back"
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
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    back() {
      this.$router.go(-1)
      this.$store.state.app.beeFooter.show = true
    }
  }
}
</script>

<style scoped lang="less">
</style>
