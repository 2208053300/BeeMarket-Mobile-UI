<template>
  <div />
</template>

<script>
export default {
  metaInfo: {
    title: '项目完成详情'
  },
  components: {

  },
  props: {

  },
  data() {
    return {
      id: this.$route.query.id
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {

  }
}
</script>

<style scoped lang="less">

</style>
