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
            <p>茅台贵宾陈酿VIP30 每购2瓶（体验装）立得补贴3000元；每购6瓶（整箱装）立得补贴10000元，补贴可以<b class="strange">使用</b>或者<b class="strange">提现</b>。</p>
            <p>使用：再次购买全额抵扣，免费再得两箱；</p>
            <p>提现：邀请好友参与活动，立即提现到账。</p>
          </div>

          <div class="dl">
            <div style="text-align: center;margin-bottom: 0.15rem">
              <b>【特别说明】</b>
            </div>
            1）邀请好友每购2瓶（体验装）可提现补贴1000元；每购6瓶（整箱装）可提现补贴3000元；<br>
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
  .text {
    letter-spacing: 0.5px;
    padding-left: 0.28rem;
    padding-right: 0.37rem;
    color: white;
    line-height: 1.2;
    font-size: 0.3rem;
    .dl {
      margin-bottom: 0.3rem;
    }
    p {
      padding: 0;
      margin: 0;
      text-indent: 2em;
    }
    .strange {
      color: #f9cc0b;
    }
  }
}
</style>
