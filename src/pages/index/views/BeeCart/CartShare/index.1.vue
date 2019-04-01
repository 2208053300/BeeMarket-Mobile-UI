<template>
  <div>
    <van-nav-bar title="购物车">
      <div
        slot="right"
        class="nav-right"
      >
        <!-- <van-icon
          name="edit"
          size="20px"
          style="margin-right:21px; float:left"
        /> -->
      </div>
    </van-nav-bar>
    <div class="wrapper bg-gray">
      <ul class="shop-list margin-b-20">
        <li v-for="(store, index) in cart.cartInfo" :key="index" class="shop-box bg-white margin-b-20">
          <van-row gutter="20">
            <van-col span="24" class="flex align-center margin-b-20">
              <van-checkbox v-model="allSelectedBox[index]" @click="allSelected(index,store.product,allSelectedBox[index])" />
              <span> {{ store.storeName }} </span>
            </van-col>
            <van-checkbox-group v-model="cart.cartSelected">
              <van-col v-for="item in store.product" :key="item.id" span="8" class="margin-b-20">
                <div class="goods-item bg-gray">
                  <img :src="item.previewImg" class="goods-img">
                  <van-checkbox class="checkbox" @click="changeAll(index,store.product,allSelectedBox[index])" />
                </div>
              </van-col>
            </van-checkbox-group>
          </van-row>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { getShareCartList } from '@/api/cart'
export default {
  components: {},
  props: {},
  data() {
    return {
      checked: '',
      shareCartList: [],
      allSelectedBox: []
    }
  },
  computed: {
    ...mapState(['cart'])
  },
  watch: {},
  created() {},
  mounted() {
    // this.getList()
    console.log('cartInfo22', this.cart.cartInfo)
    for (let index = 0; index < this.cart.cartInfo.length; index++) {
      this.$set(this.allSelectedBox, index, false)
    }
  },
  methods: {
    // 获取购物车分享列表
    // getList() {
    //   getShareCartList()
    //     .then(res => {
    //       this.shareCartList = res.data.shareCartList
    //     })
    // },

    // NOTE 全选
    allSelected(index, val, isAll) {
      const addVal = val.filter(item => {
        return this.cart.cartSelected.indexOf(item) === -1
      })
      if (isAll) {
        this.cart.cartSelected.push(...addVal)
      } else if (addVal.length === 0) {
        // NOTE 如果已经全选
        val.map(item1 => {
          this.cart.cartSelected.map((item2, index) => {
            if (item2 === item1) {
              this.cart.cartSelected.splice(index, 1)
            }
          })
        })
      }
    },

    // FIXME 有点小问题，选中子类全选可能出错
    changeAll(index, val, isAll) {
      if (isAll) {
        this.allSelectedBox[index] = false
        return
      }
      const addVal = val.filter(item => {
        return this.cart.cartSelected.indexOf(item) === -1
      })
      if (addVal.length === 0) {
        this.allSelectedBox[index] = true
      }
    }

  }
}
</script>

<style scoped lang="less">
.wrapper{padding: 0.2rem}
.goods-item{
  position: relative;
  .checkbox{
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
  }
}
.shop-box{
  padding: 0.2rem 0.2rem 0.1rem 0.2rem;
  border-radius: 0.1rem;
}
.goods-img{width: 2rem; height: 2rem}
</style>
