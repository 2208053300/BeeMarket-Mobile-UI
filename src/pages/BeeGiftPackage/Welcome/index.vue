<template>
  <div>
    <div @click="toGiftPackage" style="color: blue">
      去农礼包
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'

export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    toGiftPackage() {
      const osObj = getOs()
      if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToProducePackage.postMessage({
          alertRule: false
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToPackage(false)
      } else {
        this.$router.replace({ name: 'giftPackageHome' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
