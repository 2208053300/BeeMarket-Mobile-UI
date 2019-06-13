<template>
  <div class="error-response">
    <div class="logo-content">
      <img
        :src="beeIcon.login_logo"
        alt=""
      >
    </div>
    <span class="error-text">404</span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        login_logo: require('@/assets/icon/home/login_logo@2x.png')
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
.error-response {
  text-align: center;
  .logo-content {
    width: 2rem;
    height: 2rem;
    margin: auto;
  }
  .error-text {
    font-size: 1rem;
    color: @BeeDefault;
  }
}
</style>
