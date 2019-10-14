<template>
  <div>
    <van-swipe v-if="list.length > 0" class="winning-roll" :autoplay="5000" :show-indicators="false" :touchable="false" vertical>
      <van-swipe-item v-for="(item, index) in list" :key="index" class="winning-item">
        <img :src="item.avatar">
        <span>{{ item.text }}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      list: [
        {
          avatar: 'https://head.fengjishi.com/user/headimg/2019/09/28031902B3dtaYiYgZcSx6qP.jpeg',
          text: '恭喜二蛋抽中一部Phone'
        },
        {
          avatar: 'https://head.fengjishi.com/user/headimg/2019/09/28031902B3dtaYiYgZcSx6qP.jpeg',
          text: '恭喜优秀的王麻子抽中一部Phone11 Plus'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .winning-roll {
    width: 5rem;
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
        width: 95%;
        overflow: hidden;
        text-overflow:ellipsis;
        margin-top: 2px;
      }
    }
  }
</style>
