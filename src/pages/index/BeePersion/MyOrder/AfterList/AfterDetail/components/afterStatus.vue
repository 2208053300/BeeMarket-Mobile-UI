<template>
  <div class="after-status">
    <!-- type_code  售后类型值,1 退货,2 换货,3 补寄 -->

    <!-- status_code 状态值:-1 已拒绝, 0 待审核,1 待买家发货,2 待商家收货,3 待买家收货,4 已完成,5 已关闭 -->

    <!-- closed_type 关闭类型,1 超时未申请,2 超时未填单号,3 撤销 -->

    <div class="status-part1">
      <!-- 状态描述 -->
      <div v-if="[0,1,2,3,-1].includes(afterDetail.status_code) || (afterDetail.status_code===5&& [1,2].includes(afterDetail.closed_type))" class="audit-text">
        <div class="part1-title">
          <span>{{ afterDetail.status_desc.title }}</span>
        </div>
        <template v-if="afterDetail.status_desc.directions && afterDetail.status_desc.directions.length>1">
          <div v-for="(item, index) in afterDetail.status_desc.directions" :key="index" class="part1-text">
            <span>{{ index+1 }}、{{ item }}</span>
          </div>
        </template>
        <template v-else>
          <div v-for="(item, index) in afterDetail.status_desc.directions" :key="index" class="part1-text">
            <span>{{ item }}</span>
          </div>
        </template>
      </div>

      <!-- 1 待买家发货 -->
      <!-- <div v-if="afterDetail.status_code===1" class="audit-text">
        <div class="part1-title">
          <span>您的申请已审核通过，请尽快回寄并填写物流单号</span>
        </div>
        <div class="part1-text">
          <span>请您在7日内按照给出的退货信息进行退货，并填写回寄的物流单号，逾期则此次申请失效</span>
        </div>
      </div> -->
      <!-- 2 待商家收货 -->
      <!-- <div v-if="afterDetail.status_code===2" class="close-reason">
        <div class="part1-title">
          <span>待商家确认收货</span>
        </div>
        <div class="part1-text">
          <span>1.当商家收货并确认商品符合退货条件后，会及时将货款原路退回至您的账户，此次申请完成。</span>
        </div>
        <div class="part1-text">
          <span>2.如果商家超时未处理，将自动退款，此次申请完成。</span>
        </div>
      </div> -->
      <!-- 3 待买家收货 -->
      <!-- <div
        v-if="afterDetail.status_code===3"
        class="being-processed"
      /> -->
      <!-- 4 已完成 -->
      <div v-if="afterDetail.status_code===4" class="after-success">
        <div class="part1-title">
          <span>{{ afterDetail.refund_info.title }}</span>
        </div>
        <div class="part1-text2">
          <span>退款金额</span>
          <span class="bee-text">￥{{ afterDetail.refund_info.refund_cash }}</span>
        </div>
        <div class="part1-text2">
          <span>返回公益值</span>
          <span class="bee-text">{{ afterDetail.refund_info.refund_pwv }}</span>
        </div>
        <div class="part1-text2">
          <span>退款日期</span>
          <span class="bee-text">{{ afterDetail.refund_info.refund_time }}</span>
        </div>
      </div>
      <!-- -1 已拒绝 -->
      <!-- <div v-if="afterDetail.status_code===-1" class="after-success">
        <div class="part1-title">
          <span>您的申请被商家拒绝，请及时处理</span>
        </div>
        <div class="part1-text">
          <span>1、您可以在规定时间里修改申请后重新提交，或撤销申请</span>
        </div>
        <div class="part1-text">
          <span>如果您逾期未处理，此次申请将自动关闭</span>
        </div>
      </div> -->
    </div>

    <div v-if="afterDetail.closed_type!==3" class="status-part2">
      <!-- 拒绝原因 -->
      <div
        v-if="afterDetail.status_code===-1 || (afterDetail.status_code===5&&afterDetail.closed_type===1)"
        class="reject-reason"
      >
        <div class="reason-title">
          拒绝原因：{{ afterDetail.refuse_reason }}
        </div>
        <div class="reason-detail">
          (详细备注可点击沟通记录查看)
        </div>
      </div>
      <!-- 退货地址 -->
      <div
        v-if="[1,2,3,4].indexOf(afterDetail.status_code)!==-1 && afterDetail.return_addr"
        class="refund-address"
      >
        <div class="address-text">
          退货地址
        </div>
        <div class="address-text2">
          <span class="name">{{ afterDetail.return_addr.consignee }}</span>
          <span class="phone">{{ afterDetail.return_addr.phone }}</span>
        </div>
        <div class="address-text2">
          <span class="address">{{ afterDetail.return_addr.address }}</span>
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
        color: #333;
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
