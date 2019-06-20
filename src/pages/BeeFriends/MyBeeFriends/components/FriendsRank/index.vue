<template>
  <div class="friends-rank">
    <van-popup
      v-model="showRank"
      class="rank-pop"
      position="bottom"
      :close-on-click-overlay="false"
      @open="getFriendsData"
      @close="handleClose"
      @click-overlay="handleClose"
    >
      <div class="rank-content">
        <div class="rank-type">
          <div
            class="type-tab"
            :class="{disabledTab1:friendsType!==1}"
            @click="changeType(1)"
          >
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_firend"
              class="tab-img"
            />
            <div class="type-num">
              蜂友：<span class="num">{{ friendsData.friends_num||0 }} </span>个
            </div>
          </div>
          <div
            class="type-tab"
            :class="{disabledTab2:friendsType!==2}"
            @click="changeType(2)"
          >
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_association"
              class="tab-img"
            />
            <div class="type-num">
              厂商：<span class="num">{{ friendsData.relation_friends_num||0 }} </span>个
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
          <div
            v-for="(item,index) in friendsData.friendsList"
            :key="index"
            class="friends-cell"
          >
            <div class="ranking">
              <!-- 如果排名前小于三 -->
              <div
                v-if="index<=2"
                class="rank-num"
              >
                <img
                  v-if="index===0"
                  :src="beeIcon.bee_firends_invite_icon_goldaward"
                  alt="1"
                >
                <img
                  v-if="index===1"
                  :src="beeIcon.bee_firends_invite_icon_silveraward"
                  alt="2"
                >
                <img
                  v-if="index===2"
                  :src="beeIcon.bee_firends_invite_icon_bronzeaward"
                  alt="3"
                >
              </div>
              <span v-else>{{ index+1 }}</span>
            </div>
            <div class="friends-detail">
              <div class="head-img">
                <div
                  class="img-content"
                  :style="{borderColor:getColor(index)}"
                >
                  <img
                    :src="item.head_image_url"
                    alt="头像"
                  >
                </div>
                <div
                  v-if="item.is_partner"
                  class="partner-tag"
                >
                  <img
                    :src="beeIcon.bee_firends_invite_icon_firenf"
                    alt="合伙人"
                  >
                </div>
              </div>
              <div class="firends-name">
                <div class="left-detail">
                  <div
                    class="name"
                    :class="{partner:item.is_partner}"
                  >
                    {{ item.nickname }}
                  </div>
                  <span
                    v-if="item.current_friends_num"
                    class="firends"
                  >（关联蜂友：<span class="num">{{ item.current_friends_num }}</span>个 ）</span>
                  <div class="honey-num">
                    累计贡献公益值<span class="num"> {{ item.contribution }} </span>个
                  </div>
                  <div class="login-time">
                    最后登录时间：<span class="time">{{ item.last_login_time }}</span>
                  </div>
                </div>
                <van-button
                  v-if="friendsType===1"
                  class="remind-btn"
                  @click="remindLoginData(item.user_id)"
                >
                  提醒登录
                </van-button>
                <van-button
                  v-else
                  class="remind-btn"
                  @click="goStore(item.user_id)"
                >
                  进入店铺
                </van-button>
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
import { getFriends, remindLogin } from '@/api/BeeApi/user'

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
        bee_firends_invite_icon_firends: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_firends.png'),
        bee_firends_invite_icon_firenf: require('@/assets/icon/beeFriends/info/bee_firends_invite_icon_firenf.png')
      },
      friendsType: 1,
      friendsData: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getFriendsData() {
      const res = await getFriends({ type: this.friendsType })
      this.friendsData = res.data || {}
    },
    async remindLoginData(id) {
      const res = await remindLogin({ remind_user_id: id })
      if (res.status_code === 200) {
        this.$toast({
          type: 'success',
          message: res.message
        })
      }
    },
    handleClose() {
      this.$emit('update:showRank', false)
    },
    changeType(type) {
      this.friendsType = type
      this.getFriendsData()
    },
    getColor(index) {
      if (index === 0) {
        return '#FDBB18'
      } else if (index === 1) {
        return '#BEBEBE'
      } else if (index === 2) {
        return '#DB7D64'
      } else {
        return '#ffffff'
      }
    },
    goStore(id) {
      // TODO 跳转到店铺
      this.$router.push({
        path: '/category/store',
        query: {
          mid: id
        }
      })
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
        .rank-header {
          position: absolute;
          width: 1.73rem;
          height: 1.76rem;
          top: -0.88rem;
          left: 2.9rem;
        }
        .disabledTab1 {
          background-color: @Grey7;
          border-top-left-radius: 0.3rem;
          border-bottom-right-radius: 0.3rem;
        }
        .disabledTab2 {
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
              position: relative;
              .img-content {
                height: 0.94rem;
                width: 0.94rem;
                border: 0.02rem solid #fdbb18;
                border-radius: 50%;
                overflow: hidden;
              }
              .partner-tag {
                width: 1.15rem;
                height: 0.29rem;
                position: absolute;
                bottom: 0;
                left: -0.1rem;
              }
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
                  display: inline-block;
                  max-width: 1.5rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  vertical-align: middle;
                }
                .partner {
                  color: @BeeDefault;
                }
                .firends {
                  font-size: 0.2rem;
                  .num {
                    color: @Orange1;
                  }
                }
                .honey-num {
                  font-size: 0.2rem;
                  color: @Grey2;
                  margin-top: 0.1rem;
                }
                .login-time {
                  font-size: 0.2rem;
                  color: @Grey1;
                  margin-top: 0.1rem;
                }
              }
              .remind-btn {
                width: 1.27rem;
                height: 0.5rem;
                padding: 0;
                border: 0.02rem solid @BeeDefault;
                font-size: 0.24rem;
                line-height: 0.5rem;
                border-radius: 0.08rem;
                color: @BeeDefault;
                box-sizing: border-box;
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
