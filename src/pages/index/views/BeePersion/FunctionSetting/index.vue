<template>
  <div>
    <van-nav-bar title="功能设置">
      <div
        slot="left"
        class="nav-right"
      >
        <div>
          <van-icon
            name="arrow-left"
            size="20px"
          />
        </div>
      </div>
    </van-nav-bar>

    <div class="fun-list margin-t-20">
      <van-cell title="功能反馈" is-link to="/functionFeedBack" />
    </div>

    <van-button type="primary" block class="margin-t-20">
      退出
    </van-button>
  </div>
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
  created() {

  },
  mounted() {

  },
  methods: {
    goSetting() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
