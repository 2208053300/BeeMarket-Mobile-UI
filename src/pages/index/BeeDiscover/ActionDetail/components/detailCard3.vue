<template>
  <div class="card3">
    <div class="action-title">
      项目进度
    </div>
    <div class="action-content">
      <div
        v-for="item in actionDetails.progress"
        :key="item.title"
        class="action-progress"
      >
        <div class="progress-time">
          <div class="progress-cir" />
          {{ item.time }}
        </div>
        <div class="progress-content">
          <div class="progress-title">
            {{ item.title }}
          </div>
          <div class="progress-subhead">
            {{ item.title2 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
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
      BeeDefault
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
  .action-title {
    font-size: 0.28rem;
  }
  .action-content {
    margin-top: 0.24rem;
    font-size: 0.24rem;
    color: @Grey2;
    .action-progress {
      &:last-child .progress-content {
        border-color: #ffffff;
      }
      .progress-time {
        display: flex;
        font-size: 0.22rem;
        color: @Grey1;
        .progress-cir {
          background-color: #fff;
          box-sizing: border-box;
          width: 0.2rem;
          height: 0.2rem;
          border: 0.05rem solid @BeeDefault;
          border-radius: 50%;
          margin-right: 0.2rem;
          vertical-align: middle;
        }
      }
      .progress-content {
        margin-left: 0.08rem;
        padding: 0.24rem 0 0.6rem 0.3rem;
        border-left: 0.02rem solid @Grey7;
        box-sizing: border-box;

        .progress-title {
          font-size: 0.28rem;
        }
        .progress-subhead {
          font-size: 0.24rem;
          color: @Grey2;
          margin-top: 0.18rem;
        }
      }
    }
  }
}
</style>
