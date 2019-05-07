<template>
  <div class="show-explain">
    <van-actionsheet v-model="showExplain">
      <div class="service-promise">
        <div class="service-title">
          赠送朋友说明
        </div>
        <div class="promise-content">
          <div class="promise-item">
            <div class="promise-img">
              <img
                src=""
                alt=""
              >
              1
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
                src=""
                alt=""
              >
              2
            </div>
            <div class="promise-right">
              <div class="promise-desc">
                好友收到订单后需在规定时间内接受并确认地址，或者转赠他人
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-actionsheet>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showExplain: false
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
  .van-actionsheet {
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
        padding: 0.4rem 0;
      }
      .promise-content {
        .promise-item {
          display: flex;
          align-items: center;
          .promise-img {
            width: 0.3rem;
            margin-right: 0.24rem;
          }
          .promise-right {
            .promise-desc {
              font-size: 0.28rem;
              margin: 0.24rem 0 0.52rem;
            }
          }
        }
      }
    }
  }
}
</style>
