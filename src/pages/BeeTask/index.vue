<template>
  <div>
    <bee-header />
    <router-view
      style="height:100%"
      class="showHeader"
    />
  </div>
</template>

<script>
import BeeHeader from '@/components/index/BeeHeader'
export default {
  metaInfo: {
    title: '蜂集市'
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
