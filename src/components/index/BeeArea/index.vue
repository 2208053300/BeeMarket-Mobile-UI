<template>
  <div class="area-select">
    <!-- 已选择 -->
    <div class="area-selected-names">
      <div
        v-for="(item, index) in selectedNames"
        :key="index"
        class="selected-name"
        :class="{ active: index === progressIndex }"
        @click="switchProgress(index)"
      >
        {{ item }}
      </div>
    </div>
    <div style="width: 100%;height: 0.01rem;background: grey" />
    <ul class="area-list">
      <li
        v-for="(item, index) in currentList"
        :key="index"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getArea } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: ''
  },
  components: {},
  props: {},
  data() {
    return {
      progressIndex: 1,
      selected: [
        {
          id: 1,
          name: '北京'
        }
      ], // 已选择的区域
      currentList: [], // 当前显示的区域列表
      selectListBucket: [], // 元素为已选择的列表
      provinceList: [],
      loading: false
    }
  },
  computed: {
    // 顶部的名字列表
    selectedNames() {
      const names = this.selected.map(item => item.name)
      if (this.progressIndex + 1 > this.selected.length) {
        names.push('请选择')
      }
      return names
    },
    // 列表中选中的索引
    listIndex() {
      return this.currentList.indexOf(this.selected[this.progressIndex])
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.loadProvince()
  },
  methods: {
    switchProgress(index) {
      if (index !== this.progressIndex) {
        this.progressIndex = index
        this.currentList = this.selectListBucket[index]
        this.selectListBucket.splice(index)
        this.selected.splice(index + 1)
      }
    },
    handleClose() {
      this.progressIndex = 0
      this.currentList = this.provinceList
      this.selected = []
      this.selectListBucket = []
    },
    async loadProvince() {
      const res = await getArea()
      this.provinceList = res.data
      this.currentList = res
    },
    async getSubArea(id) {
      this.selectListBucket.push(this.currentList)
      this.currentList = []
      this.loading = true
      try {
        const res = await getArea({ id })
        this.currentList = res.data
      } finally {
        this.loading = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.area-select {
  height: 50vh;
  .area-selected-names {
    display: flex;
    .selected-name {
      padding: 0.3rem 0.5rem;
    }
    .active {
      color: #ffa42f;
      border-bottom: #ffa42f 0.05rem solid;
    }
  }
}
</style>
