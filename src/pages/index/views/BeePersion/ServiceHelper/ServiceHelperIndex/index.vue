<template>
  <div>
    <!-- Navbar -->
    <van-nav-bar title="客服帮助" left-arrow @click-left="back" />
    <!-- 用户信息 -->
    <div class="user-info flex align-center bg-white">
      <img :src="user.img" class="avatar">
      <div class="info">
        <p class="name">
          <span>{{ user.name }}</span>，您好！
        </p>
        <p class="tip">
          欢迎来到服务中心，很高兴为您服务
        </p>
      </div>
    </div>
    <!-- 热点问题 -->
    <p class="helper-title">
      热点问题
    </p>
    <van-cell-group>
      <van-cell v-for="(item, index) in hotQustion" :key="index" :title="item.title" />
    </van-cell-group>
    <!-- 问题分类 -->
    <p class="helper-title">
      问题类型
    </p>
    <van-row class="bg-white sort-div">
      <van-col v-for="(item, index) in sortList" :key="index" span="8">
        <div class="text-center sort-box">
          <p class="sort-name">
            {{ item.title }}
          </p>
          <p class="sort-desc">
            {{ item.desc }}
          </p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getServiceIndex } from '@/api/serviceHelp'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      user: {
        name: '',
        img: ''
      },
      hotQustion: [{
        id: 1,
        title: ''
      }],
      sortList: [
        {
          id: 1,
          title: '',
          desc: ''
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$store.state.app.beeFooter.show = false
    this.getIndexData()
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 获取帮助首页信息
    getIndexData() {
      getServiceIndex().then(res => {
        this.user = res.data.user
        this.hotQustion = res.data.hotQustion
        this.sortList = res.data.sortList
      })
    }
  }
}
</script>

<style scoped lang="less">

.avatar{width: 0.98rem; height: 0.98rem; border-radius: 50%; margin-right:0.3rem;}
.user-info{
  padding: 0 0.3rem;
  .name{
    font-size:0.28rem;
    color:#000;
    margin-bottom: 0.2rem;
  }
  .tip{
    font-size:0.24rem;
    color:#999;
  }
}
.helper-title{
  font-size: 0.22rem;
  padding-left: 0.3rem
}

.sort-box{
  border-right:1px solid #ddd;
  border-bottom:1px solid #ddd;
  padding: 0.2rem 0;
  p{margin: 0}
  .sort-name{font-size: 0.26rem; color: #333; margin-bottom: 0.2rem}
  .sort-desc{font-size: 0.2rem; color:#999;}
}
.sort-div .van-col:nth-child(3n){
  .sort-box{border-right: none}
}
</style>
