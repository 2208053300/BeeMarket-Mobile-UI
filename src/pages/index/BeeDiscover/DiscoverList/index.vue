<template>
  <div class="discover-container">
    <van-tabs
      v-model="active"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :line-width="60"
      swipeable
      background="transparent"
    >
      <van-tab>
        <div slot="title">
          集市动态
        </div>
        <article-list />
      </van-tab>
      <van-tab>
        <div slot="title">
          公益动态
        </div>
        <action-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import actionList from './components/actionList'
import articleList from './components/articleList'
import { getUID } from '@/api/BeeApi/user'
import wxapi from '@/utils/wxapi'
export default {
  metaInfo() {
    return {
      title: '发现'
    }
  },
  components: {
    actionList,
    articleList
  },
  props: {},
  data() {
    return {
      BeeDefault,
      active: 0,
      uid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = true
    this.active = this.$route.query.active || 0
    this.loadUID()
  },
  methods: {
    async loadUID() {
      const res = await getUID()
      this.uid = res.data.uid

      wxapi.wxShare({
        title: '蜂公益，关注社会，关注未来',
        desc: '公益心，公益行，我们等你一起。',
        imgUrl: 'https://img.fengjishi.com/app/images/action.jpg',
        link: `https://app.fengjishi.com/#/discover?active=1&uid=${this.uid}`
      })
    }

  }
}
</script>

<style lang="less">
.discover-container {
  padding: 0.1rem 0.3rem 60px;
  box-sizing: border-box;
  .van-tabs {
    .van-tabs__wrap {
      margin: 0 0.6rem;
    }
    .van-hairline--top-bottom::after {
      border: none;
    }
  }
}
</style>
