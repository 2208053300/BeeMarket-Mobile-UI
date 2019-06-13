<template>
  <div class="store-content">
    <div class="content-filter">
      <van-tabs
        v-model="activeTab"
        background="transparent"
        :color="BeeDefault"
        :title-active-color="BeeDefault"
      >
        <van-tab>
          <div
            slot="title"
            @click="changeSort('')"
          >
            默认
          </div>
        </van-tab>
        <van-tab>
          <div
            slot="title"
            @click="changeSort('new')"
          >
            新品
          </div>
        </van-tab>
        <van-tab>
          <div
            slot="title"
            @click="changeSort('price')"
          >
            价格
            <van-icon
              v-if="order==='asc'"
              :name="beeIcon.low_white"
              @click.stop="changeOrder"
            />
            <van-icon
              v-else
              :name="beeIcon.shop_icon_price_high_white"
              @click.stop="changeOrder"
            />
          </div>
        </van-tab>
      </van-tabs>
      <div class="icon-content">
        <van-icon
          v-if="gridList"
          :name="beeIcon.vertical_horizontal"
          class="change-list"
          @click="gridList=false"
        />
        <van-icon
          v-else
          :name="beeIcon.vertical_white"
          class="change-list"
          @click="gridList=true"
        />
      </div>
    </div>
    <div
      v-if="gridList"
      class="grid-list"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="grid-row">
          <div
            v-for="(item,index) in commodityList"
            :key="index"
            class="commodity-card"
            @click="$router.push({path: '/category/details',query: {pid: item.pid}})"
          >
            <img
              :src="item.tUrl"
              :alt="item.pname"
              class="preview-img"
            >
            <div class="commodity-details">
              <div class="commodity-name">
                {{ item.pname }}
              </div>
              <div class="commodity-tag">
                <div
                  v-if="item.is_hot"
                  class="bee-tag is_hot"
                >
                  热销
                </div>
                <div
                  v-for="item2 in item.tags"
                  :key="item2"
                  class="bee-tag"
                >
                  {{ item2 }}
                </div>
              </div>
              <div class="commodity-currentPrice">
                <span style="font-size:0.24rem">￥</span><span>{{ item.sell_price }}</span>
              </div>
              <div class="commodity-originalPrice">
                ￥{{ item.line_price }}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div
      v-else
      class="common-list"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div
          v-for="(item,index) in commodityList"
          :key="index"
          class="commodity-card"
          @click="$router.push({path: '/category/details',query: {pid: item.pid}})"
        >
          <div class="commodity-img">
            <img
              :src="item.tUrl"
              :alt="item.pname"
              class="preview-img"
            >
          </div>
          <div class="commodity-details">
            <div class="commodity-name">
              {{ item.pname }}
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
            <div class="commodity-currentPrice">
              <span style="font-size:0.24rem">￥</span><span>{{ item.sell_price }}</span>
            </div>
            <div class="commodity-originalPrice">
              ￥{{ item.line_price }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { getStoreDetail } from '@/api/BeeApi/store'
export default {
  components: {},
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    storeDetails: {
      type: Object,
      default: () => {
        return {}
      }
    },
    commodityList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      BeeDefault,
      activeTab: 0,
      gridList: true,
      loading: false,
      finished: false,
      beeIcon: {
        vertical_horizontal: require('@/assets/icon/store/shop_icon_vertical_horizontal@2x.png'),
        vertical_white: require('@/assets/icon/store/shop_icon_vertical_white@2x.png'),
        low_white: require('@/assets/icon/store/shop_icon_price_low_white@2x.png'),
        shop_icon_price_high_white: require('@/assets/icon/store/shop_icon_price_high_white@2x.png')
      },
      order: 'asc'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getStoreDetail(this.formData)
        this.commodityList.push(...res.data.products)
        this.formData.page++
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (res.data.products.length === 0) {
          this.finished = true
        }
      }, 500)
    },
    changeSort(sort) {
      const newForm = this.formData
      newForm.sort = sort
      if (sort === 'new') {
        delete newForm.order
        this.$emit('update:formData', newForm)
        this.$parent.getStoreDetailData()
      } else if (sort === 'price') {
        this.$emit('update:formData', newForm)
        this.$parent.getStoreDetailData()
      } else {
        delete newForm.sort
        delete newForm.order
        this.$emit('update:formData', newForm)
        this.$parent.getStoreDetailData()
      }
    },
    changeOrder() {
      const newForm = this.formData
      if (this.order === 'asc') {
        newForm.order = 'desc'
        this.$emit('update:formData', newForm)
        this.order = 'desc'
        this.$parent.getStoreDetailData()
      } else {
        newForm.order = 'asc'
        this.$emit('update:formData', newForm)
        this.order = 'asc'
        this.$parent.getStoreDetailData()
      }
    }
  }
}
</script>

<style lang="less">
.store-content {
  .content-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.52rem;
    .van-tabs {
      flex: 3;
    }
    .icon-content {
      flex: 2;
      text-align: right;
    }
    .change-list {
      font-size: 0.5rem;
    }
    .van-hairline--top-bottom::after {
      border: none;
    }
  }
  .grid-list {
    margin: 0.2rem 0.28rem 0;
    .grid-row {
      .commodity-card {
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
          padding: 0.06rem;
          box-sizing: border-box;
          border-radius: 0.16rem;
          overflow: hidden;
        }
        .commodity-details {
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

          .commodity-name {
            max-width: 3rem;
            font-size: 0.26rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .commodity-currentPrice {
            color: @BeeDefault;
            font-size: 0.34rem;
            margin: 0.05rem 0;
          }
          .commodity-originalPrice {
            font-size: 0.18rem;
            color: @Grey1;
            position: absolute;
            right: 0;
            bottom: 0;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  .common-list {
    margin: 0.2rem 0.16rem 0;
    padding: 0.2rem;
    background-color: #fff;
    border-radius: 0.1rem;
    box-sizing: border-box;
    .commodity-card {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }
      .preview-img {
        height: 3rem;
        width: 3rem;
        border-radius: 0.08rem;
        overflow: hidden;
        margin-right: 0.24rem;
      }
      .commodity-details {
        position: relative;
        .commodity-name {
          font-size: 0.28rem;
          color: @Grey2;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
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
        .commodity-currentPrice {
          color: @BeeDefault;
          font-size: 0.34rem;
          display: inline-block;
          margin: 0.24rem 0.24rem 0 0;
        }
        .commodity-originalPrice {
          font-size: 0.18rem;
          color: @Grey1;
          text-decoration: line-through;
          display: inline-block;
        }
      }
    }
  }
}
</style>
