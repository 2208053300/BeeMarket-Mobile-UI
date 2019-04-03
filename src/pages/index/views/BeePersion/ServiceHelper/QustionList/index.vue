<template>
  <div>
    <!-- Navbar -->
    <van-nav-bar :title="sortName" fixed left-arrow @click-left="back" />
    <div class="container">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item,index) in list"
          :key="item.id"
          :title="(index+1)+'、'+item.title"
          @click="showAnswer(item.id)"
        />
      </van-list>
    </div>
    <!-- 底部联系客服按钮 -->
    <ContactCustomer />
    <!-- 答案遮罩弹框 -->
    <AnswerPop ref="AnswerPop" :is-show="isShow" @getShow="getShow" />
  </div>
</template>

<script>
// 引入帮助客服api
import { getSortList } from '@/api/serviceHelp'
import ContactCustomer from '../components/ContactCustomer'
import AnswerPop from '../components/AnswerPop'
export default {
  components: {
    ContactCustomer,
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
      finished: false,
      page: 1
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
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 获取数据
    getData() {
      getSortList(this.$route.query.id, this.page).then(res => {
        this.sortName = res.data.sortName
        if (res.data.listData.length > 0) {
          this.list.push(...res.data.listData)
          console.log(this.list, this.page)
          this.loading = false
        } else {
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
      this.page += 1
      console.log(this.page)
    }
  }
}
</script>

<style scoped lang="less">
.container{margin-bottom: 75px;}
</style>
