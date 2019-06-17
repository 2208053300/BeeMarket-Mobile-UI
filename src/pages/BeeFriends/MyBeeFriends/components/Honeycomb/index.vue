<template>
  <div
    ref="combList"
    class="comb-list"
    :style="{transform:'scale('+listScale+') translate('+listX+'px,'+listY+'px)'}"
  >
    <div
      v-for="(item,index) in FriendList"
      :key="index"
      class="line"
    >
      <div
        v-for="(item2,index2) in item"
        :key="index2"
        :ref="'hexagon'+item2.id"
        :class="[{showitem:showList.indexOf(item2.id)!==-1&&item2.nickname&&checkOverflow('hexagon'+item2.id)},{firstItem:item2.id===config.center_point.id}]"
        class="comb-card hexagon"
        :test="index2"
        @click="showDetail(item2)"
      >
        <div class="box1" />
        <div class="box2">
          <div class="img-content">
            <img
              :src="item2.head_image_url"
              alt=""
            >
          </div>
        </div>
        <div class="box3" />
      </div>
    </div>
  </div>
</template>

<script>
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
      showTime: 0,
      showList: [],
      afItem: null,
      listScale: 1,
      listX: 0,
      listY: 0,
      lastX: 0,
      lastY: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 获取操作的DOM
    const combList = this.$refs.combList
    const hammerEl = new Hammer(combList)
    var pinch = new Hammer.Pinch()
    // 添加缩放事件
    hammerEl.add(pinch)
    hammerEl.on('pinch', evt => {
      if (evt.scale < 1.7) {
        // 设置缩放
        this.listScale = evt.scale
      }
    })
    // 添加拖动事件
    hammerEl.on('panmove', evt => {
      this.listX = evt.deltaX + this.lastX
      this.listY = evt.deltaY + this.lastY
    })
    // 记录拖动结束的位置，下次拖动起点
    hammerEl.on('panend', evt => {
      this.lastX = this.listX
      this.lastY = this.listY
    })
  },
  methods: {
    // async getBeeFriendsData() {
    //   const res = await axios(
    //     'https://www.easy-mock.com/mock/5c74955332eba876f9c7b0cf/BeeMarket-Admin/beeFriends'
    //   )
    //   this.combData = res.data.data
    //   console.log(res.data.data)
    //   this.handleAction(this.combData.length)
    //   this.animateList()
    // },
    // 初始化
    // init(data) {
    //   this.handleAction(data.length)
    //   this.combData = data
    // },
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
    showDetail(item) {
      this.$emit('update:detailCard', true)
      this.$emit('update:detailItem', item)
    },
    // REVIEW 判断是否超出屏幕
    checkOverflow(val) {
      const hrect = this.$refs[val][0].getBoundingClientRect()
      // 六边形XY轴
      const hTop = hrect.y || hrect.top
      const hLeft = hrect.x || hrect.left
      // 屏幕宽高
      const wWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      const wHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      // 是否到达屏幕边距
      if (hTop > wHeight - 50 || hTop < 50) {
        return false
      } else if (hLeft > wWidth - 50 || hLeft < 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang="less">
.comb-list {
  position: relative;
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
      width: 1.1rem;
      height: 1.3rem;
      position: relative;
      transition: opacity 1s;
      margin: 0 0.1rem;
      margin-top: -5px;
      .box1 {
        width: 0;
        border-left: 0.55rem solid transparent;
        border-right: 0.55rem solid transparent;
        border-bottom: 0.3rem solid #fff;
      }
      .box2 {
        width: 1.1rem;
        height: 0.65rem;
        background-color: #fff;
        .img-content {
          position: absolute;
          top: 0.24rem;
          left: 0.16rem;
          overflow: hidden;
          width: 0.8rem;
          height: 0.8rem;
          box-sizing: border-box;
          border-radius: 50%;
          border: 0.04rem solid @BeeDefault;
        }
      }
      .box3 {
        width: 0;
        border-top: 0.3rem solid #fff;
        border-left: 0.55rem solid transparent;
        border-right: 0.55rem solid transparent;
      }
    }
    .firstItem {
      position: relative;
      left: -0.05rem;
      top: -0.08rem;
      .box1 {
        width: 0;
        border-left: 0.6rem solid transparent;
        border-right: 0.6rem solid transparent;
        border-bottom: 0.35rem solid #fff;
      }
      .box2 {
        width: 1.2rem;
        height: 0.75rem;
        background-color: #fff;
        .img-content {
          position: absolute;
          top: 0.24rem;
          left: 0.1rem;
          overflow: hidden;
          width: 1rem;
          height: 1rem;
          box-sizing: border-box;
          border-radius: 50%;
          border: 0.04rem solid @BeeDefault;
        }
      }
      .box3 {
        width: 0;
        border-top: 0.35rem solid #fff;
        border-left: 0.6rem solid transparent;
        border-right: 0.6rem solid transparent;
      }
    }
    .showitem {
      opacity: 1;
    }
  }
}
</style>
