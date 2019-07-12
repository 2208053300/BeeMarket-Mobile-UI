<template>
  <div class="communication-record">
    <div v-if="afterCommuniInfo.merchant_check" class="audit-status">
      <div class="status-title ">
        <span>商家审核</span>
        <span class="time">{{ afterCommuniInfo.merchant_check.time }}</span>
      </div>
      <div class="status-detail">
        <div class="status-text">
          审核结果：
          <span class="bee-text">{{ afterCommuniInfo.merchant_check.result }}</span>
        </div>
        <!-- TODO 如果商家通过不显示 -->
        <template v-if="afterCommuniInfo.merchant_check.refuse_reason">
          <div class="status-text">
            拒绝原因：<span>{{ afterCommuniInfo.merchant_check.refuse_reason }}</span>
          </div>
          <div class="status-text">
            商家备注：<span>{{ afterCommuniInfo.merchant_check.remark }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="buyer-desc">
      <div class="desc-title ">
        <span>买家描述</span>
        <span class="time">{{ afterCommuniInfo.buyer_desc.time }}</span>
      </div>
      <div class="desc-detail">
        <div class="desc-text">
          申请原因：<span>{{ afterCommuniInfo.buyer_desc.apply_reason }}</span>
        </div>
        <div class="desc-text">
          问题描述：<span>{{ afterCommuniInfo.buyer_desc.problem_desc }}</span>
        </div>
      </div>
      <div class="desc-img">
        <div class="img-content">
          <img
            v-for="(item, index) in afterCommuniInfo.buyer_desc.imgs"
            :key="index"
            :src="item"
            @click="showPre(index)"
          >
        </div>
      </div>
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
import { getAftercommunicationDetail } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '沟通记录'
  },
  components: {},
  props: {},
  data() {
    return {
      afterCommuniInfo: {
        buyer_desc: {},
        merchant_check: {}
      },
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
    this.getAfterCommuniDetail()
  },
  methods: {
    // 获取沟通记录详情
    async getAfterCommuniDetail() {
      const res = await getAftercommunicationDetail({ aid: this.$route.query.aid })
      console.log('物流详情：', res)
      this.afterCommuniInfo = res.data
    },
    // 预览图片
    showPre(index) {
      if (this.touchMove) {
        this.touchMove = false
        return
      }
      this.preIndex = index
      this.imgList = this.afterCommuniInfo.buyer_desc.imgs
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
.communication-record {
  .audit-status {
    padding: 0.32rem 0.32rem 0.6rem;
    background-color: #fff;
    margin-bottom: 0.4rem;
    .status-title {
      display: flex;
      font-size: 0.26rem;
      justify-content: space-between;
      .time {
        font-size: 0.24rem;
        color: @Grey1;
      }
    }
    .status-detail {
      margin-top: 0.3rem;
      .status-text {
        font-size: 0.26rem;
        color: @Grey2;
        &:not(:last-child) {
          margin-bottom: 0.2rem;
        }
        span {
          color: @ProductName;
        }
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
  }
  .buyer-desc {
    padding: 0.3rem 0.32rem 1rem;
    background-color: #fff;
    .desc-title {
      display: flex;
      font-size: 0.26rem;
      justify-content: space-between;
      .time {
        font-size: 0.24rem;
        color: @Grey1;
      }
    }
    .desc-detail {
      margin: 0.3rem 0 0.7rem;
      .desc-text {
        font-size: 0.26rem;
        color: @Grey2;
        &:not(:last-child) {
          margin-bottom: 0.2rem;
        }
        span {
          color: @ProductName;
        }
      }
    }
    .desc-img {
      .img-content {
        display: grid;
        grid-template-columns: repeat(3, 2rem);
        grid-template-rows: 2rem;
        grid-gap: 0.3rem;
        border-radius: 0.2rem;
        overflow: hidden;
      }
    }
  }
}
</style>
