<template>
  <div class="com-detail">
    <van-notice-bar
      v-if="recordData.scroll_message"
      :text="recordData.scroll_message"
      left-icon="volume-o"
      background="transparent"
    />
    <van-tabs
      v-model="active"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :line-width="60"
      background="transparent"
      @change="getList"
    >
      <van-tab>
        <div slot="title">
          全部
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          已到账
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          在路上
        </div>
      </van-tab>
    </van-tabs>
    <div class="detail-card">
      <van-cell-group v-if="recordData.details!==[]">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我也是有底线的 o(´^｀)o"
          :immediate-check="false"
          @load="onLoad"
        >
          <van-cell
            v-for="(item,index) in recordData.details"
            :key="index"
          >
            <template slot="title">
              <div class="desc">
                {{ item.desc }}
              </div>
              <div class="time">
                {{ item.created_at }}
              </div>
            </template>
            <div class="comVal">
              <span v-if="item.type===2">+{{ item.number }}</span>
              <span v-else>-{{ item.number }}</span>
            </div>
          </van-cell>
        </van-list>
      </van-cell-group>
      <div
        v-if="recordList===[]"
        class="none-img"
      >
        <div class="img-content">
          <img
            :src="beeIcon.mine_collection_img_default"
            alt=""
          >
        </div>
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mineCharityValueDetail } from '@/api/BeeApi/user'
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  metaInfo() {
    return {
      title: '公益值明细'
    }
  },
  components: {},
  props: {},
  data() {
    return {
      recordData: {},
      BeeDefault,
      active: 0,
      loading: false,
      finished: false,
      page: 1,
      recordList: [],
      beeIcon: {
        mine_collection_img_default: require('@/assets/icon/personalCenter/func/mine_collection_img_default@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.active = Number(this.$route.query.active)
    this.mineCharityValueDetailData({ status_code: Number(this.active) + 1 })
  },
  methods: {
    async mineCharityValueDetailData(data) {
      const res = await mineCharityValueDetail(data)
      this.recordData = res.data
      this.recordList = res.data.details
      this.page = 2
    },
    getList(index) {
      this.page = 1
      this.mineCharityValueDetailData({
        page: this.page,
        status_code: this.active + 1
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(async() => {
        const res = await mineCharityValueDetail({
          page: this.page,
          status_code: this.active + 1
        })
        this.recordList.push(...res.data.details)
        this.page++
        this.loading = false
        // 数据全部加载完成
        if (res.data.details.length === 0) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.com-detail {
  .detail-card {
    .van-cell-group {
      background-color: transparent;
    }
    .van-cell {
      // background-color: transparent;
      .desc {
        font-size: 0.32rem;
      }
      .time {
        font-size: 0.28rem;
        color: @Grey1;
      }
      .van-cell__value {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .comVal {
        font-size: 0.36rem;
        color: @ProductName;
      }
    }
    .none-img {
      text-align: center;
      font-size: 0.28rem;
      .img-content {
        margin-top: 3rem;
        width: 2.88rem;
        height: 2.68rem;
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>
