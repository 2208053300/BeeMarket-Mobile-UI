<template>
  <div class="bee-guess">
    <div class="guess-title">
      <span>- 猜你喜欢 -</span>
    </div>
    <div class="guess-container">
      <div
        v-for="item in guessData"
        :key="item.id"
        class="guess-card"
      >
        <img
          :src="item.previewImg"
          :alt="item.name"
          class="preview-img"
        >
        <div class="guess-details">
          <div class="product-name">
            {{ item.name }}
          </div>
          <div class="product-tag">
            <div
              v-for="item2 in item.tags"
              :key="item2"
              class="bee-tag"
              :class="{hotTag:item2==='热销'}"
            >
              {{ item2 }}
            </div>
          </div>
          <div class="product-currentPrice">
            <span style="font-size:0.24rem">￥</span><span>{{ item.currentPrice }}</span>
          </div>
          <div class="product-originalPrice">
            ￥{{ item.originalPrice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGuess } from '@/api/cart'

export default {
  components: {},
  props: {},
  data() {
    return {
      guessData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    getGuess()
      .then(res => {
        this.guessData = res.data.guessData
      })
      .catch(() => {})
  },
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
  .guess-title {
    text-align: center;
    padding: 0.4rem 0;
    font-size: 0.28rem;
  }
  .guess-container {
    display: grid;
    min-height: 10rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.14rem;
    grid-row-gap: 0.2rem;
    .guess-card {
      width: 100%;
      border: 1px solid rgb(229, 229, 229);
      border-radius: 0.1rem;
      overflow: hidden;
      .preview-img {
        width: 100%;
        height: 4rem;
      }
      .guess-details {
        height: 0.8;
        margin: 0.2rem;
        position: relative;
        .product-tag {
          height: 0.6rem;
          display: flex;
          align-items: flex-end;
          .bee-tag {
            display: inline-block;
            font-size: 0.2rem;
            color: @BeeDefault;
            border: 0.02rem solid @BeeDefault;
            border-radius: 0.2rem;
            padding: 0.05rem 0.1rem;
            &:not(:last-child) {
              margin-right: 0.12rem;
            }
          }
          .hotTag{
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
