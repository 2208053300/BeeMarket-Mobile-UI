<template>
  <div class="bee-alcohol">
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_01.jpg')" alt="head">
      <div style="position: absolute;bottom: 0;left: 0;display: flex;justify-content: center;width: 100%">
        <img
          :src="beeIcon.rule"
          alt="活动规则"
          style="width: 150px"
          @click="showRule=true"
        >
      </div>
    </div>
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_02.jpg')" alt="head">
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_03.jpg')" alt="head">
    <!-- 视频播放部分 -->
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_04.jpg')" alt="head">
      <div class="video">
        <video
          ref="video"
          src="https://img.fengjishi.com/app/videos/maotai/intro.mp4"
          preload="auto"
          :poster="showControls ? '' : require('@/assets/icon/alcohol/pw_pic_video.png')"
          class="video-body"
          :controls="showControls"
        />
        <div
          v-if="!showControls"
          class="control"
        >
          <img
            :src="beeIcon.title_icon_stop"
            style="width: 1.28rem;height: 1.28rem"
            @click="play"
          >
        </div>
      </div>
    </div>
    <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_05.jpg')" alt="head">
    <div style="position: relative">
      <img :src="require('@/assets/icon/alcohol/1-首页改版六-2切图_06.jpg')" alt="head">
      <img :src="require('@/assets/icon/alcohol/liqueur_button_begin.png')" alt="立即购买" class="bottom-btn">
    </div>
    <rule v-model="showRule" />
  </div>
</template>

<script>
import Rule from './components/rule'
import Cookies from 'js-cookie'
import { getUID } from '@/api/BeeApi/user'
import { showShareIcon, setShareOptions } from '@/utils/share'

export default {
  metaInfo: {
    title: '年终狂欢 瓜分1亿'
  },
  components: { Rule },
  props: {},
  data() {
    return {
      showControls: false,
      beeIcon: {
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        rule: require('@/assets/icon/alcohol/liqueur_button_rule.png')
      },
      showRule: false,
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initShare()
    // 如果有store说明该页面作为组件在webApp显示
    if (this.$store) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
    if (this.$route.query.uid) {
      Cookies.set('uid', this.$route.query.uid)
    }
    showShareIcon()
  },
  methods: {
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    async initShare() {
      try {
        const res = await getUID()
        this.uid = res.data.uid
        setShareOptions({
          title: '年终狂欢 瓜分1亿',
          desc: '购茅台一箱，送现金一万',
          link: location.origin + '/beeAlcohol#/?uid=' + this.uid
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.bee-alcohol {
  @videoWidth: 6.68rem;
  @videoHeight: 3.76rem;
  .video {
    width: 100%;
    border-radius: 0.08rem;
    position: absolute;
    top: 1.36rem;
    display: flex;
    justify-content: center;
    .video-body {
      object-position: center;
      width: @videoWidth;
      height: @videoHeight;
      border-radius: 0.08rem;
      object-fit: cover;
    }
    .control {
      width: 100%;
      height: @videoHeight;
      top: 0;
      left: 0;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .bottom-btn {
    height: auto;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1000;
    left: 0;
  }
}
</style>
