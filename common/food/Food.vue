<template>
    <transition name="move">
      <div class="food" v-show="showFlag" ref="foodScroll">
        <div class="foodfood">
          <div class="image-header" @click="handleClickclear" >
              <span class="iconfont back">&#xe600;</span>
            <img :src="food.image" @click="handleClickclear">
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old">{{food.oldPrice}}</span>
            </div>
            <div class="content-warpper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </div>
          <div class="text">{{food.info}}</div>
          <div class="rating-warpper">
            <h1 class="rating-tilte">商品评价</h1>
          </div>
          <ratingselect @select="handleClickComment" @toggleContent="handleClickShow" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-list"><!-- 详情页下面的评论列表 -->
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-for="(rating,index) of food.ratings" v-show="needshow(rating.rateType,rating.text)" :key="index">
                <div class="user">
                  <img class="avatar" :src="rating.avatar" width="30" height="30">
                  <span class="user-name">{{rating.username}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'iconfont icon-down':rating.rateType === 0,'iconfont icon-up':rating.rateType === 1}">&#xe604;</span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '@/common/cartcontrol/Cartcontrol.vue'
import ratingselect from '@/common/ratingselect/RatingSelect.vue'
import {formatDate} from '@/common/date.js'

// const POSITIVE = 0 // 正评价
// const NEGATIVE = 1// 负评价
const ALL = 2// 所有评价
export default {
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL, // 商品评论最开始设置显示为全部
      onlyContent: true, // 商品评论显示与隐藏
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    cartcontrol,
    ratingselect
  },
  methods: {
    // 设置一个方法让Menu组件调用
    show () {
      this.showFlag = true
      this.selectType = ALL // 不同商品评论都要进行独立初始化
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    handleClickclear () {
      this.showFlag = false
    },
    // 显示list列表内容  和  全部显示隐藏按钮
    needshow (type, text) {
      if (this.onlyContent && !text) { // 如果选中全部显示 && 没有内容 直接false
        return false
      }
      if (this.selectType === ALL) { // 如有上面if走完走这个，有文本话 三个按钮为ALL，显示true
        return true
      } else {
        return type === this.selectType // 否则判断当前rating.rateType 是不是= this.selectType 是ture 不是false
      }
    },
    // 接收ratingSelect组件事件，评论列表 全部 推荐 吐槽 来回切换
    handleClickComment (number) {
      this.selectType = number
      this.scroll.refresh()
    },
    // 接收ratingSelect组件自定义事件， 隐藏显示全部评论内容
    handleClickShow (onlyContent) {
      this.onlyContent = !this.onlyContent
      this.scroll.refresh()
    }
  },
  // 时间戳转换年月日时间
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .food
    position:fixed
    top:0
    left:0
    z-index:30
    width:100%
    height:100%
    background:#fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(0, 100%, 0)
    .foodfood
      position:relative
      padding-bottom:90px
    .image-header
      position:relative
      width:100%
      height:0
      padding-bottom:100%
      overflow:hidden
      .img
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
      .back
        position:absolute
        font-size:30px
        top:10px
        left:10px
        padding:5px
        color:#fff
    .content
      padding:18px
      .title
        line-height: 16px
        margin-bottom: 12px
        font-size: 20px
        font-weight: 700
        color:#000
      .detail
        margin-bottom: 14px
        line-height: 10px
        height: 10px
        .count, .rating
          font-size: 10px
          color:#666
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .content-warpper
        display:flex
        justify-content:center
        margin-top:-6px
    .text
      line-height:25px
      padding:0 18px 18px 18px
      color:#666
    .rating-warpper
      display:flex
      .rating-tilte
        padding:0 18px 18px 18px
        font-weight:700
        font-size:17px
      .rating-evaluate
        display:flex
        padding:0 18px 18px 18px
    .rating-list
      width:100%
      .no-rating
        padding:5px 18px 0 18px
        color:#999
      .rating-item
        position:relative
        padding:16px 0 18px 16px
        border-bottom:1px solid rgba(7,17,27,0.02)
        .user
          .user-name
            position:absolute
            padding-left:10px
          .avatar
            border-radius:50%
      .time
        position:absolute
        top:16px
        right:0
        color:#999
      .text
        padding:0
        margin-top:10px
        .icon-down
          color:#1296db
        .icon-up
          color:#666
</style>
