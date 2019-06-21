<template>
  <div class="select-project">
    <van-popup
      v-model="showProject"
      class="project-pop"
      position="bottom"
      :close-on-click-overlay="false"
      @open="getWithdrawNumData"
      @close="handleClose"
      @click-overlay="handleClose"
    >
      <div class="project-content">
        <div class="select-title">
          可选项目
        </div>
        <div
          class="close-list"
          @click="handleClose"
        >
          <img
            :src="beeIcon.bee_firends_invite_icon_off"
            alt=""
          >
        </div>
        <div class="card-content">
          <div class="project-card">
            <div class="project-detail">
              <div class="left-text">
                <div class="text1">
                  可提现：<span class="num">{{ withdrawNum }}</span>元
                </div>
                <div class="text2">
                  兑换率：1桶=1元
                </div>
              </div>
              <div class="action-btn">
                <van-button>我要提现</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getWithdrawNum } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {
    showProject: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beeIcon: {
        bee_firends_invite_icon_off: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_off.png')
      },
      withdrawNum: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getWithdrawNumData() {
      const res = await getWithdrawNum()
      this.withdrawNum = res.data.sup_balance
    },
    handleClose() {
      this.$emit('update:showProject', false)
    }
  }
}
</script>

<style scoped lang="less">
.select-project {
  .project-pop {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    .project-content {
      position: relative;
      padding: 0.5rem 0.4rem;
      min-height: 8rem;
      box-sizing: border-box;
      .select-title {
        font-size: 0.26rem;
      }
      .close-list {
        position: absolute;
        top: 0.16rem;
        right: 0.16rem;
        width: 0.4rem;
        height: 0.4rem;
      }
      .project-card {
        margin-top: 0.22rem;
        border-radius: 0.1rem;
        height: 3.5rem;
        background-color: #f7b925;
        position: relative;
        .project-detail {
          position: absolute;
          bottom: 0.3rem;
          padding: 0 0.36rem 0 0.25rem;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .left-text {
            color: #fff;
            .text1 {
              font-size: 0.32rem;
            }
            .text2 {
              font-size: 0.24rem;
              margin-top: 0.16rem;
            }
          }
          .action-btn {
            .van-button {
              font-size: 0.24rem;
              color: #fff;
              width: 1.4rem;
              height: 0.48rem;
              border-radius: 0.24rem;
              line-height: 0.48rem;
              border-color: #fff;
              background-color: transparent;
              padding: 0;
            }
          }
        }
      }
    }
  }
}
</style>
