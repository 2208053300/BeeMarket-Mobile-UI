<template>
  <div class="apply-after">
    <div class="after-content">
      <div class="commodity-card">
        <div class="commodity-detail">
          <div class="commodity-img">
            <img
              :src="commodity.previewImg"
              alt=""
            >
          </div>
          <div class="commodity-info">
            <div class="name-unit">
              <div class="name">
                {{ commodity.name }}
              </div>
              <div class="price-num">
                ￥{{ commodity.price }}
              </div>
            </div>
            <div class="sku-price">
              <div class="sku-text">
                {{ commodity.sku }}
              </div>
              <div class="num">
                x{{ commodity.num }}
              </div>
            </div>
            <div class="apply-num">
              申请数量：{{ selectNum }}
            </div>
          </div>
        </div>
        <div class="footer-info">
          <div class="select-num">
            <span>退款金额</span>
          </div>
          <span class="price">￥{{ commodity.price*selectNum }}</span>
        </div>
      </div>
      <div class="after-detail">
        <div class="apply-reason">
          <van-cell
            icon="shop-o"
            is-link
            @click="showReason=true"
          >
            <template slot="title">
              <span>申请原因（必填）</span>
            </template>
            <div class="type-value">
              <span
                v-if="reasonText"
                class="reason-text"
              >{{ reasonText }}</span>
              <span v-else>请选择</span>
            </div>
          </van-cell>
        </div>
        <div class="question-desc">
          <div class="desc-title">
            问题描述（必填）
          </div>
          <van-field
            v-model="questionDesc"
            type="textarea"
            placeholder="请详细描述商品问题，以便增加申请通过率"
            rows="1"
            autosize
            maxlength="500"
            :border="borderNone"
          />
          <div class="max-len">
            <span class="bee-text">{{ questionDesc.length }}</span>/500
          </div>
        </div>
        <div class="upload-evidence">
          <div class="upload-title">
            上传凭证（必填，最多上传6张）
          </div>
          <div class="comment-imgs">
            <div
              v-for="(img,index) in commentImgs"
              :key="img.file.lastModified"
              class="comment-img"
            >
              <img
                :src="img.content"
                :alt="img.file.name"
              >
              <div
                class="del-img"
                @click="delImg(index)"
              >
                <van-icon name="clear" />
              </div>
            </div>
            <div
              v-if="commentImgs.length<6"
              class="upload-img"
            >
              <van-uploader :after-read="onRead">
                <van-icon name="photograph" />
              </van-uploader>
              <div class="img-num">
                <span
                  v-if="commentImgs.length===0"
                  class="upload-text"
                >添加图片</span>
                <div
                  v-else
                  class="upload-num"
                >
                  <span class="num">{{ commentImgs.length }}</span>/6
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-button">
      <van-button type="default">
        提交
      </van-button>
    </div>
    <van-popup
      v-model="showReason"
      position="bottom"
      class="reason-pop"
    >
      <div class="reason-title">
        选择原因
      </div>
      <div class="reason-text">
        请选择申请原因
      </div>
      <div class="reason-sel">
        <van-radio-group v-model="reasonText">
          <van-cell-group>
            <van-cell
              title="7天无理由"
              clickable
              @click="reasonText = '7天无理由'"
            >
              <van-radio
                name="7天无理由"
                :checked-color="BeeDefault"
              />
            </van-cell>
            <van-cell
              title="7天无理由"
              clickable
              @click="reasonText = '7天无理由'"
            >
              <van-radio
                name="7天无理由"
                :checked-color="BeeDefault"
              />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getCommodityDetail } from '@/api/user'
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  // NOTE 根据选择条件更改title
  metaInfo: {
    title: '退货'
  },
  components: {},
  props: {},
  data() {
    return {
      BeeDefault,
      commodity: {},
      selectNum: 1,
      reason: '',
      questionDesc: '',
      borderNone: false,
      commentImgs: [],
      showReason: false,
      reasonText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getCommodityDetailData()
    this.selectNum = this.$route.query.selectNum
  },
  methods: {
    async getCommodityDetailData() {
      const res = await getCommodityDetail()
      this.commodity = res.data.commodity
    },
    onRead(file) {
      console.log(file)
      if (this.commentImgs.length >= 6) {
        this.$toast('评论图片最多上传6个！')
      } else {
        this.commentImgs.push(file)
      }
    },
    delImg(index) {
      this.commentImgs.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="less">
.apply-after {
  margin-top: 46px;
  .after-content {
    padding-top: 0.3rem;
    .commodity-card {
      margin: 0 0.16rem 0.2rem;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.2rem;
      overflow: hidden;
      .commodity-detail {
        display: flex;
        padding: 0.3rem;
        .commodity-img {
          width: 1.72rem;
          height: 1.72rem;
          border-radius: 0.04rem;
          overflow: hidden;
          margin-right: 0.2rem;
        }
        .commodity-info {
          flex: 1;
          margin-top: 0.08rem;
          .name-unit {
            display: flex;
            justify-content: space-between;
            .name {
              font-size: 0.22rem;
              max-width: 3.5rem;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .price-num {
              font-size: 0.24rem;
            }
          }
          .sku-price {
            display: flex;
            justify-content: space-between;
            margin-top: 0.2rem;
            font-size: 0.22rem;
            color: @Grey1;
            .num {
              font-size: 0.24rem;
              color: @Grey1;
            }
          }
          .apply-num {
            margin-top: 0.08rem;
            font-size: 0.22rem;
          }
        }
      }
      .footer-info {
        padding: 0.32rem 0.32rem 0.4rem;
        border-top: 0.02rem solid @Grey6;
        font-size: 0.28rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: @BeeDefault;
        }
      }
    }
    .after-detail {
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      box-sizing: border-box;
      background-color: #fff;
      overflow: hidden;
      .apply-reason {
        border-bottom: 0.02rem solid @Grey6;
        .van-cell {
          padding: 0.32rem;
          &:not(:last-child)::after {
            left: 0;
          }
        }
        .type-value {
          font-size: 0.24rem;
          .reason-text {
            color: @ProductName;
          }
        }
      }
      .question-desc {
        padding: 0.32rem;
        border-bottom: 0.02rem solid @Grey6;
        .desc-title {
          font-size: 0.28rem;
        }
        .van-cell {
          padding: 0.2rem 0 0;
        }
        .max-len {
          text-align: right;
          font-size: 0.28rem;
          color: @Grey1;
          .bee-text {
            font-size: 0.3rem;
          }
        }
      }
      .upload-evidence {
        padding: 0.32rem 0.32rem 0.4rem;
        .comment-imgs {
          padding-top: 0.4rem;
          display: grid;
          grid-template-columns: repeat(3, 1.4rem);
          grid-template-rows: 1.4rem;
          grid-gap: 0.3rem 0.4rem;
          .comment-img {
            position: relative;
            img {
              border-radius: 0.05rem;
            }
            .del-img {
              position: absolute;
              top: -0.1rem;
              right: -0.1rem;
            }
          }
          .upload-img {
            height: 1.4rem;
            box-sizing: border-box;
            border: 0.04rem dashed @Grey6;
            border-radius: 0.1rem;
            text-align: center;
            .img-num {
              .upload-num {
                font-size: 0.28rem;
                .num {
                  font-size: 0.34rem;
                  color: @BeeDefault;
                }
              }
            }
          }
        }
      }
    }
  }
  .submit-button {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    .van-button {
      width: 5.86rem;
      height: 0.9rem;
      line-height: 0.9rem;
      background-color: @BeeDefault;
      font-size: 0.32rem;
      color: #fff;
      border-radius: 0.08rem;
    }
  }
  .reason-pop {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    padding-bottom: 1rem;
    .reason-title {
      margin-top: 0.5rem;
      text-align: center;
    }
    .reason-text {
      padding: 0.6rem 0.32rem;
      font-size: 0.26rem;
      color: @Grey1;
    }
  }
}
</style>
