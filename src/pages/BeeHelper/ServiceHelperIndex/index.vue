<template>
  <div>
    <!-- 用户信息 -->
    <div class="container">
      <div class="user-info flex align-center bg-white">
        <img
          :src="user.head_image_url"
          class="avatar"
        >
        <div class="info">
          <p class="name">
            <span>{{ user.nickname }}</span>，您好！
          </p>
          <p class="tip">
            欢迎来到蜂集市客服中心，很高兴为您服务
          </p>
        </div>
      </div>
      <!-- 热点问题 -->
      <p class="helper-title">
        热点问题
      </p>
      <van-cell-group>
        <van-cell
          v-for="(item, index) in hot_problem"
          :key="index"
          :title="item.question"
          @click="showAnswer(item.id)"
        />
      </van-cell-group>
      <!-- 问题分类 -->
      <p class="helper-title">
        问题类型
      </p>
      <van-row class="bg-white sort-div">
        <van-col
          v-for="(item, index) in problem_type"
          :key="index"
          span="8"
        >
          <div
            class="text-center sort-box"
            @click="goList(item.id)"
          >
            <p class="sort-name">
              {{ item.name }}
            </p>
            <p class="sort-desc">
              {{ item.describe }}
            </p>
          </div>
        </van-col>
      </van-row>
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
import { getServiceIndex } from '@/api/BeeApi/user'
import ContactCustomer from '../components/ContactCustomer'
import AnswerPop from '../components/AnswerPop'
export default {
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
      // 是否显示联系客服按钮 app 显示
      isShowCoustomer: true,
      isShow: false,
      user: {
        nickname: '',
        head_image_url: require('@/assets/icon/personalCenter/head_default.png')
      },
      hot_problem: [
      ],
      problem_type: [

      ]

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getIndexData()

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
    // 获取帮助首页信息
    async getIndexData() {
      const res = await getServiceIndex()
      if (res.data.user_info.head_image_url) {
        this.user = res.data.user_info
      } else {
        this.user.nickname = '游客'
      }
      this.hot_problem = res.data.hot_problem
      this.problem_type = res.data.problem_type
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
      // this.$router.push({
      //   path: '/qustionList',
      //   query: {
      //     id: id
      //   }
      // })
      this.$router.push({
        name: 'qustionList',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.avatar {
  width: 0.98rem;
  height: 0.98rem;
  border-radius: 50%;
  margin-right: 0.3rem;
}
.user-info {
  padding: 0 0.3rem;
  .name {
    font-size: 0.28rem;
    color: #000;
    margin-bottom: 0.2rem;
  }
  .tip {
    font-size: 0.24rem;
    color: #999;
  }
}
.helper-title {
  font-size: 0.22rem;
  padding-left: 0.3rem;
}

.sort-box {
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 0.2rem 0;
  p {
    margin: 0;
  }
  .sort-name {
    font-size: 0.26rem;
    color: #333;
    margin-bottom: 0.2rem;
  }
  .sort-desc {
    font-size: 0.2rem;
    color: #999;
  }
}
.sort-div .van-col:nth-child(3n) {
  .sort-box {
    border-right: none;
  }
}
</style>
