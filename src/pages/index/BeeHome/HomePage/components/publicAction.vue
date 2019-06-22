<template>
  <div
    class="public-action"
    :style="{backgroundImage:'url('+homeData.charity_action.action.show_img+')'}"
  >
    <div
      class="action-header"
      :style="{backgroundImage:'url('+homeData.charity_action.show_image+')'}"
      @click="$router.push('/discover')"
    />
    <div
      class="action-body"
      @click="$router.push({path:'/discover/action',query:{id:homeData.charity_action.action.action_id}})"
    >
      <span class="action-title">
        {{ homeData.charity_action.action.main_title }}
      </span>
      <div class="action-subhead">
        {{ homeData.charity_action.action.subtitle }}
      </div>
      <div class="body-overlay" />
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
          charity_action: {
            action: {}
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
  methods: {}
}
</script>

<style scoped lang="less">
.public-action {
  margin: 0.2rem 0.16rem 0;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.2rem @Grey6;
  overflow: hidden;
    background-size: cover;
  .action-header {
    height: 2.24rem;
    background-size: cover;
  }
  .action-body {
    background-size: cover;
    height: 1.76rem;
    padding: 0.4rem 0.3rem 0.32rem;
    box-sizing: border-box;
    position: relative;
    .action-title {
      position: relative;
      font-size: 0.3rem;
      color: #ffffff;
      z-index: 1;
    }
    .action-subhead {
      position: relative;
      font-size: 0.24rem;
      color: #ffffff;
      margin-top: 0.2rem;
      z-index: 1;
    }
    .body-overlay {
      height: 1.76rem;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 0;
    }
  }
}
</style>
