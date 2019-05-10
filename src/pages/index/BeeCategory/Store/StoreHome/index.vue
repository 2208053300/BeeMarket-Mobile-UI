<template>
  <div class="store-home">
    <div
      class="store-header"
      @click="showLicense=true"
    >
      <div class="header-left">
        <div class="store-img">
          <img
            :src="storeDetails.img"
            alt=""
          >
        </div>
        <div class="store-name">
          {{ storeDetails.name }}
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="header-right">
        <van-button
          type="default"
          round
        >
          <span v-if="storeDetails.fowllowed===0">关注店铺</span>
          <span v-else>已关注</span>
        </van-button>
      </div>
    </div>
    <store-content />
    <van-actionsheet v-model="showLicense">
      <van-cell-group>
        <van-cell>
          <div
            slot="title"
            class="cell-title"
            @click="$router.push('/category/store/license')"
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
    </van-actionsheet>
  </div>
</template>

<script>
import storeContent from './components/storeContent'
import { getStoreDetails } from '@/api/category'
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
        license: require('@/assets/icon/store/shop_icon_license@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getStoreDetails()
  },
  methods: {
    async getStoreDetails() {
      const res = await getStoreDetails()
      this.storeDetails = res.data.storeDetails
      this.commodityList = res.data.storeDetails.commodity
    }
  }
}
</script>

<style scoped lang="less">
.store-home {
  padding-bottom: 60px;
  .store-header {
    padding: 0.3rem 0.3rem 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      flex: 1;
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
  .van-actionsheet {
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
</style>
