<template>
    <div class="ratingselect">
      <div class="ratingType border-1px">
        <span class="block positive" :class="{'active':selectType === 2}" @click="select(2)">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
        <span class="block positive" :class="{'active':selectType === 0}" @click="select(0)">{{desc.positive}} <span class="count">{{positive.length}}</span></span>
        <span class="block negative" :class="{'active':selectType === 1}" @click="select(1)">{{desc.negative}} <span class="count">{{negative.length}}</span></span>
      </div>
      <div class="swich" :class="{'on':onlyContent}" @click="toggleContent">
        <span class="iconfont">&#xe64f;</span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
const POSITIVE = 0 // 正评价
const NEGATIVE = 1// 负评价
const ALL = 2// 所有评价
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: { // 只看内容的评价 图标 颜色
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '好评',
          negative: '差评'
        }
      }
    }
  },
  methods: {
    // 点击全部 推荐 吐槽 转换
    select (number) {
      this.selectType = number // number对应就是 0 1 2
      this.$emit('select', number) // 传给父组件(food组件)，并让父组件监听number
    },
    // 全部显示 切换
    toggleContent (onlyContent) {
      this.onlyContent = !this.onlyContent
      this.$emit('toggleContent', this.onlyContent) // 同样传给父组件，并把onlyContent一起传
    }
  },
  computed: {
    // 计算过滤出有多少个推荐的评价
    positive () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    // 过滤出有多少个 吐槽的评论
    negative () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ratingselect
    .ratingType
      padding:18px 0 18px 18px
      border-bottom:1px solid rgba(7,17,27,0.01)
      .block
        display:inline-block
        padding:8px 17px 8px 12px
        border-radius:5px
        &.active
          color:#fff
        &.positive
          background-color:#ebf5ff
          color:#6d7885
          &.active
            background-color:#0097ff
            color:#fff
        &.negative
          background-color:#dbddde
          color:#6d7885
          &.active
            background-color:#ccc
    .swich
      padding:12px 18px
      line-height:24px
      border-bottom:1px solid rgba(7,17,27,0.1)
      color:#666
      &.on
        .iconfont
          color:#76d572
</style>
