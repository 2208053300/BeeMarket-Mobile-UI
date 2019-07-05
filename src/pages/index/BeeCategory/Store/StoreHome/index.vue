<template>
  <div
    class="store-home"
    :class="{hasBg:storeDetails.store_bg}"
  >
    <!-- FIXME 如果有背景图 -->
    <div
      v-if="storeDetails.store_bg"
      class="store-bg"
      :style="{backgroundImage:'url('+storeDetails.store_bg+')'}"
    />
    <div class="store-header">
      <div
        class="header-left"
        @click="showLicense=true"
      >
        <div class="store-img">
          <img
            :src="storeDetails.store_logo||beeIcon.store"
            alt=""
          >
        </div>
        <div class="store-name">
          {{ storeDetails.store_name }}
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="header-right">
        <van-button
          type="default"
          round
          @click="handleFollow"
        >
          <span v-if="storeDetails.mfavor">已关注</span>
          <span v-else>关注店铺</span>
        </van-button>
      </div>
    </div>
    <store-content
      :store-details="storeDetails"
      :form-data.sync="formData"
      :commodity-list="commodityList"
    />
    <van-actionSheet v-model="showLicense">
      <van-cell-group>
        <van-cell>
          <div
            slot="title"
            class="cell-title"
            @click="goLicense"
          >
            <van-icon :name="beeIcon.license" /> 经营许可
          </div>
        </van-cell>
        <van-cell>
          <div
            slot="title"
            class="cell-title2"
            @click="showLicense=false"
          >
            取消
          </div>
        </van-cell>
      </van-cell-group>
    </van-actionSheet>
  </div>
</template>

<script>
import storeContent from './components/storeContent'
import { getStoreDetail } from '@/api/BeeApi/store'
import { collectProduct, cancelCollect } from '@/api/BeeApi/product'
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
export default {
  metaInfo: {
    title: '店铺首页'
  },
  components: {
    storeContent
  },
  props: {},
  data() {
    return {
      storeDetails: {},
      showLicense: false,
      beeIcon: {
        license: require('@/assets/icon/store/shop_icon_license@2x.png'),
        store: require('@/assets/icon/store/store.png')
      },
      formData: {
        page: 1
      },
      commodityList: [],
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.formData.mid = this.$route.query.mid
    this.getStoreDetailData()
  },
  methods: {
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: this.storeDetails.store_name,
        desc: '刚刚在蜂集市发现一个不错的店铺，赶紧来看看吧~',
        imgUrl: this.storeDetails.store_logo,
        // link: window.location.href + '&uid=' + this.uid
        link: this.storeDetails.share.link
      })
    },

    async getStoreDetailData() {
      const res = await getStoreDetail(this.formData)
      this.storeDetails = res.data
      this.commodityList = res.data.products
      this.formData.page = 2
      // NOTE 获取店铺数据后 调用分享
      this.loadUID()
    },
    goLicense() {
      this.$router.push({
        path: '/category/store/license',
        query: { mid: this.formData.mid }
      })
    },
    async handleFollow() {
      if (this.storeDetails.mfavor) {
        const res = await cancelCollect({
          content_ids: this.formData.mid,
          type: 2
        })
        this.storeDetails.mfavor = 0
        this.$toast(res.message)
      } else {
        const res = await collectProduct({
          contentId: [this.formData.mid],
          type: 2
        })
        this.storeDetails.mfavor = 1
        this.$toast(res.message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.store-home {
  padding-bottom: 60px;
  position: relative;
  .store-bg {
    position: absolute;
    z-index: -1;
    height: 4.6rem;
    width: 100%;
    top: 0;
    left: 0;
    filter: blur(0.1rem);
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #3f627b;
  }
  .store-header {
    padding: 0.3rem 0.3rem 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      flex: 1;
      display: flex;
      align-items: center;
      .store-img {
        display: inline-block;
        height: 0.96rem;
        width: 0.96rem;
        margin-right: 0.16rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.06rem;
          overflow: hidden;
        }
      }
      .store-name {
        display: inline-block;
        max-width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        font-size: 0.32rem;
      }
      .van-icon {
        vertical-align: text-top;
      }
    }
    .header-right {
      .van-button {
        background-color: transparent;
        font-size: 0.24rem;
        width: 1.3rem;
        height: 0.5rem;
        padding: 0;
        line-height: 0.5rem;
        border: 0.02rem solid @Grey2;
      }
    }
  }
  .van-action-sheet {
    margin: 0 auto 0.16rem;
    box-sizing: border-box;
    width: 7.2rem;
    border-radius: 0.2rem;
    background-color: #fff;
    .van-cell {
      .cell-title {
        text-align: center;
        font-size: 0.32rem;
        .van-icon {
          vertical-align: text-top;
          color: @BeeDefault;
        }
      }
      .cell-title2 {
        text-align: center;
        font-size: 0.28rem;
        color: @Grey2;
      }
    }
  }
}
.hasBg {
  .store-header {
    color: #fff;
    .header-right {
      .van-button {
        color: #fff;
        border-color: #fff;
      }
    }
  }
}
</style>
