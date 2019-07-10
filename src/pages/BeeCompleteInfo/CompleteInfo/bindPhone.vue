<template>
  <div class="bee-task">
    <div class="card head">
      <div class="head-icon">
        <img :src="beeIcon.data_icon_smile" style="width: 1rem;height: 1rem">
      </div>
      <div class="head-text">
        <span class="unusual">关注“蜂集市”</span>公众号,即可<span class="unusual">获得公益值100个</span>,同时也可享受蜂集市更多权益
      </div>
    </div>
    <div class="card body">
      <div class="step-1-1">
        <img :src="beeIcon.data_icon_1" style="width: 0.5rem">
        <div class="default-text">
          点击下方按钮进入绑定手机号。<br>
          (如果您已绑定，可直接进行第2步)
        </div>
      </div>
      <div style="display: flex;justify-content: center">
        <div class="btn" @click="bindPhone">
          <img :src="beeIcon.data_icon_phone" class="phone">
          <span v-if="mobile_bind">您已绑定手机</span>
          <span v-else>去绑定手机号</span>
        </div>
      </div>
      <div class="step-2">
        <img :src="beeIcon.data_icon_2" style="width: 0.5rem">
        <div class="default-text">
          打开微信,搜索并关注公众号"蜂集市",点击【关注】即可完成该任务,获得相应权益。
        </div>
      </div>
      <div class="step-2-img">
        <img :src="beeIcon.data_pic_description">
      </div>
    </div>
  </div>
</template>

<script>
import { security } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '完善资料'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        data_icon_smile: require('@/assets/icon/task/perfectData/data_icon_smile@2x.png'),
        data_icon_1: require('@/assets/icon/task/perfectData/data_icon_1@2x.png'),
        data_icon_2: require('@/assets/icon/task/perfectData/data_icon_2@2x.png'),
        data_icon_phone: require('@/assets/icon/task/perfectData/data_icon_phone@3x.png'),
        data_pic_description: require('@/assets/icon/task/perfectData/data_pic_description@2x.png')
      },
      // 是否已绑定手机号码
      mobile_bind: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true

    this.isSet()
  },
  methods: {
    bindPhone() {
      if (!this.mobile_bind) {
        // this.$store.dispatch('',)
        window.location.href = '/#/persion/profile/accountBind/bindPhone'
      }
    },
    // 判断是否已设置支付密码、是否绑定了手机号码
    async isSet() {
      const res = await security()
      if (res.code === 1 && res.status_code === 200) {
        this.mobile_bind = res.data.mobile_bind
      }
    }
  }
}
</script>

<style scoped lang="less">
.bee-task {
  .card {
    margin-top: 0.46rem;
    background: white;
    border-radius: 0.2rem;
    box-sizing: border-box;
    box-shadow: 0 0.02rem 0.1rem rgba(153, 153, 153, 0.2);
    padding: 0.6rem 0.32rem;
  }
  .head {
    margin: 0.2rem 0.3rem;
    padding: 0.4rem 0.32rem;
    .head-icon {
      text-align: center;
      padding-bottom: 0.36rem;
    }
    .head-text {
      line-height: 1.8;
      text-align: center;
      font-size: 0.3rem;
      font-weight: bold;
      color: @ProductName;
      .unusual {
        color: @BeeDefault;
      }
    }
  }
  .body {
    margin: 0 0.3rem 0.4rem 0.3rem;
    .step-1-1 {
      display: flex;
    }
    .step-2 {
      display: flex;
      margin-top: 0.6rem
    }
    .step-2-img {
      margin: 0.4rem 0.36rem 0 0.36rem;
    }
    .default-text {
      padding-top: 0.04rem;
      padding-left: 0.16rem;
      line-height: 1.3;
      color: @ProductName;
      font-size: 0.26rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.4rem;
      width: 4.6rem;
      line-height: 0.88rem;
      border-radius: 4px;
      background: @BeeDefault;
      color: white;
      font-size: 0.38rem;
      .phone {
        width: 0.3rem;
        height: 0.45rem;
        margin-right: 0.12rem;
      }
      &:active {
        background: @BeeDefault3;
      }
    }
  }
}
</style>
