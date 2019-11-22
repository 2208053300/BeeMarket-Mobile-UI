<template>
  <div>
    <van-popup
      v-model="visible"
      position="bottom"
      class="rule"
      :close-on-click-overlay="false"
      @close="handleClose()"
      @click-overlay="handleClose()"
    >
      <div>
        <div style="text-align: center;padding: 0.32rem 0">
          <img
            :src="require('@/assets/icon/alcohol/liqueur_title.png')"
            alt="活动规则"
            style="width: 3.76rem;height: auto"
          >
        </div>
        <div class="text">
          <div class="dl">
            1）用户购买茅台集团「贵宾陈酿」VIP30 一箱（共6瓶，售价4800元），即可获得1万元补贴奖励（购买后立即反券，可在“个人中心”中查看）
          </div>
          <div class="dl">
            2）1万元补贴可在蜂集市平台进行「使用」或「提现」，二选一。
          </div>
          <div class="dl">
            3）用户使用补贴<br>
            该补贴可在蜂集市App内使用，仅限用于购买茅台「贵宾陈酿」VIP30六瓶装，余额不可提现
          </div>
          <div class="dl">
            4）用户提现补贴<br>
            ·用户直接蜂友参与活动，购买1箱（茅台「贵宾陈酿」VIP30六瓶装）即可激活提现权益。<br>
            ·补贴提现分4次，用户分享的直接好友购买1箱激活1次，购买4箱可全部激活。<br>
            分别为：<br>
            第1次：激活1000元现金提现权益<br>
            第2次：激活2000元现金提现权益<br>
            第3次：激活3000元购物券（可用于购买平台任意商品）使用权益<br>
            第4次：激活4000元现金提现权益<br>
          </div>
          <div class="dl">
            5）本次补贴活动为普惠更多用户，每个微信lD限购10箱（即每个用户最高可得补贴10万元）。
          </div>
        </div>
        <div style="text-align: center;margin-top: 0.3rem">
          <img
            :src="require('@/assets/icon/alcohol/liqueur_button_understand.png')"
            alt="我知道了"
            style="width: 6.3rem;margin-bottom: 0.2rem"
            @click="handleClose()"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'update'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('update', false)
    }
  }
}
</script>

<style lang="less" scoped>
.rule {
  height: 70vh;
  width: 100%;
  background-color: #CB271B;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  overflow: scroll;
  .text {
    padding-left: 0.28rem;
    padding-right: 0.37rem;
    color: white;
    font-size: 0.14rem;
    line-height: 1.2;
    .dl {
      margin-bottom: 0.3rem;
    }
  }
}
</style>
