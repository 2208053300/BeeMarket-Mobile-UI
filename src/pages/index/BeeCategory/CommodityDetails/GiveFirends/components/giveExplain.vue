<template>
  <div class="show-explain">
    <van-actionSheet v-model="showExplain">
      <div class="service-promise">
        <div class="service-title">
          赠送朋友说明
        </div>
        <div class="promise-content">
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.confirmorder_send_icon_one"
                alt=""
              >
            </div>
            <div class="promise-right">
              <div class="promise-desc">
                集市所有商品均无条件包邮（特殊地区及活动除外）
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.confirmorder_send_icon_two"
                alt=""
              >
            </div>
            <div class="promise-right">
              <div class="promise-desc">
                好友收到订单后需在规定时间内接受并确认地址，或者转赠他人;
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.confirmorder_send_icon_three"
                alt=""
              >
            </div>
            <div class="promise-right">
              <div class="promise-desc">
                当好友接受并确认地址后，平台将立即安排发货;
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.confirmorder_send_icon_four"
                alt=""
              >
            </div>
            <div class="promise-right">
              <div class="promise-desc">
                如果好友在规定时间内未进行操作，此时您可再次转赠好友或申请退款;
              </div>
            </div>
          </div>
          <div class="promise-item">
            <div class="promise-img">
              <img
                :src="beeIcon.confirmorder_send_icon_five"
                alt=""
              >
            </div>
            <div class="promise-right">
              <div class="promise-desc">
                偏远地区用户暂不支持送朋友功能。
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-actionSheet>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showExplain: false,
      beeIcon: {
        confirmorder_send_icon_one: require('@/assets/icon/order/confirmorder_send_icon_one@2x.png'),
        confirmorder_send_icon_two: require('@/assets/icon/order/confirmorder_send_icon_two@2x.png'),
        confirmorder_send_icon_three: require('@/assets/icon/order/confirmorder_send_icon_three@2x.png'),
        confirmorder_send_icon_four: require('@/assets/icon/order/confirmorder_send_icon_four@2x.png'),
        confirmorder_send_icon_five: require('@/assets/icon/order/confirmorder_send_icon_five@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less">
.show-explain {
  .van-action-sheet {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    .service-promise {
      min-height: 10.28rem;
      overflow: hidden;
      padding: 0 0.3rem 0.16rem;
      position: relative;
      .service-title {
        text-align: center;
        font-size: 0.32rem;
        color: @BeeDefault;
        padding: 0.4rem 0 0;
      }
      .promise-content {
        .promise-item {
          display: flex;
          align-items: center;
          margin-top:0.52rem;
          .promise-img {
            width: 0.4rem;
            margin-right: 0.24rem;
          }
          .promise-right {
            flex: 1;
            .promise-desc {
              font-size: 0.28rem;
            }
          }
        }
      }
    }
  }
}
</style>
