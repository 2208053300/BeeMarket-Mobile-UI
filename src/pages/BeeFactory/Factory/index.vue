<template>
  <div class="factory-body">
    <div class="factory">
      <img :src="icon.factory_top" class="top-img">
      <div class="info">
        <p>在这里，我们很严格，</p>
        <p>每一次的厂商调研都是对消费者的负责！</p>
        <p>在这里，我们很包容，</p>
        <p>每一次的厂商入驻都是对我们的认可！</p>
        <p>在这里，我们很认真，</p>
        <p>每一次的公益捐赠都是对社会的回馈！</p>
        <p>在这里，我们很年轻，</p>
        <p>每一次的尝试都代表着一颗不服输的心！</p>

        <br>
        <p>共创共享，我们一起成就事业！</p>
        <p>普惠四方，我们一起回馈社会！</p>
        <p>理想，蜂集市与您携手同行！</p>

        <div class="text-left join">
          <a
            class=" join-btn"
            @click="goEnterPolicty"
          >入驻政策 <span class="jt"> > </span></a>
        </div>

        <img :src="icon.factory_img1" class="info-img info-img1" alt="">
        <img :src="icon.factory_img2" class="info-img info-img2" alt="">
      </div>

      <div class="form-box">
        <span class="form-title">厂商资料填写</span>

        <form id="form" class="form" action="">
          <img :src="icon.halfCircle" alt="" class="half-circle left">
          <img :src="icon.halfCircle" class="half-circle right">
          <van-cell-group>
            <div class="van-cell van-field">
              <div class="van-cell-title">
                <span><span class="required">*</span>厂商名称</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body">
                  <input
                    v-model.trim="factory.firm"
                    type="text"
                    placeholder="请输入厂商名称"
                    class="van-field__control  van-field__control--left"
                    @blur.prevent="blurScroll"
                  >
                </div>
              </div>
            </div>

            <div class="van-cell   van-field">
              <div class="van-cell-title">
                <span><span class="required">*</span>联系人</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body">
                  <input
                    v-model.trim="factory.contacter"
                    type="text"
                    placeholder="请输入联系人姓名"
                    class="van-field__control  van-field__control--left"
                    @blur.prevent="blurScroll"
                  >
                </div>
              </div>
            </div>
            <div class="van-cell   van-field">
              <div class="van-cell-title">
                <span><span class="required">*</span>联系电话</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body">
                  <input
                    v-model.trim="factory.contact_phone"
                    type="tel"
                    placeholder="请输入联系人电话"
                    class="van-field__control  van-field__control--left"
                    @blur.prevent="blurScroll"
                  >
                </div>
              </div>
            </div>
            <div class="van-cell   van-field">
              <div class="van-cell-title">
                <span><span class="required">*</span>产品类型</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body" @click="showCat = true">
                  <input
                    v-model.trim="factory.cat_name"
                    disabled
                    type="text"
                    placeholder="请选择"
                    class="van-field__control  van-field__control--left"
                  >
                  <div class="van-field__right-icon">
                    <!-- <i class="van-icon van-icon-arrow"></i> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="van-cell   van-field">
              <div class="van-cell-title">
                <span><span class="required">*</span>运营经验</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body" @click="showJy = true">
                  <input
                    v-model.trim="factory.jy_name"
                    disabled
                    type="text"
                    placeholder="请选择"
                    class="van-field__control  van-field__control--left"
                  >
                  <div class="van-field__right-icon">
                    <!-- <i class="van-icon van-icon-arrow"></i> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="van-cell   van-field">
              <div class="van-cell-title">
                <span>推荐人</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body">
                  <input
                    v-model.trim="factory.referrer_name"
                    type="text"
                    placeholder="请输入推荐人姓名"
                    class="van-field__control  van-field__control--left"
                    @blur.prevent="blurScroll"
                  >
                </div>
              </div>
            </div> -->
            <div class="van-cell   van-field">
              <div class="van-cell-title">
                <span>推荐人电话</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body">
                  <input
                    v-model.trim="factory.referrer_number"
                    :disabled="disabled"
                    type="tel"
                    placeholder="请输入推荐人电话"
                    class="van-field__control  van-field__control--left"
                    @blur.prevent="blurScroll"
                  >
                </div>
              </div>
            </div>
            <div class="van-cell   van-field">
              <div class="van-cell-title">
                <span><span class="required">*</span>营业执照</span>
              </div>
              <div class="van-cell-value">
                <div class="van-field__body">
                  <van-uploader
                    v-if="Object.keys(img).length === 0"
                    :after-read="onRead"
                    accept="image/png, image/jpeg"
                    multiple
                  >
                    <img :src="icon.add_shop_pic" class="add-shop-pic">
                  </van-uploader>
                  <div v-else class="comment-img">
                    <img :src="img.content">
                    <div class="del-img" @click="delImg">
                      <van-icon name="clear" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-cell-group>
        </form>
        <div class="submit">
          <button id="submit" type="button" class="btn" @click="submit">
            提交资料
          </button>
        </div>
      </div>
    </div>

    <!-- 选择运营经验 -->
    <van-popup
      v-model="showJy"

      position="bottom"
      :overlay="true"
      class="reason-pop"
    >
      <van-picker
        show-toolbar
        :columns="jyList"
        title="运营经验"
        @change="onChangeJy"
        @cancel="onCancelJy"
        @confirm="onConfirmJy"
      />
    </van-popup>

    <!-- 选择产品分类 -->
    <van-popup
      v-model="showCat"
      position="bottom"
      show-toolbar
      :overlay="true"
      class="reason-pop"
    >
      <van-picker
        show-toolbar
        :columns="catList"
        title="产品类型"
        @change="onChangeCat"
        @cancel="onCancelCat"
        @confirm="onConfirmCat"
      />
    </van-popup>
  </div>
</template>

<script>
import { entering } from '@/api/BeeApi/store'
import { zipImg } from '@/utils/imgUp'
import { getCategory1 } from '@/api/BeeApi/product'
import { getUID, isPartner } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
export default {
  metaInfo: {
    title: '商家入驻'
  },
  components: {},
  props: {},
  data() {
    return {
      // 所需图片
      icon: {
        factory_top: require('@/assets/icon/joinFactory/factory_top.png'),
        factory_img1: require('@/assets/icon/joinFactory/factory_img1.png'),
        factory_img2: require('@/assets/icon/joinFactory/factory_img2.png'),
        add_shop_pic: require('@/assets/icon/joinFactory/add_shop_pic.png'),
        factory_form_bg: require('@/assets/icon/joinFactory/factory_form_bg.png'),
        halfCircle: require('@/assets/icon/joinFactory/factory_img_circle.png')
      },
      // 表单model
      factory: {
        firm: '',
        contacter: '',
        contact_phone: '',
        cat_name: '',
        cat_id: '',
        jy_id: '',
        jy_name: '',
        referrer_name: '',
        referrer_number: '',
        thumb_url: ''
      },
      // 上传图片
      img: {},

      // 产品分类
      catList: [],
      showCat: false,
      // 运营经验分类
      jyList: [
        {
          id: 1,
          text: '京东/淘宝/拼多多'
        },
        {
          id: 2,
          text: '其他电商平台'
        },
        {
          id: 3,
          text: '没有过运营经验'
        }
      ],
      showJy: false,
      uid: 0,
      userPhone: null,
      disabled: false
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    this.getCategory1Data()

    this.isPartner()
    this.loadUID()
  },
  methods: {
    // 判断该用户是否是合伙人
    async isPartner() {
      const res = await isPartner()
      //  console.log('用户是否合伙人身份：', res)

      this.userPhone = res.data.user_phone
      // if (this.userPhone) {
      //   this.factory.referrer_number = this.userPhone
      // } else if (this.$route.query.phone) {
      //   this.factory.referrer_number = this.$route.query.phone
      // }

      if (this.$route.query.phone) {
        this.factory.referrer_number = this.$route.query.phone
        this.disabled = true
      }
    },

    // 获取用户id
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: '蜂集市，等你一起轻创业',
        desc: '零风险轻创业大财富的蜂集市，邀请您成为蜂集市合伙人！',
        imgUrl: 'https://img.fengjishi.com/app/images/share_logo.jpg',
        link: `https://app.fengjishi.com/beeFactory#/?uid=${this.uid}&phone=${this.userPhone}`
      })
    },

    // 跳转到入驻政策
    goEnterPolicty() {
      this.$router.push({
        name: 'enterPolicty'
      })
    },

    // 获取分类类别
    async getCategory1Data() {
      const res = await getCategory1()
      console.log('分类：', res)
      this.catList = res.data.map(item => {
        return {
          cat_id: item.cid,
          text: item.cname
        }
      })
      // this.category1 = res.data
      // this.getCategory2Data(this.category1[0].cid)
    },
    // 提交表单
    async submit() {
      if (
        this.validFirm(this.factory.firm) &&
        this.validName(this.factory.contacter) &&
        this.validTel(this.factory.contact_phone) &&
        this.validCat(this.factory.cat_name) &&
        this.validJy(this.factory.jy_name) &&
        this.validImg(this.img.content) &&
        this.validReferName(this.factory.referrer_name) &&
        this.validReferTel(this.factory.referrer_number)
      ) {
        console.log(1)
        const formData = new FormData()
        //   const results = await Promise.all(
        //   files.map(async file => {
        //     const res = await zipImg(file)
        //     formData.append('proofs[]', res)
        //     return res
        //   })
        // )

        const fileImg = this.img.file
        const res = await zipImg(fileImg)
        formData.set('licence_img', res)

        formData.set('company_name', this.factory.firm)
        formData.set('contacts', this.factory.contacter)
        formData.set('mobile', this.factory.contact_phone)
        formData.set('cat_id', this.factory.cat_id)
        formData.set('operate_experience', this.factory.jy_name)
        formData.set('invite_name', this.factory.referrer_name)
        formData.set('invite_mobile', this.factory.referrer_number)
        // 执行提交表单请求
        try {
          const res1 = await entering(formData)
          if (res1.code === 1 && res1.status_code === 200) {
            this.$toast.success(res1.message)
          }
        } catch (error) {
          this.$toast.fail(error)
        }
      } else {
        console.log('表单有误')
      }
    },

    // 上传图片
    async onRead(file) {
      console.log(file)

      this.img = file
    },
    delImg(index) {
      this.img = {}
    },

    // 运营经验选择
    onChangeJy(picker, value, index) {
      console.log('运营经验选择:', value)
      this.factory.jy_id = value.id
      this.factory.jy_name = value.text
    },
    onCancelJy() {
      this.showJy = false
      this.$toast('取消')
    },
    onConfirmJy(value, index) {
      console.log(value, index)

      this.factory.jy_id = value.id
      this.factory.jy_name = value.text
      this.showJy = false
    },

    // 产品类型选择
    onChangeCat(picker, value, index) {
      console.log('产品类型:', value)

      this.factory.cat_id = value.cat_id
      this.factory.cat_name = value.text
    },
    onCancelCat() {
      this.showCat = false
      this.$toast('取消')
    },
    onConfirmCat(value, index) {
      console.log(value, index)
      this.factory.cat_id = value.cat_id
      this.factory.cat_name = value.text
      this.showCat = false
    },

    // 验证方法
    // 验证厂商
    validFirm(val) {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,64}$/.test(val)) {
        this.$toast('请正确输入厂商名称！')
        return false
      } else {
        return true
      }
    },
    // 验证姓名
    validName(val) {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/.test(val)) {
        this.$toast('请正确输入联系人姓名！')
        return false
      } else {
        return true
      }
    },
    // 验证手机座机号码
    validTel(val) {
      if (!/^((\d{2,4}-\d{7,8})|(1[3456789]\d{9}))$/.test(val)) {
        this.$toast('请正确输入联系电话！')
        return false
      } else {
        return true
      }
    },
    // 验证下拉框是否有值
    validCat(val) {
      if (!val) {
        this.$toast('请选择产品类型！')
        return false
      } else {
        return true
      }
    },
    // 验证下拉框是否有值
    validJy(val) {
      if (!val) {
        this.$toast('请选择经营经营！')
        return false
      } else {
        return true
      }
    },
    // 验证推荐人姓名
    validReferName(val) {
      if (val.length > 0) {
        if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/.test(val)) {
          this.$toast('请正确输入推荐人姓名！')
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    // 验证推荐人手机座机号码
    validReferTel(val) {
      if (val.length > 0) {
        if (!/^((\d{2,4}-\d{7,8})|(1[3456789]\d{9}))$/.test(val)) {
          this.$toast('请正确输入推荐人电话！')
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    // 验证是否上传了图片
    validImg(val) {
      if (!val) {
        this.$toast('请上传营业执照！')
        return false
      } else {
        return true
      }
    },
    // ios 12 解决键盘顶起页面问题
    blurScroll() {
      setTimeout(function() {
        var scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 100)
    }
  }
}
</script>

<style  lang="less">
.factory-body {
  background: #fed559;
  .van-cell-group{ border-radius:0.1rem;}
  .van-cell:not(:last-child)::after {
    content: " ";
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 15px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: none;
  }
  .van-cell {
    display: flex;
    justify-content: space-between;
    border-radius:0.1rem;
    align-items: center;
  }
  .van-cell-title{
    font-size: 0.3rem;
    color: #333;
    font-weight: 800;
    width: 1.6rem;
    text-align: right;
    .required {
      color: #ff4918;
    }
  }
  .van-cell-value{width: 4rem; border: 1px solid red;}
  // .van-field__label {
  //   display: flex;
  //   align-items: center;
  //   justify-content: flex-end;
  //   margin-right: 0.3rem;
  //   font-size: 0.3rem;
  //   color: #333;
  //   font-weight: 800;
  //   // width: 2rem;
  //   text-align: right;
  //   .required {
  //     color: #ff4918;
  //   }
  // }
  .van-field__control {
    border-radius: 0.05rem;
    width: 3.8rem;
    height: 0.74rem;
    line-height: 0.74rem;
    background: #eee;
    border: none;
    font-size: 0.28rem;
    color: #333;
    padding: 0 0.2rem;
  }
  .comment-img {
    width: 1.6rem;
    height: 1.6rem;
    position: relative;
    img {
      border-radius: 0.05rem;
    }
    .del-img {
      position: absolute;
      top: -0.1rem;
      right: -0.1rem;
    }
  }
  .add-shop-pic {
    width: 1.6rem;
    height: 1.6rem;
  }
}
.factory {
  width: 6.8rem;
  margin: 0 auto;
  padding-top: 0.6rem;
  .top-img {
    width: 100%;
    margin: 0 auto 0.3rem;
    display: block;
  }

  .info {
    background: #fff;
    font-size: 0.28rem;
    color: #414650;
    position: relative;
    border-radius: 0.1rem;
    padding: 0.4rem;
  }
  .join {
    margin-top: 0.4rem;
  }
  .join-btn {
    margin-right: 1.5rem;
    font-size: 0.28rem;
    background: none;
    display: inline-block;
    color: #444;
    padding: 0.2rem;
    background: #fed559;
    border-radius: 0.1rem;
  }

  .jt {
    color: #444;
  }
  .info-img {
    position: absolute;
  }
  .info-img1 {
    width: 1.17rem;
    height: 1.48rem;
    top: -0.1rem;
    right: 0.2rem;
  }
  .info-img2 {
    width: 1.86rem;
    height: 2.08rem;
    bottom: -0.7rem;
    right: -0.1rem;
  }

  .form-box {
    margin: 0.5rem auto 0;
  }
  .form-title {
    background: #986c4c;
    font-size: 0.38rem;
    color: #fed559;
    padding: 0.25rem;
    border-top-left-radius: 0.08rem;
    border-top-right-radius: 0.08rem;
    margin-left: 0.1rem;
    display: inline-block;
  }
  .form {

    position: relative;
    .half-circle{
      position: absolute;
      width: 0.16rem;
      height: 0.44rem;
      top: 40%;
      z-index: 9;
    }
    .left{
      left: 0;
      transform: rotate(180deg)
    }
    .right{
      right:0;
    }
  }
  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
    label {
      font-size: 0.3rem;
      color: #333;
      font-weight: 800;
      width: 2rem;
      text-align: right;
      span {
        color: #ff4918;
      }
    }
    input,
    select {
      width: 3.8rem;
      height: 0.74rem;
      line-height: 0.74rem;
      background: #eee;
      border: none;
      font-size: 0.28rem;
      color: #333;
      padding: 0 0.2rem;
    }
    textarea {
      width: 4.2rem;
      background: #eee;
      border: none;
      font-size: 0.28rem;
      color: #333;
      padding: 0.2rem;
    }
  }
  .pic-box {
    width: 3.8rem;
    height: 1.6rem;
    position: relative;
    margin: 0.2rem auto;
    overflow: hidden;
    text-align: left;
    .preview {
      width: 1.6rem;
      height: 100%;
      background: url(../../../assets/icon/joinFactory/add_shop_pic.png)
        no-repeat;
      background-size: cover;
    }
    img {
      width: 100%;
      height: 100%;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      height: 100%;
      width: 100%;
    }
  }

  .submit {
    height: 1.5rem;
    width: 100%;
    background: url(../../../assets/icon/joinFactory/factory_bottom_img.png)
      no-repeat;
    background-size: 100% 100%;
    text-align: center;
    margin-top: 0.5rem;
    .btn {
      font-size: 0.48rem;
      color: #fed559;
      padding: 0.2rem 0.7rem;
      border: none;
      border-radius: 1rem;
      background: #fff;
      box-shadow: 0 0.2rem 0 rgba(226, 182, 51, 0.34);
      font-weight: 800;
      outline: none;
    }
  }

  .sel_mask {
    position: relative;
    width: 4.2rem;
    height: 0.74rem;
    line-height: 0.74rem;
    background: #eee;
    border-radius: 5px;
    font-size: 0.28rem;
    color: #333;
    padding: 0 0.2rem;
    //              box-shadow:1px 1px 5px #169BD5;
    display: inline-block;
    text-decoration: none;
    .icon {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      background: #ffe084;
      width: 0.76rem;
      height: 100%;
    }
    img {
      width: 0.29rem;
      margin: auto;
    }
    select {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

    select option {
      border-bottom: 1px solid red;
    }
  }
  .help-text {
    font-size: 0.24rem;
    color: red;
    margin-top: 0.1rem;
    display: none;
  }
}
</style>
