<template>
  <div>
    <div style="background: #fafafa;padding:0.2rem 0.3rem;text-align: right">
      <span @click="$router.push('/persion/history/historyEdit')">编辑</span>
    </div>
    <!-- 内容 -->
    <div class="wrapper container bg-gray hitory-index">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        :offset="offset"
        :immediate-check="immediate"
        class="vertical-list"
        @load="getList"
      >
        <van-row
          v-for="(item, index) in history.historyInfo"
          :key="index"
          class="history-list margin-b-20  bg-white "
        >
          <p class="date">
            {{ item.date }}
          </p>
          <van-col
            v-for="(pro, index1) in item.product_list"
            :key="index1"
            span="8"
            class="shop-box margin-b-20"
          >
            <!--pro.fid 足迹id pro.pid 商品id -->
            <!-- pro.is_stock 是否有库存 true false -->
            <!-- pro.is_obtained 是否已下架 true false -->
            <!-- pro.is_collect 是否已收藏 true false -->
            <!-- pro.target 目标 general|limited -->
            <div class="goodsItem">
              <img :src="pro.thumb_url" alt="" class="img" @click="goProductDetail(pro.pid,pro.target)">
              <p class="title no-wrap" @click="goProductDetail(pro.pid,pro.target)">
                {{ pro.product_name }}
              </p>
              <div class="flex flex-between">
                <p class="price">
                  ￥{{ pro.price }}
                </p>
                <van-icon
                  name="ellipsis"
                  color="#dcdcdc"
                  @click="action(pro.pid,pro.fid,pro.is_collect)"
                />
              </div>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </div>

    <!-- popup -->
    <van-popup
      v-model="showPopup"
      position="bottom"
      :overlay="true"
      class="text-center"
    >
      <p class="collect" @click="collect()">
        加入收藏
      </p>
      <p class="del" @click="del()">
        删除
      </p>
      <p class="cancel" @click="cancel()">
        取消
      </p>
    </van-popup>
  </div>
</template>

<script>
// 加入收藏
import { collectProduct } from '@/api/BeeApi/product'
import { getHistoryList, delHistoryItem } from '@/api/BeeApi/user'
import { mapState, mapActions } from 'vuex'
import { BeeDefault } from '@/styles/index/variables.less'

export default {
  metaInfo: {
    title: '历史足迹'
  },
  components: {},
  props: {},
  data() {
    return {
      BeeDefault,
      showPopup: false,
      // 当前选中的商品 id,足迹 id,是否已收藏
      nowPid: [],
      nowFid: [],
      nowIsCollect: false,
      // 加载状态，true 正在加载
      loading: false,
      // 是否全部加载完毕
      finished: false,
      // page: 1,
      pageSize: 2,
      immediate: false,
      offset: 300,
      // 历史足迹数据
      historyList: []
    }
  },
  computed: {
    ...mapState(['history', 'app'])
  },
  watch: {},
  created() {},
  mounted() {
    this.getList()
    this.hideNavBar()

    // for (let index = 0; index < this.history.historyInfo.length; index++) {
    //   this.$set(this.allSelectedBox, index, false)
    // }
  },
  methods: {
    ...mapActions(['GetHistoryInfo']),
    // 隐藏底部导航栏
    hideNavBar() {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    },
    // 获取历史足迹数据
    async getList() {
      setTimeout(async() => {
        const res = await getHistoryList({ page: this.page, pageSize: this.pageSize })
        // this.GetHistoryInfo(res.data)
        this.historyList.push(...res.data)
        this.GetHistoryInfo(this.historyList)
        this.page++
        this.loading = false

        if (res.data.length === 0) {
          this.finished = true
        }
      }, 500)
    },
    // 查看商品详情 pid 商品id target 目标 general limited
    goProductDetail(pid, target) {
      this.$router.push({
        path: '',
        query: {
          pid,
          target
        }
      })
    },
    // 上拉菜单
    action(pid, fid, is_collect) {
      this.showPopup = true
      this.nowPid = Array.of(pid)
      this.nowFid = Array.of(fid)
      this.nowIsCollect = is_collect
      console.log(this.nowPid, this.nowFid)
    },
    // 收藏 "contentId" [] 商品id或店铺id  "type":1//类型,1 商品,2 店铺
    collect() {
      if (this.nowIsCollect) {
        this.$toast('此商品已加入收藏！')
        return
      }
      collectProduct({ contentId: this.nowPid, type: 1 }).then(res => {
        this.showPopup = false
        this.$toast.success(res.message)
        // this.$notify({
        //   message: res.message,
        //   duration: 1000,
        //   background: '#1989fa'
        // })
      })
    },
    // 删除 "fids":[ 1,3,4]
    del() {
      delHistoryItem({ fids: this.nowFid }).then(res => {
        this.showPopup = false
        this.$toast.success(res.message)
        // this.$notify({
        //   message: res.data.message,
        //   duration: 1000,
        //   background: '#1989fa'
        // })
      })
      this.getList()
    },
    // 取消
    cancel() {
      this.showPopup = false
    }
  }
}
</script>

<style  lang="less">
.wrapper {
  padding: 0 0.2rem;
  box-sizing: border-box;
}

.history-list {
  border-radius: 0.1rem;
}
.date {
  padding: 0.2rem;
  margin: 0;
  font-size: 0.26rem;
  color: #999;
}
.goodsItem {
  width: 90%;
  margin: 0 auto;
  border-radius: 0.1rem;
  .img {
    width: 100%;
    height: 2rem;
    border-radius: 0.1rem;
  }
  .title {
    font-size: 0.24rem;
    color: #333;
    margin: 0.1rem 0;
  }
  .price {
    font-size: 0.28rem;
    margin: 0;
    color: @BeeDefault;
  }
}
.collect,
.del {
  color: @BeeDefault;
  font-size: 0.3rem;
  margin: 0.34rem 0;
}
.cancel {
  color: #999;
  font-size: 0.3rem;
  margin: 0.34rem 0;
}
</style>
