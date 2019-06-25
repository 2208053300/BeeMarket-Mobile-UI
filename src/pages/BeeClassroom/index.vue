<template>
  <div>
    <bee-header v-show="$store.state.app.beeHeader" />
    <router-view :class="{showHeader:$store.state.app.beeHeader}" />
  </div>
</template>
<script>
import BeeHeader from '@/components/index/BeeHeader'
import { getOs } from '@/utils'
export default {
  metaInfo: {
    title: '集市课堂'
  },
  components: {
    BeeHeader
  },
  mounted() {
    const osObj = getOs()
    if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
      this.$store.state.app.beeHeader = false
    } else {
      this.$store.state.app.beeHeader = true
    }
  }
}
</script>
<style lang="less" scoped>
.showHeader {
  padding-top: 46px;
  box-sizing: border-box;
}
</style>
