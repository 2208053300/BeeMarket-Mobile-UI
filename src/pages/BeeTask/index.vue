<template>
  <div>
    <bee-header v-show="$store.state.app.beeHeader" />
    <router-view
      style="height:100%"
      :class="{ showHeader: $store.state.app.beeHeader }"
    />
  </div>
</template>

<script>
import BeeHeader from '@/components/index/BeeHeader'
export default {
  metaInfo: {
    title: '蜂任务'
  },
  components: {
    BeeHeader
  }
}
</script>

<style lang="less">
.showHeader {
  padding-top: 23px;
  box-sizing: border-box;
}
</style>
