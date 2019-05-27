<template>
  <div class="farm-card">
    <div class="farm-img">
      <img
        src=""
        alt=""
      >
      <div class="farm-detail">
        <span class="place">淮安</span>
        <span class="name">中瀚农场</span>
        <span class="subhead">副标题哦哦哦哦</span>
      </div>
      <div class="bottom-tri">
        <div class="tri" />
      </div>
    </div>
    <div class="product-list">
      <div
        v-for="product in homeDate.farmData"
        :key="product.name"
        class="product-detail"
      >
        <div class="product-img">
          <img
            :src="product.previewImg"
            alt=""
          >
        </div>
        <div class="product-text">
          <div class="product-name">
            {{ product.name }}
          </div>
          <div class="product-price1">
            ￥{{ product.currentPrice }}
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
    homeDate: {
      type: Object,
      default: () => {
        return {}
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
.farm-card {
  .farm-img {
    position: relative;
    background-color: @Grey1;
    margin: 0.4rem 0.16rem 0.2rem;
    height: 3.2rem;
    border-radius: 0.08rem;
    .farm-detail {
      height: 2.4rem;
      width: 3.08rem;
      position: absolute;
      right: 0.32rem;
      top: 0.4rem;
      background-color: @Grey2;
      border-radius: 0.1rem;
      box-sizing: border-box;
      padding: 0.4rem 0.32rem;
      color: #ffffff;
      .place {
        font-size: 0.34rem;
        font-weight: bold;
      }
      .name {
        font-size: 0.34rem;
        font-weight: bold;
        display: block;
        padding: 0.08rem 0 0.16rem;
      }
    }
    .bottom-tri {
      position: absolute;
      bottom: 0;
      width: 100%;
      .tri {
        width: 0;
        height: 0;
        border-width: 0 15px 15px;
        border-style: solid;
        border-color: transparent transparent #ffffff;
        margin: auto;
      }
    }
  }
  .product-list {
    display: flex;
    overflow-y: scroll;
    .product-detail {
      display: inline-block;
      margin-left: 0.16rem;
      background-color: #fff;
      border-radius: 0.08rem;
      .product-img {
        border-radius: 0.08rem 0.08rem 0 0;
        overflow: hidden;
        height: 2.1rem;
        width: 2.1rem;
      }
      .product-text{
        padding: 0.12rem 0.12rem 0.2rem;
        .product-name{
          width: 1.85rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 0.24rem;
        }
        .product-price1{
          font-size: 0.26rem;
          color: @BeeDefault;
          margin-top: 0.12rem;
        }
      }
    }
  }
}
</style>
