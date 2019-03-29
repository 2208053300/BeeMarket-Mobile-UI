<template>
  <div id="app">
    <router-view />
    <bee-footer v-show="$store.state.app.beeFooter.show" />
  </div>
</template>
<script>
import BeeFooter from './components/BeeFooter'

export default {
  components: {
    BeeFooter
  }
}
</script>

<style lang="less">
</style>
