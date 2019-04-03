<template>
  <div class="collected-classify">
    <van-collapse
      v-model="activeNames"
      @change="changeColl"
    >
      <van-collapse-item name="1">
        <div
          slot="title"
        >
          全部类目
          <van-icon name="arrow-down" />
        </div>
        <div slot="right-icon" />
        <div class="classify-container">
          <div
            v-for="item in classify"
            :key="item.name"
            class="classify"
            :class="{activeClassify:activeClassify===item.name}"
          >
            <span class="name">{{ item.name }}</span>
            <span class="num">{{ item.num }}</span>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div
      v-if="showMasking"
      class="masking"
      @touchmove.prevent
      @click="closeClassify"
    />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    productList: {
      type: Array,
      default: () => {
        return
      }
    },
    activeClassify: {
      type: String,
      default: '全部类目'
    }
  },
  data() {
    return {
      activeNames: ['0'],
      showMasking: false
    }
  },
  computed: {
    classify() {
      return [
        {
          name: '全部类目',
          num: 10
        }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeColl(index) {
      console.log(index)
      if (index.indexOf('1') === -1) {
        this.showMasking = false
      } else {
        this.showMasking = true
      }
    },
    closeClassify() {
      this.activeNames = ['0']
      this.showMasking = false
    }
  }
}
</script>

<style lang="less">
@import "../../../../styles/variables.less";

.collected-classify {
  position: absolute;
  width: 100%;
  z-index: 100;
  .van-cell {
    height: 0.66rem;
    line-height: 0.66rem;
    padding: 0 0.3rem;
    &::after {
      content: none;
    }
    .van-cell__title {
      font-size: 0.26rem;
    }
  }
  .van-collapse-item__content {
    padding: 0 0.3rem 1rem;
    border-bottom-right-radius: 0.24rem;
    border-bottom-left-radius: 0.24rem;

    .classify-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.3rem;
      .classify {
        width: auto;
        height: 0.8rem;
        line-height: 0.8rem;
        margin-top: 0.3rem;
        background-color: @ProductBg;
        border-radius: 0.1rem;
        padding: 0 0.3rem;
        font-size: 0.24rem;
        color: @Grey2;
        .num {
          float: right;
        }
      }
      .activeClassify {
        color: @BeeDefault;
      }
    }
  }
}
.masking {
  width: 100%;
  height: 1000px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
}
</style>
