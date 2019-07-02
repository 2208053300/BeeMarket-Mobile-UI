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
            :class="{disabledTab1:friendsType!==2}"
            @click="changeType(2)"
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
            :class="{disabledTab2:friendsType!==1}"
            @click="changeType(1)"
          >
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_association"
              class="tab-img"
            />
            <div class="type-num">
              厂商：<span class="num">{{ friendsData.business_num||0 }} </span>个
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
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="我也是有底线的 o(´^｀)o"
            :immediate-check="false"
            @load="onLoad"
          >
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
                      :src="item.head_image_url||$store.state.app.head_detault"
                      alt="头像"
                    >
                  </div>
                  <div
                    v-if="item.is_partner"
                    class="partner-tag"
                  >
                    <img
                      :src="beeIcon.bee_firends_invite_icon_firenf||$store.state.app.head_detault"
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
                    v-if="friendsType===2"
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
          </van-list>
        </div>
        <div class="btn-content">
          <van-button
            class="fast-invite"
            @click="fastInvite"
          >
            快速邀请
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getFriends, remindLogin, remindAll } from '@/api/BeeApi/user'
import { getUID } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
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
      friendsType: 2,
      friendsData: {},
      friendsList: [],
      loading: false,
      finished: false,
      page: 1,
      osObj: getOs(),
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (this.osObj.isWx) {
      this.loadUID()
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(true)
    }
    window.appShare = this.appShare
  },
  methods: {
    async getFriendsData() {
      const res = await getFriends({ type: this.friendsType })
      this.friendsData = res.data || {}
      this.friendsList = res.data.friendsList
      if (this.friendsList.length < 10) {
        this.finished = true
      } else {
        this.finished = false
      }
    },
    async remindLoginData(id) {
      try {
        const res = await remindLogin({ remind_user_id: id })
        if (res.status_code === 200) {
          this.$toast({
            type: 'success',
            message: res.message
          })
        }
      } catch (error) {
        this.$toast({
          type: 'waring',
          message: '推送失败,请稍后重试!'
        })
      }
    },
    // 快速邀请
    async fastInvite() {
      // TODO 改为直接分享
      const res = await remindAll()
      if (res.status_code === 200) {
        this.$toast({
          type: 'success',
          message: res.message
        })
      }
      this.appShare()
    },
    async loadUID() {
      try {
        const res = await getUID()
        this.uid = res.data.uid
        wxapi.wxShare({
          title: '蜂集市-蜂友圈',
          desc: '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
          imgUrl:
            'https://img.fengjishi.com.cn/product/album/2019/06/03204403fnhaQkphpQ6l19R.jpeg',
          link: this.getShareLink()
        })
      } catch (error) {
        this.$toast(error)
      }
    },
    // 获取分享链接
    getShareLink() {
      return `https://app.fengjishi.com/beeFriends#/?uid=${this.uid}`
    },
    // 分享
    appShare() {
      if (this.friendsType === 2) {
        if (this.osObj.isWx) {
          // 微信
          this.loadUID()
          // ios
        } else if (this.osObj.isIphone && this.osObj.isApp) {
          window.webkit.messageHandlers.ToShare.postMessage({
            title: '蜂集市-蜂友圈',
            desc: '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
            img_path: 'https://img.fengjishi.com/app/images/share_logo.png',
            link: this.getShareLink()
          })
          // android
        } else if (this.osObj.isAndroid && this.osObj.isApp) {
          window.beeMarket.ToShare(
            '蜂集市-蜂友圈',
            '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
            'https://img.fengjishi.com/app/images/share_logo.png',
            this.getShareLink()
          )
        } else {
          // this.$router.push({
          //   path: '/category/details',
          //   query: {
          //     pid,
          //     target
          //   }
          // })
        }
      } else {
        if (this.osObj.isWx) {
          wxapi.wxShare({
            title: '蜂集市-蜂友圈',
            desc: '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
            imgUrl:
              'https://img.fengjishi.com.cn/product/album/2019/06/03204403fnhaQkphpQ6l19R.jpeg',
            link: `http://app.fengjishi.com/beeFactory#/?uid=${this.uid}`
          })
        } else if (this.osObj.isIphone && this.osObj.isApp) {
          window.webkit.messageHandlers.ToShare.postMessage({
            title: '蜂集市-蜂友圈',
            desc: '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
            img_path: 'https://img.fengjishi.com/app/images/share_logo.png',
            link: `http://app.fengjishi.com/beeFactory#/?uid=${this.uid}`
          })
        } else if (this.osObj.isAndroid && this.osObj.isApp) {
          window.beeMarket.ToShare(
            '蜂集市-蜂友圈',
            '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
            'https://img.fengjishi.com/app/images/share_logo.png',
            `http://app.fengjishi.com/beeFactory#/?uid=${this.uid}`
          )
        } else {
          //
        }
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getFriends({
          type: this.friendsType,
          page: this.page
        })
        this.friendsList.push(...res.data.friendsList)
        this.page++
        this.loading = false
        // 数据全部加载完成
        if (
          this.friendsList.length === res.data.friends_num ||
          res.data.friendsList.length === 0
        ) {
          this.finished = true
        }
      }, 500)
    },
    handleClose() {
      this.$emit('update:showRank', false)
    },
    changeType(type) {
      this.friendsType = type
      this.page = 2
      this.finished = true
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
      const osObj = getOs()
      if (osObj.isWx) {
        // 微信直接跳转路由
        this.$router.push({
          path: '/category/store',
          query: {
            mid: id
          }
        })
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToShore.postMessage({
          mid: id
        })
      } else if (osObj.isAndroid && osObj.isApp) {
        window.beeMarket.ToShore(id)
      } else {
        this.$router.push({
          path: '/category/store',
          query: {
            mid: id
          }
        })
      }
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
        // vant自带边距
        bottom: -0.02rem;
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
