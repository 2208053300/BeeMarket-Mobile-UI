<template>
  <div class="factory-success text-center">
    <img :src="icon.wait" class="wait-icon">
    <p class="tip-text">
      资料提交成功
    </p>
    <p class="tip-txt">
      蜂集市会在1-3个工作日内与您联系<br>请保持手机通畅
    </p>
    <button type="button" class="back-btn" @click="goHome">
      回到首页
    </button>
    <img :src="icon.bg" class="bottom">
  </div>
</template>

<script>
import { getOs } from '@/utils'
export default {
  metaInfo: {
    title: '入驻结果'
  },
  components: {},
  props: {},
  data() {
    return {
      // 所需图片
      icon: {
        wait: require('@/assets/icon/joinFactory/enter_icon_time.png'),
        bg: require('@/assets/icon/joinFactory/enter_pic_bg.png')
      },
      // 获取 os 平台
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    // document.querySelector('#app').style.backgroundColor = '#FACE55'
    // document.querySelector('#app').className = 'yellow'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    // document.querySelector('#app').style.background = ''
    // document.querySelector('#app').className = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    const screenW = document.body.clientWidth
    const screenH = document.body.clientHeight
    console.log(screenW, screenH, document.getElementsByClassName('factory-success'))

    document.getElementsByClassName('factory-success')[0].style.width = screenW + 'px'
    document.getElementsByClassName('factory-success')[0].style.height = screenH + 'px'
  },
  methods: {
    // 跳转到入驻政策
    goHome() {
      if (this.osObj.isWx) {
        this.$router.push({
          path: '/'
        })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.GoIndex.postMessage('')
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.GoIndex()
      } else {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
}
</script>

<style scope lang="less">

.factory-success {
  letter-spacing:1px;
  color: #fff;
  background-color: #FACE55;
  p {
    margin: 0;
  }
  .wait-icon {
    width: 2.34rem;
    height: 2.12rem;
    margin-top: 2rem;
  }
  .tip-text {
    font-size: 0.4rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  .tip-txt {
    font-size: 0.3rem;
    line-height: 1.7;
  }
  .back-btn {
    letter-spacing:1px;
    border: none;
    margin-top: 2rem;
    color:#FACE55;
    font-size: 0.4rem;
    font-weight: 600;
    padding: 0.2rem .7rem;
    border-radius: 30px;
    background-color: #fff;
    box-shadow:0 0.1rem 0 #FCDF66, 0 0.2rem 2px #F4C147;
  }
  .bottom{
    width: 100%;
    height: 1.99rem;
    position: fixed;
    bottom: 0;
    left: 0;

  }
}
</style>
