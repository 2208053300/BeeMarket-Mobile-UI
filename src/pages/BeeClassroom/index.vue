<template>
  <div :class="{ showHeader: showHeader }">
    <bee-header v-show="showHeader" />
    <router-view />
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
  computed: {
    showHeader() {
      return getOs().isWx
    }
  }
}
</script>
<style lang="less">
body {
  background: white;
}
.showHeader {
  padding-top: 46px;
  box-sizing: border-box;
}
</style>
