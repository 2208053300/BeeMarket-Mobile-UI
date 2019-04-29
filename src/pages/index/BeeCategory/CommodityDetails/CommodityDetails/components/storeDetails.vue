<template>
  <div class="store-details">
    <div class="store-header">
      <div class="header-left">
        <div class="store-img">
          <img
            :src="commodityData.storeData.img"
            alt=""
          >
        </div>
        <span class="store-name">
          {{ commodityData.storeData.name }}
        </span>
      </div>
      <div class="header-right">
        <van-button
          round
          type="default"
          class="follow"
        >
          关注店铺
        </van-button>
        <van-button
          round
          type="default"
          class="stroll"
          @click="$router.push('/category/store')"
        >
          进店逛逛
        </van-button>
      </div>
    </div>
    <div class="store-recommend">
      <div class="recommend-title">
        - 店铺推荐 -
      </div>
      <div class="recommend-content">
        <div
          v-for="item in commodityData.storeData.recommend"
          :key="item.name"
          class="recommend-commodity"
        >
          <div class="commodity-img">
            <img
              :src="item.img"
              alt=""
            >
          </div>
          <div class="commodity-name">
            {{ item.name }}
          </div>
          <div class="commodity-price">
            ￥{{ item.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    commodityData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.store-details {
  margin-top: 0.2rem;
  padding: 0.32rem;
  background-color: #fff;
  .store-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      max-width: 4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .store-img {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 0.1rem;
        margin-right: 0.16rem;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
      .store-name {
        font-size: 0.28rem;
      }
    }
    .header-right {
      .van-button {
        font-size: 0.24rem;
        width: 1.28rem;
        height: 0.52rem;
        line-height: 0.52rem;
        box-sizing: border-box;
        white-space: nowrap;
        padding: 0;
      }
      .follow {
        color: @BeeDefault;
        border: 0.02rem solid @BeeDefault;
        margin-right: 0.24rem;
      }
      .stroll {
        border: none;
        color: #fff;
        // NOTE 取消了边框，垂直居中
        line-height: 0.54rem;
        background: linear-gradient(to right, @BeeDefault, #ff7116);
      }
    }
  }
  .store-recommend {
    .recommend-title {
      margin-top: 0.2rem;
      font-size: 0.24rem;
      color: @Grey1;
      text-align: center;
    }
    .recommend-content {
      margin-top: 0.2rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 0.24rem;
      grid-row-gap: 0.2rem;
      .recommend-commodity {
        .commodity-img {
          height: 2.14rem;
          border-radius: 0.08rem;
          background-color: @Grey5;
          overflow: hidden;
        }
        .commodity-name {
          max-width: 2rem;
          margin: 0.12rem 0;
          font-size: 0.2rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .commodity-price {
          font-size: 0.24rem;
          color: @BeeDefault;

        }
      }
    }
  }
}
</style>
