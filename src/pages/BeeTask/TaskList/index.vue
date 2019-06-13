<template>
  <div class="bee-task">
    <div class="task-header">
      <div class="heater-title">
        <span>峰任务</span>
        <van-button class="follow-bee">
          关注公众号
        </van-button>
      </div>
      <div class="user-info">
        <div class="head-img">
          <img
            :src="taskData.userImg"
            alt=""
          >
        </div>
        <div class="user-benefit">
          <div class="has-benefit">
            我的公益值：<span class="benefit-num">{{ taskData.benefitNum }}</span>
            <van-icon name="arrow" />
          </div>
          <span class="get-benefit">已通过完成任务获得 {{ taskData.benefitNum2 }} 公益值</span>
        </div>
      </div>
    </div>
    <div class="task-content">
      <div class="header-card">
        <div class="card-img">
          <img
            :src="beeIcon.task_pic_public_value"
            alt=""
          >
        </div>
        <div class="card-info">
          <div class="info-title">
            888个公益值送给你
          </div>
          <div class="info-desc">
            副标题
          </div>
        </div>
      </div>
      <div class="main-card">
        <div class="card-content">
          <div class="card-img">
            <img
              v-if="taskData.status1"
              :src="beeIcon.task_pic_a_d"
              alt=""
            >
            <img
              v-else
              :src="beeIcon.task_pic_a_n"
              alt=""
            >
          </div>
          <div class="right-info">
            <div class="card-info">
              <div class="info-title">
                成为达人<span
                  class="score"
                  :class="{successScore:taskData.status1}"
                >+100</span>
              </div>
              <div class="info-desc">
                副标题
              </div>
              <div class="success-num">
                已有 <span class="num">10000人</span> 完成该任务
              </div>
            </div>
            <van-button
              class="do-it"
              round
              :class="{successDo:taskData.status1}"
              @click="becomeTalent"
            >
              <span v-if="taskData.status1">已完成</span>
              <span v-else>去完成</span>
            </van-button>
          </div>
        </div>
        <div class="card-content">
          <div class="card-img">
            <img
              v-if="taskData.status2"
              :src="beeIcon.task_pic_b_d"
              alt=""
            >
            <img
              v-else
              :src="beeIcon.task_pic_b_n"
              alt=""
            >
          </div>
          <div class="right-info">
            <div class="card-info">
              <div class="info-title">
                购买宝贝<span
                  class="score"
                  :class="{successScore:taskData.status2}"
                >+100</span>
              </div>
              <div class="info-desc">
                副标题
              </div>
              <div class="success-num">
                已有 <span class="num">10000人</span> 完成该任务
              </div>
            </div>
            <van-button
              class="do-it"
              round
              :class="{successDo:taskData.status2}"
            >
              <span v-if="taskData.status2">已完成</span>
              <span v-else>去逛逛</span>
            </van-button>
          </div>
        </div>
        <div class="card-content">
          <div class="card-img">
            <img
              v-if="taskData.status3"
              :src="beeIcon.task_pic_c_d"
              alt=""
            >
            <img
              v-else
              :src="beeIcon.task_pic_c_n"
              alt=""
            >
          </div>
          <div class="right-info">
            <div class="card-info">
              <div class="info-title">
                助力公益<span
                  class="score"
                  :class="{successScore:taskData.status3}"
                >+100</span>
              </div>
              <div class="info-desc">
                副标题
              </div>
              <div class="success-num">
                已有 <span class="num">10000人</span> 完成该任务
              </div>
            </div>
            <van-button
              class="do-it"
              round
              :class="{successDo:taskData.status3}"
            >
              <span v-if="taskData.status3">已完成</span>
              <span v-else>去完成</span>
            </van-button>
          </div>
        </div>
        <div class="card-content">
          <div class="card-img">
            <img
              v-if="taskData.status4"
              :src="beeIcon.task_pic_d_d"
              alt=""
            >
            <img
              v-else
              :src="beeIcon.task_pic_d_n"
              alt=""
            >
          </div>
          <div class="right-info">
            <div class="card-info">
              <div class="info-title">
                发起助力<span
                  class="score"
                  :class="{successScore:taskData.status4}"
                >+100</span>
              </div>
              <div class="info-desc">
                副标题
              </div>
              <div class="success-num">
                已有 <span class="num">10000人</span> 完成该任务
              </div>
            </div>
            <van-button
              class="do-it"
              round
              :class="{successDo:taskData.status4}"
            >
              <span v-if="taskData.status4">已完成</span>
              <span v-else>去分享</span>
            </van-button>
          </div>
        </div>
        <div class="success-invite">
          <van-icon :name="beeIcon.task_icon_smile" />您已邀请成功 <span class="num">0/20</span> 位好友，快去分享吧！
          <!-- <span>您已成功邀请20位好友</span> -->
        </div>
      </div>
      <div class="footer-card">
        <div class="card-img">
          <img
            :src="beeIcon.task_pic_liqueur"
            alt=""
          >
        </div>
        <div class="right-info">
          <div class="card-info">
            <div class="info-title">
              10万箱茅台酒任意领
            </div>
            <div class="info-desc">
              副标题
            </div>
            <div class="success-num">
              已有 <span class="num">10000人</span> 完成该任务
            </div>
          </div>
          <van-button
            class="do-it"
            round
            :class="{successDo:taskData.status4}"
            @click="$router.push('/beeTask/taskDetail')"
          >
            <span v-if="taskData.status4">已完成</span>
            <span v-else>去领取</span>
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBeeTask } from '@/api/home'
export default {
  metaInfo: {
    title: '峰任务'
  },
  components: {},
  props: {},
  data() {
    return {
      taskData: {},
      beeIcon: {
        task_pic_public_value: require('@/assets/icon/home/task_pic_public_value@2x.png'),
        task_pic_a_n: require('@/assets/icon/home/task_pic_a_n@2x.png'),
        task_pic_a_d: require('@/assets/icon/home/task_pic_a_d@2x.png'),
        task_pic_b_n: require('@/assets/icon/home/task_pic_b_n@2x.png'),
        task_pic_b_d: require('@/assets/icon/home/task_pic_b_d-@2x.png'),
        task_pic_c_n: require('@/assets/icon/home/task_pic_c_n@2x.png'),
        task_pic_c_d: require('@/assets/icon/home/task_pic_c_d@2x.png'),
        task_pic_d_n: require('@/assets/icon/home/task_pic_d_n@2x.png'),
        task_pic_d_d: require('@/assets/icon/home/task_pic_d_d-@2x.png'),
        task_icon_smile: require('@/assets/icon/home/task_icon_smile@2x.png'),
        task_pic_liqueur: require('@/assets/icon/home/task_pic_liqueur@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getBeeTaskData()
  },
  methods: {
    async getBeeTaskData() {
      const res = await getBeeTask()
      this.taskData = res.data.task
    },
    becomeTalent() {
      this.$router.push({ name: 'becomeTalent' })
    }
  }
}
</script>

<style scoped lang="less">
.bee-task {
  .task-header {
    padding-bottom: 0.84rem;
    height: 2.56rem;
    background: linear-gradient(to right, #ffab38, #f9a247);
    .heater-title {
      text-align: center;
      height: 0.88rem;
      line-height: 0.88rem;
      position: relative;
      margin: 0 0.3rem;
      color: #ffffff;
      font-size: 0.36rem;
      .follow-bee {
        position: absolute;
        right: 0;
        border-color: transparent;
        line-height: 0.88rem;
        font-size: 0.3rem;
        color: #ffffff;
        background-color: transparent;
        padding: 0;
      }
    }
    .user-info {
      padding: 0.32rem 0.3rem 0.2rem;
      height: 1.16rem;
      display: flex;
      align-items: center;
      .head-img {
        border: 0.08rem solid rgba(255, 255, 255, 0.3);
        box-sizing: border-box;
        height: 1.16rem;
        width: 1.16rem;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
      .user-benefit {
        color: #fefefe;
        .has-benefit {
          font-size: 0.32rem;
          margin-bottom: 0.28rem;
          .benefit-num {
            font-size: 0.52rem;
            margin-right: 0.12rem;
          }
        }
        .get-benefit {
          font-size: 0.28rem;
        }
      }
    }
  }
  .task-content {
    position: relative;
    top: -0.84rem;
    .header-card {
      background-color: #fff;
      padding: 0.52rem 0.32rem;
      margin: 0 0.3rem;
      box-sizing: border-box;
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      box-shadow: 0 0.02rem 0.1rem rgba(153, 153, 153, 0.2);
      position: relative;
      z-index: 2;
      .card-img {
        width: 1.16rem;
        height: 1.16rem;
        margin-right: 0.32rem;
      }
      .card-info {
        .info-title {
          font-size: 0.32rem;
        }
        .info-desc {
          font-size: 0.26rem;
          color: @Grey2;
          margin-top: 0.2rem;
        }
      }
    }
    .main-card {
      background-color: #fff;
      box-sizing: border-box;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      margin: 0 0.44rem 0.2rem;
      z-index: 1;
      .card-content {
        padding: 0.4rem 0.32rem 0.4rem 0.16rem;
        display: flex;
        &:not(:last-child) {
          padding-bottom: 0;
          .right-info {
            border-bottom: none;
          }
        }
        .card-img {
          width: 0.52rem;
          height: 0.52rem;
          margin-right: 0.2rem;
        }
        .right-info {
          display: flex;
          align-items: center;
          justify-content: space-between;

          flex: 1;
          .card-info {
            .info-title {
              font-size: 0.28rem;
              .score {
                color: @BeeDefault;
                font-size: 0.32rem;
                margin-left: 0.4rem;
              }
              .successScore {
                color: @Grey1;
              }
            }
            .info-desc {
              font-size: 0.24rem;
              color: @Grey2;
              margin-top: 0.2rem;
            }
            .success-num {
              font-size: 0.22rem;
              color: @Grey1;
              margin: 0.32rem 0 0.4rem;
              .num {
                color: @Grey2;
              }
            }
          }
          .do-it {
            width: 1.36rem;
            height: 0.44rem;
            line-height: 0.44rem;
            padding: 0;
            font-size: 0.24rem;
            color: #ffffff;
            border: none;
            background-color: @BeeDefault;
          }
          .successDo {
            background-color: rgba(153, 153, 153, 0.2);
          }
        }
      }
      .success-invite {
        padding: 0 0 0.4rem 0.88rem;
        font-size: 0.26rem;
        .van-icon {
          vertical-align: text-top;
          margin-right: 0.08rem;
        }
        .num {
          color: @BeeDefault;
        }
      }
    }
    .footer-card {
      display: flex;
      margin: 0 0.3rem;
      box-sizing: border-box;
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 0.52rem 0.32rem;
      .card-img {
        width: 1.16rem;
        height: 1.16rem;
        margin-right: 0.32rem;
      }
      .right-info {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        .card-info {
          .info-title {
            font-size: 0.28rem;
            .score {
              color: @BeeDefault;
              font-size: 0.32rem;
              margin-left: 0.4rem;
            }
            .successScore {
              color: @Grey1;
            }
          }
          .info-desc {
            font-size: 0.24rem;
            color: @Grey2;
            margin-top: 0.2rem;
          }
          .success-num {
            font-size: 0.22rem;
            color: @Grey1;
            margin: 0.32rem 0 0.4rem;
            .num {
              color: @Grey2;
            }
          }
        }
        .do-it {
          width: 1.36rem;
          height: 0.44rem;
          line-height: 0.44rem;
          padding: 0;
          font-size: 0.24rem;
          color: #ffffff;
          border: none;
          background-color: @BeeDefault;
        }
        .successDo {
          background-color: rgba(153, 153, 153, 0.2);
        }
      }
    }
  }
}
</style>
