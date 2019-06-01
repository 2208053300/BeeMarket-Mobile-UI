<template>
  <div class="bee-farm">
    <div class="farm-title">
      <van-tabs
        v-model="active"
        background="transparent"
        :color="BeeDefault"
        :line-width="30"
        @change="changeList"
      >
        <van-tab
          v-for="item in farmCategory"
          :key="item.cid"
          :title="item.cname"
        />
      </van-tabs>
      <van-icon
        name="arrow-down"
        class="show-filter"
      />
    </div>
    <farm-list ref="farmList" />
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import farmList from './components/farmList'
import { getSecondCategory } from '@/api/BeeApi/product'

export default {
  metaInfo: {
    title: '农副产品'
  },
  components: {
    farmList
  },
  props: {},
  data() {
    return {
      BeeDefault,
      actionList: [],
      active: 0,
      farmCategory: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getSecondCategoryData()
  },
  methods: {
    async getSecondCategoryData() {
      const res = await getSecondCategory({ cid: 1, t: 'produce' })
      this.farmCategory = res.data.cats
      this.cid = this.farmCategory[0].cid
    },
    changeList(index) {
      const cid = this.farmCategory[index].cid
      this.$refs.farmList.formData.cid = cid
      this.$refs.farmList.getProductListData()
    }
  }
}
</script>

<style lang="less">
.bee-farm {
  .farm-title {
    display: flex;
    .van-tabs {
      flex: 1;
    }
    .show-filter {
      height: 100%;
      padding: 0 0.2rem;
      line-height: 45px;
    }
  }
  .van-hairline--top-bottom::after {
    border: none;
  }
}
</style>
