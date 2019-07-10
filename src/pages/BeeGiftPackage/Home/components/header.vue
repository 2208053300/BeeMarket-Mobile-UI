<template>
  <div ref="header" class="bee-header">
    <van-icon
      slot="left"
      name="arrow-left"
      size="0.5rem"
      style="margin-left: 15px"
      :color="leftColor"
      @click="goHome"
    />
    <span v-show="showTitle">
      农产品礼包
    </span>
    <span
      style="font-size: 0.3rem;margin-right: 15px"
      @click="$emit('on-rule')"
    >
      规则
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        tab_icon_home_s: require('@/assets/icon/footer/tab_icon_home_s.png')
      },
      showTitle: false,
      maxX: 50,
      leftColor: 'ffffffee'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    goHome() {
      if (window.location.pathname === '/') {
        this.$store.state.app.beeHeader = false
        this.$store.state.app.beeFooter = {
          show: true,
          active: 0
        }
        this.$router.push('/')
      } else {
        window.location.href = this.$store.state.app.homeUri
      }
    },
    onScroll() {
      const pageYOffset = window.pageYOffset
      if (pageYOffset < 50) {
        const p = pageYOffset / this.maxX
        const color = (255 * p).toFixed()
        const opacity = (0.3 * p + 0.7).toFixed(2)
        const opacity2 = (p).toFixed(2)
        this.$refs.header.style.background = `linear-gradient(to bottom, rgba(${color}, ${color}, ${color}, ${opacity}), rgba(${color}, ${color}, ${color}, ${opacity2}))`
        if (p > 0.7) {
          // 设置字体颜色为黑色背景色为白色
          this.showTitle = true
          this.leftColor = 'rgba(0,0,0,0.7)'
          this.$refs.header.style.color = 'black'
        } else {
          this.leftColor = 'rgba(255,255,255,0.7)'
          this.$refs.header.style.color = 'white'
        }
      } else {
        // 设置字体颜色为黑色背景色为白色
        this.showTitle = true
        this.leftColor = 'rgba(0,0,0,0.7)'
        this.$refs.header.style.color = 'black'
        this.$refs.header.style.background = 'white'
      }
    }
  }
}
</script>

<style scoped lang="less">
.bee-header {
  width: 100%;
  height: 46px;
  top: 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: fixed;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
}
.white-back {
  background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255));
  color: black;
}
.transparent-back {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
}
</style>
