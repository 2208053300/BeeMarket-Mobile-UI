<template>
  <div class="bee-category">
    <van-nav-bar fixed>
      <van-search
        slot="title"
        v-model="searchKey"
        :input-align="searchAlign"
        :show-action="searchStatus"
        :class="{searchIcon:searchStatus&&searchKey===''}"
        shape="round"
        placeholder="蜂集市，让生活丰富起来"
        @focus="changeLeft"
        @blur="changeCenter"
      >
        <van-icon
          slot="left-icon"
          :name="beeIcon.nav_icon_search"
          :color="Grey1"
        />
        <van-button
          slot="action"
          type="default"
          class="cancel-search"
        >
          取消
        </van-button>
      </van-search>
    </van-nav-bar>
    <div class="category-container">
      <search-keyword v-show="searchStatus&&searchKey===''" />
      <category-list v-show="!searchStatus&&searchKey===''" />
      <search-guess
        v-if="searchKey!==''"
        ref="searchGuess"
        :search-key="searchKey"
      />
    </div>
  </div>
</template>

<script>
import { Grey1 } from '@/styles/index/variables.less'
import searchKeyword from './components/searchKeyword'
import categoryList from './components/categoryList'
import searchGuess from './components/searchGuess'
export default {
  components: {
    searchKeyword,
    categoryList,
    searchGuess
  },
  props: {},
  data() {
    return {
      Grey1,
      searchAlign: 'center',
      searchStatus: false,
      searchKey: '',
      beeIcon: {
        nav_icon_search: require('@/assets/icon/category/nav_icon_search@2x.png')
      }
    }
  },
  computed: {},
  watch: {
    searchKey: {
      handler(val) {
        this.getGuess()
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // NOTE 当点击搜索栏时，更改样式
    changeLeft() {
      this.searchStatus = true
      this.searchAlign = 'left'
    },
    changeCenter() {
      this.searchStatus = false
      this.searchAlign = 'center'
    },
    getGuess() {}
  }
}
</script>

<style  lang="less">
.bee-category {
  height: 100%;
  .van-nav-bar__title {
    max-width: 6.24rem;
  }
  .van-search {
    padding: 0.08rem 0 0;
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
      padding: 0;
      margin: 0;
      height: 0.16rem;
    }
    .van-cell {
      align-items: center;
      // NOTE 图标使用了vant里的搜索框，所以只能相对定位
      .van-field__left-icon {
        position: relative;
        left: 1.2rem;
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
