<template>
  <div class="bottom-card">
    <div class="card-bottom">
      <div class="action-card">
        <img
          :src="homeData.limited_plan.left.show_image ||$store.state.app.defaultImg3"
          alt="限量蜂抢"
          @click="$router.push('/beeLimit')"
        >
      </div>
      <div class="action-card">
        <img
          :src="homeData.limited_plan.right.show_image ||$store.state.app.defaultImg3"
          alt="集市活动"
          @click="$router.push({path:'/beeActiveTpl',query:{id:homeData.limited_plan.right.plan_id}})"
        >
      </div>
    </div>
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
          daily_product: {
            products: [],
            slogan: '集市每天都会为你推荐好货1'
          },
          limited_plan: {
            left: {
              show_image: ''
            },
            right: {
              show_image: ''
            }
          }
        }
      }
    }
  },
  data() {
    return {
      beeIcon: {
        home_icon_everyday: require('@/assets/icon/home/index/home_icon_everyday@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goDetail(pid, target) {
      this.$router.push({
        path: '/category/details',
        query: { pid: pid, target: target }
      })
      this.$store.state.order.target = target
    }
  }
}
</script>

<style scoped lang="less">
.bottom-card {
  margin: 0.2rem 0.16rem 0;
  box-shadow: 0 0 0.2rem @Grey6;
  overflow: hidden;
  .card-bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 2.12rem;
    grid-column-gap: 0.1rem;
    .action-card{
      border-radius: 0.2rem;
      overflow: hidden;
    }
  }
}
</style>
