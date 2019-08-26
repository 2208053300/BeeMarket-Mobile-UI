<template>
  <div class="factory-rank">
    <van-popup
      v-model="showRank2"
      class="rank-pop"
      position="bottom"
      :close-on-click-overlay="false"
      @open="getFriendsData"
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
              厂商：<span class="num">{{ friendsData.count||0 }}</span>个
            </div>
          </div>
          <div class="type-tab">
            <!-- <van-icon
              :name="beeIcon.bee_firends_basic_icon_association"
              class="tab-img"
            />
            <div class="type-num">
              关联蜂友：<span class="num">{{ friendsData.business_num||0 }} </span>个
            </div> -->
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
              :src="beeIcon.bee_firends_invite_icon_vendor"
              alt="厂商排行"
            >
          </div>
        </div>
        <van-tabs
          v-model="activeTab"
          :color="BeeDefault"
          :title-active-color="BeeDefault"
          :title-inactive-color="Grey2"
          line-height="1px"
          class="list-filter"
          @click="changeType"
        >
          <van-tab :name="1">
            <div slot="title">
              厂商状态
              <div class="sort-img">
                <img
                  v-if="[1,2].indexOf(sortType)===-1"
                  :src="beeIcon.beefriends_friend_icon_n"
                  alt=""
                >
                <img
                  v-if="sortType===1"
                  :src="beeIcon.beefriends_friend_icon_top"
                  alt=""
                >
                <img
                  v-if="sortType===2"
                  :src="beeIcon.beefriends_friend_icon_down"
                  alt=""
                >
              </div>
            </div>
          </van-tab>
          <van-tab :name="3">
            <div slot="title">
              商品数量
              <div class="sort-img">
                <img
                  v-if="[3,4].indexOf(sortType)===-1"
                  :src="beeIcon.beefriends_friend_icon_n"
                  alt=""
                >
                <img
                  v-if="sortType===3"
                  :src="beeIcon.beefriends_friend_icon_top"
                  alt=""
                >
                <img
                  v-if="sortType===4"
                  :src="beeIcon.beefriends_friend_icon_down"
                  alt=""
                >
              </div>
            </div>
          </van-tab>
          <van-tab :name="5">
            <div slot="title">
              收益贡献
              <div class="sort-img">
                <img
                  v-if="[5,6].indexOf(sortType)===-1"
                  :src="beeIcon.beefriends_friend_icon_n"
                  alt=""
                >
                <img
                  v-if="sortType===5"
                  :src="beeIcon.beefriends_friend_icon_top"
                  alt=""
                >
                <img
                  v-if="sortType===6"
                  :src="beeIcon.beefriends_friend_icon_down"
                  alt=""
                >
              </div>
            </div>
          </van-tab>
        </van-tabs>
        <div class="rank-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="我也是有底线的 o(´^｀)o"
            :immediate-check="false"
            @load="onLoad"
          >
            <div
              v-for="(item,index) in friendsList"
              :key="index"
              class="factory-cell"
            >
              <div class="ranking">
                <!-- 如果排名前小于三 -->
                <div
                  v-if="item.rank<=3"
                  class="rank-num"
                >
                  <img
                    v-if="item.rank===1"
                    :src="beeIcon.bee_firends_invite_icon_goldaward"
                    alt="1"
                  >
                  <img
                    v-if="item.rank===2"
                    :src="beeIcon.bee_firends_invite_icon_silveraward"
                    alt="2"
                  >
                  <img
                    v-if="item.rank===3"
                    :src="beeIcon.bee_firends_invite_icon_bronzeaward"
                    alt="3"
                  >
                </div>
                <span v-else>{{ item.rank }}</span>
              </div>
              <div
                class="factory-detail"
                :class="{grayBg:item.type===3}"
              >
                <div class="head-img">
                  <div
                    class="img-content"
                    :style="{borderColor:getColor(item.rank)}"
                  >
                    <img
                      :src="item.store_logo||$store.state.app.head_detault"
                      alt="头像"
                    >
                  </div>
                  <div class="partner-tag">
                    <img
                      v-if="item.type===1"
                      :src="beeIcon.bee_firends_invite_icon_pending||$store.state.app.head_detault"
                      alt="待审核"
                    >
                    <img
                      v-if="item.type===2"
                      :src="beeIcon.bee_firends_invite_icon_open||$store.state.app.head_detault"
                      alt="已开店"
                    >
                    <img
                      v-if="item.type===3"
                      :src="beeIcon.bee_firends_invite_icon_closed||$store.state.app.head_detault"
                      alt="已关闭"
                    >
                  </div>
                </div>
                <div class="firends-name">
                  <div class="left-detail">
                    <div
                      class="name"
                      :class="{partner:item.type===2}"
                    >
                      {{ item.company_name }}
                    </div>
                    <span
                      v-if="item.product_count&&item.type!==3"
                      class="firends"
                    >（商品数量：<span class="num">{{ item.product_count }}</span>个 ）</span>
                    <span
                      v-if="item.type===3"
                      class="friends"
                    >（已关闭）</span>
                    <div class="honey-num">
                      <span class="num"> {{ item.percentages }} </span>
                    </div>
                    <!-- <div class="login-time">
                      最后登录时间：<span class="time">{{ item.last_login_time }}</span>
                    </div> -->
                  </div>
                  <!-- <van-button
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
                  </van-button> -->
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
import { getMerchant, remindLogin, isPartner } from '@/api/BeeApi/user'
import { getUID } from '@/api/BeeApi/user'
import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'
import { BeeDefault, Grey2 } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {
    showRank2: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      BeeDefault,
      Grey2,
      beeIcon: {
        bee_firends_basic_icon_association: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_association.png'),
        bee_firends_basic_icon_firend: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_firend.png'),
        bee_firends_invite_icon_goldaward: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_goldaward.png'),
        bee_firends_invite_icon_silveraward: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_silveraward.png'),
        bee_firends_invite_icon_bronzeaward: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_bronzeaward.png'),
        bee_firends_invite_icon_off: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_off.png'),
        bee_firends_invite_icon_open: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_open.png'),
        bee_firends_invite_icon_pending: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_pending.png'),
        bee_firends_invite_icon_closed: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_closed.png'),
        beefriends_friend_icon_n: require('@/assets/icon/beeFriends/rank/beefriends_friend_icon_n.png'),
        beefriends_friend_icon_top: require('@/assets/icon/beeFriends/rank/beefriends_friend_icon_top.png'),
        beefriends_friend_icon_down: require('@/assets/icon/beeFriends/rank/beefriends_friend_icon_down.png'),
        bee_firends_invite_icon_vendor: require('@/assets/icon/beeFriends/rank/bee_firends_invite_icon_vendor.png')
      },
      friendsType: 1,
      friendsData: {},
      friendsList: [],
      loading: false,
      finished: false,
      page: 1,
      sortType: 1,
      osObj: getOs(),
      uid: 0,
      activeTab: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.loadUID()
    // if (this.osObj.isWx) {
    //   // this.loadUID()
    // } else if (this.osObj.isIphone && this.osObj.isApp) {
    //   window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
    // } else if (this.osObj.isAndroid && this.osObj.isApp) {
    //   window.beeMarket.showShareIcon(true)
    // }
    // window.appShare = this.appShare
  },
  methods: {
    async getFriendsData() {
      const res = await getMerchant({ sort: this.sortType })
      this.friendsData = res.data || {}
      this.friendsList = res.data.lists
      if (this.friendsList.length < 10) {
        this.finished = true
      } else {
        this.finished = false
      }
      this.page = 2
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await getMerchant({
          type: this.friendsType,
          page: this.page
        })
        this.friendsList.push(...res.data.lists)
        this.page++
        this.loading = false
        // 数据全部加载完成
        if (
          this.friendsList.length === res.data.count ||
          res.data.lists.length === 0
        ) {
          this.finished = true
        }
      }, 500)
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
      // const res = await remindAll()
      // if (res.status_code === 200) {
      //   this.$toast({
      //     type: 'success',
      //     message: res.message
      //   })
      // }
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
    async getShareLink() {
      const res = await isPartner()
      return `https://app.fengjishi.com/#/beeFriends?uid=${this.uid}&phone=${
        res.data.inviter_phone
      }`
    },
    // 分享
    appShare() {
      if (this.osObj.isWx) {
        this.$toast('请点击微信右上角分享到朋友圈！')
        wxapi.wxShare({
          title: '蜂集市-蜂友圈',
          desc: '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
          imgUrl:
            'https://img.fengjishi.com.cn/product/album/2019/06/03204403fnhaQkphpQ6l19R.jpeg',
          link: `http://app.fengjishi.com/beeRegister#/?uid=${this.uid}`
        })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: '蜂集市-蜂友圈',
          desc: '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
          img_path: 'https://img.fengjishi.com/app/images/share_logo.jpg',
          url: `http://app.fengjishi.com/beeRegister#/?uid=${this.uid}`
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          '蜂集市-蜂友圈',
          '就差你了，成为合伙人加入蜂友圈，一起拥有持续收益',
          'https://img.fengjishi.com/app/images/share_logo.jpg',
          `http://app.fengjishi.com/beeRegister#/?uid=${this.uid}`
        )
      } else {
        this.$toast('请使用微信访问后分享！')
        //
      }
    },

    handleClose() {
      this.$emit('update:showRank2', false)
    },
    changeType(name) {
      if (name === this.sortType) {
        // 如果点击激活标签页
        if (name >= this.sortType) {
          this.sortType = this.sortType + 1
        } else {
          this.sortType = name
        }
      } else {
        this.sortType = name
      }
      this.finished = true
      this.getFriendsData()
    },
    getColor(index) {
      if (index === 1) {
        return '#FDBB18'
      } else if (index === 2) {
        return '#BEBEBE'
      } else if (index === 3) {
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
.factory-rank {
  .rank-pop {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    overflow: inherit;
    .rank-content {
      position: relative;
      padding-bottom: 1rem;
      .van-hairline--top-bottom::after {
        border-top-width: 0;
      }
      .rank-type {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 0.85rem;
        align-items: center;
        .type-tab {
          height: 100%;
          text-align: center;
          line-height: 0.75rem;
          .tab-img {
            font-size: 0.3rem;
            vertical-align: middle;
            margin: 0 0.1rem;
          }
          .type-num {
            font-size: 0.24rem;
            display: inline-block;
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
      }
      .list-filter {
        .sort-img {
          display: inline-block;
          width: 0.1rem;
          height: 0.12rem;
        }
      }
      .rank-list {
        overflow-y: scroll;
        height: 6.5rem;
        .factory-cell {
          border-bottom: 0.02rem solid @Grey6;
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
          .factory-detail {
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
          .grayBg {
            -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
            filter: grayscale(100%);
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
