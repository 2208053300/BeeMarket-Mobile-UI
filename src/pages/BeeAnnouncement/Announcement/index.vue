<template>
  <div class="article">
    <p class="article-title">
      {{ article.title }}
    </p>
    <div class="divider">
      <img src="@/assets/icon/discover/find_details_pic_segmentation@2x.png">
    </div>
    <div class="article-content">
      <!-- eslint-disable-next-line -->
      <div v-html="article.content" />
    </div>
    <div class="article-img">
      <img :src="article.show_img">
    </div>
    <!-- <div class="grid-list">
      <div class="grid-row">
        <div
          v-for="item in article.product_data"
          :key="item.pid"
          class="commodity-card"
          @click="goProduct(item.pid,item.target)"
        >
          <img
            :src="item.thumb_url"
            :alt="item.product_name"
            class="preview-img"
          >
          <div class="commodity-details">
            <div class="commodity-name">
              {{ item.product_name }}
            </div>
            <div class="commodity-tag">
              <div
                v-for="item2 in item.tags"
                :key="item2"
                class="bee-tag"
                :class="{hotTag:item2==='热销'}"
              >
                {{ item2 }}
              </div>
            </div>
            <div class="commodity-price">
              <div class="commodity-currentPrice">
                <span style="font-size:0.24rem">￥</span><span>{{ item.sell_price }}</span>
              </div>
              <div class="commodity-originalPrice">
                ￥{{ item.marketing_price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getNoticeDetail } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
export default {
  metaInfo() {
    return {
      title: '公告详情'
    }
  },
  components: {},
  props: {},
  data() {
    return {
      article: {},
      finished: false
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getArticleDetailData()
  },
  methods: {
    async getArticleDetailData() {
      const res = await getNoticeDetail({ id: this.$route.query.id })
      this.article = res.data
      this.$store.state.app.beeFooter.show = false
    },
    // 网页跳转
    webPush(pid) {
      if (window.location.pathname === '/') {
        this.$router.push({
          path: '/category/details',
          query: {
            pid: pid
          }
        })
      } else {
        window.location.href = `/#/category/details?pid=${pid}`
      }
    },
    goProduct(pid, target) {
      const osObj = getOs()
      if (osObj.isWx) {
        this.webPush(pid)
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToProductDetail.postMessage({
          pid: pid,
          target: target
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToProductDetail(pid, target)
      } else {
        this.webPush(pid)
      }
    }
  }
}
</script>

<style lang="less">
.article {
  .article-title {
    margin: 0;
    padding: 0.56rem 0.3rem 0.44rem;
    font-size: 0.4rem;
    color: #333333;
    line-height: 0.55rem;
    font-weight: bold;
  }
  .divider {
    font-size: 0;
    margin-bottom: 0.24rem;
    margin-left: 0.3rem;
    img {
      height: 0.08rem;
      width: 1.14rem;
    }
  }
  .article-content {
    padding: 0 0.3rem;
    line-height: 1.8;
    color: #666666;
    font-size: 0.3rem;
    margin-bottom: 0.24rem;
    img {
      margin-bottom: 0.16rem;
    }
  }
  .article-img {
    padding: 0 0.3rem;
    margin-bottom: 0.44rem;
  }
  .grid-list {
    margin: 0 0.28rem 0.44rem 0.28rem;
    .grid-row {
      .commodity-card {
        border: #d1d1d1 0.02rem solid;
        height: 5rem;
        width: 3.4rem;
        border-radius: 0.1rem;
        overflow: hidden;
        display: inline-block;
        box-sizing: border-box;
        background-color: #fff;
        &:nth-child(2n-1) {
          margin-right: 0.14rem;
        }
        .preview-img {
          width: 100%;
          height: 3.28rem;
          box-sizing: border-box;
          overflow: hidden;
        }
        .commodity-details {
          height: 0.8rem;
          margin: 0.2rem;
          position: relative;
          .commodity-tag {
            height: 0.6rem;
            display: flex;
            align-items: flex-end;
            .bee-tag {
              display: inline-block;
              font-size: 0.2rem;
              color: @BeeDefault;
              border: 0.02rem solid @BeeDefault;
              border-radius: 0.2rem;
              padding: 0.05rem 0.1rem;
              &:not(:last-child) {
                margin-right: 0.12rem;
              }
            }
            .hotTag {
              border-color: #ffffff;
              color: #ffffff;
              background: linear-gradient(to right, @BeeDefault, #ff7116);
            }
          }
          .commodity-price {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            .commodity-currentPrice {
              color: @BeeDefault;
              font-size: 0.34rem;
              margin: 0.05rem 0;
            }
            .commodity-originalPrice {
              font-size: 0.2rem;
              color: @Grey1;
              text-decoration: line-through;
            }
          }
          .commodity-name {
            max-width: 3rem;
            font-size: 0.26rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
