<template>
  <div class="bee-action">
    <div
      v-for="item in actionList"
      :key="item.id"
      class="action-content"
      @click="goAction(item)"
    >
      <div class="action-time">
        <div class="time-text">
          {{ item.created_at }}
        </div>
      </div>
      <div class="action-detail">
        <div
          v-if="item.background_img"
          class="action-img"
        >
          <img
            :src="item.background_img"
            alt=""
          >
          <div
            v-if="item.is_end"
            class="end-action"
          >
            <img
              :src="beeIcon.message_activity_pic_over"
              alt=""
            >
          </div>
        </div>
        <div class="action-text">
          <div class="left-text">
            <div class="action-title">
              {{ item.title }}
            </div>
            <div class="action-desc">
              {{ item.content }}
            </div>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewestNewsList } from '@/api/BeeApi/user'
export default {
  metaInfo() {
    const type = this.$route.query.type
    if (type === 1) {
      return {
        title: '蜂集市活动'
      }
    } else if (type === 2) {
      return {
        title: '蜂集市公告'
      }
    } else if (type === 3) {
      return {
        title: '蜂集市通知'
      }
    }
  },
  components: {},
  props: {},
  data() {
    return {
      actionList: [],
      beeIcon: {
        message_activity_pic_over: require('@/assets/icon/home/message_activity_pic_over@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getNewestNewsListData()
  },
  methods: {
    async getNewestNewsListData() {
      const res = await getNewestNewsList({ type: this.$route.query.type })
      this.actionList = res.data
    }
  }
}
</script>

<style scoped lang="less">
.bee-action {
  margin: 0.2rem 0.3rem;
  .action-content {
    margin-bottom: 0.4rem;
    .action-time {
      margin: 0 auto 0.2rem;
      height: 0.28rem;
      line-height: 0.28rem;
      font-size: 0.2rem;
      color: @Grey1;
      box-sizing: border-box;
      text-align: center;
      .time-text {
        padding: 0.04rem 0.08rem;
        display: inline-block;
        background-color: rgba(153, 153, 153, 0.2);
        border-radius: 0.08rem;
      }
    }
    .action-detail {
      padding: 0.2rem 0.2rem 0.4rem;
      background-color: #fff;
      border-radius: 0.16rem;
      .action-img {
        height: 2.78rem;
        border-radius: 0.08rem;
        overflow: hidden;
        position: relative;
        .end-action {
          width: 1.72rem;
          height: 1.36rem;
          position: absolute;
          top: 0.72rem;
          right: 2.4rem;
        }
      }
      .action-text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left-text {
          flex: 1;
          margin-right: 0.4rem;
        }
        .action-title {
          font-size: 0.32rem;
          margin-top: 0.2rem;
        }
        .action-desc {
          font-size: 0.26rem;
          color: @Grey1;
          margin-top: 0.2rem;
        }
      }
    }
  }
}
</style>
