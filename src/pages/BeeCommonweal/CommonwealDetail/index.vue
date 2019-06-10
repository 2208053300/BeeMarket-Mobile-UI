<template>
  <div class="com-detail">
    <van-notice-bar
      v-if="recordList.scroll_message"
      :text="recordList.scroll_message"
      left-icon="volume-o"
      background="transparent"
    />
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
export default {
  components: {},
  props: {},
  data() {
    return {
      recordList: {}
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
