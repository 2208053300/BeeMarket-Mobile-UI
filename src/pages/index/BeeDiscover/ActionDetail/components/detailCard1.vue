<template>
  <div class="card1">
    <div class="action-title">
      {{ actionDetails.title }}
    </div>
    <div class="action-subhead">
      {{ actionDetails.title2 }}
    </div>
    <div class="action-progress">
      <div class="percent">
        {{ actionDetails.help/actionDetails.need|getPercent }}%
      </div>
      <div class="progress-bar">
        <van-progress
          v-if="actionDetails.help"
          :percentage="actionDetails.help/actionDetails.need|getPercent"
          :show-pivot="showPercent"
          :color="BeeDefault"
        />
      </div>
    </div>
    <div class="action-help">
      <div class="help-content">
        <div class="help-icon">
          <van-icon :name="beeIcon.initiate" />
        </div>
        <div class="help-text">
          已发起助力
        </div>
        <div class="help-time">
          <span class="bee-text">
            {{ actionDetails.help }}
          </span>次
        </div>
        <div class="right-line" />
      </div>
      <div class="help-content">
        <div class="help-icon">
          <van-icon :name="beeIcon.participate" />
        </div>
        <div class="help-text">
          已参与助力
        </div>
        <div class="help-time">
          <span class="bee-text">
            {{ actionDetails.help }}
          </span>次
        </div>
        <div class="right-line" />
      </div>
      <div class="help-content">
        <div class="help-icon">
          <van-icon :name="beeIcon.aim" />
        </div>
        <div class="help-text">
          目标参与需
        </div>
        <div class="help-time">
          <span class="bee-text">
            {{ actionDetails.need }}
          </span>次
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  filters: {
    getPercent(val) {
      return val.toFixed(2) * 100
    }
  },
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
      showPercent: false,
      BeeDefault,
      beeIcon: {
        initiate: require('@/assets/icon/discover/publicwelfare_icon_initiate@2x.png'),
        participate: require('@/assets/icon/discover/publicwelfare_icon_participate@2x.png'),
        aim: require('@/assets/icon/discover/publicwelfare_icon_aim@2x.png')
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
.card1 {
  padding: 0.32rem 0;
  .action-title {
    font-size: 0.32rem;
    padding: 0 0.32rem;
  }
  .action-subhead {
    margin-top: 0.16rem;
    font-size: 0.26rem;
    color: @Grey1;
    padding: 0 0.32rem;
  }
  .action-progress {
    padding: 0 0.22rem;
    margin: 0.2rem 0 0.12rem;
    .percent {
      text-align: right;
      color: @BeeDefault;
      font-size: 0.2rem;
    }
    .van-progress {
      background-color: rgba(255, 164, 47, 0.05);
    }
  }
  .action-help {
    margin-top: 0.32rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .help-content {
      text-align: center;
      position: relative;
      &:last-child {
        border: none;
      }
      .help-icon {
        font-size: 0.6rem;
        color: @BeeDefault;
      }
      .help-text {
        font-size: 0.26rem;
      }
      .help-time {
        .bee-text {
          color: @BeeDefault;
        }
      }
      .right-line {
        position: absolute;
        right: 0;
        top: 0.2rem;
        width: 0.02rem;
        height: 1rem;
        background-color: @Grey7;
      }
    }
  }
}
</style>
