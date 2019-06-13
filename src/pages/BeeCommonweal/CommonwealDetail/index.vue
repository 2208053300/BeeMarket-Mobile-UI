<template>
  <div class="com-detail">
    <van-notice-bar
      v-if="recordList.scroll_message"
      :text="recordList.scroll_message"
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
      <van-cell-group>
        <van-cell
          v-for="(item,index) in recordList.details"
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
      </van-cell-group>
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
      recordList: {},
      BeeDefault,
      active: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.mineCharityValueDetailData()
  },
  methods: {
    async mineCharityValueDetailData() {
      const res = await mineCharityValueDetail()
      this.recordList = res.data
    },
    getList(index) {
      // TODO 等接口，状态
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
      background-color: transparent;
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
  }
}
</style>
