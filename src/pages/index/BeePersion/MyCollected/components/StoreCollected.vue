<template>
  <div class="store-list">
    <div style="background: #fafafa;padding:0.2rem 0.3rem;text-align: right">
      <span @click="editProduct">{{ editStatus ? '完成' : '编辑' }}</span>
    </div>
    <div class="store-container">
      <van-checkbox-group v-model="editData">
        <van-pull-refresh v-model="loading" @refresh="$emit('change')">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="$emit('load')"
        >
          <div
            v-for="store in storeList"
            :key="store.store_id"
            class="bee-store"
            :class="{storeEdit:editStatus}"
          >
            <div
              slot="left"
              class="left-checkbox"
            >
              <van-checkbox
                :name="store"
                :checked-color="BeeDefault"
              />
            </div>
            <div>
              <van-cell style="border-radius: 0.2rem">
                <div
                  slot="title"
                  class="left-title"
                >
                  <div class="store-img">
                    <img
                      :src="store.store_logo"
                      alt="store.storeName"
                    >
                  </div>
                  <span>{{ store.store_name }}</span>
                </div>
                <div class="news">
                  <span class="new-num">{{ store.new_upper }}</span>
                  <span>上新</span>
                </div>
              </van-cell>
              <div
                v-if="!store.is_upper"
                class="store-maintaining"
              >
                <span>商家维护中</span>
              </div>
            </div>
          </div>
        </van-list>
        </van-pull-refresh>
      </van-checkbox-group>
    </div>
    <div
      class="bee-edit-bar"
      :class="{'show-bar': editStatus}"
    >
      <van-checkbox
        v-model="allSelectedBox"
        :checked-color="BeeDefault"
        style="margin-left: 0.3rem;"
        @click="allSelected"
      >
        全选
      </van-checkbox>
      <div class="right-button">
        <van-button
          class="btn-cancel"
          @click="cancelCollected"
        >
          取消收藏
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import { cancelCollect } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {
    storeList: {
      type: Array,
      default: () => {
        return
      }
    },
    finished: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      BeeDefault,
      editData: [],
      editStatus: false,
      allSelectedBox: false,
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    allSelected() {
      if (this.allSelectedBox) {
        this.editData = []
      } else {
        this.editData = this.storeList
      }
    },
    editProduct() {
      this.editStatus = !this.editStatus
    },
    async cancelCollected() {
      const ids = this.editData.map(data => {
        return data.store_id
      })
      if (ids.length === 0) {
        this.$toast.fail('请至少选择一个店铺')
        return
      }
      const res = await cancelCollect({
        content_ids: JSON.stringify(ids),
        type: 2
      })
      if (res.code) {
        this.$emit('change')
      }
    }
  }
}
</script>

<style lang="less">
.store-list {
  overflow: hidden;
  .store-container {
    .storeEdit {
      transform: translateX(0.8rem);
    }
    .bee-store {
      transition: all 200ms linear;
      margin: 0.2rem 0.15rem;
      background-color: #fff;
      border-radius: 0.2rem;
      position: relative;
      .left-checkbox {
        position: absolute;
        left: -0.7rem;
        top: 45%;
      }
      .van-cell {
        padding: 0.3rem 0 0.3rem 0.15rem;
        .van-cell__title {
          display: flex;
          align-items: center;
          .left-title {
            width: 5rem;
            font-size: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .store-img {
              display: inline-block;
              border-radius: 50%;
              width: 1rem;
              height: 1rem;
              overflow: hidden;
              vertical-align: middle;
              margin-right: 0.3rem;
            }
          }
        }
        .van-cell__value {
          flex: 0.2;
          .news {
            font-size: 0.26rem;
            color: @BeeDefault;
            text-align: center;
            .new-num {
              display: block;
            }
          }
        }
      }
      .store-maintaining {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        color: #ffffff;
        font-size: 0.36rem;
        span {
          margin: auto;
        }
      }
    }
  }
  .bee-edit-bar {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: -1rem;
    z-index: 100;
    display: flex;
    align-items: center;
    transition: all 200ms linear;
    .van-checkbox {
      flex: 1;
      .van-checkbox__label {
        font-size: 0.28rem;
        color: @Grey2;
      }
    }
    .right-button {
      display: inline-block;
      justify-self: flex-end;
      height: 100%;
      .btn-cancel {
        height: 100%;
        width: 2.34rem;
        color: #ffffff;
        border-color: @BeeDefault;
        background-color: @BeeDefault;
        font-size: 0.3rem;
      }
    }
  }
  .show-bar {
    transform: translateY(-1rem);
  }
}
</style>
