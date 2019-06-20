<template>
  <router-view id="app" />
</template>

<script>
export default {
  meteInfo() {
    return {
      title: '蜂友圈'
    }
  },
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  async beforeCreate() {
    // 初始化实例之前判断该用户蜂友圈状态跳转页面
    await this.$store.dispatch('GerUserStatus')
    // 0 非合伙人 1 合伙人 2 冻结
    if (this.$store.state.user.userStatus === 0) {
      this.$router.replace({ name: 'introduction' })
    } else if (this.$store.state.user.userStatus === 1) {
      this.$router.replace({ name: 'beeFriends' })
    } else if (this.$store.state.user.userStatus === 2) {
      this.$router.replace({ name: 'freeze' })
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
