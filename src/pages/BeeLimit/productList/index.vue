<template>
  <div class="bee-limit">
    <Swiper :block="true" :type="type" :bg-color="bgColor" :font-color="fontColor" />
    <div class="limit-content">
      <div class="header-img">
        <img
          :src="productData.banner_url"
          alt=""
        >
      </div>
      <div class="limit-list">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
        >
          <div
            v-for="(item,index) in commodityList"
            :key="index"
            class="commodity-content"
            @click="goDetail(item.pid,item.target)"
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
                    <span class="num">仅剩{{ item.remain_qty }}件</span>
                    <div class="progress-content">
                      <div
                        :style="{width:getProgress(item.remain_qty,item.total_qty)}"
                        class="limit-progress"
                      />
                    </div>
                  </div>
                  <van-button
                    class="go-buy"
                    @click.stop="goDetail(item.pid,item.target)"
                  >
                    马上抢
                  </van-button>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="waiting-more">
        <span>- 更多优品持续筹备中 -</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getBeeLimitList } from '@/api/BeeApi/home'
import { getOs } from '@/utils'
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
import Swiper from '../../BeeFreeGift/components/Swiper'
export default {
  metaInfo() {
    return {
      title: '限量蜂抢'
    }
  },
  components: {
    Swiper
  },
  props: {},
  data() {
    return {
      // 中奖信息滚动所需数据
      bgColor: 'rgba(255, 237, 213, 1)',
      fontColor: '#333',
      type: 1,

      commodityList: [],
      productData: {},
      loading: false,
      finished: false,
      page: 1,
      uid: 0,
      // 获取 os 平台
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getBeeLimitListData()
    this.loadUID()

    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
    if (this.osObj.isWx) {
      //
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(true)
    } else {
      //
    }
  },
  methods: {
    async getBeeLimitListData() {
      const res = await getBeeLimitList()
      this.productData = res.data
      this.page = 2
      this.commodityList = res.data.product_list
    },
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: '蜂集市-让生活蜂富起来！',
        desc: '能省能免能赚，共享电商平台',
        imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
        link: window.location.href.split('#')[0] + '#' + `/beeLimit?uid=${this.uid}`
      })
    },
    getProgress(val1, val2) {
      return (val1 / val2) * 100 + '%'
    },
    // 此处判断浏览器环境，做出跳转
    goDetail(pid, target) {
      const osObj = getOs()
      if (osObj.isWx) {
        // 微信直接跳转路由
        // this.$router.push({
        //   path: '/category/details',
        //   query: {
        //     pid: pid,
        //     target: target
        //   }
        // })
        window.location.href =
          this.$store.state.app.homeUri +
          '/category/details?pid=' +
          pid +
          '&target=' +
          target
        this.$store.state.order.source = 'limited'
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToProductDetail.postMessage({
          pid: pid,
          target: target
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToProductDetail(pid, target)
      } else {
        window.location.href =
          this.$store.state.app.homeUri +
          '/category/details?pid=' +
          pid +
          '&target=' +
          target
        this.$store.state.order.source = 'limited'
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        if (this.productData.total === this.commodityList.length) {
          this.finished = true
          this.loading = false
          return
        }
        const res = await getBeeLimitList({ page: this.page })
        this.commodityList.push(...res.data.product_list)
        this.page++
        this.loading = false
        // 数据全部加载完成
        // if (res.data.product_list.length === 0) {
        //   this.finished = true
        // }
      }, 500)
    },
    // 分享
    appShare() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: '蜂集市-让生活蜂富起来！',
          desc: '能省能免能赚，共享电商平台',
          img_path: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          // 地址应该放 web 站 网页
          url: window.location.href.split('#')[0] + '#' + `/beeLimit?uid=${this.uid}`
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          '蜂集市-让生活蜂富起来！',
          '能省能免能赚，共享电商平台',
          'https://img.fengjishi.com/app/images/share_logo.jpg',
          window.location.href.split('#')[0] + '#' + `/beeLimit?uid=${this.uid}`
        )
      } else {
        //
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
    margin-top:.6rem;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;

    .header-img {
      height: 3rem;
      border-radius: 0.16rem;
      background-color: #000;
      overflow: hidden;
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
            box-sizing: border-box;
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
