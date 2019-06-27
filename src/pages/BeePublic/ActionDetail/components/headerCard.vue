<template>
  <div
    class="header-card"
    :style="{backgroundImage:'url('+actionData.background_image_url+')'}"
  >
    <div class="action-img">
      <img
        :src="beeIcon.confirmorder_pic_word_top"
        alt=""
      >
    </div>
    <div class="header-card2">
      <div class="header-img">
        <img
          :src="actionData.head_img||beeIcon.head_default"
          alt=""
        >
      </div>
      <span class="user-name">
        {{ actionData.nickname }}
      </span>
      <div class="img-content">
        <img
          :src="beeIcon.picText"
          class="pic-text"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    actionData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      beeIcon: {
        confirmorder_pic_word_top: require('@/assets/icon/discover/confirmorder_pic_word_top@2x.png'),
        head_default: require('@/assets/icon/personalCenter/head_default.png'),
        picText: require('@/assets/icon/discover/pic_text@2x.png')
      }
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
.header-card {
  border-radius: 0.08rem;
  padding: 0.4rem 0.16rem 0.16rem;
  text-align: center;
  box-shadow: 0 0 0.2rem @Grey6;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  .action-img {
    height: 0.98rem;
    width: 3.58rem;
    border-radius: 0.08rem;
    margin: auto;
  }
  .header-card2 {
    margin-top: 1rem;
    width: 6.6rem;
    height: 2.2rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0.08rem;
    position: relative;
    .header-img {
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      overflow: hidden;
      border: 0.04rem solid rgba(255, 255, 255, 0.3);
      margin: auto;
      position: relative;
      top: -0.55rem;
    }
    .user-name {
      font-size: 0.4rem;
      font-weight: bold;
      margin-top: 0.2rem;
      position: relative;
      top: -0.45rem;
    }
    .img-content{
      display: block;
      margin: auto;
      height: 0.43rem;
      width: 2.85rem;
    }
    .header-text2 {
      font-size: 0.32rem;
      margin: 0;
      padding: 0;
      margin-top: 0.2rem;
      position: relative;
      top: -0.45rem;
    }
  }
}
</style>
