<template>
  <div class="down-time">
    <span>{{ downTime }}</span>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    time: {
      type: Number,
      default: 0
    },
    rid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      nowTime: 0,
      downTime: ''
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.nowTime = this.time
  },
  mounted() {
    // const self = this
    // let countTime = self.endtime
    // var indexvalue = self.indexvalue
    // const time = setInterval(function() {
    //   if (self.flag) {
    //     var item = vm.list[indexvalue]
    //     item.showNormal = false
    //     Vue.set(vm.list, indexvalue, item)
    //     clearInterval(time)
    //   }
    //   countTime = countTime - 1000
    //   self.timeDown(countTime)
    // }, 1000)
    this.timeDown(this.nowTime)
  },
  methods: {
    timeDown(endTime) {
      // if (endTime <= 1000) {
      //   this.flag = true
      // }
      // const hour = parseInt(endTime / 1000 / 3600)
      // const min = parseInt((endTime / 1000 - hour * 3600) / 60)
      // const sec = parseInt(endTime / 1000 - hour * 3600 - min * 60)
      // this.time = hour + ':' + min + ':' + sec
      const clock = setInterval(() => {
        this.nowTime--
        this.downTime = this.formatSeconds(this.nowTime)
        if (this.nowTime <= 0) {
          this.nowTime = 0
          this.downTime = this.formatSeconds(this.nowTime)
          window.clearInterval(clock)

          this.$emit('changeStatus', this.rid)
        }
      }, 1000)
    },
    // 将秒数转换为时分秒格式
    formatSeconds(value) {
      let theTime = parseInt(value) // 秒
      let middle = 0 // 分
      let hour = 0 // 小时
      let day = 0 // 天
      if (theTime > 60) {
        middle = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (middle > 60) {
          hour = parseInt(middle / 60)
          middle = parseInt(middle % 60)
          if (hour > 24) {
            day = parseInt(hour / 24)
            hour = parseInt(hour % 24)
          }
        }
      }
      // 一次 秒 分 小时 天
      let result = '' + parseInt(theTime)
      if (middle > 0) {
        result = '' + parseInt(middle) + ':' + result
      }
      if (hour > 0) {
        result = '' + parseInt(hour) + ':' + result
      }
      if (day > 0) {
        result = '' + parseInt(day) + ':' + result
      }
      return result
    }
  }

}
</script>

<style scoped lang="less">
.down-time{font-size: 0.24rem;color:@BeeDefault;}
</style>
