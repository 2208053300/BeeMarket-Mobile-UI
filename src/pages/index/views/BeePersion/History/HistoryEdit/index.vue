<template>
  <div class="history-edit">
    <!-- 内容 -->
    <div class="wrapper container bg-gray hitory-index">
      <p>{{ historySelected }}</p>
      <span @click="$router.push('/persion/history')">完成</span>
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
            v-for="pro in item.dayData"
            :key="pro.id"
            :name="pro"
            :checked-color="BeeDefault"
            class="checkbox"
            @click="changeAll(index,item.dayData,allSelectedBox[index])"
          >
            <div class="goodsItem">
              <img
                :src="pro.img"
                alt=""
                class="img"
              >
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
import { getHistoryList, delHistoryItem } from '@/api/user'
import { mapState } from 'vuex'
import { BeeDefault } from '../../../../styles/variables.less'

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
  watch: {},
  created() {},
  mounted() {
    this.getList()
    this.hideNavBar()
  },
  methods: {
    getList() {
      getHistoryList().then(res => {
        this.historyInfo = res.data.historyList
        const tempData = []
        const tempDataId = []
        for (let index = 0; index < this.historyInfo.length; index++) {
          // this.$set(this.allSelectedBox, index, false)
          for (let i = 0; i < this.historyInfo[index].dayData.length; i++) {
            tempDataId.push(this.historyInfo[index].dayData[i].id)
            tempData.push(this.historyInfo[index].dayData[i])
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
      console.log(this.allSelec)
      if (this.allSelec) {
        console.log(this.allSelectedData)
        this.historySelected = this.allSelectedData
      } else {
        console.log(2)
        this.historySelected = []
      }
    },
    // // FIXME 有点小问题，选中子类全选可能出错
    changeAll(index, val, isAll) {
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
      delHistoryItem(this.allSelectedDataIds).then(res => {
        this.$notify({
          message: res.data.message,
          duration: 1000,
          background: '#1989fa'
        })
        this.getList()
        // 删除本地对应数据
        // for (let index = 0; index < this.historyInfo.length; index++) {
        //   for (let i = 0; i < this.historyInfo[index].dayData.length; i++) {
        //     if (this.historySelected.includes(this.historyInfo[index].dayData[i])) {
        //       console.log(this.historySelected, this.historyInfo[index].dayData[i])
        //       console.log(index, i)
        //       this.historyInfo[index].dayData.splice(i, 1)
        //     }
        //   }
        // }
        this.allSelec = false
      })
    }
  }
}
</script>

<style lang="less">
@import "../../../../styles/variables.less";
.history-edit {
  .van-checkbox {
    width: 100%;
  }
  .van-checkbox__label {
    margin-left: 0;
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
.wrapper {
  padding: 0 0.2rem;
}
</style>
