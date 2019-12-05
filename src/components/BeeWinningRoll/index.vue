<template>
  <div>
    <van-swipe
      v-if="list.length > 0"
      class="winning-roll"
      :autoplay="autoplay"
      :show-indicators="false"
      :touchable="false"
      vertical
      :style="{width: width}"
    >
      <van-swipe-item v-for="(item, index) in list" :key="index" class="winning-item">
        <img :src="item.user_head_url">
        <span>{{ item.notice }}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { prizeList } from '@/api/BeeApi/user'
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: () => '5.5rem'
    },
    autoplay: {
      type: Number,
      default: () => 5000
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getPrizeList()
  },
  methods: {
    async getPrizeList() {
      const types = {
        'home': 0,
        'giftPackage': 4,
        'alcohol': 5
      }
      const res = await prizeList({ type: types[this.type] })
      this.list = res.data || []
    }
  }
}
</script>

<style lang="less" scoped>
  .winning-roll {
    width: 275px;
    height: 28px;
    background: rgba(0, 0, 0, 0.46);
    border-radius: 100px;
    .winning-item {
      display: grid;
      grid-template-columns: 28px 1fr;
      align-items: center;
      grid-column-gap: 5px;
      column-gap: 5px;
      img {
        margin-left: 2px;
        width: 22px;
        height: 22px;
        border-radius: 100px;
      }
      span {
        text-align: start;
        color: white;
        font-size: 12px;
        display: inline-block;
        white-space: nowrap;
        width: 98%;
        overflow: hidden;
        text-overflow:ellipsis;
        margin-top: 2px;
      }
    }
  }
</style>
