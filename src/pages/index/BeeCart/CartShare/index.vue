<template>
  <div>
    <!-- <van-nav-bar title="购物车" fixed>
      <div slot="left" class="nav-right">
        <van-icon
          name="arrow-left"
          size="20px"
          @click="back"
        />
      </div>
    </van-nav-bar> -->

    <BeeHeader />

    <div class="wrapper bg-gray cart-share">
      <ul class="shop-list margin-b-20">
        <li
          v-for="(store, index) in cart.cartInfo"
          :key="index"
          class="shop-box bg-white margin-b-20"
        >
          <div class="flex align-center margin-b-20">
            <van-checkbox
              v-model="allSelectedBox[index]"
              :checked-color="BeeDefault"
              @click="allSelected(index, store.product, allSelectedBox[index])"
            />
            <van-icon name="shop-o" class="shop-icon" />
            <span> {{ store.storeName }} </span>
          </div>
          <van-checkbox-group v-model="cart.cartSelected">
            <van-checkbox
              v-for="item in store.product"
              :key="item.id"
              :name="item"
              :checked-color="BeeDefault"
              class="checkbox"
              @click="changeAll(index, store.product, allSelectedBox[index])"
            >
              <img :src="item.previewImg" class="goods-img">
            </van-checkbox>
          </van-checkbox-group>
        </li>
      </ul>
    </div>
    <van-submit-bar
      v-if="cart.cartSelected.length!==0"
      button-text="分享"
    >
      <van-checkbox
        v-model="allSelec"
        :checked-color="BeeDefault"
        style="margin-left: 0.3rem;"
        @click="allSelected1"
      >
        全选
      </van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { mapState } from 'vuex'
import BeeHeader from '@/components/BeeHeader'
// import { getShareCartList } from '@/api/cart'
export default {
  components: {
    BeeHeader
  },
  props: {},
  data() {
    return {
      BeeDefault,
      shareCartList: [],
      allSelectedBox: [],
      allSelectedData: [],
      allSelec: false,
      beeFooter: {
        show: false,
        avtive: 3
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapState(['app'])

  },
  watch: {},
  created() {},
  mounted() {
    // this.getList()
    this.hideNavBar()

    for (let index = 0; index < this.cart.cartInfo.length; index++) {
      this.$set(this.allSelectedBox, index, false)
    }
  },
  methods: {
    // 隐藏底部导航栏
    hideNavBar() {
      this.$store.state.app.beeFooter.show = false
    },
    // 返回并显示底部导航
    back() {
      this.$store.state.app.beeFooter.show = true
      this.$router.go(-1)
    },

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
    // // NOTE 全选
    allSelected1() {
      if (this.allSelec) {
        this.cart.cartSelected = this.allSelectedData
      } else {
        this.cart.cartSelected = []
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
    },

    showDetails(id) {
      console.log(id)
    }
  },
  metaInfo: {
    title: '购物车'
  }
}
</script>

<style lang="less">
.wrapper {
  padding: 0 0.2rem;
  margin-top: 56px;
}
.shop-box {
  padding: 0.2rem 0.2rem 0.1rem 0.2rem;
  border-radius: 0.1rem;
}

.checkbox {
  position: relative;
  margin-bottom: 0.2rem;
  .van-checkbox__icon {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
.cart-share {
  .van-checkbox-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .goods-img {
    width: 2rem;
    height: 2rem;
    display: block;
    border-radius: 0.1rem;
  }
  .shop-icon {
    margin-right: 0.1rem;
    margin-left: 0.2rem;
  }
  .van-button--danger {
    background: @BeeDefault;
    border-color: @BeeDefault
  }
}
</style>
