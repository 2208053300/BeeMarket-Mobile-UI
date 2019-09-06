<template>
  <div
    class="bee-task"
    :style="{backgroundImage:'url('+beeIcon.task_bg_bee+')'}"
  >
    <div class="task-header">
      <!-- <div class="header-title">
        新手专享
      </div> -->
      <div class="head-img">
        <img
          :src="taskData.basic_info.head_img||$store.state.app.head_detault"
          alt=""
        >
      </div>
      <div class="header-text1">
        <!-- @click="$router.push('/persion/BeeCommonweal')" -->
        <!-- 我的公益值：<span class="num">{{ taskData.basic_info.mine_charity_num }}</span> > -->
        三重豪礼 等您领取
      </div>
      <!-- <div class="header-text2">
        已通过完成任务获得 <span class="num">{{ taskData.basic_info.task_charity_num }}</span> 公益值
      </div> -->
    </div>
    <div class="task-card task1-content">
      <div class="task-title">
        Task 1
        <div class="right-angle" />
      </div>
      <div class="task-body">
        <div class="body-title">
          <div class="title-text1">
            <div class="circle" />
            <span>{{ taskData.task_list[0].title }}</span>
            <div class="circle" />
          </div>
          <div class="title-text2">
            {{ taskData.task_list[0].subtitle }}
          </div>
        </div>
        <div class="task-list">
          <div
            v-for="(item,index) in taskData.task_list[0].child_task"
            v-show="index===0||showAll"
            :key="index"
            class="task-detail"
            :style="{backgroundImage:'url('+getBg1(item.tid,item.task_status)+')'}"
            :class="[{helpBg:item.tid===7},{endBg:item.task_status===2}]"
          >
            <div
              class="task-num"
              :style="{backgroundImage:'url('+getBg2(item.task_status)+')'}"
            >
              <span v-if="index===0">任务一</span>
              <span v-if="index===1">任务二</span>
              <span v-if="index===2">任务三</span>
              <span v-if="index===3">任务四</span>
              <span v-if="index===4">任务五</span>
              <span v-if="index===5">任务六</span>
            </div>
            <div class="left-info">
              <div class="task-title2">
                {{ item.title }}
                <span class="get-num">+{{ item.available_charity_value }}</span>
              </div>
              <div class="task-subhead">
                {{ item.subtitle }}
              </div>
              <div
                v-if="item.tid!==7"
                class="task-status"
              >
                已有 <span class="num">{{ item.complete_num }}人</span> 完成该任务
              </div>
              <div
                v-if="item.tid===7"
                class="invite-num"
              >
                已有 <span class="num">{{ item.invite_friends_num }}</span> 位好友助力并领取
              </div>
            </div>
            <div
              v-if="item.task_status===0"
              class="task-action"
              :style="{backgroundImage:'url('+beeIcon.task_btn_n+')'}"
              @click="doTask(item)"
            >
              <span>去完成</span>
            </div>
            <div
              v-if="item.task_status===1"
              class="task-action"
              :style="{backgroundImage:'url('+beeIcon.task_btn_n+')'}"
              @click="getAward(item)"
            >
              <span>领取</span>
            </div>
            <div
              v-if="item.task_status===2"
              class="task-action end-task"
              :style="{backgroundImage:'url('+beeIcon.task_btn_d+')'}"
            >
              <span>已完成</span>
            </div>
          </div>
        </div>
        <div class="show-all-content">
          <div
            v-if="showAll"
            class="show-all"
            @click="showAll=false"
          >
            收起更多任务
            <van-icon name="arrow-up" />
          </div>
          <div
            v-if="!showAll"
            class="show-all"
            @click="showAll=true"
          >
            展开更多任务
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
    </div>
    <div class="task-card task2-content">
      <div class="task-title">
        Task 2
        <div class="right-angle" />
      </div>
      <div class="task-body">
        <div class="body-title">
          <div class="title-text1">
            <div class="circle" />
            <span> {{ taskData.task_list[1].title }} </span>
            <div class="circle" />
          </div>
          <div class="title-text2">
            {{ taskData.task_list[1].subtitle }}
          </div>
        </div>
        <div class="task-detail">
          <div class="step-list">
            <img
              :src="beeIcon.task_pic_step"
              alt="任务步骤"
            >
          </div>
          <div class="task-action">
            <van-button
              class="go-task"
              round
              @click="$router.push({name:'taskDetail',query:{tid:taskData.task_list[1].tid}})"
            >
              <span v-if="taskData.task_list[1].is_receive===0">领取任务</span>
              <span v-else>去完成</span>
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="task-card task2-content">
      <div class="task-title">
        Task 3
        <div class="right-angle" />
      </div>
      <div class="task-body">
        <div class="body-title">
          <div class="title-text1">
            <div class="circle" />
            <span> {{ taskData.task_list[2].title }} </span>
            <div class="circle" />
          </div>
          <div class="title-text2">
            {{ taskData.task_list[2].subtitle }}
          </div>
        </div>
        <div class="task-detail">
          <div class="step-list step-list2">
            <img
              :src="beeIcon.task_pic_bird"
              alt="任务步骤"
            >
          </div>
          <div class="task-action">
            <van-button
              class="go-task"
              round
              @click="$router.push({name:'taskDetail',query:{tid:taskData.task_list[2].tid}})"
            >
              <span v-if="taskData.task_list[2].is_receive===0">领取任务</span>
              <span v-else>去完成</span>
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="showSuccess"
      class="award-success"
    >
      <div class="success-content">
        <div class="success-img">
          <img
            :src="beeIcon.task_pic_value"
            alt=""
          >
        </div>
        <div class="success-text1">
          领取成功
        </div>
        <div class="success-num">
          恭喜您获得 <span class="num">{{ getNum }}</span> 公益值
        </div>
        <div class="done-btn">
          <van-button
            class="btn"
            round
            @click="showSuccess=false"
          >
            确定
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getTaskList, getTaskAward } from '@/api/BeeApi/task'
import { getUID, security } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
export default {
  metaInfo() {
    return {
      title: '新手专享'
    }
  },
  components: {},
  props: {},
  data() {
    return {
      taskData: {
        basic_info: {},
        task_list: [{}, {}, {}]
      },
      beeIcon: {
        task_bg_bee: require('@/assets/icon/task/task_bg_bee@2x.png'),
        task_bg_s_d: require('@/assets/icon/task/task_bg_s_d@2x.png'),
        task_bg_s_n: require('@/assets/icon/task/task_bg_s_n@2x.png'),
        task_title_l_d: require('@/assets/icon/task/task_title_l_d@2x.png'),
        task_title_l_n: require('@/assets/icon/task/task_title_l_n@2x.png'),
        task_btn_d: require('@/assets/icon/task/task_btn_d@2x.png'),
        task_btn_n: require('@/assets/icon/task/task_btn_n@2x.png'),
        task_title_s_d: require('@/assets/icon/task/task_title_s_d@2x.png'),
        task_title_s_n: require('@/assets/icon/task/task_title_s_n@2x.png'),
        task_pic_step: require('@/assets/icon/task/task_pic_step.png'),
        task_pic_bird: require('@/assets/icon/task/task_pic_bird.png'),

        task_pic_value: require('@/assets/icon/task/task_pic_value@2x.png')
      },
      showAll: false,
      showSuccess: false,
      getNum: 100,
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getTaskListData()
    this.loadUID()
    this.securityData()
  },
  methods: {
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: '新手专享·好礼各种送',
        desc: '更多优惠，更多公益值等你来赚赚赚！',
        imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
        link: window.location.href.split('#')[0] + '#' + `/beeTask?uid=${this.uid}`
      })
    },
    async getTaskListData() {
      const res = await getTaskList({ way: 'H5' })
      this.taskData = res.data
    },
    async securityData() {
      const res = await security()
      this.$store.state.user.hasPhone = res.data.mobile_bind
    },
    async getAward(item) {
      if (!this.$store.state.user.hasPhone) {
        this.$router.push('/persion/profile/accountBind/bindPhone')
        return
      }
      const res = await getTaskAward({ tid: item.tid })
      if (res.status_code === 200) {
        this.getNum = item.available_charity_value
        this.showSuccess = true
        this.getTaskListData()
      }
    },
    // 去完成
    doTask(item) {
      // 如果没有绑定手机号，直接跳转
      if (!this.$store.state.user.hasPhone) {
        this.$router.push('/persion/profile/accountBind/bindPhone')
        return
      }
      switch (item.target_to) {
        case 1:
          this.$router.push({ path: '/discover', query: { active: 1 }})
          break
        case 2:
          window.location.href = item.target_url
          break
        case 3:
          this.$router.push({ path: '/persion/order', query: { s_status: 3 }})
          break
        case 4:
          this.$router.push({ path: '/category' })
          break
        default:
          break
      }
    },
    getBg1(tid, status) {
      if (tid !== 7) {
        return status !== 2
          ? this.beeIcon.task_bg_s_n
          : this.beeIcon.task_bg_s_d
      } else {
        return status !== 2
          ? this.beeIcon.task_title_l_n
          : this.beeIcon.task_title_l_d
      }
    },
    getBg2(status) {
      return status !== 2
        ? this.beeIcon.task_title_s_n
        : this.beeIcon.task_title_s_d
    }
  }
}
</script>

<style scoped lang="less">
.bee-task {
  height: 100%;
  background-color: @BeeDefault;
  background-size: contain;
  background-repeat: no-repeat;
  .task-header {
    text-align: center;
    padding-top: 0.4rem;
    .header-title {
      font-size: 0.36rem;
      color: #ffffff;
      height: 0.88rem;
      line-height: 0.88rem;
    }
    .head-img {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      border: 0.08rem solid rgba(255, 255, 255, 0.2);
      box-sizing: border-box;
      margin: auto;
      overflow: hidden;
      margin-top: 0.2rem;
    }
    .header-text1 {
      margin: 0.16rem 0;
      font-size: 0.32rem;
      color: @White1;
      .num {
        font-size: 0.52rem;
        font-weight: bold;
      }
    }
    .header-text2 {
      margin: 0.24rem 0 0.4rem;
      font-size: 0.24rem;
      color: @White1;
      .num {
        font-weight: bold;
      }
    }
  }
  .task-card {
    padding: 0.2rem;
    margin: 0 0.3rem 0.2rem;
    background-color: #fff;
    border-radius: 0.16rem;
    position: relative;
    .task-title {
      width: 1.1rem;
      height: 0.36rem;
      position: absolute;
      left: 0;
      top: 0.2rem;
      background-color: #fde0c0;
      text-align: center;
      color: #f9750e;
      .right-angle {
        position: absolute;
        right: -0.1rem;
        top: 0;
        width: 0.1rem;
        height: 0.36rem;
        background-color: #fde0c0;
        clip-path: polygon(0 0, 100% 50%, 0 100%, 0 0);
      }
    }
    .task-body {
      background-size: 6.4rem;
      background-repeat: no-repeat;
      background-position: center 0.12rem;
      padding: 0.24rem;
      margin-top: 0.5rem;
      border: 0.04rem solid #ffdfbf;
      border-radius: 0.2rem;
      position: relative;
      .body-title {
        position: absolute;
        top: -0.24rem;
        text-align: center;
        width: 5.9rem;
        .title-text1 {
          font-size: 0.38rem;
          color: @Orange3;
          font-weight: bold;
          margin: auto;
          display: inline-flex;
          justify-content: space-between;
          background-color: #ffffff;
          align-items: center;
          span {
            margin: 0 0.2rem;
          }
          .circle {
            width: 0.2rem;
            height: 0.2rem;
            box-sizing: border-box;
            border-radius: 50%;
            border: 0.04rem solid #ffdfbf;
          }
        }
        .title-text2 {
          margin-top: 0.24rem;
          font-size: 0.26rem;
          color: @BeeDefault3;
        }
      }
    }
  }
  .task1-content {
    .task-body {
      .task-list {
        margin: 1rem 0;
        .task-detail {
          height: 2.3rem;
          width: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          position: relative;
          margin-top: 0.2rem;
          .task-num {
            width: 0.84rem;
            height: 0.41rem;
            background-size: contain;
            background-repeat: no-repeat;
            position: absolute;
            left: -0.04rem;
            top: 0.12rem;
            font-size: 0.2rem;
            color: #ffffff;
            line-height: 0.35rem;
            text-align: center;
          }
          .left-info {
            padding: 0 0.44rem;
            flex: 1;
            .task-title2 {
              font-size: 0.32rem;
              font-weight: bold;
              color: @Orange2;
              margin-top: 0.1rem;
              .get-num {
                font-size: 0.36rem;
                margin-left: 0.2rem;
              }
            }
            .task-subhead {
              font-size: 0.24rem;
              color: @BeeDefault;
              margin-top: 0.08rem;
            }
            .task-status {
              font-size: 0.22rem;
              margin-top: 0.1rem;
              .num {
                color: @BeeDefault;
              }
            }
            .invite-num {
              font-size: 0.24rem;
              margin-top: 0.2rem;
              white-space: nowrap;
              .num {
                color: @BeeDefault;
              }
            }
          }
          .task-action {
            min-height: 1.08rem;
            min-width: 1.08rem;
            background-size: cover;
            background-repeat: no-repeat;
            margin-right: 0.12rem;
            line-height: 1.08rem;
            text-align: center;
            color: #ffffff;
          }
        }
        .helpBg {
          height: 2.84rem;
        }
        .endBg {
          .left-info {
            .task-title2 {
              color: @Grey2;
              .get-num {
                color: @Grey2;
              }
            }
            .task-subhead {
              color: @Grey1;
            }
            .task-status {
              color: @Grey1;
              .num {
                color: @Grey1;
              }
            }
            .invite-num {
              color: @Grey1;
              .num {
                color: @Grey1;
              }
            }
          }
        }
      }
      .show-all-content {
        width: 100%;
        height: 0.8rem;
        position: absolute;
        left: 0;
        bottom: 0.2rem;
      }
      .show-all {
        margin: auto;
        background: linear-gradient(to bottom, #fec108, #fe9907);
        width: 3.6rem;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.28rem;
        color: #fff;
        text-align: center;
        .van-icon {
          vertical-align: middle;
        }
      }
    }
  }
  .task2-content {
    .task-detail {
      margin-top: 1rem;
      .step-list {
        width: 4.88rem;
        height: 1.66rem;
        margin: auto;
      }
      .step-list {
        width: 4.75rem;
        height: 1.51rem;
      }
      .task-action {
        text-align: center;
        margin-top: 0.4rem;
        .go-task {
          width: 3.6rem;
          height: 0.8rem;
          line-height: 0.8rem;
          padding: 0;
          border: none;
          font-size: 0.3rem;
          color: #ffffff;
          background: linear-gradient(to bottom, #fec108, #fe9907);
        }
      }
    }
  }
  .award-success {
    border-radius: 0.16rem;
    .success-content {
      height: 6.48rem;
      width: 5.6rem;
      box-sizing: border-box;
      padding: 0.6rem 0.64rem 0.4rem;
      background-color: #fff;
      .success-img {
        height: 2.12rem;
        width: 2.12rem;
        margin: auto;
      }
      .success-text1 {
        margin: 0.68rem 0 0.24rem;
        font-size: 0.4rem;
        text-align: center;
      }
      .success-num {
        font-size: 0.28rem;
        color: @Grey2;
        text-align: center;
        .num {
          font-size: 0.36rem;
          color: @BeeDefault;
        }
      }
      .done-btn {
        margin: 0.96rem auto 0;
        text-align: center;
        .btn {
          width: 4.32rem;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.32rem;
          color: #ffffff;
          border: none;
          background: linear-gradient(to right, #fe9a08, #ffc400);
        }
      }
    }
  }
}
</style>
