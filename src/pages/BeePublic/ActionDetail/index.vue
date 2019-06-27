<template>
  <div class="action-detail">
    <van-notice-bar
      :left-icon="beeIcon.confirmorder_send_icon_presentation"
      background="#E2E2E2"
      color="#666666"
      mode="closeable"
    >
      <div class="notice-text">
        您已成功助力该公益行动，进入活动中心领取更多好礼！
      </div>
    </van-notice-bar>
    <div class="detail-content">
      <header-card :action-data="actionData" />
      <title-card :action-data="actionData" />
      <detail-card :action-data="actionData" />
      <caring-enterprise :action-data="actionData" />
    </div>
    <footer-op :action-data="actionData" />
  </div>
</template>

<script>
// 引入微信分享
import wxapi from '@/utils/wxapi.js'
import headerCard from './components/headerCard'
import titleCard from './components/titleCard'
import detailCard from './components/detailCard'
import caringEnterprise from './components/caringEnterprise'
import footerOp from './components/footerOp'
import { getShareDetail } from '@/api/BeeApi/action'

export default {
  components: {
    headerCard,
    titleCard,
    detailCard,
    caringEnterprise,
    footerOp
  },
  props: {},
  data() {
    return {
      beeIcon: {
        confirmorder_send_icon_presentation: require('@/assets/icon/order/confirmorder_send_icon_presentation@2x.png')
      },
      actionData: {
        company_info: {
          love_company_logo: ''
        }
      },
      user_id: 1
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getShareDetailData()
  },
  methods: {
    async getShareDetailData() {
      const res = await getShareDetail({
        user_id: this.$route.query.uid,
        aid: this.$route.query.aid
      })
      this.actionData = res.data
      wxapi.wxShare({
        title: this.actionData.main_title, // 分享标题, 请自行替换
        desc: '我为公益代言！点点手指，为我助力！', // 分享描述, 请自行替换
        link: window.location.href, // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'https://img.fengjishi.com/app/images/action.jpg' // 分享图标, 请自行替换，需要绝对路径
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-detail {
  margin-bottom: 1.4rem;
  .detail-content {
    padding: 0.2rem 0.3rem;
    .van-notice-bar {
      font-size: 0.22rem;
      color: @Grey2;
      align-items: center;
      .notice-text {
        margin-left: 0.2rem;
      }
    }
    .between-text {
      font-size: 0.24rem;
      color: @Grey2;
      text-align: center;
      padding: 0.24rem 0;
    }
  }
}
</style>
