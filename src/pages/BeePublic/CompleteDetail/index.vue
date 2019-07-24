<template>
  <!-- eslint-disable-next-line -->
  <div class="bg-white complete-detail"  v-html="actionDetails.complete_details" />
</template>

<script>

// 行动详情，参与助力api
import { getActionDetail } from '@/api/BeeApi/action'
// 引入微信分享
import wxapi from '@/utils/wxapi'
export default {
  metaInfo: {
    title: '完成详情'
  },
  components: {

  },
  props: {

  },
  data() {
    return {
      aid: this.$route.query.aid,
      actionDetails: {}
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    this.getActionDetailsData()
  },
  methods: {

    async getActionDetailsData() {
      const res = await getActionDetail({ id: this.aid })
      this.actionDetails = res.data
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
.complete-detail{
  padding: 0.2rem;
  p{margin: 0;}
}
</style>
