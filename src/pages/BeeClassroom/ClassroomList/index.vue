<template>
  <div class="classroom-content">
    <div class="head-bg">
      <img
        :src="headImg"
        alt=""
      >
    </div>
    <div class="classroom-list">
      <div
        v-for="item in list"
        :key="item.id"
        class="card"
        @click="goDetail(item.id)"
      >
        <div class="card-head">
          <img :src="logo">
          <span class="card-title">{{ item.title }}</span>
        </div>
        <img
          :src="item.page_image"
          class="card-body"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getOs } from '@/utils'
import { classRoomList } from '@/api/BeeApi/classRoom'
export default {
  metaInfo: {
    title: '集市课堂'
  },
  components: {},
  props: {},
  data() {
    return {
      logo: require('@/assets/icon/classroom/classroom_pic_avatar@3x.png'),
      headImg: '',
      list: [],
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(false)
    }
    this.getList()
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: 'classroomDetail',
        params: { id }
      })
    },
    async getList() {
      const res = await classRoomList()
      this.list = res.data.list
      this.headImg = res.data.bg_img
    }
  }
}
</script>

<style scoped lang="less">
.classroom-content {
  .head-bg {
    height: 3.9rem;
  }
  .classroom-list {
    position: relative;
    top: -0.88rem;
    padding: 0 0.3rem;
    p {
      margin: 0;
    }
    body {
      height: auto;
    }
    .card {
      box-shadow: 0 0 0.15rem rgba(153, 153, 153, 0.2);
      background: white;
      margin-top: 0.3rem;
      border-radius: 0.16rem;
      padding: 0.2rem 0.3rem;
      &:last-child {
        margin-bottom: 0.3rem;
      }
      .card-head {
        display: flex;
        align-items: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
        span {
          padding-left: 0.12rem;
          font-size: 0.28rem;
          color: @ProductName;
        }
      }
      .card-title {
        font-size: 0.3rem;
        color: @ProductName;
      }
      .card-body {
        margin-top: 0.2rem;
        border-radius: 0.16rem;
        width: 6.3rem;
        height: 3.4rem;
        object-fit: cover;
      }
      .card-footer {
        margin-top: 0.2rem;
        text-align: right;
        font-size: 0.22rem;
        color: @Grey1;
      }
    }
  }
}
</style>
