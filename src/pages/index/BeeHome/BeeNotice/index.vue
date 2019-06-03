<template>
  <div class="notice-center">
    <van-cell
      is-link
      class="notice-cell"
      @click="$router.push('/beeAction')"
    >
      <div
        slot="title"
        class="notice-title"
      >
        <div class="notice-img">
          <img
            :src="beeIcon.message_icon_activity_n"
            alt=""
          >
          <!-- TODO 如果有消息，变为红点图片 -->
          <!-- <img
            :src="beeIcon.message_icon_activity_n"
            alt=""
          > -->
        </div>
        <div class="notice-pre">
          <div class="title1">
            蜂集市活动
          </div>
          <div class="notice-pre2">
            呵呵呵呵呵呵呵呵呵
          </div>
        </div>
      </div>
    </van-cell>
    <van-cell
      is-link
      class="notice-cell"
      @click="$router.push('/beeAction')"
    >
      <div
        slot="title"
        class="notice-title"
      >
        <div class="notice-img">
          <img
            :src="beeIcon.message_icon_announcement_n"
            alt=""
          >
        </div>
        <div class="notice-pre">
          <div class="title1">
            平台公告
          </div>
          <div class="notice-pre2">
            呵呵呵呵呵呵呵呵呵
          </div>
        </div>
      </div>
    </van-cell>
    <van-cell
      is-link
      class="notice-cell"
      @click="$router.push('/beeAction')"
    >
      <div
        slot="title"
        class="notice-title"
      >
        <div class="notice-img">
          <img
            :src="beeIcon.message_icon_notice_n"
            alt=""
          >
        </div>
        <div class="notice-pre">
          <div class="title1">
            通知消息
          </div>
          <div class="notice-pre2">
            呵呵呵呵呵呵呵呵呵
          </div>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { getNewestNews } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '消息中心'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        message_icon_activity_n: require('@/assets/icon/home/message_icon_activity_n@2x.png'),
        message_icon_activity_p: require('@/assets/icon/home/message_icon_activity_p@2x.png'),
        message_icon_announcement_n: require('@/assets/icon/home/message_icon_announcement_n@2x.png'),
        message_icon_announcement_p: require('@/assets/icon/home/message_icon_announcement_p@2x.png'),
        message_icon_notice_n: require('@/assets/icon/home/message_icon_notice_n@2x.png'),
        message_icon_notice_p: require('@/assets/icon/home/message_icon_notice_p@2x.png')
      },
      newsList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getNewestNewsData()
  },
  methods: {
    async getNewestNewsData() {
      const res = await getNewestNews()
      this.newsList = res.data
    }
  }
}
</script>

<style scoped lang="less">
.notice-center {
  .notice-cell {
    margin-top: 0.2rem;
    align-items: center;
    padding: 0.28rem 0.3rem;
    height: 1.24rem;
    box-sizing: border-box;
    .notice-title {
      display: flex;
      .notice-img {
        height: 0.8rem;
        width: 0.8rem;
        margin-right: 0.12rem;
      }
      .notice-pre {
        .title1 {
          font-size: 0.32rem;
        }
        .notice-pre2 {
          margin-top: 0.08rem;
          font-size: 0.24rem;
          color: @Grey1;
        }
      }
    }
  }
}
</style>
