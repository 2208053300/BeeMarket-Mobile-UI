<template>
  <div class="history-edit">
    <van-nav-bar title="历史足迹" fixed>
      <div slot="left" class="nav-right">
        <van-icon name="arrow-left" size="20px" @click="back" />
      </div>
      <div slot="right">
        <span @click="$router.push('/persion/history')">完成</span>
      </div>
    </van-nav-bar>

    <!-- 内容 -->
    <div class="wrapper container bg-gray hitory-index">
      <p>{{ history.historySelected }}</p>
      <van-row
        v-for="(item, index) in history.historyInfo"
        :key="index"
        class="history-list margin-b-20  bg-white "
      >
        <p class="date">
          {{ item.date }}
        </p>
        <van-checkbox-group v-model="history.historySelected" class="flex flex-wrap">
          <van-checkbox
            v-for="pro in item.dayData"
            :key="pro.id"
            :name="pro"
            :checked-color="BeeDefault"
            class="checkbox"
            @click="changeAll(index,item.dayData,allSelectedBox[index])"
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
                <van-icon name="ellipsis" color="#dcdcdc" />
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
import { delHistoryItem } from '@/api/user'
import { mapState, mapActions } from 'vuex'
import { BeeDefault } from '../../../../styles/variables.less'

export default {
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
      allSelec: false

    }
  },
  computed: {
    ...mapState(['history', 'app'])
  },
  watch: {},
  created() {},
  mounted() {
    this.hideNavBar()
    const tempData = []
    const tempDataId = []
    for (let index = 0; index < this.history.historyInfo.length; index++) {
      this.$set(this.allSelectedBox, index, false)
      for (let i = 0; i < this.history.historyInfo[index].dayData.length; i++) {
        tempDataId.push(this.history.historyInfo[index].dayData[i].id)
        tempData.push(this.history.historyInfo[index].dayData[i])
      }
    }
    this.allSelectedDataIds = tempDataId
    this.allSelectedData = tempData
  },
  methods: {
    ...mapActions(['GetHistoryInfo']),
    // 隐藏底部导航栏
    hideNavBar() {
      this.$store.state.app.beeFooter.show = false
    },
    // 返回并显示底部导航
    back() {
      this.$router.go(-1)
    },

    // NOTE 全选
    allSelected1() {
      if (this.allSelec) {
        this.history.historySelected = this.allSelectedData
      } else {
        this.history.historySelected = []
      }
    },
    // // FIXME 有点小问题，选中子类全选可能出错
    changeAll(index, val, isAll) {
      if (isAll) {
        this.allSelectedBox[index] = false
        return
      }
      const addVal = val.filter(item => {
        return this.history.historySelected.indexOf(item) === -1
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

        // 删除本地对应数据
        for (let index = 0; index < this.history.historyInfo.length; index++) {
          for (let i = 0; i < this.history.historyInfo[index].dayData.length; i++) {
            if (this.history.historySelected.includes(this.history.historyInfo[index].dayData[i])) {
              console.log(this.history.historySelected, this.history.historyInfo[index].dayData[i])
              console.log(index, i)
              this.history.historyInfo[index].dayData.splice(i, 1)
            }
          }
        }
        this.history.historySelected = []
      })
    }

  }
}
</script>

<style lang="less">
@import "../../../../styles/variables.less";
.history-edit {
  .van-checkbox{
    width: 100%;
  }
  .van-checkbox__label{
    margin-left:0;
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
    border-color: @BeeDefault
  }
}
.wrapper {
  padding: 0.2rem;
}

</style>
