<template>
  <div class="category-list">
    <van-sidebar
      ref="badgeList"
      class="select-category"
      :active-key="activeKey"
      @change="onChange"
    >
      <van-sidebar-item
        v-for="(item,index) in category1"
        :key="item.cid"
        :title="item.cname"
        @click="getCategory2Data(item.cid,index)"
      />
      <div
        class="border-img"
        :style="{top:borderPosition}"
      >
        <img :src="beeIcon.cat_pic_select">
      </div>
    </van-sidebar>
    <div
      v-if="category2.groups"
      class="category2-container"
    >
      <template v-if="category2.top">
        <div
          v-if="category2.top.top_ad_image"
          class="advertisement"
        >
          <div class="top-img">
            <img
              :src="category2.top.top_ad_image"
              alt="广告图"
              :onerror="$store.state.app.defaultImg"
            >
          </div>
        </div>
      </template>
      <template v-if="checkGroup(category2.groups)">
        <div
          v-for="(item,index) in category2.groups"
          :key="index"
          class="category2-card"
        >
          <div class="category2-title">
            {{ item.group_name }}
          </div>
          <div class="category3-container">
            <div
              v-for="item2 in item"
              :key="item2.cid"
              class="category3-card"
              @click="$router.push({path:'/category/SecCategoryList',query:{cid:item2.cid}})"
            >
              <div class="category3-img">
                <img
                  :src="item2.cat_image ||$store.state.app.defaultImg2"
                  :onerror="$store.state.app.defaultImg"
                >
              </div>
              <div class="category3-title">
                {{ item2.cname }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="category2-card2">
          <div
            v-for="(item,index) in category2.groups"
            :key="index"
            class="category3-card"
            @click="goList(item)"
          >
            <div class="category3-img">
              <img :src="item.cat_image ||$store.state.app.defaultImg2">
              <!-- <img v-lazy="item.cat_image"> -->
            </div>
            <div class="category3-title">
              {{ item.cname }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getCategory1, getCategory2 } from '@/api/BeeApi/product'
export default {
  components: {},
  props: {},
  data() {
    return {
      activeKey: 0,
      category1: [],
      category2: {
        top: {}
      },
      beeIcon: {
        cat_pic_select: require('@/assets/icon/category/cat_pic_select@2x.png')
      },
      borderPosition: '',
      // 当前选中的一级分类 id
      nowFirCategoryId: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getCategory1Data()
  },
  methods: {
    onChange(key) {
      this.activeKey = key
    },
    // TODO 点击一级分类，更新二级分类
    async getCategory1Data() {
      const res = await getCategory1()
      this.category1 = res.data
      this.getCategory2Data(this.category1[0].cid)
    },
    async getCategory2Data(cid, index) {
      this.nowFirCategoryId = cid
      // NOTE 定位border图片的位置
      this.changeBorder(index)
      const res = await getCategory2({ cid: cid })
      this.category2 = res.data
    },
    changeBorder(index) {
      try {
        const badge = document.querySelector('.van-sidebar-item')
        // 无关痛痒的报错
        this.borderPosition = Number(index) * badge.offsetHeight + 14 + 'px'
      } catch (error) {
        // 第一次加载，正常
      }
    },
    // FIXME 避免报错数组不渲染
    checkGroup(groups) {
      if (groups.length !== 0) {
        return 'gid' in groups[0]
      }
    },
    goList(item) {
      if ('produce' in item) {
        this.$router.push({
          path: '/category/SecCategoryList',
          query: { cid: item.cid, target: 'produce' }
        })
      } else {
        this.$router.push({
          path: '/category/SecCategoryList',
          query: { cid: item.cid }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.category-list {
  height: 100%;
  display: flex;
  background-color: #fff;
  .top-img {
    width: 100%;
    height: 1.7rem;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
    overflow: hidden;
  }
  .select-category {
    width: 21%;
    min-width: 1.6rem;
    height: 100%;
    overflow-y: scroll;
    .van-sidebar-item {
      font-size: 0.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: @GreyBg;
    }
    .van-sidebar-item--select {
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
            border-radius: 0.08rem;
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
    .category2-card2 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.18rem;
      margin-top: 0.24rem;
      .category3-card {
        .category3-img {
          height: 1.68rem;
          width: 1.68rem;
          overflow: hidden;
          border-radius: 0.04rem;
          border: 0.02rem solid @Grey7;
          box-sizing: border-box;
          // box-shadow: 0 0 0.1rem 0.04rem @Grey7;
        }
        .category3-title {
          max-width: 1.68rem;
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
</style>
