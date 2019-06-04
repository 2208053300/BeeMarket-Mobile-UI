<template>
  <div class="bee-limit">
    <div class="limit-content">
      <div class="header-img">
        限量蜂抢
      </div>
      <div class="limit-list">
        <div
          v-for="item in commodityList.product_list"
          :key="item.pid"
          class="commodity-content"
        >
          <div class="commodity-details">
            <div class="commodity-img">
              <img
                :src="item.thumb_url"
                alt=""
              >
            </div>
            <div class="commodity-info">
              <div class="name">
                {{ item.pname }}
              </div>
              <div class="desc">
                {{ item.pname }}
              </div>
              <div class="price">
                <div class="now-price">
                  ￥{{ item.price }}
                </div>
                <span class="old-price">
                  ￥{{ item.marketing_price }}
                </span>
              </div>
              <div class="info-footer">
                <div class="limit-num">
                  仅剩{{ item.remain_qty }}件
                  <div class="progress-content">
                    <div
                      :style="{width:getProgress(item.remain_qty,item.remain_qty)}"
                      class="limit-progress"
                    />
                  </div>
                </div>
                <van-button
                  class="go-buy"
                  @click="goDetail(item.pid,item.target)"
                >
                  马上抢
                </van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="waiting-more">
        <span>- 更多优品持续筹备中 - {{ test }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getBeeLimitList } from '@/api/BeeApi/home'
import { getOs } from '@/utils'
export default {
  metaInfo() {
    return {
      title: this.thisTitle
    }
  },
  components: {},
  props: {},
  data() {
    return {
      commodityList: [],
      test: '',
      thisTitle: '限量蜂抢'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getBeeLimitListData()
  },
  methods: {
    async getBeeLimitListData() {
      const res = await getBeeLimitList()
      this.commodityList = res.data
      this.thisTitle = '限量蜂抢'
    },
    getProgress(val1, val2) {
      return (val1 / val2) * 100 + '%'
    },
    // 此处判断浏览器环境，做出跳转
    goDetail(pid, target) {
      const osObj = getOs()
      if (osObj.isWx) {
        this.$router.push({
          path: '/category/details',
          query: {
            pid: pid
          }
        })
      } else if (osObj.isIphone) {
        window.webkit.messageHandlers.ToProductDetail.postMessage({
          'pid': pid,
          'target': target
        })
        // window.webkit.messageHandlers.ToProductDetail.postMessage(pid, target)
        this.test = 'iphone'
      } else if (osObj.isAndroid) {
        window.beeMarket.ToProductDetail(pid, target)
      } else {
        this.$router.push({
          path: '/category/details',
          query: {
            pid: pid
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.bee-limit {
  height: 100%;
  background-color: #fff;
  .limit-content {
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;

    .header-img {
      width: 6.9rem;
      height: 3rem;
      border-radius: 0.16rem;
      background-color: #000;
    }
    .commodity-content:last-child {
      .commodity-details .commodity-info .info-footer {
        border: none;
      }
    }
    .commodity-details {
      margin-top: 0.3rem;
      display: flex;

      .commodity-img {
        width: 2rem;
        height: 2rem;
        border-radius: 0.04rem;
        overflow: hidden;
        margin-right: 0.2rem;
      }
      .commodity-info {
        flex: 1;
        margin-top: 0.08rem;
        overflow: hidden;
        .name {
          font-size: 0.28rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .desc {
          font-size: 0.22rem;
          color: @Grey1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.08rem;
          margin-right: 1rem;
        }
        .price {
          margin-top: 0.32rem;
          .now-price {
            display: inline-block;
            font-size: 0.34rem;
            color: @Red1;
            margin-right: 0.36rem;
          }
          .old-price {
            font-size: 0.22rem;
            color: @Grey1;
            text-decoration: line-through;
          }
        }

        .info-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-bottom: 0.28rem;
          border-bottom: 0.02rem solid @Grey6;
          .limit-num {
            width: 2rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border-radius: 0.2rem;
            border: 0.02rem solid @BeeDefault2;
            overflow: hidden;
            font-size: 0.2rem;
            color: @BeeDefault;
            text-align: center;
            position: relative;
            .progress-content {
              position: absolute;
              width: 100%;
              left: 0;
              top: 0;
              .limit-progress {
                background-color: rgba(255, 164, 47, 0.2);
                border-radius: 0.2rem;
                height: 0.4rem;
              }
            }
          }
          .go-buy {
            width: 1.8rem;
            height: 0.6rem;
            line-height: 0.6rem;
            color: #fff;
            background-color: @BeeDefault;
            border-radius: 0.1rem;
            font-size: 0.3rem;
          }
        }
      }
    }
  }
  .waiting-more {
    text-align: center;
    font-size: 0.22rem;
    color: @Grey1;
    padding: 0.5rem 0;
  }
}
</style>
