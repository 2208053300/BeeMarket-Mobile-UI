<template>
  <div class="friends-rank">
    <van-popup
      v-model="showRank"
      class="rank-pop"
      position="bottom"
      :close-on-click-overlay="false"
      @close="handleClose"
      @click-overlay="handleClose"
    >
      <div class="rank-content">
        <div class="rank-type">
          <div class="type-tab">
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_firend"
              class="tab-img"
            />
            <div class="type-num">
              蜂友：<span class="num">20</span>个
            </div>
          </div>
          <div class="type-tab disabled-tab2">
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_association"
              class="tab-img"
            />
            <div class="type-num">
              关联蜂友：<span class="num">20</span>个
            </div>
          </div>
          <div
            class="close-rank"
            @click="handleClose"
          >
            <img
              :src="beeIcon.bee_firends_invite_icon_off"
              alt="关闭"
            >
          </div>
          <div class="rank-header">
            <img
              :src="beeIcon.bee_firends_invite_icon_firends"
              alt="蜂友排行"
            >
          </div>
        </div>
        <div class="rank-list">
          <div class="friends-cell">
            <div class="ranking">
              <!-- 如果排名前小于三 -->
              <div class="rank-num">
                <img
                  :src="beeIcon.bee_firends_invite_icon_goldaward"
                  alt=""
                >
                <!-- <img
                  :src="beeIcon.bee_firends_invite_icon_silveraward"
                  alt=""
                >
                <img
                  :src="beeIcon.bee_firends_invite_icon_bronzeaward"
                  alt=""
                > -->
              </div>
              <!-- <span>1</span> -->
            </div>
            <div class="friends-detail">
              <div class="head-img">
                <img
                  src=""
                  alt=""
                >
              </div>
              <div class="firends-name">
                <div class="left-detail">
                  <span class="name">巧克力冰激凌</span>
                  <span class="firends">（关联蜂友：<span class="num">100</span>个 ）</span>
                  <div class="honey-num">
                    累计贡献蜜点<span class="num">250</span>个
                  </div>
                </div>
                <div class="crown">
                  <img
                    :src="beeIcon.bee_firends_invite_icon_crown"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-content">
          <van-button class="fast-invite">
            快速邀请
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    showRank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beeIcon: {
        bee_firends_basic_icon_association: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_association.png'),
        bee_firends_basic_icon_firend: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_firend.png'),
        bee_firends_invite_icon_goldaward: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_goldaward.png'),
        bee_firends_invite_icon_silveraward: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_silveraward.png'),
        bee_firends_invite_icon_bronzeaward: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_bronzeaward.png'),
        bee_firends_invite_icon_off: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_off.png'),
        bee_firends_invite_icon_crown: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_crown.png'),
        bee_firends_invite_icon_firends: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_firends.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:showRank', false)
    }
  }
}
</script>

<style lang="less">
.friends-rank {
  .rank-pop {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    overflow: inherit;
    .rank-content {
      position: relative;
      padding-bottom: 1rem;
      .rank-type {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1.5rem;
        align-items: center;
        .type-tab {
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          .tab-img {
            font-size: 0.5rem;
          }
          .type-num {
            font-size: 0.24rem;
            margin-top: 0.1rem;
            .num {
              color: @BeeDefault3;
            }
          }
        }
        .close-rank {
          position: absolute;
          right: 0.16rem;
          top: 0.16rem;
          width: 0.4rem;
          height: 0.4rem;
        }
        .rank-header{
          position: absolute;
          width: 1.73rem;
          height: 1.76rem;
          top: -0.88rem;
          left: 2.9rem;
        }
        .disabled-tab1 {
          background-color: @Grey7;
          border-top-left-radius: 0.3rem;
          border-bottom-right-radius: 0.3rem;
        }
        .disabled-tab2 {
          background-color: @Grey7;
          border-top-right-radius: 0.3rem;
          border-bottom-left-radius: 0.3rem;
        }
      }
      .rank-list {
        overflow-y: scroll;
        height: 6.5rem;
        .friends-cell {
          border-top: 0.02rem solid @Grey6;
          height: 1.32rem;
          box-sizing: border-box;
          padding: 0.2rem 0.4rem 0.18rem 0.54rem;
          display: flex;
          align-items: center;
          .ranking {
            margin-right: 0.26rem;
            .rank-num {
              width: 0.38rem;
              height: 0.49rem;
            }
          }
          .friends-detail {
            display: flex;
            flex: 1;
            align-items: center;
            .head-img {
              margin-right: 0.22rem;
              height: 0.94rem;
              width: 0.94rem;
              border: 0.02rem solid #fdbb18;
              border-radius: 50%;
            }
            .firends-name {
              display: flex;
              flex: 1;
              align-items: center;
              justify-content: space-between;
              .left-detail {
                .name {
                  font-size: 0.24rem;
                  font-weight: bold;
                }
                .firends {
                  font-size: 0.2rem;
                  .num {
                    color: @Orange1;
                  }
                }
                .honey-num {
                  font-size: 0.2rem;
                  color: @Grey1;
                  margin-top: 0.1rem;
                }
              }
              .crown {
                width: 0.44rem;
                height: 0.34rem;
              }
            }
          }
        }
      }
      .btn-content {
        position: absolute;
        bottom: 0;
        width: 100%;
        .fast-invite {
          background-color: @BeeDefault;
          height: 0.98rem;
          line-height: 0.98rem;
          width: 100%;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
