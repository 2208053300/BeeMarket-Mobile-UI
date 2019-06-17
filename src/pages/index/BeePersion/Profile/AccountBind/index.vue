<template>
  <div class="profile">
    <ul class="cell-list bg-white">
      <li>
        <div class="item flex flex-between align-center">
          <span class="title">手机绑定</span>
          <div class="link-icon  flex align-center">
            <span class="tip">请尽快绑定您的手机号码</span>
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <li>
        <div class="item flex flex-between align-center">
          <span class="title">微信绑定</span>
          <div class="link-icon  flex align-center">
            <span class="tip">请尽快绑定您的微信</span>
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <li>
        <div class="item flex flex-between align-center">
          <span class="title">qq绑定</span>
          <div class="link-icon flex align-center">
            <span class="tip">请尽快绑定您的QQ</span>
            <van-icon name="arrow" size="0.26rem" color="#666" class="icon" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '账户安全'
  },
  components: {

  },
  props: {

  },
  data() {
    return {
      avatarImg: require('@/assets/icon/personalCenter/head_default.png')

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.profile{
  padding-top: .2rem;
  li{
    padding-left:.3rem;
    box-sizing: border-box;
    .item{padding: .3rem .2rem .3rem 0; border-bottom: 1px solid #eee;}

    &:last-child{
      .item{border-bottom:none;}
    }
  }
  .title{font-size: .3rem;color:#333;}
  .avatar{width: 1rem;height: 1rem; margin-right: .2rem;}
  .tip{font-size:0.26rem ;color:#999; margin-right: 0.2rem;}
}
</style>
