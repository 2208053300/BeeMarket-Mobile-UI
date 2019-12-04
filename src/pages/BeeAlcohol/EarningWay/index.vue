<template>
  <div class="earning-way">
    <div class="way-item way-1">
      <img :src="beeIcon.earning_way_1" alt="">
      <van-button round class="btn" @click="goRight">
        升级权益
      </van-button>
    </div>
    <div class="way-item way-2">
      <img :src="beeIcon.earning_way_2" alt="">
      <van-button round class="btn" @click="goGiftPackge">
        立即参与
      </van-button>
    </div>
    <div class="way-item way-3">
      <img :src="beeIcon.earning_way_3" alt="">
      <van-button round class="btn" @click="goAlcohol">
        GO
      </van-button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getOs } from '@/utils'
export default {
  metaInfo: {
    title: '赚钱攻略'
  },
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        earning_way_1: require('@/assets/icon/alcohol/earning_way_1.jpg'),
        earning_way_2: require('@/assets/icon/alcohol/earning_way_2.jpg'),
        earning_way_3: require('@/assets/icon/alcohol/earning_way_3.jpg')
      },
      uid: 0,
      // 获取 os 平台
      osObj: getOs()
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
    this.$store.commit('SET_BACKTOP_HIDE', true)
    // 在APP页面显示header
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = false
    if (this.$route.query.uid) {
      Cookies.set('uid', this.$route.query.uid)
    }
  },
  methods: {
    // 跳转到我的收益
    goRight() {
      if (this.osObj.isApp) {
        window.location.href = window.location.origin + '/#/beeFriends/myRights'
      } else {
        window.location.href = window.location.origin + '/beeFriends#/myRights'
      }
    },
    // 跳转到农礼包
    goGiftPackge() {
      if (this.osObj.isApp) {
        window.location.href = window.location.origin + '/#/beeGiftPackage'
      } else {
        window.location.href = window.location.origin + '/beeGiftPackage'
      }
    },
    // 跳转到贵宾陈酿
    goAlcohol() {
      if (this.osObj.isApp) {
        window.location.href = window.location.origin + '/#/beeAlcohol'
      } else {
        window.location.href = window.location.origin + '/beeAlcohol'
      }
    }
  }
}
</script>

<style scoped lang="less">
p {
  margin: 0;
}
.earning-way {
  img {
    width: 100%;
    display: block;
  }
  .way-item {
    position: relative;
    .btn {
      position: absolute;
      width: 3.7rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
  .way-1,.way-2 {
    .btn {
      bottom: 1rem;
    }
  }
  .way-3 {
    .btn {
      bottom: 1.7rem;
      left: 70%;
    }
  }
}
</style>
