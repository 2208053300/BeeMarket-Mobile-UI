<template>
  <div class="user-assessment">
    <div class="assessment-header">
      <div class="assessment-status">
        <div class="status-left">
          <span class="rate-text">评分</span>
          <van-rate
            v-model="assessmentData.avg_score"
            readonly
          />
        </div>
        <div class="status-right">
          <span class="persent">{{ assessmentData.good_rate }}</span>
          <span>好评率</span>
        </div>
      </div>
      <div class="assessment-type">
        <div
          class="type-tag"
          :class="{thisTag:assessmentType==='全部'}"
          @click="getOrderData('')"
        >
          全部({{ assessmentData.comments_count }})
        </div>
        <div
          class="type-tag"
          :class="{thisTag:assessmentType==='有图'}"
          @click="getOrderData('image')"
        >
          有图({{ assessmentData.image_count }})
        </div>
      </div>
    </div>

    <div class="assessment-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
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
                  v-if="item.head_image"
                  :src="item.head_image"
                  alt=""
                >
                <img
                  v-else
                  :src="beeIcon.product_detail_icon_avatar"
                  alt=""
                >
              </div>
              <span class="name">
                {{ item.nickname }}
              </span>
            </div>
            <div class="assessment-time">
              {{ item.date }}
            </div>
          </div>
          <van-rate
            v-model="item.score"
            readonly
          />
          <div class="assessment">
            {{ item.content }}
          </div>
          <div class="assessment-img">
            <div
              v-for="(item2,index2) in item.images"
              :key="index2"
              class="assessment-img-container"
            >
              <img
                :src="item2"
                @click="showPre(index2,item.images)"
              >
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 图片预览 -->
    <van-image-preview
      v-model="showImgPre"
      :images="imgList"
      :start-position="preIndex"
      :show-indicators="true"
      :loop="true"
      class="previewImg"
      @close="closePre"
      @change="onChange2"
    >
      <template slot="index">
        {{ preIndex +1 }}/{{ imgList.length }}
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import { getAssessment } from '@/api/BeeApi/product'
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
      assessmentList: [],
      beeIcon: {
        product_detail_icon_avatar: require('@/assets/icon/product/product_detail_icon_avatar@2x.png')
      },
      formData: {},
      // 图片预览
      showImgPre: false,
      imgList: [],
      preIndex: 0,
      touchMove: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.formData.pid = this.$route.query.pid
  },
  methods: {
    async getAssessmentData() {
      const res = await getAssessment(this.formData)
      this.assessmentData = res.data
      this.assessmentList.push(...res.data.comments)
    },
    onLoad() {
      setTimeout(async() => {
        await this.getAssessmentData()
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.assessmentList.length === this.assessmentData.comments_count) {
          this.finished = true
        }
      }, 500)
    },
    getOrderData(filter) {
      if (filter === 'image') {
        this.formData.filter = 'image'
        this.assessmentList = []
        this.getAssessmentData()
        this.assessmentType = '有图'
      } else {
        delete this.formData.filter
        this.assessmentList = []
        this.getAssessmentData()
        this.assessmentType = '全部'
      }
    },
    // 预览图片
    showPre(index, images) {
      if (this.touchMove) {
        this.touchMove = false
        return
      }
      this.preIndex = index
      this.imgList = images
      this.showImgPre = true
      this.$store.state.app.beeHeader = false
    },
    closePre() {
      this.$store.state.app.beeHeader = true
    },
    onChange2(index) {
      this.preIndex = index
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
          height: 2.26rem;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
