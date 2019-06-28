<template>
  <div class="enterprise-content">
    <div class="caring-content">
      <div class="caring-title">
        - 爱心企业 -
      </div>
      <div class="enterprise-img">
        <img
          :src="actionData.company_info.love_company_logo"
          alt="爱心企业"
        >
      </div>
      <div class="show-desc">
        <van-button
          class="desc-btn"
          @click="showDetail=true"
        >
          企业简介
        </van-button>
      </div>
      <div
        class="dotted-img"
        :style="{backgroundImage:'url('+beeIcon.confirmorder_pic_parting+')'}"
      />
    </div>
    <div class="institutions-content">
      <div class="institutions-title">
        - 协作机构 -
      </div>
      <div class="institutions-content2">
        <div class="institutions-item">
          <img
            :src="beeIcon.confirmorder_pic_bee"
            alt=""
          >
        </div>
        <div class="institutions-item">
          <img
            :src="beeIcon.confirmorder_pic_qilin"
            alt=""
          >
        </div>
        <template v-if="actionData.company_info.cooperation_company_list!==[]">
          <div
            v-for="(item,index) in actionData.company_info.cooperation_company_list"
            :key="index"
            class="institutions-item"
          >
            <img
              :src="item.cooperation_company_logo"
              alt="Logo"
            >
          </div>
        </template>
      </div>
      <div
        class="institutions-footer"
        :style="{backgroundImage:'url('+beeIcon.confirmorder_pic_word+')'}"
      />
    </div>
    <enterprise-card
      :show-detail.sync="showDetail"
      :company-info="actionData.company_info"
    />
  </div>
</template>

<script>
import enterpriseCard from './enterpriseCard'

export default {
  components: {
    enterpriseCard
  },
  props: {
    actionData: {
      type: Object,
      default: () => {
        return {
          company_info: {
            love_company_logo: ''
          }
        }
      }
    }
  },
  data() {
    return {
      beeIcon: {
        confirmorder_pic_parting: require('@/assets/icon/discover/confirmorder_pic_parting@2x.png'),
        confirmorder_pic_bee: require('@/assets/icon/discover/confirmorder_pic_bee@2x.png'),
        confirmorder_pic_qilin: require('@/assets/icon/discover/confirmorder_pic_qilin@2x.png'),
        confirmorder_pic_word: require('@/assets/icon/discover/confirmorder_pic_word@2x.png')
      },
      showDetail: false
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
.enterprise-content {
  margin-top: 0.2rem;
  background-color: #fff;
  box-shadow: 0 0 0.2rem @Grey6;
  padding: 0.4rem;
  border-radius: 0.08rem;
  position: relative;
  .caring-content {
    .caring-title {
      font-size: 0.32rem;
      text-align: center;
    }
    .enterprise-img {
      margin: 0.28rem auto 0.4rem;
      width: 2.44rem;
      height: 1.04rem;
    }
    .show-desc {
      text-align: center;
      .desc-btn {
        width: 1.52rem;
        height: 0.48rem;
        border-radius: 0.08rem;
        color: @BeeDefault;
        border: 0.02rem solid @BeeDefault;
        padding: 0;
        line-height: 0.48rem;
        font-size: 0.28rem;
      }
    }
    .dotted-img {
      height: 0.05rem;
      background-size: cover;
      background-repeat: no-repeat;
      margin: 0.4rem 0;
    }
  }
  .institutions-content {
    .institutions-title {
      font-size: 0.32rem;
      text-align: center;
    }
    .institutions-content2 {
      margin-top: 0.28rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      text-align: center;
      align-items: center;
      grid-template-rows: repeat(2, 0.8rem);
      grid-row-gap: 0.4rem;
      .institutions-item {
        height: 0.8rem;
        width: 2.16rem;
        margin: auto;
        &:nth-child(n + 2) {
          border-right: 0.02rem solid @Grey4;
        }
      }
      .item1 {
        width: 2.16rem;
        height: 0.6rem;
      }
      .item2 {
        width: 1.46rem;
        height: 0.8rem;
      }
    }
    .institutions-footer {
      margin: 0.4rem auto 0;
      height: 0.67rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
