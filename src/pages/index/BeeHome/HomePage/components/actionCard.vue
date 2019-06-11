<template>
  <div class="action-card">
    <img
      :src="beeIcon.home_btn_two"
      alt=""
    >
    <div class="overlay">
      <!-- TODO 点击跳转蒙版 -->
      <div
        class="bee-task"
        @click="$router.push('/beeTask')"
      />
      <div class="bee-factory" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        // home_btn_two: require('@/assets/icon/home/index/home_btn_two@2x.png')
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
.action-card {
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.2rem @Grey6;
  margin: 0.2rem 0.16rem 0;
  height: 2.6rem;
  position: relative;
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    height: 2.6rem;
    width: 100%;
    .bee-task {
      width: 50%;
      height: 100%;
      display: inline-block;
    }
    .bee-factory {
      width: 50%;
      height: 100%;
      display: inline-block;
    }
  }
}
</style>
