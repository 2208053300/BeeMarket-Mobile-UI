<template>
  <div class="project-selection">
    <div class="product-title">
      专题精选
    </div>
    <div class="project-list">
      <div
        v-for="project in homeDate.selectionProject"
        :key="project.name"
        class="project-detail"
      >
        <div class="project-img">
          <img
            :src="project.previewImg"
            alt=""
          >
        </div>
        <div class="project-name">
          {{ project.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    homeDate: {
      type: Object,
      default: () => {
        return {}
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
  methods: {}
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
    .project-detail{
      margin-right: 0.2rem;
      .project-img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.08rem;
        overflow: hidden;
      }
      .project-name{
        font-size: 0.3rem;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
