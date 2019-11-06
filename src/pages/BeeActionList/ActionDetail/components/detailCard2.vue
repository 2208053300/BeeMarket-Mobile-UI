<template>
  <div class="card2">
    <van-tabs v-model="active">
      <van-tab title="项目简介">
        <div
          class="item-info"
          :class="{more: showMore===true}"
        >
          <!-- eslint-disable-next-line  -->
          <div v-html="actionDetails.project_desc" />
          <div
            v-show="!showMore"
            class="show-more text-center"
            @click="showMore=true"
          >
            更多详情
            <van-icon
              name="arrow-down"
              size="0.26rem"
              color="#ff8422"
            />
          </div>
        </div>
      </van-tab>
      <van-tab title="项目进度">
        <div class="action-content">
          <!-- 项目已完成可查看详情 -->
          <div
            v-if="actionDetails.schedule_status===4"
            class="show-detail text-right"
            @click="goCompleteDetail(actionDetails.id)"
          >
            查看详情 》
          </div>
          <div
            v-for="item in actionDetails.project_progress"
            :key="item.title"
            class="action-progress"
          >
            <div class="progress-time">
              <div class="progress-cir" />
              {{ item.created_at }}
            </div>
            <div class="progress-content">
              <div class="progress-title">
                {{ item.schedule_main_title }}
              </div>
              <div class="progress-subhead">
                {{ item.schedule_subtitle }}
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { getOs } from '@/utils'
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
      showMore: false,
      BeeDefault,
      active: 0,
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.goDetail = this.goDetail
    window.goWxArticle = this.goWxArticle
  },
  methods: {
    goCompleteDetail(id) {
      this.$router.push({
        name: 'completeDetail',
        query: {
          id
        }
      })
    },
    goDetail(pid, target, uid) {
      if (this.osObj.isWx) {
        window.location.href = 'https://app.fengjishi.com/#/category/details?pid=' + pid + '&target=' + target + '&uid=' +
            uid
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToProductDetail.postMessage({
          pid: pid,
          target: target
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToProductDetail(pid, target)
      } else {
        window.location.href = 'https://app.fengjishi.com/#/category/details?pid=' + pid + '&target=' + target + '&uid=' +
            uid
      }
    },
    goWxArticle(url) {
      var osObj = getOs()
      if (osObj.isWx) {
        window.location.href = url
      }
    }
  }
}
</script>

<style  lang="less">
.card2 {
  // padding:0 0.32rem 0.32rem;

  .van-hairline--top-bottom::after {
    border: none;
  }
  .van-tabs__line {
    background-color: @BeeDefault;
  }
  .van-tabs__nav {
    background: rgba(1, 1, 1, 0);
  }
  .van-tabs__content {
    background: #fff;
    border-radius: 0.1rem;
  }
  .action-title {
    font-size: 0.28rem;
  }
  .item-info {
    padding: 0.3rem;
    position: relative;
    height: 4rem;

    .show-more {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.72rem;
      line-height: 0.72rem;
      color: #ff8422;
      font-size: 0.26rem;
      // background-image: linear-gradient(to bottom,rgba(255,255,255,.5),#fff);
      background-color: #fff;
    }
    p{  line-height: 1.4}
    &.more {
      height: auto;
    }
  }
  .action-content {
    padding: 0.3rem;
    font-size: 0.24rem;
    color: @Grey2;
    position: relative;
    .show-detail {
      position: absolute;
      top: 0.5rem;
      right: 0.3rem;
      font-size: 0.26rem;
      color: @BeeDefault;
    }
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
