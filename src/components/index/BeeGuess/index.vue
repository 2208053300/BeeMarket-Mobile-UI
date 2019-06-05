<template>
  <div class="bee-guess">
    <template v-if="guessData.length">
      <div
        v-if="guessData[0].area"
        class="farm-title"
      >
        <span class="title-text">农副产品</span>
        <div class="show-more">
          更多
        </div>
      </div>
    </template>
    <div
      v-else
      class="guess-title"
    >
      <span>- 猜你喜欢 -</span>
    </div>
    <div class="guess-container">
      <div
        v-for="item in guessData"
        :key="item.id"
        class="guess-card"
      >
        <img
          :src="item.tUrl"
          :alt="item.pname"
          class="preview-img"
        >
        <div class="guess-details">
          <div class="product-name">
            {{ item.pname }}
          </div>
          <div class="product-tag">
            <div
              v-if="item.area"
              class="area-tag"
            >
              商品来自：{{ item.area }}
            </div>

            <template v-if="item.area">
              <div
                class="bee-tag"
                :class="{hotTag:item.tags[0]==='热销'}"
              >
                {{ item.tags[0] }}
              </div>
            </template>
            <template v-else>
              <div
                v-for="item2 in item.tags"
                :key="item2"
                class="bee-tag"
                :class="{hotTag:item2==='热销'}"
              >
                {{ item2 }}
              </div>
            </template>
          </div>
          <div class="product-currentPrice">
            <span style="font-size:0.24rem">￥</span><span>{{ item.price }}</span>
          </div>
          <div class="product-originalPrice">
            ￥{{ item.line_price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    guessData: {
      type: Array,
      default: () => {
        return [{}]
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

<style scoped lang="less">
.bee-guess {
  margin-top: 0.2rem;
  padding: 0 0.3rem 0.3rem;
  background-color: #ffffff;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .farm-title {
    padding: 0.4rem 0;
    display: flex;
    justify-content: space-between;
    .title-text {
      font-size: 0.3rem;
    }
    .show-more {
      font-size: 0.22rem;
      color: @Grey1;
    }
  }
  .guess-title {
    text-align: center;
    padding: 0.4rem 0;
    font-size: 0.28rem;
  }
  .guess-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.14rem;
    grid-row-gap: 0.2rem;
    .guess-card {
      width: 100%;
      border: 1px solid rgb(229, 229, 229);
      border-radius: 0.1rem;
      overflow: hidden;
      .preview-img {
        width: 100%;
        height: 3.3rem;
      }
      .guess-details {
        height: 0.8;
        margin: 0.2rem;
        position: relative;
        .product-tag {
          height: 0.6rem;
          display: flex;
          align-items: flex-end;
          .area-tag {
            height: 0.3rem;
            width: 2.2rem;
            line-height: 0.3rem;
            box-sizing: border-box;
            font-size: 0.2rem;
            text-align: center;
            color: @Red1;
            border: 0.02rem solid @Red1;
            margin-right: 0.12rem;
          }
          .bee-tag {
            display: inline-block;
            font-size: 0.2rem;
            color: @BeeDefault;
            border: 0.02rem solid @BeeDefault;
            border-radius: 0.2rem;
            box-sizing: border-box;
            height: 0.3rem;
            line-height: 0.3rem;
            width: 0.6rem;
            text-align: center;
            &:not(:last-child) {
              margin-right: 0.12rem;
            }
          }
          .hotTag {
            border-color: #ffffff;
            color: #ffffff;
            background: linear-gradient(to right, @BeeDefault, #ff7116);
          }
        }

        .product-name {
          max-width: 3rem;
          font-size: 0.26rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .product-currentPrice {
          color: @BeeDefault;
          font-size: 0.34rem;
          margin: 0.05rem 0;
        }
        .product-originalPrice {
          font-size: 0.18rem;
          color: @Grey1;
          position: absolute;
          right: 0;
          bottom: 0;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
