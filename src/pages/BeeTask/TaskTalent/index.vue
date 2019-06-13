<template>
  <div>
    <div class="banner">
      <img :src="beeIcon.talent_pic_banner">
    </div>
    <div class="body">
      <bm-header
        title="观看视频，快速了解蜂友圈"
        subtitle="—WATCH THE VIDEO—"
        :icon="beeIcon.talent_bg_title"
      />
      <div class="video">
        <video
          ref="video"
          :src="video_url"
          :poster="beeIcon.first_screen"
          class="video-body"
          :controls="showControls"
        />
        <div v-if="!showControls" style="position: relative">
          <div class="control">
            <img
              :src="beeIcon.title_icon_stop"
              style="width: 1.28rem;height: 1.28rem"
              @click="play"
            >
          </div>
        </div>
      </div>
      <div style="margin-top: 0.6rem">
        <img :src="beeIcon.stop_pic_line">
      </div>
      <bm-header
        title="完成首单消费，即可开启蜂友圈"
        subtitle="—FIRST PURCHASE—"
        :icon="beeIcon.talent_bg_title2"
      />
      <div class="has-first-consume">
        <p>
          <span v-if="hasFirstConsume === 1">
            您已完成首单消费，快去开启蜂友圈吧！
          </span>
          <span v-if="hasFirstConsume === 0">
            您暂未完成首单消费，再去看看商品吧！
          </span>
          <span v-if="hasFirstConsume === -1">
            -
          </span>
        </p>
        <div
          class="go-shopping"
          :class="{ disable: hasFirstConsume === 1 }"
          @click="goShopping"
        >
          去逛逛
        </div>
      </div>
      <div style="margin-top: 0.6rem">
        <img :src="beeIcon.stop_pic_line">
      </div>
      <bm-header
        title="开启蜂友圈，立即完成任务"
        subtitle="—OPEN THE CIRCLE—"
        :icon="beeIcon.talent_bg_title3"
      />
      <div style="padding-top: 0.4rem">
        <a href="/beeFriends">
          <img :src="beeIcon.line_bee_circle_banner">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import bmHeader from './components/header'
import { isConsume } from '@/api/BeeApi/task'

export default {
  metaInfo: {
    title: '成为达人'
  },
  components: { bmHeader },
  props: {},
  data() {
    return {
      beeIcon: {
        talent_pic_banner: require('@/assets/icon/task/talent/talent_pic_banner@2x.png'),
        talent_bg_title: require('@/assets/icon/task/talent/talent_bg_title@3x.png'),
        talent_bg_title2: require('@/assets/icon/task/talent/talent_bg_title2@3x.png'),
        talent_bg_title3: require('@/assets/icon/task/talent/talent_bg_title3@3x.png'),
        title_icon_stop: require('@/assets/icon/task/talent/title_icon_stop@2x.png'),
        stop_pic_line: require('@/assets/icon/task/talent/stop_pic_line@2x.png'),
        line_bee_circle_banner: require('@/assets/icon/task/talent/line_bee_circle_banner@2x.png'),
        first_screen: require('@/assets/icon/task/talent/first_screen@3x.png')
      },
      playStatus: false,
      video_url: 'https://img.fengjishi.com.cn/product/video/mi9.mp4',
      hasFirstConsume: 0,
      showControls: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = getOs().isWx
    this.$store.state.app.beeFooter.show = false
    this.getHasConsume()
  },
  methods: {
    goShopping() {
      if (this.hasFirstConsume === 2) {
        return
      }
      const os = getOs()
      if (os.isWx) {
        window.location.href = '/#/category'
      } else if (os.isIphone) {
        window.webkit.messageHandlers.ToCatList.postMessage('')
      } else if (os.isAndroid) {
        window.beeMarket.ToCatList()
      }
    },
    async getHasConsume() {
      const res = await isConsume()
      this.$store.state.app.beeFooter.show = false
      this.hasFirstConsume = res.data.is_consume ? 1 : 0
    },
    play() {
      this.$refs.video.play()
      this.showControls = true
    }
  }
}
</script>

<style scoped lang="less">
.banner {
  padding: 0.2rem 0.3rem;
}
.body {
  background: white;
  margin: 0 0.3rem 0.2rem 0.3rem;
  padding: 0 0.24rem 0.6rem 0.24rem;
  text-align: center;
}
p {
  margin: 0;
}
.video {
  border-radius: 0.16rem;
  margin-top: 0.24rem;
  .video-body {
    background-color: black;
    width: 6.42rem;
    height: 3.3rem;
    border-radius: 0.16rem
  }
  .control {
    width: 6.42rem;
    height: 3.3rem;
    top: -3.3rem;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.has-first-consume {
  p {
    margin-top: 0.4rem;
    font-size: 0.22rem;
    color: @Grey1;
  }
}
.go-shopping {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.2rem;
  width: 2rem;
  height: 0.64rem;
  line-height: 0.64rem;
  border-radius: 0.08rem;
  background: linear-gradient(to right, #ffbd2f, @BeeDefault);
  font-size: 0.3rem;
  color: white;
  &:active {
    filter: opacity(90%);
  }
}
.disable {
  filter: opacity(20%);
}
</style>
