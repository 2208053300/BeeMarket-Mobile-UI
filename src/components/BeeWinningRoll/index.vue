<template>
  <div>
    <van-swipe v-if="list.length > 0" class="winning-roll" :autoplay="5000" :show-indicators="false" :touchable="false" vertical>
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
        'giftPackage': 4
      }
      const res = await prizeList({ type: types[this.type] })
      this.list = res.data || []
    }
  }
}
</script>

<style lang="less" scoped>
  .winning-roll {
    width: 5.5rem;
    height: 0.55rem;
    background: rgba(0, 0, 0, 0.46);
    border-radius: 5rem;
    .winning-item {
      display: grid;
      grid-template-columns: 0.48rem 1fr;
      align-items: center;
      grid-column-gap: 0.11rem;
      column-gap: 0.11rem;
      img {
        margin-left: 0.04rem;
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 1rem;
      }
      span {
        text-align: start;
        color: white;
        font-size: 0.24rem;
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
