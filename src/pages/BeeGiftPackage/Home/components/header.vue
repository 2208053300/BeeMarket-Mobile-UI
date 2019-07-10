<template>
  <div class="bee-header white-back">
    <van-icon
      slot="left"
      :name="beeIcon.tab_icon_home_s"
      size="0.5rem"
      style="margin-left: 15px"
      @click="goHome"
    />
    <span v-show="showTitle">
      农产品礼包
    </span>
    <span
      style="font-size: 0.24rem;margin-right: 15px"
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
      showTitle: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
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
    }
  }
}
</script>

<style  lang="less">
.bee-header {
  width: 100%;
  height: 46px;
  top: 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: fixed;
}
.white-back {
  background: white;
  color: black;
}
.transparent-back {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
}
</style>
