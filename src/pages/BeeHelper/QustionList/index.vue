<template>
  <div>
    <!-- Navbar -->
    <div class="container">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的 o(´^｀)o"
        @load="getData"
      >
        <van-cell
          v-for="(item,index) in list"
          :key="item.id"
          :title="(index+1)+'、'+item.question"
          @click="showAnswer(item.id)"
        />
      </van-list>
    </div>
    <!-- 底部联系客服按钮 -->
    <ContactCustomer v-if="isShowCoustomer" />
    <!-- 答案遮罩弹框 -->
    <AnswerPop
      ref="AnswerPop"
      :is-show="isShow"
      @getShow="getShow"
    />
  </div>
</template>

<script>
import { getOs } from '@/utils'
// 引入帮助客服api
import { getSortList } from '@/api/BeeApi/user'
import ContactCustomer from '../components/ContactCustomer'
import AnswerPop from '../components/AnswerPop'
export default {
  // NOTE 动态表头数据需要函数方法
  metaInfo() {
    return {
      title: '客服帮助'
    }
  },
  components: {
    ContactCustomer,
    AnswerPop
  },
  props: {},
  data() {
    return {
      isShow: false,
      sortName: '',
      list: [],
      loading: false,
      finished: false,
      page: 1,
      isShowCoustomer: true,
      id: +this.$route.query.id
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.getData()
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    const osObj = getOs()
    if (osObj.isWx) {
      // this.isShowCoustomer = false
    } else if (osObj.isIphone && osObj.isApp) {
      // window.webkit.messageHandlers.OpenService.postMessage('')
    } else if (osObj.isAndroid && osObj.isApp) {
      // window.beeMarket.OpenService()
    } else {
      // this.isShowCoustomer = false
    }
  },
  methods: {
    // 获取数据
    getData() {
      setTimeout(async() => {
        try {
          const res = await getSortList({ type_id: this.id })
          this.list.push(...res.data)
          console.log(this.list, this.page)
          this.page++
          this.loading = false
          if (this.page > 1) {
            this.finished = true
          }
        } catch (error) {
          this.$toast(error)
        }

        // if (res.data.length === 0) {
        //   this.finished = true
        // }
      }, 500)
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
    }
  }
}
</script>

<style scoped lang="less">
.container {
  margin-bottom: 100px;
}
</style>
