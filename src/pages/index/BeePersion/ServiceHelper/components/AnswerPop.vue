<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :overlay="true"
      @click-overlay="closeAnswer"
    >
      <div class="answer-top flex flex-between align-center">
        <p class="title">
          {{ answerData.title }}
        </p>
        <van-icon name="close" size="24px" color="#ddd" @click="closeAnswer" />
      </div>
      <div class="content">
        <p>{{ answerData.content }}</p>
      </div>
      <div class="evalue flex flex-between align-center">
        <p class="tip">
          是否对您有帮助：
        </p>
        <div class="action flex align-center">
          <div class="yes flex align-center" @click="isUserful(1)">
            <van-icon name="passed" size="26px" />
            <p class="is-userful">
              有用
            </p>
          </div>
          <div class="no flex align-center" @click="isUserful(0)">
            <van-icon name="close" size="26px" />
            <p class="is-userful">
              没用
            </p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 引入帮助客服api
import { getAnswer } from '@/api/serviceHelp'
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      answerData: {
        title: '',
        content: ''
      }
    }
  },
  computed: {},
  watch: {
    isShow: {
      handler(newV, oldV) {
        this.show = newV
      }
    }
  },
  created() {
    this.show = this.isShow
  },
  mounted() {},
  methods: {
    // 点击遮罩是触发,关闭弹框
    closeAnswer() {
      this.$emit('getShow', false)
    },
    // 获取答案
    getAnswer(id) {
      getAnswer(id).then(res => {
        this.answerData = res.data.answerData
      })
    },
    // 反馈答案有用没用 type 1 有用 0 没用
    isUserful(type) {
      console.log(type)

      this.$emit('getShow', false)
      this.$notify({
        message: '感谢您的反馈！',
        duration: 2000,
        background: '#1989fa'
      })
    }
  }
}
</script>

<style scoped lang="less">
.answer-top {
  border-bottom: 1px solid #ddd;
  padding: 0 0.3rem;
  .title {
    font-weight: 600;
    font-size: 0.3rem;
    color: #333;
  }
}
.content {
  min-height: 3.73rem;
  height: 5rem;
  overflow: scroll;
  padding: 0 0.3rem;
  font-size: 0.28rem;
  color: #333;
  p {
    font-size: 0.28rem;
    color: #333;
  }
}
.evalue {
  border-top: 1px solid #ddd;
  padding: 0.3rem;
}
.tip {
  font-size: 0.26rem;
  color: #999;
}
.is-userful {
  margin-left: 0.2rem;
  font-size: 0.26rem;
  color: #333;
}
.yes {
  margin-right: 0.3rem;
}

</style>
