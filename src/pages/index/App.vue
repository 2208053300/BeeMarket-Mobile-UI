<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
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
