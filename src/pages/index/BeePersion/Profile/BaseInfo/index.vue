<template>
  <div>
    <div class="base-info">
      <div class="bg-white" style="padding-top: 0.4rem; margin-top: 0.2rem;">
        <div class="user-avatar">
          <img :src="head_image" alt="" class="avatar">
          <van-uploader
            :after-read="onRead"
            accept="image/png, image/jpeg"
            multiple
            class="change-avatar1"
          >
            <img :src="changeImg" alt="" class="change-avatar">
          </van-uploader>
        </div>

        <ul class="cell-list">
          <li>
            <div class="item flex  align-center">
              <span class="title">昵称</span>
              <div class="link-icon nickname">
                <van-field v-model="nickname" value="" placeholder="请输入昵称" />
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
                <van-radio-group v-model="gender" class="flex">
                  <van-radio
                    name="1"
                    checked-color="#ff8200"
                    style="margin-right: 0.5rem;"
                  >
                    男
                  </van-radio>
                  <van-radio name="0" checked-color="#ff8200">
                    女
                  </van-radio>
                </van-radio-group>
              </div>
            </div>
          </li>
          <li>
            <div class="item flex align-center" @click="dateModal = true">
              <span class="title">出生日期</span>
              <div class="link-icon">
                <van-field v-model="birthday" value="" placeholder="请选择" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="text-center submit" @click="submit">
        <van-button size="large" class="btn">
          保存
        </van-button>
      </div>
    </div>
    <!-- 选择日期 -->
    <van-popup v-model="dateModal" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :formatter="formatter"
        @confirm="confirmDate"
        @cancel="cancelDate"
      />
      <!-- :min-date="minDate" -->
    </van-popup>
  </div>
</template>

<script>
import { zipImg } from '@/utils/imgUp'
import { getPorfileData, updateBaseinfo, updateHeadImage } from '@/api/BeeApi/user'

export default {
  metaInfo: {
    title: '基本信息'
  },
  components: {},
  props: {},
  data() {
    return {
      head_image: require('@/assets/icon/personalCenter/head_default.png'),
      changeImg: require('@/assets/icon/personalCenter/personalInfo/mine_basic_icon_changeavatar@2x.png'),
      radioChecked: require('@/assets/icon/personalCenter/personalInfo/mine_basic_radio_gender_s@2x.png'),
      radioNull: require('@/assets/icon/personalCenter/personalInfo/mine_basic_radio_gender_n@2x.png'),
      // nickname
      nickname: '',
      // 选择性别;
      gender: '0',
      // 日期遮罩
      dateModal: false,
      currentDate: new Date(),
      birthday: '',
      // 头像上传图片
      img: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    // userInfo
    this.getPersionadata()
  },
  methods: {

    // 保存更新个人资料
    async submit() {
      if (!this.nickname || !this.gender || !this.birthday) {
        this.$toast('请完善信息后提交！')
        return
      }
      const res = await updateBaseinfo({
        nickname: this.nickname,
        gender: this.gender,
        birthday: this.birthday
      })
      this.$toast.success(res.message)
    },
    // 确定选择时间
    confirmDate(val) {
      console.log(val)
      var date = new Date(val)
      const date_value =
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      this.birthday = date_value
      this.dateModal = false
    },
    // 取消选择时间
    cancelDate(val) {
      this.dateModal = false
    },

    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    // 获取用户基本信息
    async getPersionadata() {
      const res = await getPorfileData()
      this.head_image = res.data.head_image
      this.nickname = res.data.nickname
      this.gender = res.data.gender.toString()
      this.birthday = res.data.birthday
      console.log('用户信息：', res)
    },
    // 更新头像上传图片
    async onRead(file) {
      console.log(file)
      this.head_image = file.content
      this.img = file

      const formData = new FormData()
      const res = await zipImg(file.file)
      formData.set('head_image', res)
      const res1 = await updateHeadImage(formData)
      console.log('更新头像：', res1)
    }
  }
}
</script>

<style scoped lang="less">
.base-info {
  .user-avatar {
    width: 1.6rem;
    height: 1.6rem;
    margin: 0 auto 0.8rem;

    position: relative;
    .avatar{
 border-radius: 50%;
    }
    .change-avatar1 {
      width: 0.52rem;
      height: 0.52rem;
      position: absolute;
      top: 0;
      right: 0;

    }
    .change-avatar {
      width: 0.52rem;
      height: 0.52rem;
    }
  }
  li {
    padding-left: 0.3rem;
    box-sizing: border-box;
    .item {
      padding: 0.3rem 0.2rem 0.3rem 0;
      border-bottom: 1px solid #eee;
    }

    &:last-child {
      .item {
        border-bottom: none;
      }
    }
  }
  .title {
    font-size: 0.3rem;
    color: #333;
    width: 2rem;
  }
  .link-icon {
    font-size: 0.3rem;
    color: #333;
  }
  .radio-img {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.2rem;
  }
  .sexy-item:nth-of-type(1) {
    margin-right: 0.5rem;
  }
  .van-cell {
    padding: 0;
    font-size: 0.3rem;
  }
  .submit {
    margin-top: 0.5rem;
  }
  .btn {
    background: @BeeDefault;
    border-radius: 0.1rem;
    color: #fff;
    font-size: 0.3rem;
    width: 80%;
  }
}
</style>
