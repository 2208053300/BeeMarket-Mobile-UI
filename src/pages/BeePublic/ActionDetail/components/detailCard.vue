<template>
  <div class="detail-card">
    <van-tabs
      v-model="detailActive"
      :color="BeeDefault"
      :title-active-color="BeeDefault"
      :swipeable="true"
      :line-width="70"
      background="transparent"
    >
      <van-tab title="项目简介">
        <div class="card-content">
          <!-- <div class="card-title">
            项目简介
          </div> -->
          <!--eslint-disable-->
          <div
            class="card-content2 cardDesc"
            :class="{cardDesc2:showAll}"
            v-html="actionData.project_desc"
          />
          <div
            v-if="!showAll"
            class="show-all"
            @click="showAll=true"
          >
            更多详情
            <van-icon name="arrow-down" />
          </div>
        </div>
      </van-tab>
      <van-tab title="项目进度">
        <div class="card-content">
          <!-- <div class="card-title">
            项目进度
          </div> -->
          <div class="card-content2">
            <div
              v-if="actionData.schedule_status===4"
              class="show-detail text-right"
              @click="goDetail(actionData.finish_link)"
            >
              查看详情 》
            </div>
            <div
              v-for="(item,index) in actionData.project_progress"
              :key="index"
              class="time-content"
            >
              <div class="time">
                <div class="torus" />
                {{ item.created_at }}
              </div>
              <div class="title-content2">
                <div class="time-title">
                  {{ item.schedule_main_title }}
                </div>
                <div class="time-subhead">
                  {{ item.schedule_subtitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {
    actionData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      BeeDefault,
      detailActive: 0,
      showAll: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goDetail(url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="less">
.detail-card {
  margin-top: 0.2rem;
  .van-tabs {
    .van-hairline--top-bottom::after {
      border: none;
    }
    .van-tab {
      font-size: 0.32rem;
      color: @ProductName;
    }
  }
  .card-content {
    background-color: #fff;
    box-shadow: 0 0 0.2rem @Grey6;
    padding: 0.4rem;
    border-radius: 0.08rem;
    position: relative;
    .show-detail {
      position: absolute;
      top: 0.5rem;
      right: 0.3rem;
      font-size: 0.26rem;
      color: @BeeDefault;
    }
    .card-title {
      font-size: 0.3rem;
      font-weight: bold;
    }
    .card-content2 {
       .time-content {
        font-size: 0.22rem;
        color: @Grey2;
        &:not(:last-child) .title-content2 {
          border-left: 0.02rem solid @Grey4;
        }
        .torus {
          border-radius: 50%;
          height: 0.2rem;
          width: 0.2rem;
          box-sizing: border-box;
          border: 0.06rem solid @BeeDefault;
          display: inline-block;
          margin-right: 0.16rem;
        }
        .title-content2 {
          padding: 0.2rem 0 0.4rem 0.3rem;
          margin-left: 0.09rem;
          // border-left: 0.02rem solid @Grey4;

          .time-title {
            font-size: 0.3rem;
          }
          .time-subhead {
            font-size: 0.24rem;
            margin-top: 0.16rem;
          }
        }
      }
    }
    .cardDesc {
      font-size: 0.26rem;
      color: @Grey2;
      height: 4rem;
      overflow: hidden;
    }
    .cardDesc2 {
      height: auto;
      overflow: auto;
    }
    .show-all {
      color: #ffa530;
      font-size: 0.26rem;
      width: 6.2rem;
      text-align: center;
      position: absolute;
      bottom: 0.36rem;
      // background: linear-gradient(transparent, #ffffff);
      background-color: #fff;
      height: 0.72rem;
      line-height: 0.72rem;
      .van-icon {
        vertical-align: middle;
      }
    }
  }
    .show-detail {
    font-size: 0.26rem;
    color: @BeeDefault;
  }
}
</style>
