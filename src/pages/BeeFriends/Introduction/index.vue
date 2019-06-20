<template>
  <div class="public-interest-partner text-center">
    <img src="../../../assets/icon/joinFriendCicle/gy_part1.png" alt="公益合伙人">
    <video controls="controls" poster="../../../assets/icon/register/vedio_bg.png" style="width: 100%">
      <source src="/static/video/film.mp4" type="video/mp4">
    </video>
    <!-- {// <img src="../../../assets/icon/joinFriendCicle/teach(new).png" alt=""> } -->
    <img src="../../../assets/icon/joinFriendCicle/gy_part2.png" alt="公益合伙人">
    <img src="../../../assets/icon/joinFriendCicle/gy_part3.png" alt="公益合伙人">
    <img src="../../../assets/icon/joinFriendCicle/gy_part4.png" alt="公益合伙人">
    <img src="../../../assets/icon/joinFriendCicle/gy_part5.png" alt="公益合伙人">
    <img src="../../../assets/icon/joinFriendCicle/gy_part6.png" alt="公益合伙人">
    <!-- 根据状态显示不同的按钮 -->
    <!-- 注册按钮 -->
    <a v-if="false" class="action2 no-tap-highlight" @click="goRegister">
      <img src="../../../assets/icon/joinFriendCicle/rgtBtn.png">
    </a>
    <!-- 申请合伙人按钮 -->
    <a class="action no-tap-highlight" @click="goApply">
      <img src="../../../assets/icon/joinFriendCicle/button.png">
    </a>
  </div>
</template>

<script>
import { getOs } from '@/utils'
export default {
  metaInfo: {
    title: '公益合伙人'
  },
  components: {},
  props: {},
  data() {
    return {
      // 获取 os 平台
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // this.getArticleDetailData()
    this.clearHistory()
  },
  methods: {
    // 跳转到注册页面
    goRegister() {
      this.$router.push({
        path: '/beeRegister'
      })
    },

    // 跳转到申请页面
    goApply() {
      this.$router.push({
        name: 'apply'
      })
    },
    // 清除历史
    clearHistory() {
      if (this.osObj.isWx) {
      // this.$router.push({
      //   path: '/category/details',
      //   query: {
      //     pid,
      //     target
      //   }
      // })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.clearHistory.postMessage({ url: window.location.href })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.clearHistory()
      } else {
      // this.$router.push({
      //   path: '/category/details',
      //   query: {
      //     pid,
      //     target
      //   }
      // })
      }
    }

  }
}
</script>

<style scoped  lang="less">
//inPartner.html earnedRouter.html
.public-interest-partner{
    width: 100%;
    img{width: 100%; height:auto; display: block;}
}
.public-interest-partner{
    .action{width: 100%; height: 3.98rem; background: url(../../../assets/icon/joinFriendCicle/background.png) no-repeat; background-size:100% 100% ; padding-top: 0.55rem;
        display: block;
        box-sizing: border-box;
        img{width: 4.3rem; height: 1.1rem; margin: 0 auto;}
    }
    .action2{width: 100%; height: 3.69rem; background: url(../../../assets/icon/joinFriendCicle/gy_part7_2.png) no-repeat; background-size:100% 100% ; padding-top: 0.55rem;
        display: block;
        box-sizing: border-box;
        img{width: 4.3rem; height: 1.1rem; margin: 0 auto;}
    }
}
</style>
