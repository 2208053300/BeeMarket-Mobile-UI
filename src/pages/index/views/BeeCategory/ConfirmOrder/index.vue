<template>
  <div class="confirm-order">
    <order-address />
    <commodity-list />
  </div>
</template>

<script>
import { BeeDefault } from '../../../styles/variables.less'
import orderAddress from './components/orderAddress'
import commodityList from './components/commodityList'
export default {
  metaInfo: {
    title: '确认订单'
  },
  components: {
    orderAddress,
    commodityList
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
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../styles/variables.less";

.confirm-order {
  margin-top: 46px;
  padding-bottom: 50px;
}
</style>
