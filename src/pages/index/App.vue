<template>
  <div id="app">
    <bee-header v-show="$store.state.app.beeHeader" />
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
>
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view
      v-if="!$route.meta.keepAlive"
      style="height:100%"
    >
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
    <bee-footer v-show="$store.state.app.beeFooter.show" />
  </div>
</template>
<script>
import BeeHeader from './components/BeeHeader'
import BeeFooter from './components/BeeFooter'

export default {
  metaInfo: {
    title: '蜂集市'
  },
  components: {
    BeeHeader,
    BeeFooter
  }
}
</script>

<style lang="less">
</style>
