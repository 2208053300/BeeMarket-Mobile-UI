<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
import { getOs } from '@/utils'

export default {
  components: {
  },
  data() {
    return {
      osObj: getOs(),
      uid: 0

    }
  },
  watch: {
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
          title: '蜂集市-让生活蜂富起来！',
          desc: '能省能免能赚，共享电商平台',
          imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          link: window.location.href.split('#')[0] + '#' + `/?uid=${this.uid}`
        })
      }
    }
  }
}
</script>
