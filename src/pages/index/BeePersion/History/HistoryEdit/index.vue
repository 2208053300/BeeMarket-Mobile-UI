<template>
  <div class="history-edit">
    <!-- 内容 -->
    <div class="operation-bar">
      <span @click="$router.push('/persion/history')">完成</span>
    </div>
    <div class="wrapper container bg-gray hitory-index">
      <van-row
        v-for="(item, index) in historyInfo"
        :key="index"
        class="history-list margin-b-20  bg-white "
      >
        <p class="date">
          {{ item.date }}
        </p>
        <van-checkbox-group
          v-model="historySelected"
          class="flex flex-wrap"
        >
          <van-checkbox
            v-for="(pro,index2) in item.product_list"
            :key="index2"
            :name="pro"
            :checked-color="BeeDefault"
            class="checkbox"
          >
            <div class="goodsItem">
              <img
                :src="pro.thumb_url"
                alt=""
                class="img"
              >
              <p class="title no-wrap">
                {{ pro.product_name }}
              </p>
              <div class="flex flex-between">
                <p class="price">
                  ￥{{ pro.price }}
                </p>
                <van-icon
                  name="ellipsis"
                  color="#dcdcdc"
                />
              </div>
            </div>
          </van-checkbox>
        </van-checkbox-group>
      </van-row>
      <van-submit-bar
        button-text="删除"
        @submit="onSubmitDel"
      >
        <van-checkbox
          v-model="allSelec"
          :checked-color="BeeDefault"
          style="margin-left: 0.3rem;"
          @click="allSelected1"
        >
          全选
        </van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
// 加入收藏
// import { collectProduct } from '@/api/BeeApi/product'
import { getHistoryList, delHistoryItem } from '@/api/BeeApi/user'
import { mapState } from 'vuex'
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
      shareCartList: [],
      // 分组数据
      allSelectedBox: [],
      // 所有的数据和id集合，执行批量删除使用id，删除本地history使用数据
      allSelectedData: [],
      allSelectedDataIds: [],
      // 是否全选
      allSelec: false,
      // 选中的数据
      historySelected: [],
      // 历史数据
      historyInfo: []
    }
  },
  computed: {
    ...mapState(['app'])
  },
  watch: {
    historySelected() {
      this.allSelec = this.historySelected.length === this.allSelectedData.length
    }
  },
  created() {},
  mounted() {
    this.getList()
    this.hideNavBar()
  },
  methods: {
    getList() {
      getHistoryList().then(res => {
        this.historyInfo = res.data
        const tempData = []
        const tempDataId = []
        for (let index = 0; index < this.historyInfo.length; index++) {
          this.$set(this.allSelectedBox, index, false)
          for (let i = 0; i < this.historyInfo[index].product_list.length; i++) {
            tempDataId.push(this.historyInfo[index].product_list[i].fid)
            tempData.push(this.historyInfo[index].product_list[i])
          }
        }
        this.allSelectedDataIds = tempDataId
        this.allSelectedData = tempData
      })
    },
    // 隐藏底部导航栏
    hideNavBar() {
      this.$store.state.app.beeFooter.show = false
    },

    // NOTE 全选
    allSelected1() {
      if (this.allSelec) {
        this.historySelected = []
      } else {
        this.historySelected = this.allSelectedData
      }
    },
    // // FIXME 有点小问题，选中子类全选可能出错
    changeAll(index, val, isAll) {
      console.log(index, val, isAll)
      if (isAll) {
        this.allSelectedBox[index] = false
        return
      }
      const addVal = val.filter(item => {
        return this.historySelected.indexOf(item) === -1
      })
      if (addVal.length === 0) {
        this.allSelectedBox[index] = true
      }
    },

    // 提交删除
    onSubmitDel() {
      delHistoryItem({ fids: this.allSelectedDataIds }).then(res => {
        this.$toast(res.message)
        this.getList()
        this.allSelec = false
      }).catch(e => this.$toast.fail(e))
    }
  }
}
</script>

<style lang="less">
.history-edit {
  .wrapper {
    padding: 0 0.2rem;
    box-sizing: border-box;
  }

  .operation-bar {
    background: #fafafa;
    padding:0.2rem 0.3rem;
    text-align: right;
    margin-bottom: 0.3rem
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
  .van-checkbox {
    width: 100%;
  }
  .van-checkbox__label {
    margin-left: 0;
    line-height: 1;
  }
  .checkbox {
    width: 33%;
    position: relative;
    margin-bottom: 0.2rem;
    .van-checkbox__icon {
      position: absolute;
      right: 0.2rem;
      top: 0.1rem;
      z-index: 2;
    }
  }
  .van-button--danger {
    background: @BeeDefault;
    border-color: @BeeDefault;
  }
}
</style>
