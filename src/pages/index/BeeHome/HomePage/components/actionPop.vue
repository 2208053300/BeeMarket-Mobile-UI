<template>
  <div class="action-pop">
    <van-popup
      v-model="showPop"
      class="pop1"
      :close-on-click-overlay="false"
      @close="handleClose"
      @click-overlay="handleClose"
    >
      <div
        class="pop-content"
        @click="goTask"
      >
        <img
          :src="beeIcon.newuserimage"
          alt="新手专享"
        >
      </div>
      <div
        class="close-img"
        @click="handleClose"
      >
        <img
          :src="beeIcon.icon_cancel"
          alt=""
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { isLogin } from '@/utils/auth'
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        newuserimage: require('@/assets/icon/home/index/newuserimage@2x.png'),
        icon_cancel: require('@/assets/icon/home/index/icon_cancel@2x.png')
      },
      showPop: !this.$store.state.user.is_new_user
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.showPop = false
      this.$store.state.user.is_new_user = 1
    },
    // 去蜂任务
    async goTask() {
      if (!await isLogin()) {
        this.$router.push('/login')
      } else {
        this.$router.push('/beeTask')
      }
    }
  }
}
</script>

<style scoped lang="less">
.action-pop {
  .pop1 {
    border-radius: 0.1rem;
    overflow: initial;
    .pop-content {
      width: 5.4rem;
      height: 6.48rem;
    }
    .close-img {
      width: 0.6rem;
      height: 0.61rem;
      position: absolute;
      bottom: -1rem;
      left: 45%;
    }
  }
}
</style>
