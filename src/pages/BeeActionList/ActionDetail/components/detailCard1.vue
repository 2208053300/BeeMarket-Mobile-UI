<template>
  <div class="card1 bg-white">
    <!-- 标题 -->
    <div class="action-title flex">
      <div class="img">
        <img
          :src="beeIcon.titleImg"
          class="icon"
        >
      </div>
      <div class="title">
        <p class="main-title no-wrap">
          {{ actionDetails.main_title }}
        </p>
        <p class="sub-title  no-wrap">
          {{ actionDetails.subtitle }}
        </p>
      </div>
    </div>
    <!-- 进度 webapp 显示 ，分享打开不显示 -->
    <div
      v-if="actionDetails.is_schedule"
      class="action-progress"
    >
      <div class="percent">
        {{ actionDetails.schedule }}%
      </div>
      <div class="progress-bar">
        <van-progress
          :percentage="actionDetails.schedule"
          :show-pivot="showPercent"
          :color="BeeDefault"
        />
      </div>
    </div>
    <!-- 参与人数 -->
    <div
      v-if="actionDetails.is_schedule"
      class="action-help flex flex-around"
    >
      <div class="help-content flex align-center flex-center">
        <div class="help-icon">
          <img
            :src="beeIcon.participate"
            class="icon"
          >
        </div>
        <div>
          <div class="help-text">
            已参与助力
          </div>
          <div class="help-time">
            <span class="bee-text">
              {{ actionDetails.participate_num }}
            </span>人
          </div>
        </div>
      </div>
      <!-- <div class="right-line" /> -->
      <div class="help-content flex align-center flex-center">
        <div class="help-icon">
          <img
            :src="beeIcon.aim"
            class="icon"
          >
        </div>
        <div>
          <div class="help-text">
            目标参与需
          </div>
          <div class="help-time">
            <span class="bee-text">
              {{ actionDetails.initiate_people_num }}
            </span>人
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="join-num"
    >
      <div class="help-icon">
        <img
          :src="beeIcon.participate"
          class="icon"
        >
      </div>
      <div class="help-text">
        已参与助力
        <div class="help-time">
          <span class="bee-text">
            {{ actionDetails.participate_num }}
          </span>人
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
        titleImg: require('@/assets/icon/discover/publicwelfare_share_icon_activity@2x.png'),
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
    .img {
      margin-right: 0.1rem;
      display: flex;
      .icon {
        width: 0.78rem;
        height: 0.78rem;
        margin: auto;
      }
    }
    .main-title {
      font-size: 0.32rem;
      margin-bottom: 0.2rem;
      margin-top: 0;
      font-weight: 600;
    }
    .sub-title {
      font-size: 0.26rem;
      color: #666;
      margin-bottom: 0;
      margin-top: 0;
    }
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
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    // align-items: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .help-content {
      text-align: center;
      position: relative;
      width: 50%;
      border-right: 1px solid #ddd;
      &:last-child {
        border: none;
      }
      .help-icon {
        width: 0.8rem;
        height: 0.8rem;
        color: @BeeDefault;
        display: flex;
        margin-right: 0.1rem;
        .icon {
          width: 0.78rem;
          height: 0.78rem;
          margin: auto;
        }
      }
      .help-text {
        font-size: 0.26rem;
      }
      .help-time {
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
    .right-line {
      width: 0.02rem;
      height: 1rem;
      background-color: @Grey7;
    }
  }
  .join-num {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.32rem;
    margin-right: 0.3rem;
    align-items: center;
    .help-icon {
      width: 0.36rem;
      height: 0.36rem;
      margin-right: 0.08rem;
    }
    .help-text {
      font-size: 0.22rem;
      .help-time {
        display: inline-block;
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
  }
}
</style>
