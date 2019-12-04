<template>
  <div class="earning-way">
    <div class="swiper-box1">
      <Swiper
        :block="false"
        :type="type"
        :bg-color="bgColor"
        :font-color="fontColor"
      />
    </div>
    <img :src="beeIcon.titleImg" class="title-img">
    <div class="content">
      <!-- avatar -->
      <div class="avatar text-center">
        <img class="avatar-img" :src="beeIcon.avatar" alt="">
        <p class="txt1">
          累计已领取（元）
        </p>
        <p class="money">
          10000
        </p>
      </div>
      <!-- money-info -->
      <div class="money-info">
        <div class="money-detail flex flex-around">
          <div class="item">
            <p class="txt">
              已使用
            </p>
            <p class="num">
              1000
            </p>
          </div>
          <div class="line" />
          <div class="item rest">
            <p class="txt flex">
              <span>剩 余</span>
            </p>
            <p class="num">
              1000
            </p>
          </div>
          <div class="line" />
          <div class="item">
            <p class="txt">
              已提现
            </p>
            <p class="num">
              1000
            </p>
          </div>
        </div>
        <div v-if="false" class="has-no-monty-tip text-center">
          您还没有参与活动<br>暂无现金补贴
        </div>
      </div>
      <!-- action -->
      <div class="action">
        <div class="has flex flex-center">
          <button class="btn to-cash" type="button">
            提现
          </button>
          <button class="btn go-use" type="button">
            使用
          </button>
        </div>
        <div v-if="false" class="has-not flex flex-center">
          <button class="btn go-index" type="button">
            立即参与
          </button>
        </div>
      </div>
    </div>

    <!-- 装饰图片 -->
    <img :src="beeIcon.decorate" class="decorate">
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getUID } from '@/api/BeeApi/user'
import { showShareIcon, setShareOptions } from '@/utils/share'
import Swiper from '../../BeeBestGoods/components/Swiper'
import wait from '@/utils/wait'
export default {
  metaInfo: {
    title: '年终狂欢 瓜分10亿'
  },
  components: { Swiper },
  props: {},
  data() {
    return {
      showSwipe: true,
      // 中奖信息滚动所需数据
      bgColor: 'RGBA(100, 16, 32, .7)',
      fontColor: '#fff',
      type: 5,

      beeIcon: {
        titleImg: require('@/assets/icon/alcohol/top_title.png'),
        avatar: require('@/assets/icon/alcohol/avatar.png'),
        decorate: require('@/assets/icon/alcohol/decorate.png')
      },
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  destroyed() {
    this.$store.commit('SET_BACKTOP_HIDE', false)
    window.onresize = null
  },
  mounted() {
    this.initShare()
    this.$store.commit('SET_BACKTOP_HIDE', true)
    // 在APP页面显示header
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    if (this.$route.query.uid) {
      Cookies.set('uid', this.$route.query.uid)
    }
    showShareIcon()

    const that = this
    window.onresize = async() => {
      that.showSwipe = false
      await wait(1000)
      that.showSwipe = true
    }
  },
  methods: {
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    async initShare() {
      try {
        const res = await getUID()
        this.uid = res.data.uid
        setShareOptions({
          title: '年终狂欢，瓜分10亿',
          desc: '茅台免费喝，现金轻松赚！\n全民抢酒，全民抢钱！',
          link: this.uid
            ? location.origin + '/#/beeAlcohol?uid=' + this.uid
            : location.origin + '/#/beeAlcohol'
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 分享
    appShare() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.activity.share_data.title,
          desc: this.activity.share_data.desc,
          img_path: this.activity.share_data.img,
          // 地址应该放 web 站 网页
          url: this.activity.share_data.link
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.activity.share_data.title,
          this.activity.share_data.desc,
          this.activity.share_data.img,
          this.activity.share_data.link
          // this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        //
      }
    },
    // 跳转到现金券列表
    goTicket() {
      this.$router.push({
        name: 'ticket'
      })
    }
  }
}
</script>

<style scoped lang="less">
p {
  margin: 0;
}
.earning-way {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #ea583d, #cd281c);
  padding-top: 0.56rem;
  .swiper-box1{
    position: fixed; top: 0.15rem;left: 0.3rem;z-index: 100;
    width: 3.5rem;
  }
  .title-img {
    width: 5.47rem;
    height: 2.07rem;
    display: block;
    margin: 0 auto 0.24rem;
  }
  .content {
    width: 7.1rem;
    height: 7.94rem;
    margin: 0 auto;
    padding-top: 0.48rem;
    background: url(../../../assets/icon/alcohol/main_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .avatar {
  }
  .avatar-img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
  .txt1 {
    font-size: 0.24rem;
    color: #ef5821;
    margin: 0.2rem auto 0.2rem;
  }
  .money {
    font-size: 1.02rem;
    color: #ef5821;
  }
  .money-info {
    margin-top: 1.2rem;
  }
  .money-detail {
    padding: 0 0.6rem;
    .line {
      width: 1px;
      height: 0.8rem;
      background-color: #f9cfad;
    }
    .item {
      .txt {
        font-size: 0.28rem;
        color: #ef5821;
        margin-bottom: 0.2rem;
      }
      .num {
        font-size: 0.4rem;
        color: #ef5821;
      }
    }
    .item.rest {
      .txt {
        width: 1.36rem;
        height: 0.51rem;
        border-top-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        font-size: 0.32rem;
        color: #fff;
        background-color: #ff6c4a;
        text-align: center;
        span {
          margin: auto;
        }
      }
      .num {
        font-size: 0.5rem;
        color: #ef5821;
      }
    }
  }
  .has-no-monty-tip {
    font-size: 0.36rem;
    color: #ef5821;
    line-height: 1.5;
  }

  .action {
    margin-top: 1.24rem;
    .has{}
    .has-not{}
    .btn {
      border: none;
      width: 2.32rem;
      height: 0.72rem;
      font-size: .42rem;
      color: #fff;
      border-radius: .36rem;
    }
    .to-cash {
       background: linear-gradient(
        180deg,
        rgba(255, 220, 31, 1),
        rgba(253, 150, 11, 1)
      );
      margin-right: .44rem;
    }
    .go-use {
      border: 1px solid rgba(251, 246, 237, 1);
      border-radius: 36px;
      background: transparent;
    }
    .go-index {
      width: 4.2rem;
      height: 0.9rem;
      background: linear-gradient(
        180deg,
        rgba(255, 220, 31, 1),
        rgba(253, 150, 11, 1)
      );
      border-radius: 0.45rem;
      font-size: 0.36rem;
    }
  }
  .decorate{
      position: fixed;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
}
}
</style>
