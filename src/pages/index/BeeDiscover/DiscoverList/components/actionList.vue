<template>
  <div class="action-list">
    <van-pull-refresh
      v-model="loading"
      @refresh="getActionListData"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        :immediate-check="false"
        @load="onLoad"
      >
        <!-- :immediate-check="false" -->
        <div
          v-for="(item,index) in actionList"
          :key="index"
          class="action-content"
          @click="$router.push({path:'/discover/action',query:{id:item.id}})"
        >
          <div class="action-img">
            <img
              :src="item.background_image_url"
              alt=""
            >
          </div>
          <div class="action-title">
            {{ item.main_title }}
          </div>
          <div class="action-subhead">
            {{ item.subtitle }}
          </div>
          <div class="action-progress">
            <div class="percent">
              {{ item.schedule }}%
            </div>
            <div class="progress-bar">
              <van-progress
                :percentage="item.schedule"
                :show-pivot="showPercent"
                :color="BeeDefault"
              />
            </div>
          </div>
          <div class="action-status">
            <div class="action-help">
              <van-icon :name="beeIcon.heart_solid" />已有<span class="bee-text">{{ item.participate_num }}</span>人参与助力
            </div>
            <div class="action-need">
              <van-icon :name="beeIcon.heart_hollow" />需要<span class="bee-text">{{ item.initiate_people_num }}</span>人参与项目
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { getActionList } from '@/api/BeeApi/action'

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
      },
      page: 1
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
      this.actionList = res.data
      this.page = 2
      // 加载状态结束
      this.loading = false
      if (res.data.length < 10) {
        this.finished = true
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getActionList({ page: this.page })
        this.actionList.push(...res.data)
        this.page++
        this.loading = false
        // 数据全部加载完成
        if (res.data.length === 0) {
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
    box-shadow: 0 0 0.1rem 0.04rem @Grey7;
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
