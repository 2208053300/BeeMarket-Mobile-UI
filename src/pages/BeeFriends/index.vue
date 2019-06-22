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
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      // 通过 `vm` 访问组件实例
      await vm.$store.dispatch('GerUserStatus')
      // 0 非合伙人 1 合伙人 2 冻结
      if (vm.$store.state.user.userStatus === 0) {
        vm.$router.replace({ name: 'introduction' })
      } else if (vm.$store.state.user.userStatus === 1) {
        vm.$router.replace({ name: 'beeFriends' })
      } else if (vm.$store.state.user.userStatus === 2) {
        vm.$router.replace({ name: 'freeze' })
      }
    })
  },
  computed: {},
  watch: {},

  created() {},
  mounted() {},
  methods: {}
}
</script>
