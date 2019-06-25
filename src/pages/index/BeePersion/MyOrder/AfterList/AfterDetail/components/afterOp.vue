<template>
  <div class="after-op">
    <!-- 已关闭的时候可以删除售后单 -->
    <van-button
      v-if="[5].indexOf(afterDetail.status_code) !== -1"
      round
      type="default"
      @click="delAfterOrder"
    >
      删除售后单
    </van-button>
    <!-- 审核 和 已拒绝 可修改申请 -->
    <van-button
      v-if="[-1, 0].indexOf(afterDetail.status_code) !== -1"
      round
      type="default"
      @click="changeApply"
    >
      修改申请
    </van-button>
    <!-- 待买家发货 可填写物流单号 -->
    <van-button
      v-if="[1].indexOf(afterDetail.status_code) !== -1"
      round
      type="default"
      @click="fillLogisticsNumber"
    >
      填写物流单号
    </van-button>
    <!-- 审核 待买家发货 已拒绝 可撤销 -->
    <van-button
      v-if="[-1, 0, 1].indexOf(afterDetail.status_code) !== -1"
      round
      type="default"
      @click="cancelApply"
    >
      撤销申请
    </van-button>
    <!-- 无论哪个状态都可 联系客服 -->
    <van-button round type="default" @click="contactServer">
      联系客服
    </van-button>
    <!-- 换货且待买家收货时 可确认收货 -->
    <van-button
      v-if="afterDetail.type_code === 3 && afterDetail.status_code === 3"
      type="default"
      round
      class="btn-complete"
      @click="complete"
    >
      确认完成
    </van-button>
  </div>
</template>

<script>
import { delAfterOrder, cancelAfterOrder } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {
    afterDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      aid: this.$route.query.aid
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 删除售后单
    async delAfterOrder() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定删除该售后单？'
        })
        .then(async() => {
          // on confirm
          const res = await delAfterOrder({ aid: this.aid })
          this.$toast.success(res.message)
          setTimeout(() => {
            this.$router.push({
              name: 'afterList'
            })
          }, 1500)
        })
        .catch(() => {
          this.$toast('已取消')
        })
    },

    // 修改申请
    changeApply() {
      this.$router.push({
        path: '/persion/order/applyAfter',
        query: {
          aid: this.aid
        }
      })
    },

    // 填写物流单号
    fillLogisticsNumber() {
      this.$router.push({
        name: 'fillLogisticsInfo',
        query: {
          aid: this.aid
        }
      })
    },

    // 撤销申请
    cancelApply() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定撤销该售后单？'
        })
        .then(async() => {
          // on confirm
          const res = await cancelAfterOrder({ aid: this.aid })
          this.$toast.success(res.message)
          setTimeout(() => {
            window.location.reload
          }, 1500)
        })
        .catch(() => {
          this.$toast('已取消')
        })
    },

    // 联系客服
    contactServer() {
      this.$router.push({
        name: 'ServiceHelperIndex'
      })
    },

    // 确认完成
    complete() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定完成？'
        })
        .then(async() => {
          // on confirm
          const res = await cancelAfterOrder({ aid: this.aid })
          this.$toast.success(res.message)
          setTimeout(() => {
            window.location.reload
          }, 1500)
        })
        .catch(() => {
          this.$toast('已取消')
        })
    }
  }
}
</script>

<style scoped lang="less">
.after-op {
  position: fixed;
  bottom: 0;
  height: 1rem;
  background-color: #fff;
  border-top: 0.02rem solid @Grey6;
  box-sizing: border-box;
  width: 100%;
  z-index: 1;
  padding: 0 0.32rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .van-button {
    width: 1.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0;
    margin-left: 0.2rem;
    font-size: 0.26rem;
    color: @Grey2;
    border-color: @Grey2;
  }
  .btn-complete {
    border-color: #f49822;
    color: #f49822;
  }
}
</style>
