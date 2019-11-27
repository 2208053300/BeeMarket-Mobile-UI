<template>
  <div>
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
    <bee-footer v-show="$store.state.app.beeFooter.show" />
  </div>
</template>
<script>
import BeeHeader from '@/components/BeeHeader'
import BeeFooter from '@/components/BeeFooter'
import { getUID } from '@/api/BeeApi/user'
import { setShareOptions } from '@/utils/share'
import { getOs } from '@/utils'

export default {
  metaInfo: {
    title: '年终狂欢 瓜分10亿'
  },
  components: {
    BeeHeader,
    BeeFooter
  },
  data() {
    return {
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
      if (getOs().isWx) {
        setShareOptions({
          title: '年终狂欢，瓜分10亿',
          desc: '茅台免费喝，现金轻松赚！\n全民抢酒，全民抢钱！',
          link: this.uid ? location.origin + '/beeAlcohol#/?uid=' + this.uid : location.origin + '/beeAlcohol#/'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.showHeader {
  padding-top: 46px;
  box-sizing: border-box;
}
</style>
