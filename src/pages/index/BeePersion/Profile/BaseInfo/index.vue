<template>
  <div class="bg-white">
    <div class="base-info">
      <div class="user-avatar">
        <img :src="avatarImg" alt="" class="avatar">
        <img :src="changeImg" alt="" class="change-avatar">
      </div>

      <ul class="cell-list bg-white">
        <li>
          <div class="item flex  align-center">
            <span class="title">昵称</span>
            <div class="link-icon nickname">
              <span> 小贾 </span>
            </div>
          </div>
        </li>
        <li>
          <div class="item flex  align-center">
            <span class="title">性别</span>
            <div class="link-icon sexy flex">
              <!-- <div class="sexy-item flex align-center">
                <img v-show="male===true" :src="radioChecked" class="radio-img" @click="male=!male">
                <img v-show="male===false" :src="radioNull" class="radio-img" @click="male=!male">
                <span>男</span>
              </div>
              <div class="sexy-item flex align-center">
                <img v-show="male===false" :src="radioChecked" class="radio-img" @click="male=!male">
                <img v-show="male===true" :src="radioNull" class="radio-img" @click="male=!male">
                <span>女</span>
              </div> -->
              <van-radio-group v-model="radio" class="flex">
                <van-radio name="male" checked-color="#ff8200" style="margin-right: 0.5rem;">
                  男
                </van-radio>
                <van-radio name="female" checked-color="#ff8200">
                  女
                </van-radio>
              </van-radio-group>
            </div>
          </div>
        </li>
        <li>
          <div class="item flex align-center">
            <span class="title">出生日期</span>
            <div class="link-icon">
              小贾
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      avatarImg: require('@/assets/icon/personalCenter/head_default.png'),
      changeImg: require('@/assets/icon/personalCenter/personalInfo/mine_basic_icon_changeavatar@2x.png'),
      radioChecked: require('@/assets/icon/personalCenter/personalInfo/mine_basic_radio_gender_s@2x.png'),
      radioNull: require('@/assets/icon/personalCenter/personalInfo/mine_basic_radio_gender_n@2x.png'),
      // 选择性别;
      radio: 'male'
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
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.base-info{
  .user-avatar{width:1.6rem;height: 1.6rem; margin: 0.4rem auto 0.8rem;
    position: relative;
    .change-avatar{width:.52rem;height: .52rem; position: absolute; top:0; right: 0}
  }
  li{
    padding-left:.3rem;
    box-sizing: border-box;
    .item{padding: .3rem .2rem .2rem 0; border-bottom: 1px solid #eee;}

    &:last-child{
      .item{border-bottom:none;}
    }
  }
  .title{font-size: .3rem;color:#333; width:2rem;}
  .link-icon{ font-size: .3rem; color:#333;}
  .radio-img{width:.4rem; height:.4rem; margin-right: .2rem}
  .sexy-item:nth-of-type(1){margin-right: 0.5rem;}
}
</style>
