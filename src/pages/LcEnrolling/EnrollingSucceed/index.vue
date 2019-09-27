<template>
  <div class="enrolling-succeed">
    <img
      :src="require('@/assets/icon/lcEnrollingSucceed/wechat_competition_leaderboard_img_top.png')"
      class="top-img"
    >
    <p style="font-size: 0.36rem;color:#E9DCB8;margin-top: 0.44rem;font-weight: bold">
      您已成功报名
    </p>
    <p style="font-size: 0.3rem;color:#E9DCB8;margin-top: 0.2rem">
      去下载App完成任务吧
    </p>
    <div class="download">
      <a href="https://apps.apple.com/cn/app/%E8%9C%82%E9%9B%86%E5%B8%82/id1382648901">
        <img :src="require('@/assets/icon/lcEnrollingSucceed/iphone.png')" alt="Iphone下载">
      </a>
      <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.bee.beemark">
        <img :src="require('@/assets/icon/lcEnrollingSucceed/android.png')" alt="Android下载">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: '报名成功'
    }
  },
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.enrolling-succeed {
  p {
    margin: 0;
  }
  width: 100%;
  height: 100vh;
  background-color: black;
  background-image: url("../../../assets/icon/lcEnrollingSucceed/wechat_competition_leaderboard_img_bg.png");
  background-size: cover;
  text-align: center;
  .top-img {
    margin-top: 1.18rem;
    width: 3.52rem;
    height: auto;
  }
  .download {
    padding: 0 0.63rem;
    margin-top: 1.2rem;
    display: flex;
    justify-content: center;
    a {
      width: 2.9rem;
      height: auto;
      &:first-child {
        padding-right: 0.44rem;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
