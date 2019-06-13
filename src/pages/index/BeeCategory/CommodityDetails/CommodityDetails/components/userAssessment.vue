<template>
  <div class="user-assessment">
    <div class="has-assessment">
      <div
        class="assessment-title"
        @click="goAssessment()"
      >
        <div>用户评价（{{ commodityData.comments_count }}）</div>
        <div class="good-rate">
          <span><span class="percent">{{ commodityData.good_rate }}</span> 好评率</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="assessment-pre">
        <div
          v-for="item in commodityData.latest_comments"
          :key="item.nickname"
          class="assessment-container"
        >
          <div class="assessment-header">
            <div class="user">
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
              <span class="user-name">
                {{ item.nickname|hide_name }}
              </span>
            </div>
            <van-rate
              v-model="item.score"
              :icon="beeIcon.product_detail_icon_flower_pressed"
              :void-icon="beeIcon.product_detail_icon_flower_normat"
              readonly
            />
          </div>
          <div class="assessment-details">
            <span class="assessment">{{ item.content }}</span>
            <div class="assessment-img">
              <div
                v-for="item2 in item.images"
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
        </div>
      </div>
      <div class="show-all">
        <van-button
          type="default"
          round
        >
          查看全部评价
        </van-button>
      </div>
    </div>
    <!-- <div v-if="" class="no-assessment">
      暂无用户评价
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  filters: {
    hide_name(val) {
      const start = val.slice(0, 1)
      const end = val.slice(-1)
      return `${start}*****${end}`
    }
  },
  props: {
    commodityData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      beeIcon: {
        product_detail_icon_flower_pressed: require('@/assets/icon/product/product_detail_icon_flower_pressed@2x.png'),
        product_detail_icon_flower_normat: require('@/assets/icon/product/product_detail_icon_flower_normat@2x.png'),
        product_detail_icon_avatar: require('@/assets/icon/product/product_detail_icon_avatar@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goAssessment() {
      this.$router.push({
        path: '/category/details/userAssessment',
        query: { pid: this.$route.query.pid }
      })
    }
  }
}
</script>

<style scoped lang="less">
.user-assessment {
  margin-top: 0.2rem;
  padding: 0.32rem;
  background-color: #fff;
  .no-assessment {
    font-size: 0.28rem;
  }
  .assessment-title {
    font-size: 0.28rem;
    display: flex;
    justify-content: space-between;
    .good-rate {
      font-size: 0.24rem;
      .percent {
        font-size: 0.28rem;
        color: @BeeDefault;
        margin-right: 0.16rem;
      }
      .van-icon {
        vertical-align: text-top;
        margin-left: 0.2rem;
      }
    }
  }
  .assessment-pre {
    .assessment-container {
      margin-top: 0.32rem;
      .assessment-header {
        display: flex;
        justify-content: space-between;
        .user {
          .head-img {
            vertical-align: text-top;
            display: inline-block;
            width: 0.34rem;
            height: 0.34rem;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 0.12rem;
          }
          .user-name {
            font-size: 0.22rem;
            color: @Grey1;
          }
        }
      }
      .assessment-details {
        .assessment {
          font-size: 0.26rem;
          margin: 0.16rem 0;
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
          grid-gap: 0.08rem;
          grid-template-columns: repeat(4, 1fr);
          .assessment-img-container {
            display: inline-block;
            border-radius: 0.1rem;
            overflow: hidden;
          }
        }
      }
    }
  }
  .show-all {
    text-align: center;
    margin-top: 0.32rem;
    .van-button {
      // NOTE 设计图给的宽度装不下
      width: 2.1rem;
      height: 0.6rem;
      line-height: 0.6rem;
      border: 0.02rem solid @Grey2;
      font-size: 0.24rem;
    }
  }
}
</style>
