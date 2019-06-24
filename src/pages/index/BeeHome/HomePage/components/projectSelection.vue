<template>
  <div class="project-selection">
    <div class="product-title">
      专题精选
    </div>
    <div class="project-list">
      <div
        v-for="(project, index) in homeData.feature.top"
        :key="index"
        class="project-detail"
        @click="goDetail(project)"
      >
        <div class="project-img">
          <img
            :src="project.show_image ||$store.state.app.defaultImg2"
            alt="专题图片"
          >
        </div>
        <div class="project-name">
          {{ project.mixed_name }}
        </div>
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
          feature: {
            top: [
              {
                share_data: []
              }
            ],
            other: [
              {
                products: []
              },
              {
                share_data: []
              }
            ]
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
    goDetail(project) {
      if (project.type === 1) {
        this.$router.push({
          path: '/beeActiveTpl',
          query: { id: project.mixed_id }
        })
      } else if (project.type === 2) {
        console.log(`/discover/article/${project.mixed_id}`)

        this.$router.push({
          path: `/discover/article/${project.mixed_id}`
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.project-selection {
  margin-top: 0.2rem;
  padding: 0.32rem 0.32rem 0.4rem;
  background-color: #fff;
  .product-title {
    font-size: 0.34rem;
  }
  .project-list {
    display: flex;
    overflow-y: scroll;
    margin-top: 0.3rem;
    .project-detail {
      margin-right: 0.2rem;
      .project-img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.08rem;
        overflow: hidden;
      }
      .project-name {
        font-size: 0.3rem;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
