<template>
  <div class="card3 bg-white">
    <div class="enterprise text-center">
      <p class="mark">
        - 爱心企业 -
      </p>
      <img :src="actionDetails.company_info.love_company_logo" class="logo">
      <!-- company_desc -->
      <van-button plain hairline class="btn" @click="show = true">
        企业简介
      </van-button>
    </div>
    <div class="logos">
      <p class="mark text-center">
        - 协作企业 -
      </p>
      <ul class="logo-list flex flex-wrap">
        <li class="flex flex-center">
          <img :src="beeLogo">
        </li>
        <li class="flex flex-center">
          <img :src="qlLogo">
        </li>
        <template v-if="actionDetails.company_info.cooperation_company_list!==[]">
          <li v-for="(item, index) in actionDetails.company_info.cooperation_company_list" :key="index" class="flex flex-center">
            <img :src="item.cooperation_company_logo">
          </li>
        </template>
      </ul>
      <div class="text-center bottom-img">
        <img :src="bottomImg">
      </div>
    </div>

    <!-- 爱心企业信息 -->
    <van-popup v-model="show">
      <div class="enterprise-info" :style="{ backgroundImage: 'url(' + infoBg + ')' }">
        <div class="tag text-center">
          公司信息
        </div>
        <div class="logo text-center">
          <img :src="actionDetails.company_info.love_company_logo">
        </div>
        <div class="info">
          {{ actionDetails.company_info.company_desc }}
        </div>
      </div>
      <!-- 关闭图片 -->
      <img :src="closeImg" class="close-img" @click="show=false">
    </van-popup>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {
    actionDetails: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      BeeDefault,
      bottomImg: require('@/assets/icon/discover/confirmorder_pic_word@2x.png'),
      infoBg: require('@/assets/icon/discover/confirmorder_popups_pic_shading@2x.png'),
      closeImg: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_icon_delete@2x.png'),
      // 协作企业前两个固定logo
      beeLogo: require('@/assets/icon/discover/confirmorder_pic_bee@2x.png'),
      qlLogo: require('@/assets/icon/discover/confirmorder_pic_qilin@2x.png'),
      // 是否显示爱心企业信息弹框
      show: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.card3 {
  padding: 0.32rem;
  .mark{font-size: 0.32rem; margin: 0 0 0.3rem;}
 .enterprise{
   border-bottom: 1px dashed @BeeDefault;
   .logo{width:2.44rem;height:1.04rem;margin:0 auto .4rem; display: block;}
   .btn{border-radius: 0.1rem; font-size: 0.28rem; border-color: @BeeDefault; color:@BeeDefault; margin-bottom: 0.4rem; }
 }
 .logos{margin-top: 0.4rem;}
  .logo-list{
    li{width:48%; margin-bottom: 0.4rem;}
    li:nth-child(odd){border-right:1px solid #f4f4f4;}
    img{width:2.16rem;height:.8rem;}
  }
  .bottom-img{
    img{width:2.61rem;height:.67rem;}
  }
  .van-popup{border-radius: 0.1rem;
    overflow: initial;
  }
  .enterprise-info{
    position: relative;
    background-size: contain;
    width:5.76rem;
    padding-top: 0.2rem;
    .tag{
      width:1.56rem;
      height: 0.48rem;
      line-height: .48rem;
      font-size:0.28rem ;
      color:#fff;
      background:@BeeDefault;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
    .logo{
      margin: 0.24rem auto;
      img{width:2.36rem;height: 1.04rem;}
    }
    .info{
      background:@BeeDefault;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 0.1rem;
      border-bottom-right-radius: 0.1rem;
      max-height: 5rem;
      overflow: scroll;
      padding:0.52rem ;
      box-sizing: border-box;
      font-size: 0.28rem;
      color:#fff;
    }

  }
   .close-img{
      position:absolute;
      bottom: -1.2rem;
      left:50%;
      transform: translateX(-50%);
      width:0.6rem;
      height: 0.6rem;
    }
}
</style>
