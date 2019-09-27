<template>
  <div id="app">
    <!-- header组件有大部分页面存在 -->
    <bee-header v-show="$store.state.app.beeHeader" />
    <transition :name="transitionName">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          style="height:100%"
          :class="{showHeader:$store.state.app.beeHeader}"
        >
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view
        v-if="!$route.meta.keepAlive"
        style="height:100%"
        :class="{showHeader:$store.state.app.beeHeader}"
      >
        <!-- 这里是不被缓存的视图组件 -->
      </router-view>
    </transition>
    <transition name="van-slide-right">
      <back-top v-show="$store.state.app.backTop && !$store.state.app.backTopHide" />
    </transition>
    <bee-footer v-show="$store.state.app.beeFooter.show" />
  </div>
</template>
<script>
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
import { getOs } from '@/utils'
import BeeHeader from '@/components/BeeHeader'
import BeeFooter from '@/components/BeeFooter'
import backTop from '@/components/backTop'
export default {
  metaInfo: {
    title: '蜂集市'
  },
  components: {
    BeeHeader,
    BeeFooter,
    backTop
  },
  data() {
    return {
      osObj: getOs(),
      uid: 0,
      transitionName: 'van-slide-right'
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      // 如果同级
      if (toDepth === fromDepth) {
        this.transitionName = 'van-fade'
      } else {
        this.transitionName =
          toDepth < fromDepth ? 'van-slide-left' : 'van-slide-right'
      }
    }
  },
  mounted() {
    this.loadUID()
  },
  methods: {
    // 获取uid
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid
      if (this.osObj.isWx) {
        wxapi.wxShare({
          title: '蜂集市-让生活蜂富起来',
          desc: '能省能免能赚，共享电商平台',
          imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          link: window.location.href.split('#')[0] + '#' + `/?uid=${this.uid}`
        })
      }
    }
  }
}
</script>

<style lang="less">
.showHeader {
  padding-top: 46px;
  box-sizing: border-box;
}
</style>
