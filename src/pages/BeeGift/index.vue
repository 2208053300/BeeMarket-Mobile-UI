<template>
  <div id="app">
    <bee-header />
    <router-view />
  </div>
</template>

<script>
import BeeHeader from '@/components/BeeHeader'
export default {
  components: {
    BeeHeader
  }
}
</script>
