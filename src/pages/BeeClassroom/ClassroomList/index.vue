<template>
  <div class="classroom-list">
    <div v-for="item in list" :key="item.id" class="card" @click="goDetail(item.id)">
      <div class="card-head">
        <img :src="logo">
        <span>集市课堂</span>
      </div>
      <p class="card-title">
        {{ item.title }}
      </p>
      <img :src="item.img" class="card-body">
      <p class="card-footer">
        {{ item.date }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '集市课堂'
  },
  components: {},
  props: {},
  data() {
    return {
      logo: require('@/assets/icon/classroom/classroom_pic_avatar@3x.png'),
      list: [
        {
          id: 1,
          title: '快速玩转蜂集市',
          img: require('@/assets/icon/classroom/classroom_pic_market@2x.png'),
          date: '2019.06.22'
        },
        {
          id: 2,
          title: '开启你的蜂友圈',
          img: require('@/assets/icon/classroom/classroom_pic_friend@2x.png'),
          date: '2019.06.22'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    goDetail(id) {
      this.$router.push({
        name: 'classroomDetail',
        params: { id }
      })
    }
  }
}
</script>

<style scoped lang="less">
.classroom-list {
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
      margin-top: 0.28rem;
      font-size: 0.36rem;
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
</style>
