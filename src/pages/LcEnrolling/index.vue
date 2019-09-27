<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import { isJoin } from '@/api/BeeApi/lcEnrollingApi'
import { getOs } from '@/utils'
export default {
  metaInfo: {
    title: '联创大赛'
  },
  components: {},
  mounted() {
    isJoin().then(res => {
      if (res.data.is_join === 1) {
        if (getOs().isApp) {
          this.$router.replace({ name: 'lcEnrollingSucceedWechat' })
        } else {
          this.$router.replace({ name: 'lcEnrollingSucceed' })
        }
      } else {
        this.$router.replace({ name: 'lcEnrolling' })
      }
    })
  }
}
</script>
