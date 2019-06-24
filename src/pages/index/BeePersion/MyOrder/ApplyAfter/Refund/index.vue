<template>
  <div class="apply-after">
    <div class="after-content">
      <div class="commodity-card">
        <div class="commodity-detail">
          <div class="commodity-img">
            <img :src="commodity.product_info.thumb_url">
            <!-- commodity.product_info.order_product_id -->
          </div>
          <div class="commodity-info">
            <div class="name-unit">
              <div class="name">
                {{ commodity.product_info.product_name }}
              </div>
              <div class="price-num">
                ￥{{ commodity.product_info.price }}
              </div>
            </div>
            <div class="sku-price">
              <div class="sku-text">
                {{ commodity.product_info.props_name }}
              </div>
              <div class="num">
                x{{ commodity.product_info.number }}
              </div>
            </div>
            <div class="apply-num">
              申请数量：{{ apply_number }}
            </div>
          </div>
        </div>
        <div v-if="commodity.type_code === 1">
          <div class="footer-info">
            <div class="flex flex-between">
              <div class="select-num">
                <span>退款金额</span>
              </div>
              <span
                class="price"
              >￥{{ commodity.product_info.refund_cash }}</span>
            </div>
            <div v-if="commodity.product_info.refund_pwv" class="flex flex-between" style="margin-top: 0.1rem;">
              <div class="select-num">
                <span>退回公益值</span>
              </div>
              <span class="price">{{ commodity.product_info.refund_pwv }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="after-detail">
        <div v-if="[1, 2].includes(commodity.type_code)" class="apply-reason">
          <van-cell is-link @click="showReason = true">
            <template slot="title">
              <span>申请原因（必填）</span>
            </template>
            <div class="type-value">
              <span v-if="reasonText" class="reason-text">
                {{ reasonText }}
              </span>
              <span v-else>请选择</span>
            </div>
          </van-cell>
        </div>
        <!-- 问题描述 -->
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
            maxlength="140"
            :border="borderNone"
          />
          <div class="max-len">
            <span class="bee-text">{{ questionDesc.length }}</span>/500
          </div>
        </div>
        <!-- 图片上传 -->
        <div class="upload-evidence">
          <div class="upload-title">
            上传凭证（必填，最多上传6张）
          </div>
          <div class="comment-imgs">
            <div
              v-for="(img, index) in commentImgs"
              :key="index"
              class="comment-img"
            >
              <img :src="img.content">
              <div class="del-img" @click="delImg(index)">
                <van-icon name="clear" />
              </div>
            </div>
            <div v-if="commentImgs.length < 6" class="upload-img">
              <van-uploader
                :after-read="onRead"
                accept="image/png, image/jpeg"
                multiple
              >
                <van-icon name="photograph" />
              </van-uploader>
              <div class="img-num">
                <span
                  v-if="commentImgs.length === 0"
                  class="upload-text"
                >添加图片</span>
                <div v-else class="upload-num">
                  <span class="num">{{ commentImgs.length }}</span>/6
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-button">
      <van-button :loading="loading" loading-text="正在提交" type="default" @click="submit">
        提交
      </van-button>
    </div>
    <van-popup v-model="showReason" position="bottom" class="reason-pop">
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
              v-for="(item, index) in commodity.reason_data"
              :key="index"
              :title="item.reason"
              clickable
              @click="selectReason(item)"
            >
              <van-radio :name="item.reason" :checked-color="BeeDefault" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { zipImg } from '@/utils/imgUp'
import { applyPageData, submitApplyData } from '@/api/BeeApi/user'
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  // NOTE 根据选择条件更改title
  metaInfo() {
    return {
      title: this.title
    }
  },
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      // 类型 1退 2换 3补
      type_code: this.$route.query.type_code,
      title: '',
      // 售后数量
      apply_number: this.$route.query.apply_number,
      // id
      order_product_id: this.$route.query.order_product_id,
      aid: this.$route.query.aid,
      // 主题色
      BeeDefault,
      commodity: {
        type_code: 0,
        product_info: {
          order_product_id: 0,
          product_name: '',
          price: 0,
          number: 0,
          thumb_url: '',
          props_name: '',
          apply_number: 0,
          refund_cash: 0,
          refund_pwv: 0
        },
        reason_data: []
      },
      // selectNum: 1,
      questionDesc: '', // 问题描述
      borderNone: false,
      commentImgs: [], // 图片集合
      showReason: false,
      reasonText: '', // 申请理由 文字
      reasonId: '' // 申请理由 id
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    if (this.type_code === 1) {
      this.title = '退货'
    } else if (this.type_code === 2) {
      this.title = '换货'
    } else if (this.type_code === 3) {
      this.title = '补寄'
    }
    if (this.order_product_id) {
      this.getCommodityDetailData({
        order_product_id: this.order_product_id,
        type_code: this.type_code,
        apply_number: this.apply_number
      })
    }
    if (this.aid) {
      this.getCommodityDetailData({
        aid: this.aid,
        type_code: this.type_code,
        apply_number: this.apply_number
      })
    }
  },
  methods: {
    // 提交
    async submit() {
      // 申请理由、描述、图片必填
      if (!this.reasonId && +this.type_code !== 3) {
        this.$toast('申请原因必填！')
        return
      }
      if (!this.questionDesc) {
        this.$toast('问题描述必填！')
        return
      }
      if (this.commentImgs.length === 0) {
        this.$toast('请至少上传一张图片！')
        return
      }
      this.loading = true
      const files = this.commentImgs.map(item => {
        return item.file
      })
      const formData = new FormData()
      const results = await Promise.all(
        files.map(async file => {
          const res = await zipImg(file)
          formData.append('proofs[]', res)
          return res
        })
      )
      console.log('results:', results)
      if (this.order_product_id) {
        formData.append('order_product_id', this.order_product_id)
        formData.append('type_code', this.type_code)
        formData.append('apply_number', this.apply_number)
        formData.append('desc', this.questionDesc)
        formData.append('reason_id', this.reasonId)
      }
      if (this.aid) {
        formData.append('aid', this.aid)
        formData.append('type_code', this.type_code)
        formData.append('apply_number', this.apply_number)
        formData.append('desc', this.questionDesc)
        formData.append('reason_id', this.reasonId)
      }
      // console.log(formData.get('order_product_id'))
      // console.log(formData.get('aid'))
      // console.log(formData.get('type_code'))
      // console.log(formData.get('apply_number'))
      // console.log(formData.get('desc'))
      // console.log(formData.getAll('proofs[]'))
      try {
        const res = await submitApplyData(formData)
        this.loading = false
        this.$toast(res.message)
        setTimeout(() => {
          this.$router.push({
            name: 'AllOrder'
          })
        }, 2000)
      } catch (error) {
        this.$toast(error)
        this.loading = false
      }
    },
    // 获取商品信息，售后理由
    async getCommodityDetailData(data) {
      const res = await applyPageData(data)
      this.commodity = res.data
    },
    // 选择理由
    selectReason(item) {
      console.log(item)
      this.reasonText = item.reason
      this.reasonId = item.reason_id
    },
    // 上传图片
    async onRead(file) {
      console.log(file)
      if (Array.isArray(file)) {
        this.commentImgs.push(...file)
      } else {
        this.commentImgs.push(file)
      }
      if (this.commentImgs.length >= 6) {
        this.commentImgs.length = 6
        this.$toast('评论图片最多上传6个！')
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
  .upload-text{font-size: 0.24rem;}
  .upload-title{font-size: 0.28rem; color: #333}
  .reason-sel{
    height: 4rem;
    overflow: scroll;
  }
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
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
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
          color: #333;
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
          grid-template-rows: 1.4rem 1.4rem;
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
            padding-top: 0.3rem;
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
    margin-bottom:0.3rem;
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

  .van-cell__value{text-align: right;}
  .van-radio{display: inline-block;}
}
</style>
