<template>
  <div class="all-order">
    <van-tabs
      v-model="active"
      title-inactive-color="#333333"
      background="#ffffff"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :swipe-threshold="swipeNum"
    >
      <van-tab>
        <div
          slot="title"
          @click="changeOrder(-1)"
        >
          全部
        </div>
      </van-tab>
      <van-tab>
        <div
          slot="title"
          @click="changeOrder(0)"
        >
          待付款
        </div>
      </van-tab>
      <van-tab>
        <div
          slot="title"
          @click="changeOrder(1)"
        >
          待发货
        </div>
      </van-tab>
      <van-tab>
        <div
          slot="title"
          @click="changeOrder(2)"
        >
          待收货
        </div>
      </van-tab>
      <van-tab>
        <div
          slot="title"
          @click="changeOrder(4)"
        >
          待评价
        </div>
      </van-tab>
    </van-tabs>
    <order-card
      :order-list="orderList"
      :form-data="formData"
    />
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import orderCard from './components/orderCard'
import { getOrderList } from '@/api/BeeApi/user'
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
      orderList: [],
      formData: {
        s_status: -1,
        page: 1
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    if (this.$route.query.s_status) {
      this.changeTab(this.$route.query.s_status)
    } else {
      this.changeOrder()
    }
  },
  methods: {
    async changeOrder(index) {
      this.formData.page = 1
      if ([-1, 0, 1, 2, 4].indexOf(index) !== -1) {
        this.formData.s_status = index
      }
      const res = await getOrderList(this.formData)
      this.formData.page = 2
      this.orderList = res.data
    },
    // 如果是带着状态参数进入页面
    changeTab(s_status) {
      if ([0, 1, 2, 4].indexOf(s_status) !== -1) {
        this.changeOrder(s_status)
        // 更改活动标签栏
        this.active = s_status + 1
      } else {
        this.changeOrder()
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
