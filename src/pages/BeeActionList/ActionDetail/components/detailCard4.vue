<template>
  <div
    class="card3 bg-white"
    :style="{backgroundImage:'url('+beeIcon.confirmorder_pic_description+')'}"
  >
    <!-- 活动说明 -->
    <div class="action-explain">
      <p class="title">
        活动说明
      </p>
      <p
        v-for="(item, index) in actionDetails.activity_directions"
        :key="index"
        class="info"
        :class="{first: index===0}"
      >
        {{ item.content }} <span>{{ item.desc }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    actionDetails: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      beeIcon: {
        confirmorder_pic_description: require('@/assets/icon/discover/confirmorder_pic_description@2x.png')
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
.card3 {
  padding: 0.32rem;
  background: no-repeat right top;
  background-size: 1.32rem 1.09rem;
  background-color: #fff;
  .action-explain {
    p {
      margin: 0;
    }
    .title {
      font-size: 0.28rem;
      color: #333;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }
    .info {
      font-size: 0.24rem;
      color: #333;

      &.first{
        margin-bottom: 0.1rem;
      }
    }

    span {
      font-size: 0.22rem;
      color: #999;
    }
  }
}
</style>
