<template>
  <div>
    <van-nav-bar title="我的收藏">
      <van-icon
        slot="left"
        name="arrow-left"
        color="#666666"
        @click="back"
      />
      <div
        slot="right"
        class="nav-right"
      >
        <div>
          <van-icon
            name="search"
            size="20px"
            style="margin-right:0.3rem;"
          />
          <span>编辑</span>
        </div>
      </div>
    </van-nav-bar>
    <div class="collected-container">
      <van-tabs
        v-model="activeTab"
        @click="changeTab"
      >
        <van-tab title="商品">
          <div class="bee-above">
            <div class="null-collected">
              <div class="null-img" />
              <span class="null-text">还没有添加收藏的商品呦</span>
              <van-button
                type="default"
                class="add-btn"
              >
                逛逛分类
              </van-button>
            </div>
          </div>
          <div class="bee-below">
            <bee-guess />
          </div>
        </van-tab>
        <van-tab title="店铺">
          <div class="bee-above">
            <div
              v-if="storeList===0"
              class="null-collected"
            >
              <div
                class="null-img"
                style="margin-top:2.8rem;"
              />
              <span class="null-text">还没有添加关注的店铺哟</span>
            </div>
            <store-collected
              v-else
              :store-list="storeList"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BeeGuess from '@/pages/index/components/BeeGuess'
import StoreCollected from './components/StoreCollected'
import { getStoreCollected } from '@/api/user'

export default {
  components: {
    BeeGuess,
    StoreCollected
  },
  props: {},
  data() {
    return {
      activeTab: 0,
      storeList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    changeTab(index, title) {
      // NOTE 如果切换到店铺列表
      if (index) {
        getStoreCollected()
          .then(res => {
            this.storeList = res.data.storeList
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="less">
@import "../../../styles/variables.less";
.nav-right {
  color: @Grey1;
  .van-icon {
    color: @Grey1;
  }
}
.collected-container {
  margin-bottom: 60px;
  .van-tabs {
    .van-tabs__line {
      width: 0.9rem !important;
      height: 0.04rem;
      left: 0.45rem;
      background-color: @BeeDefault;
    }
    .van-tab {
      .van-ellipsis {
        color: @ProductName;
        font-size: 0.28rem;
      }
    }
    .van-tab--active {
      .van-ellipsis {
        color: @BeeDefault;
        font-size: 0.28rem;
      }
    }
  }
  .bee-above {
    .null-collected {
      text-align: center;
      .null-img {
        width: 50%;
        height: 4rem;
        margin: 0.82rem auto 0.3rem;
        background-color: #fff;
      }
      .null-text {
        font-size: 0.28rem;
        color: rgb(122, 122, 122);
        display: block;
      }
      .add-btn {
        font-size: 0.26rem;
        border: 1px solid @BeeDefault;
        background-color: transparent;
        border-radius: 0.1rem;
        color: @BeeDefault;
        height: 0.54rem;
        line-height: 0.54rem;
        width: 1.8rem;
        margin: 1.2rem 0 1rem;
      }
    }
  }
  .bee-below {
    width: 100%;
  }
}
</style>
