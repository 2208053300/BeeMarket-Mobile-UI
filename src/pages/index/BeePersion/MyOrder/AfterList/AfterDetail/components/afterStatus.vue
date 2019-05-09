<template>
  <div class="after-status">
    <div class="status-part1">
      <div
        v-if="afterDetail.status===0"
        class="close-reason"
      >
        <div class="part1-title">
          <span>由于您未及时处理，售后单超时关闭</span>
        </div>
        <div class="part1-text">
          <span>您的退货申请被商家拒绝，但是您未在规定时间内修改申请后重新提交，本次申请失效</span>
        </div>
      </div>
      <div
        v-if="afterDetail.status===1"
        class="audit-text"
      >
        <div class="part1-title">
          <span>您已成功发起退款申请，商家正在紧急处理中</span>
        </div>
        <div class="part1-text">
          <span>1.审核通过后，请您在7日内按照给出的退货信息进行退货，填写回寄的物流单号，逾期则此次申请失效</span>
        </div>
        <div class="part1-text">
          <span>2.由商家确认收到的商品符合退货标准后，确认退款</span>
        </div>
        <div class="part1-text">
          <span>3.如果审核拒绝，您可以修改申请后重新发起</span>
        </div>
        <div class="part1-text">
          <span>4.如果审核超时未处理，申请将自动通过</span>
        </div>
      </div>
      <div
        v-if="afterDetail.status===2"
        class="close-reason"
      >
        <div class="part1-title">
          <span>您的申请已审核通过，请尽快回寄并填写物流单号</span>
        </div>
        <div class="part1-text">
          <span>请您在7日内按照给出的退货信息进行退货，并填写回寄的物流单号，逾期则此次申请失效</span>
        </div>
      </div>
      <div
        v-if="afterDetail.status===3"
        class="being-processed"
      >
        <div class="part1-title">
          <span>待商家确认收货</span>
        </div>
        <div class="part1-text">
          <span>1.当商家收货并确认商品符合退货条件后，会及时将货款原路退回至您的账户，此次申请完成。</span>
        </div>
        <div class="part1-text">
          <span>2.如果商家超时未处理，将自动退款，此次申请完成。</span>
        </div>
      </div>
      <div
        v-if="afterDetail.status===4"
        class="after-success"
      >
        <div class="part1-title">
          <span>退货退款成功</span>
        </div>
        <div class="part1-text2">
          <span>退款金额</span>
          <span class="bee-text">￥599</span>
        </div>
        <div class="part1-text2">
          <span>返回公益值</span>
          <span class="bee-text">￥599</span>
        </div>
        <div class="part1-text2">
          <span>退款日期</span>
          <span class="bee-text">￥599</span>
        </div>
      </div>
    </div>
    <div class="status-part2">
      <div
        v-if="afterDetail.status===0"
        class="reject-reason"
      >
        <div class="reason-title">
          拒绝原因：图片不清晰
        </div>
        <div class="reason-detail">
          (详细备注可点击沟通记录查看)
        </div>
      </div>
      <div
        v-if="[2,3,4].indexOf(afterDetail.status)!==-1"
        class="refund-address"
      >
        <div class="address-text">
          退货地址
        </div>
        <div class="address-text2">
          <span class="name">张三</span>
          <span class="phone">12345678900</span>
        </div>
        <div class="address-text2">
          <span class="address">重庆重庆市巴南区龙洲湾街道凯川小区1-1-1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.after-status {
  margin-bottom: 0.2rem;
  .status-part1 {
    .part1-title {
      padding: 0.3rem 0.16rem;
      font-size: 0.24rem;
    }
    .part1-text {
      font-size: 0.22rem;
      color: @Grey2;
      padding: 0 0.3rem 0.3rem;
      line-height: 0.44rem;
    }
    .audit-text {
      .part1-title {
        border-bottom: 0.02rem solid @Grey6;
        margin-bottom: 0.1rem;
      }
      .part1-text {
        padding: 0 0.3rem;
        margin-bottom: 0.1rem;
        &:last-child {
          padding-bottom: 0.3rem;
          margin-bottom: 0;
        }
      }
    }
    .being-processed {
      .part1-text {
        padding: 0 0.3rem;
        margin-bottom: 0.1rem;
        &:last-child {
          padding-bottom: 0.3rem;
          margin-bottom: 0;
        }
      }
    }
    .after-success {
      .part1-text2 {
        padding: 0 0.16rem 0.3rem;
        font-size: 0.26rem;
        display: flex;
        justify-content: space-between;
        color: @Grey2;
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
  }
  .status-part2 {
    border-top: 0.02rem solid @Grey6;
    .reject-reason {
      padding: 0.3rem;
      .reason-title {
        font-size: 0.26rem;
        margin-bottom: 0.2rem;
      }
      .reason-detail {
        font-size: 0.22rem;
        color: @Grey2;
      }
    }
    .refund-address {
      padding: 0.3rem;
      .address-text {
        font-size: 0.24rem;
        color: @Grey2;
      }
      .address-text2 {
        font-size: 0.24rem;
        margin-top: 0.2rem;
        .name {
          margin-right: 0.3rem;
        }
      }
    }
  }
}
</style>
