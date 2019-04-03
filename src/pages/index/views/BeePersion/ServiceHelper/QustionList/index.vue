<template>
  <div>
    <!-- Navbar -->
    <van-nav-bar :title="sortName" left-arrow @click-left="back" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.num+'、'+item.title"
        @click="showAnswer(item.id)"
      />
    </van-list>
    <!-- 答案遮罩弹框 -->
    <AnswerPop ref="AnswerPop" :is-show="isShow" @getShow="getShow" />
  </div>
</template>

<script>
// 引入帮助客服api
import { getSortList } from '@/api/serviceHelp'
import AnswerPop from '../components/AnswerPop'
export default {
  components: {
    AnswerPop
  },
  props: {

  },
  data() {
    return {
      isShow: false,
      sortName: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    // this.getData()
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 获取数据
    getData() {
      getSortList(this.$route.query.id).then(res => {
        this.list.push(...res.data.listData)
        console.log(this.list)

        this.sortName = res.data.sortName

        this.loading = false
        if (this.list.length > 40) {
          this.finished = true
        }
      })
    },
    // 根据id获取答案
    showAnswer(id) {
      console.log(id)
      this.isShow = true
      this.$refs.AnswerPop.getAnswer(id)
    },
    // 接收答案弹框返回的 isShow 值
    getShow(v) {
      this.isShow = v
    },
    onLoad() {
      this.getData()
    }
  }
}
</script>

<style scoped lang="less">

</style>
