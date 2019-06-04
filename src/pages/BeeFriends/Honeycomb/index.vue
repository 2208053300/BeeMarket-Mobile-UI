<template>
  <div class="comb-list">
    123
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      combData: [{ name: 'a', id: '1' }],
      config: {},
      max_row_count: 0,
      min_row_count: 0,
      method: 'id'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 初始化
    init(data) {
      this.handleAction(data.length)
      this.combData = data
    },
    // 计算总圈数
    getCircleCount(num) {
      var circle_num = Math.ceil(Math.sqrt((num - 1) / 3 + 0.25) - 0.5)
      this.max_row_count = circle_num * 2 + 1
      this.min_row_count = circle_num + 1
      return this.max_row_count - this.min_row_count
    },
    handleAction(num) {
      // 总圈数配置给config
      this.config['total_circle'] = this.getCircleCount(num)
      var row_count = {}
      for (var i = 0; i <= this.config['total_circle']; i++) {
        row_count[i] = this.max_row_count - i
      }
      this.config['row_count'] = row_count

      // 中心点
      var center_point = {}
      center_point['x'] = Math.ceil(row_count[0] / 2)
      center_point['y'] = this.config['total_circle'] + 1
      center_point['id'] = 'c' + center_point['x'] + center_point['y']
      center_point['class'] = 'c0'

      this.config['center_point'] = center_point

      this.config['circle_list'] = []
      for (i = 0; i <= this.config['total_circle']; i++) {
        if (i == 0) {
          // 第一圈 即是 最中心点
          var d = []
          d[0] = center_point
          this.config['circle_list'][i] = d
        } else {
          this.config['circle_list'][i] = this.getPoint(i)
        }
      }

      this.createEmptyHtml()
      this.animation()
    },
    getPoint(preCircle) {
      // 1 6 12 24
      var pre_circle = preCircle + 1
      var dd = []
      var j = 0
      var k = 0
      // 边1
      dd[j] = {}
      dd[j]['x'] = this.config['center_point']['x'] - preCircle
      dd[j]['y'] = this.config['center_point']['y']
      dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
      dd[j]['class'] = 'c' + preCircle

      j++
      for (var i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x']
        dd[j]['y'] = dd[k]['y'] - 1
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }

      // 边2
      for (i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] + 1
        dd[j]['y'] = dd[k]['y']
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边3
      for (i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] + 1
        dd[j]['y'] = dd[k]['y'] + 1
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边四
      for (i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] - 1
        dd[j]['y'] = dd[k]['y'] + 1
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边五
      for (i = 1; i < pre_circle; i++) {
        k = j - 1
        dd[j] = {}
        dd[j]['x'] = dd[k]['x'] - 1
        dd[j]['y'] = dd[k]['y']
        dd[j]['id'] = 'c' + dd[j]['x'] + dd[j]['y']
        dd[j]['class'] = 'c' + preCircle
        j++
      }
      // 边六
      for (i = 1; i < pre_circle - 1; i++) {
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
    // 空的Html
    createEmptyHtml: function() {
      var row = {}
      var ww = []
      var k = 0
      for (var i = 0; i < this.config['circle_list'].length; i++) {
        for (j = 0; j < this.config['circle_list'][i].length; j++) {
          if (!row[this.config['circle_list'][i][j]['y']]) {
            row[this.config['circle_list'][i][j]['y']] = {}
            row[this.config['circle_list'][i][j]['y']][k] = {}
          }
          row[this.config['circle_list'][i][j]['y']][k] = this.config[
            'circle_list'
          ][i][j]
          ww[k] = this.config['circle_list'][i][j]['id']
          k++
        }
      }
      var new_row = []
      var jj = 0
      for (i in row) {
        if (!new_row[jj]) {
          new_row[jj] = []
        }
        k = 0
        for (j in row[i]) {
          new_row[jj][k] = []
          new_row[jj][k] = row[i][j]
          k++
        }
        jj++
      }
      var temp
      for (i = 0; i < new_row.length; i++) {
        for (j = 0; j < new_row[i].length; j++) {
          for (jj = 0; jj < new_row[i].length - 1 - j; jj++) {
            if (new_row[i][jj]['x'] > new_row[i][jj + 1]['x']) {
              temp = new_row[i][jj + 1] // 元素交换
              new_row[i][jj + 1] = new_row[i][jj]
              new_row[i][jj] = temp
            }
          }
        }
      }
      this.config['rowId'] = ww
      var html = ''
      for (i = 0; i < new_row.length; i++) {
        html += "<div class='line'>"
        for (j = 0; j < new_row[i].length; j++) {
          html +=
            "<div class='hexagon " +
            new_row[i][j]['id'] +
            ' ' +
            new_row[i][j]['class'] +
            "' data-id='456'><div class='word'><p class='word-title'></p><a class='more' href='#'></a></div></div>"
        }
        html += '</div>'
      }
      $('#main').html(html)
    },
    animation() {
      var i = 0
      var len = 0
      if (this.method == 'class') {
        len = this.config['total_circle'] + 1
      } else if (this.method == 'id') {
        len = this.config['rowId'].length
      } else {
      }
      // class 动画
      t = 500
      var that = this
      var Timid = setInterval(function(args) {
        if (that.method == 'class') {
          $('.c' + i).css('background-image', 'url(hexagon_gray.svg)')
        } else if (that.method == 'id') {
          id = that.config['rowId'][i]
          $('.' + id).css('background-image', 'url(hexagon_gray.svg)')
          $('.' + id).attr({ 'data-userId': data[i].id })
        }
        len--
        i++
        if (i == this.data.length) {
          clearInterval(Timid)
        }
      }, t)
    }
  }
}
</script>

<style scoped lang="less">
.comb-list {
  display: flex;
  width: 100%;
  overflow-x: scroll;
  margin-top: 50px;
  #main {
    margin: auto;
    display: block;
  }

  .line {
    display: flex;
    justify-content: center;
    margin-top: -10px;
  }

  .hexagon {
    // background: url(hexagon_empty.svg) no-repeat;
    background-size: 100%;
    height: 80px;
    width: 80px;
    transform: rotate(90deg);
  }

  img {
    width: 30px;
    height: 30px;
  }

  .img {
    width: 30px;
    height: 30px;
    display: inline-block;
  }
}
</style>
