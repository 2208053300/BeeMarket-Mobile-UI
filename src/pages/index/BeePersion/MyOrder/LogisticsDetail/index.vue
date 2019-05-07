<template>
  <div>
    物流详情
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '物流详情'
  },
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {}
}
</script>

<style scoped lang="less">
</style>
