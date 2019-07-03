<template>
  <div class="bee-category">
    <van-nav-bar fixed class="search-bar">
      <van-search
        slot="title"
        v-model="searchKey"
        :input-align="searchAlign"
        :show-action="searchStatus"
        :class="{ searchIcon: searchStatus && searchKey === '' }"
        shape="round"
        placeholder="蜂集市，让生活丰富起来"
        @focus="changeLeft"
        @blur="changeCenter"
        @search="getConfirmWold(searchKey)"
      >
        <van-icon
          slot="left-icon"
          :name="beeIcon.nav_icon_search"
          :color="Grey1"
        />
        <van-button
          v-if="!searchKey"
          slot="action"
          type="default"
          class="cancel-search"
          @click="cancelSearch"
        >
          取消
        </van-button>
        <van-button
          v-else
          slot="action"
          type="default"
          class="cancel-search"
          @click="getConfirmWold(searchKey)"
        >
          搜索
        </van-button>
      </van-search>
    </van-nav-bar>
    <div class="category-container">
      <!-- 搜索历史 为您推荐 -->
      <search-keyword
        v-show="searchStatus && searchKey === ''"
        :search-history="searchHistory"
      />
      <!-- 搜索建议 -->
      <search-guess
        v-show="isShowGuess && isShowGuess1 && searchKey !== ''"
        ref="searchGuess"
        :guess-data="guessData"
        @getConfirmWold="getConfirmWold"
      />
      <!-- 搜索的商品列表 -->
      <ProductsList
        v-show="isShowProductList"
        ref="ProductsList"
        class="bg-white"
      />
    </div>
  </div>
</template>

<script>
import { Grey1 } from '@/styles/index/variables.less'
import { searchSuggust } from '@/api/BeeApi/product'
import searchKeyword from './components/searchKeyword'
import searchGuess from './components/searchGuess'
import ProductsList from './components/ProductsList'
export default {
  components: {
    searchKeyword,
    searchGuess,
    ProductsList
  },
  props: {},
  data() {
    return {
      Grey1,
      searchAlign: 'center',
      searchStatus: true,

      beeIcon: {
        nav_icon_search: require('@/assets/icon/category/nav_icon_search@2x.png')
      },
      // 输入框搜索关键词
      searchKey: '',
      // 是否显示搜索建议
      isShowGuess: false,
      isShowGuess1: true,
      // 搜索建议数据
      guessData: [
        // {
        //   id: 1,
        //   name: '男装'
        // },
        // {
        //   id: 2,
        //   name: '女'
        // },
        // {
        //   id: 3,
        //   name: '童装'
        // }
      ],
      // 是否显示商品列表
      isShowProductList: false,
      timeout: null,
      // 搜索历史
      searchHistory: []
    }
  },
  computed: {},
  watch: {
    // searchKey: {
    //   handler(val) {
    //     this.getGuess()
    //   }
    // }
    searchKey(curVal, oldVal) {
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getGuess()
      }, 300)
    }
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    const searchHistory = localStorage.getItem('searchHistory')
    if (searchHistory) {
      this.searchHistory = searchHistory.split(',')
    }
    document.querySelector('.van-field__control').focus()
  },
  methods: {
    // NOTE 当点击搜索栏时，更改样式
    changeLeft() {
      // this.searchStatus = true
      // this.searchAlign = 'left'
      this.searchAlign = 'center'
    },
    changeCenter() {
      // this.searchStatus = false
      this.searchAlign = 'center'
    },
    async getGuess() {
      this.searchAlign = 'center'
      this.isShowGuess = true
      this.isShowGuess1 = true
      this.isShowProductList = false
      const res = await searchSuggust({ search: this.searchKey })
      this.guessData = res.data
      console.log('搜索建议：', res)
    },
    // 确认搜索关键词并以此搜索商品
    async getConfirmWold(val) {
      await this.changeKey(val)

      setTimeout(() => {
        if (this.searchHistory.indexOf(val) === -1) {
          this.searchHistory.unshift(val)
          if (this.searchHistory.length > 10) {
            this.searchHistory.splice(9, 1)
          }
          console.log('searchHistory:', this.searchHistory)

          localStorage.setItem('searchHistory', this.searchHistory)
        }
        this.isShowGuess = false

        this.isShowProductList = true
        this.$refs.ProductsList.condition.search = val
        this.$refs.ProductsList.goodsList = []
        this.$refs.ProductsList.getGoodsList()
      }, 400)
    },
    // 改变搜索关键词
    async changeKey(val) {
      this.searchKey = val
    },
    // 取消搜索，回到分类页面
    cancelSearch() {
      this.$router.go(-1)
      // this.$router.push({
      //   path: '/category'
      // })
    },
    // onInput
    onInput() {
      console.log(this.searchKey)
      this._debounce(() => {
        console.log(123456)
      }, 200)
    },

    // 防抖
    debounce(func, wait) {
      let timeout = ''
      return v => {
        console.log(333)

        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          func(v)
        }, wait)
      }
    }

  }
}
</script>

<style  lang="less">
.bee-category {
  height: 100%;
  .search-bar{top: 46px}
  .van-nav-bar__title {
    max-width: 6.24rem;
  }

  .van-search {
    padding: 0;
    .van-search__content--round {
      border: 0.02rem solid @Grey6;
      background-color: @Grey5;
    }
    ::-webkit-input-placeholder {
      color: @Grey1;
      font-size: 0.28rem;
    }
    .cancel-search {
      color: @Grey1;
      font-size: 0.28rem;
      border: none;
    }
    .van-cell {
      align-items: center;
      // NOTE 图标使用了vant里的搜索框，所以只能相对定位
      .van-field__left-icon {
        // position: relative;
        left: 0rem;
      }
    }
  }
  .searchIcon {
    .van-cell {
      .van-field__left-icon {
        left: 0;
      }
    }
  }
  .category-container {
    padding: 46px 0 50px;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
