<template>
  <div class="main-action">
    <div
      class="bee-product"
      :style="{backgroundImage:'url('+(homeData.new_user.show_image ||$store.state.app.defaultImg3)+')'}"
      @click="$router.push('/beeTask')"
    />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    homeData: {
      type: Object,
      default: () => {
        return {
          new_user: {
            show_image: ''
          }
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goUrl(url, id) {
      // REVIEW
      this.$router.push({ path: '/beeActiveTpl', query: { id: id }})
    }
  }
}
</script>

<style scoped lang="less">
.main-action {
  .bee-product {
    margin: 0.2rem 0.16rem;
    height: 2.2rem;
    background-color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.2rem @Grey6;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
