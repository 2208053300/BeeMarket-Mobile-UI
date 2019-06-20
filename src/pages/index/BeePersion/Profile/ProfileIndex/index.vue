<template>
  <div class="profile">
    <ul class="cell-list bg-white">
      <li>
        <div class="item flex flex-between align-center" @click="$router.push('/persion/profile/baseInfo')">
          <span class="title">基本信息</span>
          <div class="link-icon">
            <img :src="head_image" alt="" class="avatar">
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <li>
        <div class="item flex flex-between align-center" @click="$router.push('/persion/profile/accountSafe')">
          <span class="title">账户安全</span>
          <div class="link-icon">
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <li>
        <div class="item flex flex-between align-center" @click="$router.push('/persion/profile/accountBind')">
          <span class="title">账户绑定</span>
          <div class="link-icon">
            <van-icon name="arrow" size="0.26rem" color="#666" />
          </div>
        </div>
      </li>
      <!-- <li>
        <div class="item flex flex-between align-center" @click="$router.push('/persion/BeeSetting')">
          <span class="title">设置</span>
          <div class="link-icon">
            <van-icon name="arrow" size="0.26rem" color="#666" class="icon" />
          </div>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { getPorfileData } from '@/api/BeeApi/user'

export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      head_image: require('@/assets/icon/personalCenter/head_default.png')
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    // userInfo
    this.getPersionadata()
  },
  methods: {
    // 获取用户基本信息
    async getPersionadata() {
      const res = await getPorfileData()
      this.head_image = res.data.head_image
      console.log('用户信息：', res)
    }
  }
}
</script>

<style scoped lang="less">
.profile{
  padding-top: .2rem;
  li{
    padding-left:.3rem;
    box-sizing: border-box;
    .item{padding: .3rem .2rem .3rem 0; border-bottom: 1px solid #eee;}

    &:last-child{
      .item{border-bottom:none;}
    }
  }
  .title{font-size: .3rem;color:#333;}
  .avatar{width: 1rem;height: 1rem; border-radius:50%; margin-right: .2rem;}
}
</style>
