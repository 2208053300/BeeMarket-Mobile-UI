<template>
  <div>
    <!-- title -->
    <van-nav-bar title="历史足迹" fixed>
      <div slot="left" class="nav-right">
        <van-icon name="arrow-left" size="20px" @click="back" />
      </div>
      <div slot="right">
        <span @click="$router.push('/persion/history/historyEdit')">编辑</span>
      </div>
    </van-nav-bar>

    <!-- 内容 -->
    <div class="wrapper container bg-gray hitory-index">
      <van-row
        v-for="(item, index) in history.historyInfo"
        :key="index"
        class="history-list margin-b-20  bg-white "
      >
        <p class="date">
          {{ item.date }}
        </p>
        <van-col
          v-for="(pro, index1) in item.dayData"
          :key="index1"
          span="8"
          class="shop-box margin-b-20"
        >
          <div class="goodsItem">
            <img :src="pro.img" alt="" class="img">
            <p class="title no-wrap">
              {{ pro.title }}
            </p>
            <div class="flex flex-between">
              <p class="price">
                ￥{{ pro.price }}
              </p>
              <van-icon
                name="ellipsis"
                color="#dcdcdc"
                @click="action(pro.id)"
              />
            </div>
          </div>
        </van-col>
      </van-row>
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
import { getHistoryList, collectProduct, delHistoryItem } from '@/api/user'
import { mapState, mapActions } from 'vuex'
import { BeeDefault } from '../../../../styles/variables.less'

export default {
  components: {},
  props: {},
  data() {
    return {
      BeeDefault,
      showPopup: false,
      // 当前选中的商品 id
      nowId: ''
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
      this.$store.state.app.beeFooter.show = false
    },
    // 返回并显示底部导航
    back() {
      this.$store.state.app.beeFooter.show = true
      this.$router.push({
        path: '/persion'
      })
    },
    // 获取历史足迹数据
    getList() {
      getHistoryList().then(res => {
        // this.history.historyInfo = res.data.historyList
        this.GetHistoryInfo(res.data.historyList)
      })
    },
    // 上拉菜单
    action(id) {
      this.showPopup = true
      this.nowId = id
      console.log(this.nowId)
    },
    // 收藏
    collect() {
      collectProduct(this.nowId).then(res => {
        this.showPopup = false
        this.$notify({
          message: res.data.message,
          duration: 1000,
          background: '#1989fa'
        })
      })
    },
    // 删除
    del() {
      delHistoryItem(this.nowId).then(res => {
        this.showPopup = false
        this.$notify({
          message: res.data.message,
          duration: 1000,
          background: '#1989fa'
        })
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
@import "../../../../styles/variables.less";
.wrapper {
  padding: 0 0.2rem;
margin-top: 56px;
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
