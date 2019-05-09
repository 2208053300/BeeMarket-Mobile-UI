<template>
  <div class="user-assessment">
    <div class="assessment-header">
      <div class="assessment-status">
        <div class="status-left">
          <span class="rate-text">评分</span>
          <van-rate v-model="assessmentData.assessmentRate" />
        </div>
        <div class="status-right">
          <span class="persent">{{ assessmentData.assessmentGood }}%</span>
          <span>好评率</span>
        </div>
      </div>
      <div class="assessment-type">
        <div
          class="type-tag"
          :class="{thisTag:assessmentType==='全部'}"
          @click="assessmentType='全部'"
        >
          全部
        </div>
        <div
          class="type-tag"
          :class="{thisTag:assessmentType==='有图'}"
          @click="assessmentType='有图'"
        >
          有图
        </div>
      </div>
    </div>

    <div class="assessment-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="item in assessmentList"
          :key="item.name"
          class="assessment-content"
        >
          <div class="user-details">
            <div class="user-name">
              <div class="head-img">
                <img
                  :src="item.head_img"
                  alt=""
                >
              </div>
              <span class="name">
                {{ item.name }}
              </span>
            </div>
            <div class="assessment-time">
              {{ item.date }}
            </div>
          </div>
          <van-rate v-model="item.rate" />
          <div class="assessment">
            {{ item.desc }}
          </div>
          <div class="assessment-img">
            <div
              v-for="item2 in item.assessmentImg"
              :key="item2"
              class="assessment-img-container"
            >
              <img
                :src="item2"
                alt=""
              >
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getAssessment } from '@/api/category'
export default {
  metaInfo: {
    title: '用户评价'
  },
  components: {},
  props: {},
  data() {
    return {
      assessmentData: {},
      assessmentType: '全部',
      loading: false,
      finished: false,
      assessmentList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getAssessment()
  },
  methods: {
    async getAssessment() {
      const res = await getAssessment()
      this.assessmentData = res.data
      this.assessmentList.push(...res.data.assessmentData)
      this.$store.state.app.beeFooter.show = false
    },
    onLoad() {
      setTimeout(async() => {
        const res = await getAssessment()
        this.assessmentList.push(...res.data.assessmentData)
        console.log(this.assessmentList)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.assessmentList.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.user-assessment {

  .assessment-header {
    padding: 0.4rem 0.3rem;
    background-color: #fff;
    .assessment-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .rate-text {
        font-size: 0.32rem;
        vertical-align: text-bottom;
      }
      .van-rate {
        display: inline-block;
        margin-left: 0.2rem;
      }
      .status-right {
        color: @Grey2;
        font-size: 0.24rem;
        .persent {
          font-size: 0.28rem;
          color: @BeeDefault;
          margin-right: 0.16rem;
        }
      }
    }
    .assessment-type {
      margin-top: 0.4rem;
      .type-tag {
        display: inline-block;
        border-radius: 0.24rem;
        font-size: 0.24rem;
        color: @Grey2;
        border: 0.02rem solid @Grey1;
        padding: 0.1rem 0.2rem;
        &:not(:last-child) {
          margin-right: 0.2rem;
        }
      }
      .thisTag {
        color: #ffffff;
        border-color: #ffffff;
        background: linear-gradient(to right, #ffa81e, #ff6d15);
      }
    }
  }
  .assessment-list {
    .assessment-content {
      margin-top: 0.2rem;
      padding: 0.4rem 0.3rem;
      background-color: #fff;
      .user-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-name {
          .head-img {
            width: 0.48rem;
            height: 0.48rem;
            border-radius: 50%;
            overflow: hidden;
            display: inline-block;
            vertical-align: middle;
          }
          .name {
            font-size: 0.26rem;
            color: @Grey2;
          }
        }
        .assessment-time {
          font-size: 0.22rem;
          color: @Grey1;
        }
      }
      .van-rate {
        margin-top: 0.2rem;
      }
      .assessment {
        font-size: 0.28rem;
        margin: 0.2rem 0;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .assessment-img {
          display: grid;
          grid-gap: 0.06rem;
          grid-template-columns: repeat(3, 1fr);
          .assessment-img-container {
            display: inline-block;
            border-radius: 0.1rem;
            overflow: hidden;
          }
        }
    }
  }
}
</style>
