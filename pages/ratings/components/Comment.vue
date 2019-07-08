<template>
    <div class="ratings" ref="ratingScroll">
      <div class="ratings-content" >
        <div class="across1"></div>
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="score-rating">
              <span class="title">商家评分</span>
              <star :size="24" :score='seller.score'></star>
            </div>
          </div>
          <div class="overview-right">
            <div class="flavour">
              <span class="title">味道</span>
              <p class="score">{{seller.foodScore}}</p>
            </div>
            <div class="pack">
              <span class="title">包装</span>
              <p class="score">{{seller.serviceScore}}</p>
            </div>
            <div class="delivery">
              <span class="title">配送</span>
              <p class="score">{{seller.deliveryPrice}}</p>
            </div>
          </div>
        </div>
        <div class="across"></div>
        <ratingSelect :ratings="ratings" @select="handleClickComment" @toggleContent="handleClickShow" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item" v-for="(item, index) of ratings" v-show="needshow(item.rateType, item.text)" :key="index">
              <div class="avatar">
                <img :src="item.avatar" width="28" height="28">
              </div>
              <div class="content">
                <h1 class="name">{{item.username}}</h1>
                <div class="time">{{item.rateTime | formatDate}}</div>
                <div class="star-wrapper">
                  <star :size="24" :score="item.score"></star>
                  <span class="delivery">{{item.deliveryTime}}</span>
                </div>
                <p class="text">{{item.text}}</p>
                <div class="recommend">
                  <span class="iconfont" :class="{'active':selectType === 2 || selectType === 0}">&#xe604;</span>
                  <span class="itemm" v-for="(itemList,index) of item.recommend" :key="index">{{itemList}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '@/common/star/Star.vue'
import ratingSelect from '@/common/ratingselect/RatingSelect.vue'
import {formatDate} from '@/common/date.js'
// const POSITIVE = 0 // 正评价
// const NEGATIVE = 1// 负评价
const ALL = 2// 所有评价

export default {
  name: 'RatingsComment',
  props: {
    seller: Object,
    ratings: Array// 从Ratings父组件传来的数据
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL, // 商品评论最开始设置显示为全部
      onlyContent: true // 商品评论显示与隐藏
    }
  },
  methods: {
    handleClickShow (onlyContent) {
      this.onlyContent = !this.onlyContent
    },
    handleClickComment (number) {
      this.selectType = number
    },
    needshow (type, text) {
      if (this.onlyContent && !text) { // 如果选中全部显示 && 没有内容 直接false
        return false
      }
      if (this.selectType === ALL) { // 如有上面if走完走这个，有文本话 三个按钮为ALL，显示true
        return true
      } else {
        return type === this.selectType // 否则判断当前rating.rateType 是不是= this.selectType 是ture 不是false
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.ratingScroll, {
        click: true
      })
    })
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yy-MM-dd hh:mm')
    }
  },
  components: {
    star,
    ratingSelect
  }
}
</script>

<style lang="stylus" scoped>
  .ratings
    position:absolute
    top:174px
    left:0
    bottom:0
    width:100%
    margin-top:5px
    overflow:hidden
    .overview
      display:flex
      padding:18px 0 15px 20px
      margin-bottom:30px
      .overview-left
        display:flex
        justify-content: space-between
        flex:0 0 130px
        .score-rating
          display:flex
          flex-direction: column
          align-items: center
          color:#666
          .title
            line-height:30px
        .score
          color:#ff6000
          font-size:45px
      .overview-right
        display:flex
        justify-content: space-between
        .flavour
          display:flex
          flex-direction: column
          align-items: center
          padding:0 10px 0 20px
          color:#666
          font-weight:400
          .score
            margin-top:10px
            text-align:center
            font-size:25px
        .pack
          display:flex
          flex-direction: column
          align-items: center
          padding:0 20px 0 20px
          color:#666
          font-weight:400
          .score
            margin-top:10px
            text-align:center
            font-size:25px
        .delivery
          display:flex
          flex-direction: column
          align-items: center
          padding:0 10px 0 20px
          margin-left:10px
          border-left:1px solid rgba(7,17,27,0.1)
          color:#666
          font-weight:400
          .score
            margin-top:10px
            text-align:center
            font-size:25px
    .across
      width:100%
      height:10px
      background-color:#f5f5f5
    .across1
      width:100%
      height:2px
      background-color:#f5f5f5
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .time
            position:absolute
            top:0
            right:0
            color:#666
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
          .text
          .recommend
            margin-top:10px
            .active
              color:#00a0dc
            .itemm
              display:inline-block
              padding:7px
              margin:3px
              background:#ebf5ff
              color:#6d7885
</style>
