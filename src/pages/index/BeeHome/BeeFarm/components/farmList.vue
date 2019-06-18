<template>
  <div class="farm-list">
    <!-- 筛选 -->
    <!-- <div class="content-filter">
      <van-tabs
        v-model="activeTab"
        background="transparent"
        :color="BeeDefault"
        :title-active-color="BeeDefault"
        :line-width="0"
      >
        <van-tab>
          <div slot="title">
            默认
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            新品
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            价格
            <van-icon :name="beeIcon.low_white" />
          </div>
        </van-tab>
      </van-tabs>
      <div class="icon-content">
        <van-icon
          v-if="gridList"
          :name="beeIcon.list_icon_horizontal"
          class="change-list"
          @click="gridList=false"
        />
        <van-icon
          v-else
          :name="beeIcon.list_icon_vertical"
          class="change-list"
          @click="gridList=true"
        />
        <div
          class="sel-area"
          @click="showArea=true"
        >
          地区
        </div>
      </div>
    </div> -->
    <!-- 筛选排序 -->
    <FilterBox
      @getFilter="getFilter"
      @showWay="showWay"
      @changeArea="changeArea"
    />
    <div
      v-if="gridList"
      class="grid-list"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getProductListData(condition)"
      >
        <div class="grid-row">
          <div
            v-for="(item,index) in commodityList"
            :key="index"
            class="commodity-card"
            @click="goDetail(item.pid, item.target)"
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
                <div class="from-area">
                  商品来自：西南地区
                </div>
                <!-- <div
                  v-for="item2 in item.tags"
                  :key="item2"
                  class="bee-tag"
                  :class="{hotTag:item2==='热销'}"
                >
                  {{ item2 }}
                </div> -->
                <div
                  v-if="item.is_hot"
                  class="bee-tag hotTag"
                >
                  热销
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
        @load="getProductListData(condition)"
      >
        <div
          v-for="(item,index) in commodityList"
          :key="index"
          class="commodity-card"
          @click="goDetail(item.pid, item.target)"
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
              <!-- // TODO 根据字段渲染 -->
              <div class="from-area">
                商品来自：西南地区
              </div>
              <!-- <div
                v-for="item2 in item.tags"
                :key="item2"
                class="bee-tag"
                :class="{hotTag:item2==='热销'}"
              >
                {{ item2 }}
              </div> -->
              <div
                v-if="item.is_hot"
                class="bee-tag hotTag"
              >
                热销
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
    <van-popup
      v-model="showArea"
      position="right"
      class="area-content"
    >
      <div class="area-title">
        农副产品是由蜂集市从全国各地精挑细选
      </div>
      <div class="area-filter">
        <div class="filter-title">
          <span class="filter-line">————</span> 地区筛选 <span class="filter-line">————</span>
        </div>
        <div class="filter-content">
          <div class="filter-card activeCard">
            全部地区
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import FilterBox from './FilterBox'
import { getProductList } from '@/api/BeeApi/product'
import { BeeDefault } from '@/styles/index/variables.less'

export default {
  components: {
    FilterBox
  },
  props: {
    // condition: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      BeeDefault,
      activeTab: 0,
      gridList: false,
      loading: false,
      finished: false,
      commodityList: [],
      showArea: false,
      beeIcon: {
        list_icon_horizontal: require('@/assets/icon/category/list_icon_horizontal@2x.png'),
        list_icon_vertical: require('@/assets/icon/category/list_icon_vertical@2x.png'),
        low_white: require('@/assets/icon/store/shop_icon_price_low_white@2x.png')
      },
      formData: {},
      // 请求数据条件
      condition: {
        // 当前选中分类id
        cid: 0,
        // 筛选条件  sell_price 售价，sold 销量
        sort: '',
        // asc 顺序 还是 desc 倒序
        order: '',
        // 页码
        page: 1,
        t: 'produce'
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取二级分类下商品列表
    async getProductListData() {
      const data = this.filterParams(this.condition)
      setTimeout(async() => {
        const res = await getProductList(data)

        this.commodityList.push(...res.data.products)
        this.page++
        this.loading = false

        if (res.data.products.length === 0) {
          this.finished = true
        }
      }, 500)
    },
    // 单排展示还是双排展示
    showWay(val) {
      this.gridList = val
    },
    // 选择地区
    changeArea(val) {
      this.showArea = val
    },
    // 筛选条件 // 0按综合获取 1销量 2价格
    getFilter(type) {
      if (type === 0) {
        this.condition.sort = ''
        this.condition.order = ''
      } else if (type === 1) {
        this.condition.sort = 'sold'
        this.condition.order = ''
      } else if (type === 2) {
        this.condition.sort = 'price'
      } else if (typeof type === 'object') {
        this.condition.sort = 'price'
        this.condition.order = type.order
      }

      // console.log('返回后的condition：', this.condition)
      // 清空已有数据，重置页码，获取新的数据
      this.goodsList = []
      this.condition.page = 1
      this.getProductListData(this.condition)
    },
    // 对象属性过滤函数，去掉属性值为空的属性
    filterParams(obj) {
      // 获取对象属性的个数
      // const length = Object.getOwnPropertyNames(obj).length
      const _newPar = {}
      for (const key in obj) {
        // 如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
        if (
          (obj[key] === 0 || obj[key]) &&
          obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== ''
        ) {
          // 记录属性
          _newPar[key] = obj[key]
        }
      }
      // 返回对象
      return _newPar
    },
    goDetail(pid, target) {
      this.$router.push({
        path: '/category/details',
        query: { pid: pid, target: target }
      })
      this.$store.state.order.target = target
    }

    // async getProductListData(data) {
    //   const res = await getProductList(data)
    //   this.commodityList = res.data.products
    // },
    // onLoad() {
    //   // 异步更新数据
    //   setTimeout(async() => {
    //     const res = await getProductList(this.nowCondition)
    //     this.commodityList.push(...res.data.products)
    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (res.data.products.length === 0) {
    //       this.finished = true
    //     }
    //   }, 500)
    // }
  }
}
</script>

<style scoped lang="less">
.farm-list {
  // margin-top: 0.2rem;
  padding: 0.3rem;
  background-color: #fff;
  // border-radius: 0.2rem;
  box-sizing: border-box;
  .content-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-tabs {
      flex: 1;
    }
    .icon-content {
      flex: 1;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .change-list {
        font-size: 0.5rem;
      }
      .sel-area {
        font-size: 0.28rem;
        color: @Grey2;
      }
    }
    .van-hairline--top-bottom::after {
      border: none;
    }
  }
  .grid-list {
    .grid-row {
      .commodity-card {
        height: 5rem;
        width: 3.4rem;
        border-radius: 0.1rem;
        overflow: hidden;
        display: inline-block;
        box-sizing: border-box;
        background-color: #fff;
        // &:nth-child(2n-1) {
        //   margin-right: 0.14rem;
        // }
        .preview-img {
          width: 100%;
          height: 3.28rem;
          padding: 0.06rem;
          box-sizing: border-box;
          border-radius: 0.16rem;
          overflow: hidden;
        }
        .commodity-details {
          height: 0.8;
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
          .from-area {
            font-size: 0.2rem;
            color: @Red1;
            border-radius: 0.04rem;
            border: 0.02rem solid @Red1;
            padding: 0.02rem 0.04rem;
            margin-right: 0.12rem;
          }
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
  .area-content {
    height: 100%;
    width: 80%;
    box-sizing: border-box;
    padding-top: 46px;
    .area-title {
      height: 1.88rem;
      padding: 0 0.4rem;
      font-size: 0.28rem;
      color: @BeeDefault;
      display: flex;
      align-items: center;
    }
    .area-filter {
      padding: 0 0.2rem;
      .filter-title {
        text-align: center;
        font-size: 0.24rem;
        color: @Grey2;
        .filter-line {
          color: @Grey1;
        }
      }
      .filter-content {
        margin-top: 0.28rem;
        display: grid;
        grid-template-columns: repeat(2, 2.7rem);
        grid-template-rows: 0.88rem;
        grid-gap: 0.2rem;
        .filter-card {
          box-sizing: border-box;
          border-radius: 0.08rem;
          background-color: @GreyBg;
          line-height: 0.88rem;
          text-align: center;
          border: 0.02rem solid #fff;
          font-size: 0.24rem;
        }
        .activeCard {
          border-color: @BeeDefault;
          color: @BeeDefault;
          background-color: rgba(255, 164, 47, 0.1);
        }
      }
    }
  }
}
</style>
