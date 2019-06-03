<template>
  <div class="area-select">
    <!-- 已选择 -->
    <van-row class="area-selected-names" type="flex">
      <van-col
        v-for="(item, index) in selectedNames"
        :key="index"
        span="6"
      >
        <div
          class="selected-name"
          :class="{ active: index === progressIndex }"
          @click="switchProgress(index)"
        >
          {{ item }}
        </div>
      </van-col>
    </van-row>
    <div style="width: 100%;height: 0.01rem;background: #ebebeb" />
    <ul class="area-list">
      <li
        v-for="(item, index) in currentList"
        :key="index"
        class="area-item"
        :class="{ active: listIndex === index }"
        @click="listClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div v-show="loading" class="loading">
      <van-loading />
    </div>
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
      progressIndex: 0,
      selected: [], // 已选择的区域
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
      if (this.progressIndex === this.selected.length - 1) {
        return this.currentList.indexOf(this.selected[this.progressIndex])
      } else {
        return -1
      }
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
      this.currentList = this.provinceList
    },
    async getSubArea(id) {
      const temp = this.currentList
      this.currentList = []
      this.loading = true
      try {
        const res = await getArea({ id })
        if (res.data.length === 0) {
          // 已无下一级
          return false
        }
        this.selectListBucket.push(temp)
        this.currentList = res.data
      } finally {
        this.loading = false
      }
      return true
    },
    async listClick(item) {
      const hasSub = await this.getSubArea(item.id)
      if (this.selected[this.progressIndex]) {
        this.selected.splice(this.progressIndex, 1, item)
      } else {
        this.selected.push(item)
      }
      if (hasSub) {
        this.progressIndex += 1
      } else {
        this.$emit('select-end', this.selected)
      }
    }
  }
}
</script>

<style scoped lang="less">
.area-select {
  height: 50vh;
  display: flex;
  flex-direction: column;
  .area-selected-names {
    .selected-name {
      text-align: center;
      padding: 0.3rem 0.3rem;
      font-size: 0.3rem;
    }
    .active {
      color: #ffa42f;
      border-bottom: #ffa42f 0.03rem solid;
    }
  }
  .area-list {
    overflow: hidden;
    overflow-y: scroll;
    .area-item {
      padding: 0.2rem 0.5rem;
      font-size: 0.3rem;
    }
    .active {
      color: #ffa42f;
    }
  }
  .loading {
    display: flex;
    justify-content: center;
    padding: 0.5rem
  }
}
</style>
