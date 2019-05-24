<template>
  <div id="app">
    <bee-header />
    <router-view />
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
