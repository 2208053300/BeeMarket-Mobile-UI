<template>
  <div>
    <!-- Navbar -->
    <van-nav-bar title="客服帮助" fixed left-arrow @click-left="back" />
    <!-- 用户信息 -->
    <div class="container">
      <div class="user-info flex align-center bg-white">
        <img :src="user.img" class="avatar">
        <div class="info">
          <p class="name">
            <span>{{ user.name }}</span>，您好！
          </p>
          <p class="tip">
            欢迎来到服务中心，很高兴为您服务
          </p>
        </div>
      </div>
      <!-- 热点问题 -->
      <p class="helper-title">
        热点问题
      </p>
      <van-cell-group>
        <van-cell v-for="(item, index) in hotQustion" :key="index" :title="item.title" @click="showAnswer(item.id)" />
      </van-cell-group>
      <!-- 问题分类 -->
      <p class="helper-title">
        问题类型
      </p>
      <van-row class="bg-white sort-div">
        <van-col v-for="(item, index) in sortList" :key="index" span="8">
          <div class="text-center sort-box" @click="goList(item.id)">
            <p class="sort-name">
              {{ item.title }}
            </p>
            <p class="sort-desc">
              {{ item.desc }}
            </p>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 底部联系客服按钮 -->
    <ContactCustomer />
    <!-- 答案遮罩弹框 -->
    <AnswerPop ref="AnswerPop" :is-show="isShow" @getShow="getShow" />
  </div>
</template>

<script>
// 引入帮助客服api
import { getServiceIndex } from '@/api/serviceHelp'
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
      user: {
        name: '',
        img: ''
      },
      hotQustion: [{
        id: 1,
        title: ''
      }],
      sortList: [
        {
          id: 1,
          title: '',
          desc: ''
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeFooter.show = false
    this.getIndexData()
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 获取帮助首页信息
    getIndexData() {
      getServiceIndex().then(res => {
        this.user = res.data.user
        this.hotQustion = res.data.hotQustion
        this.sortList = res.data.sortList
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
    // 跳转到分类下的问题列表
    goList(id) {
      this.$router.push({
        path: '/persion/ServiceHelper/QustionList',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container{margin-top: 56px;}
.avatar{width: 0.98rem; height: 0.98rem; border-radius: 50%; margin-right:0.3rem;}
.user-info{
  padding: 0 0.3rem;
  .name{
    font-size:0.28rem;
    color:#000;
    margin-bottom: 0.2rem;
  }
  .tip{
    font-size:0.24rem;
    color:#999;
  }
}
.helper-title{
  font-size: 0.22rem;
  padding-left: 0.3rem
}

.sort-box{
  border-right:1px solid #ddd;
  border-bottom:1px solid #ddd;
  padding: 0.2rem 0;
  p{margin: 0}
  .sort-name{font-size: 0.26rem; color: #333; margin-bottom: 0.2rem}
  .sort-desc{font-size: 0.2rem; color:#999;}
}
.sort-div .van-col:nth-child(3n){
  .sort-box{border-right: none}
}

</style>
