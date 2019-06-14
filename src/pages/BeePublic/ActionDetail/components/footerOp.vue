<template>
  <div class="action-footer">
    <div class="footer-op1">
      <van-button
        round
        class="join-help"
        :disabled="actionData.is_join"
        @click="showSuccess=true"
      >
        参与助力
      </van-button>
      <!-- <van-button round class="join-help">
      进入活动中心
    </van-button> -->
    </div>
  </div>
</template>

<script>
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
  methods: {}
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
