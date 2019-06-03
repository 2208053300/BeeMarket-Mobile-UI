<template>
  <div>
    <div class="item flex" @click="$router.push({path:'/category/details',query:{pid:item.pid}})">
      <div class="img">
        <img :src="item.tUrl">
      </div>
      <div class="info flex flex-column flex-between">
        <p class="name">
          {{ item.pname }}
        </p>
        <div class="tags-price">
          <div class="tags">
            <van-button v-if="item.is_hot" round size="mini">
              热销
            </van-button>
            <van-button v-for="(tag, index) in item.tags" :key="index" round size="mini">
              {{ tag }}
            </van-button>
          </div>
          <div class="price">
            <span class="now-price">￥<span>{{ item.sell_price }}</span></span>
            <span class="del-price">￥<span>{{ item.line_price }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
// .item{margin-bottom: 0.1rem;}
.img{
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.1rem;
  border: 1px solid #ddd;
  img{width:100%;height:100%;}
}
.info{
  padding: 0.2rem 0;
  margin-left: 0.2rem;
  flex: 1;
}
.name{
  font-size: 0.28rem;
  color: #666;
  margin: 0;
}
.tags{margin-bottom:0.2rem; }
.van-button{
  border-color:@BeeDefault;
  color: @BeeDefault;
  &:first-of-type{
    color: #fff;
    border: 0;
    // background: url(../../../../../../assets/category/list_pic_label.png) no-repeat;
    background-size: 100% 100%;
  }
}
.now-price{
  color: @BeeDefault;
  font-size: 0.24rem;
  span{font-size: 0.34rem;}
}
.del-price{
  margin-left:0.1rem;
  text-decoration:line-through;
  font-size: 0.2rem ;
  color: #999;
}
</style>
