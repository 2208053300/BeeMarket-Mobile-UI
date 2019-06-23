<template>
  <div class="action-footer">
    <div class="footer-op1">
      <van-button
        v-if="!actionData.is_join"
        round
        class="join-help"
        @click="helpActionData"
      >
        参与助力
      </van-button>
      <van-button
        v-else
        round
        class="join-help"
        @click="goHome()"
      >
        进入商城
      </van-button>
    </div>
  </div>
</template>

<script>
import { helpAction } from '@/api/BeeApi/action'
import { goHome } from '@/utils'

export default {
  components: {},
  props: {
    actionData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showSuccess: false,
      beeIcon: {
        publicwelfare_detail_pop_ups_icon_delete: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_icon_delete@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goHome,
    async helpActionData() {
      const res = await helpAction({
        aid: this.$route.query.aid,
        share_id: this.$route.query.user_id
      })
      this.$toast(res.message)
      if (res.status_code === 200) {
        this.$router.push({
          path: '/helpSuccess',
          query: {
            charity_value: res.data.charity_value
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.action-footer {
  .footer-op1 {
    position: fixed;
    bottom: 0;
    background-color: @Grey10;
    height: 1.28rem;
    line-height: 1.28rem;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    border-top: 0.02rem solid @Grey4;
    z-index: 100;
    .join-help {
      background-color: @BeeDefault;
      height: 0.88rem;
      width: 6.56rem;
      color: #ffffff;
      line-height: 0.88rem;
    }
  }
}
</style>
