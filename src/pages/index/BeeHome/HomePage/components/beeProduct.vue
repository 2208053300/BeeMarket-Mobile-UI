<template>
  <div
    class="bee-product"
    :style="{backgroundImage:'url('+homeData.plan.show_image+')'}"
    @click="goUrl(homeData.plan.url,homeData.plan.plan_id)"
  />
</template>

<script>
export default {
  components: {},
  props: {
    homeData: {
      type: Object,
      default: () => {
        return {
          plan: {
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
.bee-product {
  margin: 0 0.16rem 0.2rem;
  height: 2.2rem;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.2rem @Grey6;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
