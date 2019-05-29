<template>
  <div id="app">
    <bee-header />
    <router-view style="height:100%;" />
  </div>
</template>

<script>
import BeeHeader from '@/components/index/BeeHeader'
export default {
  components: {
    BeeHeader
  }
}
</script>
