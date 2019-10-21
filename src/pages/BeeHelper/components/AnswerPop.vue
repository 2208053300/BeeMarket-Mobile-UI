<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :overlay="true"
      @closed="closed"
      @click-overlay="closeAnswer"
    >
      <div class="answer-top flex flex-between align-center">
        <p class="title">
          {{ answerData.question }}
        </p>
        <van-icon name="close" size="24px" color="#ddd" @click="closeAnswer" />
      </div>
      <!-- eslint-disable-next-line  -->
      <div class="content" v-html="answerData.answer" />
      <div class="evalue flex flex-between align-center">
        <p class="tip">
          是否对您有帮助：
        </p>
        <div class="action flex align-center">
          <div class="yes flex align-center" @click="isUserful(1)">
            <!-- <van-icon name="passed" size="26px" /> -->
            <img v-if="used" :src="icon.useful" class="feedback-icon userful">
            <img v-else :src="icon.usefulActive" class="feedback-icon userful-active animated tada">
            <p class="is-userful">
              有用
            </p>
          </div>
          <div class="no flex align-center" @click="isUserful(0)">
            <!-- <van-icon name="close" size="26px" /> -->
            <img v-if="unused" :src="icon.unuseful" class="feedback-icon unuserful">
            <img v-else :src="icon.unusefulActive" class="feedback-icon unuserful-active animated tada">
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
import { getAnswer, solved, unsolved } from '@/api/BeeApi/user'
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

      id: 0,
      show: false,
      answerData: {
      },
      // 反馈图标
      icon: {
        useful: require('@/assets/icon/helper/help_yes.png'),
        usefulActive: require('@/assets/icon/helper/help_yes_active.png'),
        unuseful: require('@/assets/icon/helper/help_no.png'),
        unusefulActive: require('@/assets/icon/helper/help_no_active.png')
      },

      isAjaxed: false,
      used: true,
      unused: true

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
      this.id = id
      getAnswer({ id }).then(res => {
        this.answerData = res.data
      })
    },
    // 反馈答案有用没用 type 1 有用 0 没用
    async isUserful(type) {
      console.log(type)
      if (!this.isAjaxed) {
        if (type) {
          // TODO 请求接口 有用
          await solved({ id: this.id })
          this.used = false
          // this.$notify({
          //   message: '感谢您的反馈！',
          //   duration: 2000,
          //   background: '#1989fa'
          // })
          this.$toast.success('感谢您的反馈！')
        } else {
          // TODO 请求接口 没用
          await unsolved({ id: this.id })
          this.unused = false
          this.$toast.success('感谢您的反馈！')
          // this.$notify({
          //   message: '感谢您的反馈！',
          //   duration: 2000,
          //   background: '#1989fa'
          // })
        }
        this.isAjaxed = true
      }

      // this.$emit('getShow', false)
    },
    // 关闭弹框
    closed() {
      console.log('点击关闭')
      this.isAjaxed = false
      this.used = true
      this.unused = true
      console.log('点击关闭', this.isAjaxed)
    }
  }
}
</script>

<style scoped lang="less">
.answer-top {
  border-bottom: 1px solid #ddd;
  padding: 0 0.3rem;
  .title {
    padding: 0.3rem 0;
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
  line-height: 1.5;
  padding-top:0.3rem;
  padding-bottom: 0.3rem;
  p {
    font-size: 0.28rem;
    color: #333;

  }
}
.feedback-icon{
  width:0.43rem;
  height: 0.44rem;
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

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%, 20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }

  30%, 50%, 70%, 90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%, 60%, 80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%, 20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }

 30%, 50%, 70%, 90% {
    -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg);
  }

  40%, 60%, 80% {
    -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.tada {
  -webkit-animation-name: tada;
  animation-name: tada;
}

</style>
