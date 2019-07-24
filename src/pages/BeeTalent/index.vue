<template>
  <div class="task-talent" :class="{ 'show-header': isWx }">
    <BeeHeader v-if="isWx" />
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
        title="完成首单消费，开启您的蜂友圈"
        subtitle="—FIRST PURCHASE—"
        :icon="beeIcon.talent_bg_title2"
      />
      <div>
        <img :src="beeIcon.my_bee_circle" style="margin-top: 0.4rem">
        <div
          class="go-shopping"
          @click="goSomething"
        >
          <span v-if="hasFirstConsume === 0">
            去开启
          </span>
          <span v-else>
            进入蜂友圈
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import bmHeader from './components/header'
import { isConsume } from '@/api/BeeApi/task'
import BeeHeader from '@/components/BeeHeader'

export default {
  metaInfo: {
    title: '成为达人'
  },
  components: { bmHeader, BeeHeader },
  props: {},
  data() {
    return {
      beeIcon: {
        talent_pic_banner: require('@/assets/icon/task/talent/talent_pic_banner@2x.png'),
        talent_bg_title: require('@/assets/icon/task/talent/talent_bg_title@3x.png'),
        talent_bg_title2: require('@/assets/icon/task/talent/talent_bg_title2@3x.png'),
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        stop_pic_line: require('@/assets/icon/task/talent/stop_pic_line@2x.png'),
        first_screen: require('@/assets/icon/task/talent/first_screen@3x.png'),
        my_bee_circle: require('@/assets/icon/task/talent/talent_pic_bee@2x.png')
      },
      video_url: 'https://img.fengjishi.com.cn/app/videos/education/friendship-course-1.mp4',
      hasFirstConsume: 0,
      showControls: false,
      isWx: getOs().isWx
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.getHasConsume()
  },
  methods: {
    goSomething() {
      if (this.hasFirstConsume === 0) {
        this.goShopping()
      } else if (this.hasFirstConsume === 1) {
        this.goCircle()
      }
    },
    // 去我的蜂友圈
    goCircle() {
      if (window.location.href === '/') {
        this.$router.push('/beeFriends')
      } else {
        window.location.href = '/#/beeFriends'
      }
    },
    // 去购物
    goShopping() {
      const os = getOs()
      if (os.isIphone && os.isApp) {
        window.webkit.messageHandlers.ToCatList.postMessage('')
      } else if (os.isAndroid && os.isApp) {
        window.beeMarket.ToCatList()
      } else {
        if (window.location.href === '/') {
          this.$router.push('/category')
        } else {
          window.location.href = '/#/category'
        }
      }
    },
    // 获取是否已购物
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
.task-talent {
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
    margin-top: 0.4rem;
    width: 2.64rem;
    height: 0.8rem;
    line-height: 0.8rem;
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
}
.show-header {
  padding-top: 46px;
}
</style>
