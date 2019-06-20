<template>
  <div />
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  async beforeCreate() {
    // 初始化实例之前判断该用户蜂友圈状态跳转页面
    await this.$store.dispatch('GerUserStatus')
    console.log('蜂友圈状态：', this.$store.state.user.userStatus)
    setTimeout(() => {
      console.log('蜂友圈状态：', this.$store.state.user.userStatus)
    }, 1000)
    // 0 非合伙人 1 合伙人 2 冻结
    if (this.$store.state.user.userStatus === 0) {
      this.$router.push({ name: 'introduction' })
    } else if (this.$store.state.user.userStatus === 1) {
      this.$router.push({ name: 'beeFriends' })
    } else if (this.$store.state.user.userStatus === 2) {
      this.$router.push({ name: 'freeze' })
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
  meteInfo() {
    return {

      title: '蜂友圈'
    }
  }
}
</script>

<style scoped lang="less">

</style>
