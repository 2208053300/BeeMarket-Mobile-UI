<template>
  <div class="action-list">
    <van-pull-refresh
      v-model="loading"
      @refresh="getActionListData"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="item in actionList"
          :key="item.title"
          class="action-content"
          @click="$router.push('/discover/action')"
        >
          <div class="action-img">
            <img
              :src="item.img"
              alt=""
            >
          </div>
          <div class="action-title">
            {{ item.title }}
          </div>
          <div class="action-subhead">
            {{ item.title2 }}
          </div>
          <div class="action-progress">
            <div class="percent">
              {{ item.help/item.need|getPercent }}%
            </div>
            <div class="progress-bar">
              <van-progress
                :percentage="item.help/item.need|getPercent"
                :show-pivot="showPercent"
                :color="BeeDefault"
              />
            </div>
          </div>
          <div class="action-status">
            <div class="action-help">
              <van-icon :name="beeIcon.heart_solid" />已有<span class="bee-text">{{ item.help }}</span>人参与助力
            </div>
            <div class="action-need">
              <van-icon :name="beeIcon.heart_hollow" />需要<span class="bee-text">{{ item.need }}</span>人参与项目
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { getActionList } from '@/api/discover'

export default {
  components: {},
  filters: {
    getPercent(val) {
      return val.toFixed(2) * 100
    }
  },
  props: {},
  data() {
    return {
      BeeDefault,
      actionList: [],
      showPercent: false,
      loading: false,
      finished: false,
      beeIcon: {
        heart_solid: require('@/assets/icon/discover/publicwelfare_icon_heart_solid@2x.png'),
        heart_hollow: require('@/assets/icon/discover/publicwelfare_icon_heart_hollow@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getActionListData()
  },
  methods: {
    async getActionListData() {
      const res = await getActionList()
      this.actionList = res.data.actionData
      // 加载状态结束
      this.loading = false
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getActionList()
        this.actionList.push(...res.data.actionData)
        // 数据全部加载完成
        if (this.actionList.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.action-list {
  margin-top: 0.04rem;
  .action-content {
    margin-top: 0.2rem;
    background-color: #fff;
    border-radius: 0.16rem;
    overflow: hidden;
    padding: 0.2rem;
    box-sizing: border-box;
    .action-img {
      width: 6.56rem;
      height: 2.78rem;
      margin: auto;
      border-radius: 0.16rem;
      overflow: hidden;
    }
    .action-title {
      font-size: 0.32rem;
      margin-top: 0.2rem;
    }
    .action-subhead {
      font-size: 0.26rem;
      color: @Grey1;
      margin-top: 0.16rem;
    }
    .action-progress {
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
    .action-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.2rem;
      font-size: 0.22rem;
      color: @Grey2;
      .van-icon {
        vertical-align: text-top;
        color: @Red1;
        margin-right: 0.12rem;
      }
      .bee-text {
        color: @BeeDefault;
      }
      .action-help {
        text-align: left;
      }
      .action-need {
        text-align: right;
      }
    }
  }
}
</style>
