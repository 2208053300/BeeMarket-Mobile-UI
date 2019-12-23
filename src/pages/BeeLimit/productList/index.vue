<template>
  <div class="bee-limit">
    <Swiper
      :block="true"
      :type="type"
      :bg-color="bgColor"
      :font-color="fontColor"
    />
    <div class="header-img">
      <img :src="beeIcon.headerImg" alt="">
    </div>
    <div class="limit-content" :style="{backgroundImage:'url('+beeIcon.footerImg+')'}">
      <div class="hot-list">
        <p class="hot-title">
          火爆推荐·<span class="black-text">热销榜</span>
        </p>
        <div class="hot-rank">
          <div class="product-container">
            <div class="product-img">
              <img src="" alt="">
            </div>
            <div class="NO-img">
              <img :src="beeIcon.NO1" alt="">
            </div>
            <p class="product-name">
              123
            </p>
            <div class="limit-num">
              <span class="num">剩余12件</span>
              <div class="progress-content">
                <div
                  :style="{
                    width: getProgress(12, 24)
                  }"
                  class="limit-progress"
                />
              </div>
            </div>
            <div class="price-container">
              <span class="price-now"><span class="unit">￥</span>299</span>
              <span class="price-line">￥299</span>
              <div class="rob-button">
                抢
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="limit-list">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in commodityList"
            :key="index"
            class="commodity-content"
            @click="goDetail(item.pid, item.target)"
          >
            <div class="commodity-details">
              <div class="commodity-img">
                <img :src="item.thumb_url" alt="">
              </div>
              <div class="commodity-info">
                <div class="name">
                  {{ item.pname }}
                </div>
                <div class="limit-num">
                  <span class="num">仅剩{{ item.remain_qty }}件</span>
                  <div class="progress-content">
                    <div
                      :style="{
                        width: getProgress(item.remain_qty, item.total_qty)
                      }"
                      class="limit-progress"
                    />
                  </div>
                </div>
                <div class="info-footer">
                  <div class="price">
                    <div class="now-price">
                      <span class="unit">￥</span>{{ item.price }}
                    </div>
                    <span class="old-price">
                      ￥{{ item.marketing_price }}
                    </span>
                  </div>
                  <van-button
                    class="go-buy"
                    @click.stop="goDetail(item.pid, item.target)"
                  >
                    去抢购
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
      osObj: getOs(),
      beeIcon: {
        NO1: require('@/assets/icon/beeLimit/NO1.png'),
        NO2: require('@/assets/icon/beeLimit/NO2.png'),
        NO3: require('@/assets/icon/beeLimit/NO3.png'),
        headerImg: require('@/assets/icon/beeLimit/headerImg.png'),
        footerImg: require('@/assets/icon/beeLimit/footerImg.png')
      }
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
        title: '限量蜂抢-只打折，不打烊！',
        desc: '每日精选限量特价商品，抢到的都说好，你还在等什么？',
        imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
        link:
          window.location.href.split('#')[0] + '#' + `/beeLimit?uid=${this.uid}`
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
          title: '限量蜂抢-只打折，不打烊！',
          desc: '每日精选限量特价商品，抢到的都说好，你还在等什么？',
          img_path: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          // 地址应该放 web 站 网页
          url: window.location.origin + `/#/beeLimit?uid=${this.uid}`
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          '限量蜂抢-只打折，不打烊！',
          '每日精选限量特价商品，抢到的都说好，你还在等什么？',
          'https://img.fengjishi.com/app/images/share_logo.jpg',
          window.location.origin + `/#/beeLimit?uid=${this.uid}`
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
  background-color: #ff7b7c;
  .header-img {
    height: 6.18rem;
  }
  .limit-content {
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    position: relative;
    top: -0.6rem;
    background-position: left bottom;
    background-size: contain;
    background-repeat: no-repeat;
    .hot-list {
      padding: 0.3rem 0.28rem 0.18rem;
      background-color: #fff;
      border-radius: 0.16rem;
      p {
        padding: 0;
        margin: 0;
      }
      .hot-title {
        font-size: 0.28rem;
        color: #fb4b44;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        .black-text {
          font-size: 0.24rem;
          color: #333333;
          font-family: PingFang-SC-Medium;
          font-weight: Medium;
        }
      }
      .hot-rank {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 0.15rem;
        .product-container {
          margin-top: 0.3rem;
          position: relative;
          .product-img {
            width: 2.08rem;
            height: 2.08rem;
            border-radius: 0.08rem;
            overflow: hidden;
          }
          .NO-img {
            position: absolute;
            width: 0.74rem;
            height: 0.4rem;
            top: -0.08rem;
            left: -0.08rem;
          }
          .product-name {
            font-size: 0.24rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0.1rem 0.1rem 0.08rem 0;
          }
          .limit-num {
            width: 1.4rem;
            height: 0.18rem;
            line-height: 0.18rem;
            border-radius: 0.09rem;
            background-color: #fa9896;
            overflow: hidden;
            font-size: 0.18rem;
            color: #ffffff;
            text-align: center;
            position: relative;
            box-sizing: border-box;
            font-family: Adobe Heiti Std;
            .num {
              z-index: 100;
              position: relative;
            }
            .progress-content {
              position: absolute;
              width: 100%;
              left: 0;
              top: 0;
              .limit-progress {
                background: linear-gradient(
                  90deg,
                  rgba(250, 102, 100, 1),
                  rgba(239, 67, 61, 1)
                );
                border-radius: 0.08rem;
                height: 0.18rem;
              }
            }
          }
          .price-container {
            display: flex;
            align-items: flex-end;
            margin-top: 0.15rem;
            justify-content: space-around;
            .price-now {
              font-size: 0.36rem;
              color: #ee3d37;
              font-family: DIN-Medium;
              .unit {
                font-size: 0.18rem;
                font-family: PingFang SC;
                font-weight: bold;
              }
            }
            .price-line {
              font-size: 0.18rem;
              font-family: PingFang SC;
              font-weight: 400;
              text-decoration: line-through;
              color: #999999;
            }
            .rob-button {
              width: 0.42rem;
              height: 0.42rem;
              text-align: center;
              line-height: 0.42rem;
              color: #ffffff;
              background: #ee3f39;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .limit-list {
      .commodity-details {
        margin-top: 0.2rem;
        display: flex;
        background-color: #fff;
        border-radius: 0.12rem;
        padding: 0.2rem 0.35rem 0.2rem 0.2rem;
        .commodity-img {
          width: 2.14rem;
          height: 2.14rem;
          border-radius: 0.1rem;
          overflow: hidden;
          margin-right: 0.2rem;
        }
        .commodity-info {
          flex: 1;
          margin-top: 0.08rem;
          overflow: hidden;
          .name {
            font-size: 0.3rem;
            font-weight: 500;
            line-height: 0.4rem;
            height: 0.7rem;
          }
          .limit-num {
            margin-top: 0.2rem;
            width: 2.6rem;
            height: 0.24rem;
            line-height: 0.24rem;
            border-radius: 0.12rem;
            background-color: #fa9896;
            overflow: hidden;
            font-size: 0.2rem;
            color: #ffffff;
            text-align: center;
            position: relative;
            box-sizing: border-box;
            .num {
              z-index: 100;
              position: relative;
            }
            .progress-content {
              position: absolute;
              width: 100%;
              left: 0;
              top: 0;
              .limit-progress {
                background: linear-gradient(
                  90deg,
                  rgba(250, 102, 100, 1),
                  rgba(239, 67, 61, 1)
                );
                border-radius: 0.12rem;
                height: 0.24rem;
              }
            }
          }

          .info-footer {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-top: 0.32rem;
            .price {
              .now-price {
                display: inline-block;
                font-size: 0.4rem;
                color: #F5413B;
                margin-right: 0.36rem;
                font-weight: Medium;
                .unit{
                  font-size: 0.2rem;
                font-weight: bold;

                }
              }
              .old-price {
                font-size: 0.2rem;
                color: @Grey1;
                text-decoration: line-through;
              }
            }
            .go-buy {
              width: 1.32rem;
              height: 0.48rem;
              line-height: 0.48rem;
              color: #fff;
              background-color: #F5413B;
              border-radius: 0.24rem;
              font-size: 0.28rem;
              font-weight: 500;
              padding: 0;
              margin: 0;
            }
          }
        }
      }
    }
  }
  .waiting-more {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(255, 255, 255, 0.6);
    padding: 0.5rem 0;
  }
}
</style>
