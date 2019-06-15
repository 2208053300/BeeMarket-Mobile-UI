<template>
  <div class="rt-fixed">
    <div
      class="rt-item"
      @click="showTypeAction()"
    >
      <div class="img-content">
        <img
          :src="getImg()"
          alt="类型"
        >
      </div>
      <div class="arrow-img">
        <img
          :src="beeIcon.bee_firends_icon_switch"
          alt="箭头"
        >
      </div>
    </div>
    <transition name="van-fade">
      <div
        v-if="honeyType!==1||showType"
        class="rt-item"
        @click="changeType(1)"
      >
        <div class="img-content">
          <img
            :src="beeIcon.bee_firends_icon_recommend"
            alt=""
          >
        </div>
      </div>
    </transition>
    <transition name="van-fade">
      <div
        v-if="honeyType!==2||showType"
        class="rt-item"
        @click="changeType(2)"
      >
        <div class="img-content">
          <img
            :src="beeIcon.bee_firends_icom_promotion"
            alt=""
          >
        </div>
      </div>
    </transition>
    <transition name="van-fade">
      <div
        v-if="honeyType!==3||showType"
        class="rt-item"
        @click="changeType(3)"
      >
        <div class="img-content">
          <img
            :src="beeIcon.bee_firends_icon_equity"
            alt=""
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    honeyType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      beeIcon: {
        bee_firends_icon_switch: require('@/assets/icon/beeFriends/home/bee_firends_icon_switch.png'),
        bee_firends_icon_recommend: require('@/assets/icon/beeFriends/home/bee_firends_icon_recommend.png'),
        bee_firends_icom_promotion: require('@/assets/icon/beeFriends/home/bee_firends_icom_promotion.png'),
        bee_firends_icon_equity: require('@/assets/icon/beeFriends/home/bee_firends_icon_equity.png')
      },
      showType: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeType(type) {
      this.$emit('update:honeyType', type)
      this.$parent.getPartnerData()
      this.$parent.getReceiveNumData()
    },
    showTypeAction() {
      this.showType = !this.showType
    },
    getImg() {
      if (this.honeyType === 1) {
        return this.beeIcon.bee_firends_icon_recommend
      } else if (this.honeyType === 2) {
        return this.beeIcon.bee_firends_icom_promotion
      } else {
        return this.beeIcon.bee_firends_icon_equity
      }
    }
  }
}
</script>

<style scoped lang="less">
.rt-fixed {
  position: fixed;
  top: 0.32rem;
  right: 0.3rem;
  z-index: 100;
  .rt-item {
    margin-bottom: 0.2rem;
    .img-content {
      width: 0.75rem;
      height: 0.92rem;
    }
    .arrow-img {
      width: 0.24rem;
      height: 0.17rem;
      margin: auto;
    }
  }
}
</style>
