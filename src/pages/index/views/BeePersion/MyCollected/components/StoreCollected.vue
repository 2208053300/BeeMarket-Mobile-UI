<template>
  <div class="store-list">
    <div
      v-for="store in storeList"
      :key="store.storeName"
      class="bee-store"
    >
      <van-cell>
        <div
          slot="title"
          class="left-title"
        >
          <div class="store-img">
            <img
              :src="store.storeImg"
              alt="store.storeName"
            >
          </div>
          <span>{{ store.storeName }}</span>
        </div>
        <div class="news">
          <span class="new-num">{{ store.news }}</span>
          <span>上新</span>
        </div>
      </van-cell>
      <div
        v-if="store.status===1"
        class="store-maintaining"
      >
        <span>商家维护中</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    storeList: {
      type: Array,
      default: () => {
        return
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less">
@import "../../../../styles/variables.less";
.store-list {
  .bee-store {
    margin: 0.2rem 0.15rem;
    background-color: #fff;
    border-radius: 0.2rem;
    overflow: hidden;
    position: relative;
    .van-cell {
      padding: 0.3rem 0 0.3rem 0.15rem;
      .van-cell__title {
        display: flex;
        align-items: center;
        .left-title {
          width: 5rem;
          font-size: 0.3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .store-img {
            display: inline-block;
            border-radius: 50%;
            width: 1rem;
            height: 1rem;
            overflow: hidden;
            vertical-align: middle;
            margin-right: 0.3rem;
          }
        }
      }
      .van-cell__value {
        flex: 0.2;
        .news {
          font-size: 0.26rem;
          color: @BeeDefault;
          text-align: center;
          .new-num {
            display: block;
          }
        }
      }
    }
    .store-maintaining {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: #ffffff;
      font-size: 0.36rem;
      span {
        margin: auto;
      }
    }
  }
}
</style>
