<template>
  <div
    ref="combList"
    class="comb-list"
    :style="{transform:'scale('+testData+')'}"
  >
    {{ testData }}

    <div
      v-for="(item,index) in FriendList"
      :key="index"
      class="line"
    >
      <div
        v-for="item2 in item"
        :key="item2.id"
        :class="{showitem:showList.indexOf(item2.id)!==-1&&item2.name}"
        :style="{background:'url('+beeIcon.hexagon_empty+') no-repeat 100% 100%'}"
        class="comb-card hexagon"
        @click="showDetail(item2.id)"
      >
        <!-- {{ item2.name }} -->
        <!-- <img
          :src="item2.head_img"
          alt=""
        > -->
      </div>
    </div>

    <transition name="fade1">
      <div
        v-if="showTest3"
        class="test1"
        @click="showTest3=false"
      />
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import Hammer from 'hammerjs'
import { setInterval, clearInterval } from 'timers'
export default {
  components: {},
  props: {
    detailCard: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      combData: [],
      config: {},
      max_row_count: 0,
      min_row_count: 0,
      FriendList: [],
      beeIcon: {
        hexagon_empty: require('@/assets/icon/beeFriends/hexagon_empty.svg')
      },
      showTime: 0,
      showList: [],
      afItem: null,
      testData: 1,
      showTest3: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getBeeFriendsData()
    const combList = this.$refs.combList
    console.log(this.$refs)

    const hammerEl = new Hammer(combList)
    var pinch = new Hammer.Pinch()
    hammerEl.add(pinch)
    hammerEl.on('pinch', evt => {
      this.testData = evt.scale
    })
  },
  methods: {
    async getBeeFriendsData() {
      const res = await axios(
        'https://www.easy-mock.com/mock/5c74955332eba876f9c7b0cf/BeeMarket-Admin/beeFriends'
      )
      this.combData = res.data.data
      console.log(res.data.data)
      this.handleAction(this.combData.length)
      this.animateList()
    },
    // 初始化
    init(data) {
      this.handleAction(data.length)
      this.combData = data
    },
    // 计算总圈数
    getCircleCount(num) {
      const circle_num = Math.ceil(Math.sqrt((num - 1) / 3 + 0.25) - 0.5)
      this.max_row_count = circle_num * 2 + 1
      this.min_row_count = circle_num + 1
      return this.max_row_count - this.min_row_count
    },
    handleAction(num) {
      // 总圈数配置给config
      this.config['total_circle'] = this.getCircleCount(num)
      const row_count = {}
      for (let i = 0; i <= this.config['total_circle']; i++) {
        row_count[i] = this.max_row_count - i
      }
      this.config['row_count'] = row_count

      // 中心点
      const center_point = {}
      center_point['x'] = Math.ceil(row_count[0] / 2)
      center_point['y'] = this.config['total_circle'] + 1
      center_point['id'] = 'c' + center_point['x'] + center_point['y']
      center_point['class'] = 'c0'

      this.config['center_point'] = center_point

      this.config['circle_list'] = []
      for (let i = 0; i <= this.config['total_circle']; i++) {
        if (i === 0) {
          // 第一圈 即是 最中心点
          const d = []
          d[0] = center_point
          this.config['circle_list'][i] = d
        } else {
          this.config['circle_list'][i] = this.getPoint(i)
        }
      }
      this.getListData()
      console.log(this.config)
    },
    // 获取每个数据的XY轴值
    getPoint(preCircle) {
      // 1 6 12 24
      const pre_circle = preCircle + 1
      const dd = []
      let j = 0
      let k = 0
      // 边1
      dd[j] = {}
      dd[j]['x'] = this.config['center_point']['x'] - preCircle
      dd[j]['y'] = this.config['center_point']['y']
      dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
      dd[j]['class'] = 'c' + preCircle

      j++
      for (let i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x']
        dd[j]['y'] = dd[k]['y'] - 1
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }

      // 边2
      for (let i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] + 1
        dd[j]['y'] = dd[k]['y']
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边3
      for (let i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] + 1
        dd[j]['y'] = dd[k]['y'] + 1
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边四
      for (let i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] - 1
        dd[j]['y'] = dd[k]['y'] + 1
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边五
      for (let i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] - 1
        dd[j]['y'] = dd[k]['y']
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边六
      for (let i = 1; i < pre_circle - 1; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] - 1
        dd[j]['y'] = dd[k]['y'] - 1
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }

      return dd
    },
    getListData() {
      const row = {}
      const ww = []
      let k = 0
      for (let i = 0; i < this.config['circle_list'].length; i++) {
        for (let j = 0; j < this.config['circle_list'][i].length; j++) {
          if (!row[this.config['circle_list'][i][j]['y']]) {
            row[this.config['circle_list'][i][j]['y']] = {}
            row[this.config['circle_list'][i][j]['y']][k] = {}
            // 每行数据
          }
          row[this.config['circle_list'][i][j]['y']][k] = this.config[
            'circle_list'
          ][i][j]
          row[this.config['circle_list'][i][j]['y']][k] = {
            ...this.combData[k],
            ...row[this.config['circle_list'][i][j]['y']][k]
          }
          // 动画顺序
          ww[k] = this.config['circle_list'][i][j]['id']
          k++
        }
      }
      // 调整顺序
      const new_row = []
      let jj = 0
      for (const i in row) {
        if (!new_row[jj]) {
          new_row[jj] = []
        }
        k = 0
        for (const j in row[i]) {
          new_row[jj][k] = []
          new_row[jj][k] = row[i][j]
          k++
        }
        jj++
      }
      // 获取真正的，每行填充数据
      console.log(new_row)

      let temp
      for (let i = 0; i < new_row.length; i++) {
        for (let j = 0; j < new_row[i].length; j++) {
          for (let jj = 0; jj < new_row[i].length - 1 - j; jj++) {
            if (new_row[i][jj]['x'] > new_row[i][jj + 1]['x']) {
              temp = new_row[i][jj + 1] // 元素交换
              new_row[i][jj + 1] = new_row[i][jj]
              new_row[i][jj] = temp
            }
          }
        }
      }
      this.config['rowId'] = ww
      this.FriendList = new_row
      console.log(row)
    },
    // 新增到显示的列表中
    animateList(row) {
      const timer1 = setInterval(() => {
        if (this.showTime > this.config.rowId.length) {
          clearInterval(timer1)
          return
        }
        this.showList.push(this.config.rowId[this.showTime])
        this.showTime++
      }, 100)
    },
    onPinch() {
      this.testData = 123
    },
    showDetail() {
      this.$emit('update:detailCard', true)
    }
  }
}
</script>

<style scoped lang="less">
.comb-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .line {
    display: flex;
    justify-content: center;
    margin-top: -5px;
    .hexagon {
      opacity: 0;
      background-repeat: no-repeat;
      background-size: 100%;
      height: 40px;
      width: 40px;
      min-width: 40px;
      min-height: 40px;
      position: relative;
      transition: opacity 1s;
    }
    .showitem {
      opacity: 1;
    }
  }
  .test1 {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #000;
    animation: test2 2s infinite;
    position: relative;
    top: 10px;
    @keyframes test2 {
      0% {
        top: 0;
      }
      50% {
        top: -10px;
      }
      100% {
        top: 0;
      }
    }
  }
  .fade1-enter-active,
  .fade1-leave-active {
    animation-play-state: paused;
    transition: all 3s;
  }
  .fade1-enter, .fade1-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
