<template>
  <div class="all-order">
    <van-tabs
      v-model="active"
      title-inactive-color="#333333"
      background="#ffffff"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :swipe-threshold="swipeNum"
      @click="changeOrder"
    >
      <van-tab>
        <div slot="title">
          全部
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          待付款
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          待发货
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          待收货
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          待评价
        </div>
      </van-tab>
    </van-tabs>
    <order-card :order-list="orderList" />
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import orderCard from './components/orderCard'
import { getOrderList } from '@/api/user'
export default {
  metaInfo: {
    title: '全部订单'
  },
  components: {
    orderCard
  },
  props: {},
  data() {
    return {
      BeeDefault,
      active: 0,
      swipeNum: 5,
      orderList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.changeOrder()
  },
  methods: {
    async changeOrder(index) {
      const res = await getOrderList({ status: index })
      console.log(res)
      this.orderList = res.data.orderData
    }
  }
}
</script>

<style scoped lang="less">
.all-order {

}
</style>
