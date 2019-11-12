<template>
  <div class="competition-details">
    <img v-for="(res, index) in imgs" :key="index" :src="res">
    <div style="height: 1.6rem" />
    <div class="btn-container">
      <button v-if="enrollingDisplayLevel === 0" style="background-color: #AEAEAE;color: rgba(255,255,255,0.51)">
        您已报名
      </button>
      <button v-if="enrollingDisplayLevel === 1" @click="$refs.enrollDialog.showDialog()">
        报名参赛
      </button>
    </div>
    <enroll-dialog ref="enrollDialog" />
  </div>
</template>

<script>
import { isJoin } from '@/api/BeeApi/lcEnrollingApi'
import enrollDialog from '@/pages/LcEnrolling/Enrolling/components/enrollDialog'
export default {
  components: {
    enrollDialog
  },
  props: {},
  data() {
    return {
      imgs: [
        'https://img.fengjishi.com/lianchuang/competitionDetails/competition_pic_aims.png',
        'https://img.fengjishi.com/lianchuang/competitionDetails/competition_pic_bonus.png',
        'https://img.fengjishi.com/lianchuang/competitionDetails/competition_pic_rights.png',
        'https://img.fengjishi.com/lianchuang/competitionDetails/competition_pic_description.png'
      ],
      enrollingDisplayLevel: 3 // 0为已报名 1为未报名
    }
  },
  mounted() {
    this.checkIsEnrolling()
  },
  methods: {
    // 检查是否报名
    async checkIsEnrolling() {
      const res = await isJoin()
      if (res.data.is_join === 1) {
        this.enrollingDisplayLevel = 0
      } else {
        this.enrollingDisplayLevel = 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: auto;
}
.competition-details {
  background-image: url("https://img.fengjishi.com/lianchuang/competitionDetails/competition_pic_background.png");
  background-attachment: scroll;
  background-size: cover;
  background-position: bottom;
  .btn-container {
    position: fixed;
    bottom: 0.2rem;
    left: 0.3rem;
    right: 0.3rem;
    button {
      width: 100%;
      background-color: #E8A812;
      border-radius: 5rem;
      line-height: 1rem;
      font-size: 0.3rem;
      color: white;
      border: none;
      padding: 0;
    }
  }
}
</style>
