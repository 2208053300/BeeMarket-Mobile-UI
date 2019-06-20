<template>
  <div class="comment">
    <orderCard />
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import orderCard from './components/orderCard'
export default {
  metaInfo: {
    title: '发表评价'
  },
  components: {
    orderCard
  },
  props: {},
  data() {
    return {
      BeeDefault
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.comment {

}
</style>
