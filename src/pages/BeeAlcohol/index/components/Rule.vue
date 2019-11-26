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
            <b>活动规则</b><br>
            1）购买1箱（共6瓶）茅台贵宾陈酿VIP30，即可获得1万元现金补贴（在“个人中心”查看），现金补贴可使用，也可提现；<br>
            2）使用：再次购买全额抵扣，免费再得两箱；<br>
            3）提现：邀请好友参加活动，提现立即到账。
          </div>

          <div class="dl">
            <b>特别说明</b><br>
            1）现金补贴提现分4份组成（共计1万元），使用无条件，提现需分享（分享好友参与1箱可自动激活1份提现权益，4箱及以上全部激活）；<br>
            2）本次活动为普惠更多用户，每个微信lD限购10箱（即每个微信ID最高可得10万元）。
          </div>
        </div>
        <div style="text-align: center;margin-top: 0.3rem">
          <img
            :src="require('@/assets/icon/alcohol/liqueur_button_understand.png')"
            alt="我知道了"
            style="width: 6.3rem;margin-bottom: 0.2rem;height: auto"
            @click="handleClose()"
          >
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
  width: 100%;
  background-color: #CB271B;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  overflow-y: scroll;
  .text {
    padding-left: 0.28rem;
    padding-right: 0.37rem;
    color: white;
    line-height: 1.2;
    font-size: 0.3rem;
    .dl {
      margin-bottom: 0.3rem;
    }
  }
}
</style>
