<template>
  <div class="category-list">
    <van-badge-group
      class="select-category"
      :active-key="activeKey"
      @change="onChange"
    >
      <van-badge
        v-for="item in category1"
        :key="item.name"
        :title="item.name"
        @click="changeBorder"
      />
      <div
        class="border-img"
        :style="{top:borderPosition}"
      >
        <img
          :src="beeIcon.cat_pic_select"
          alt=""
        >
      </div>
    </van-badge-group>
    <div class="category2-container">
      <div class="advertisement">
        广告位
      </div>
      <div
        v-for="item in category2"
        :key="item.name"
        class="category2-card"
      >
        <div class="category2-title">
          {{ item.name }}
        </div>
        <div class="category3-container">
          <div
            v-for="item2 in item.category3"
            :key="item2.name"
            class="category3-card"
            @click="$router.push('/category/SecCategoryList')"
          >
            <div class="category3-img">
              <img
                :src="item2.img"
                alt=""
              >
            </div>
            <div class="category3-title">
              {{ item2.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory1, getCategory2 } from '@/api/category'
export default {
  components: {},
  props: {},
  data() {
    return {
      activeKey: 0,
      category1: [],
      category2: [],
      beeIcon: {
        cat_pic_select: require('@/assets/icon/category/cat_pic_select@2x.png')
      },
      borderPosition: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getCategory1()
    this.getCategory2()
  },
  methods: {
    onChange(key) {
      this.activeKey = key
    },
    // TODO 点击一级分类，更新二级分类
    async getCategory1() {
      const res = await getCategory1()
      this.category1 = res.data.categoryDate
    },
    async getCategory2() {
      const res = await getCategory2()
      this.category2 = res.data.categoryDate
    },
    // NOTE 定位border图片的位置
    changeBorder(index) {
      this.borderPosition = Number(index) * 58 + 14 + 'px'
    }
  }
}
</script>

<style scoped lang="less">
.category-list {
  height: 100%;
  display: flex;
  background-color: #fff;
  .select-category {
    width: 21%;
    min-width: 1.6rem;
    height: 100%;
    overflow-y: scroll;
    .van-badge {
      font-size: 0.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: @GreyBg;
      &::after {
      }
    }
    .van-badge--select {
      background-color: #ffffff;
      border-color: #ffffff;
    }
    .border-img {
      position: absolute;
      top: 14px;
      width: 5px;
      height: 30px;
    }
  }
  .category2-container {
    width: 79%;
    height: 100%;
    overflow-y: scroll;
    margin: 0 0.24rem;
    .advertisement {
      height: 1.7rem;
      width: 100%;
      background-color: #fff;
    }
    .category2-card {
      width: 100%;
      .category2-title {
        font-size: 0.24rem;
        color: @Grey2;
        padding: 0.2rem 0;
      }
      .category3-container {
        box-shadow: 0.01rem 0 0.05rem @Grey6;
        border-radius: 0.2rem;
        background-color: #fff;
        padding: 0.34rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 0.24rem;
        grid-row-gap: 0.3rem;
        .category3-card {
          display: inline-block;
          .category3-img {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 0.04rem;
            border: 0.02rem solid @Grey7;
          }
          .category3-title {
            max-width: 1.4rem;
            text-align: center;
            font-size: 0.22rem;
            color: @Grey2;
            margin-top: 0.18rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
