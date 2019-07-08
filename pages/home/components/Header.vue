<template>
  <div class="header">
    <div class="header-wrapper"> <!-- 图片 -->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content"> <!-- 内容 -->
        <div class="count-title">
          <span class="iconfont content-icon">&#xe607;</span>
          <span class="content-name">{{seller.name}}</span>
        </div>
        <div class="content-description">
            {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="content-support">
            <span class="iconfont support-icon">&#xe64e;</span>
            <span class="support-text">{{seller.discount}}</span>
        </div>
        <div class="detail-wrapper" v-if="seller.supports" @click="handleWrapperClick">
          <span class="detail-length">{{seller.supports.length}}</span>
          <span class="iconfont">&#xe602;</span>
        </div>
      </div>
      <div class="Favorites" @click="handleClickFavorites">
        <span class="iconfont Favorites-icon" :class="{'active':Favorites}">&#xe63e;</span>
        <span class="text">{{FavoritesText}}</span>
      </div>
    </div>
    <div class="bulletin-wrapper"> <!-- 公告 -->
      <span class="iconfont bulletin-icon">&#xe730;</span>
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="iconfont bulletin-icon1">&#xe602;</span>
    </div>
    <div class="background"> <!-- 背景 -->
        <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailshow" @click="handleDetailClick"> <!-- click detail子页 -->
        <div class="detail-wrapper1">
          <div class="detail-text">
            {{seller.name}}
            <div class="title">
              <div class="line"></div>
              <div class="detail-text1">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="detail-supports" v-if="seller.supports">
              <li class="detail-item" v-for="(item,index) of seller.supports" :key="index">
                <span class="detail-icon1" :class="listMap[seller.supports[index].id]"></span>
                <span class="detail-list" >{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="detail-text1">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="detail-content">
              <div class="detail-content-text">{{seller.bulletin}}</div>
            </div>
          </div>
          <div class="detail-close">
            <span class="iconfont close111">&#xe603;</span>
          </div>
        </div>
    </div>
    </transition>
  </div>
</template>

<script>
import {saveToLocal, loadFromLocal} from '@/common/store.js'

export default {
  name: 'HomeHeader',
  props: {
    seller: Object
  },
  data () {
    return {
      detailshow: false,
      Favorites: (() => {
        return loadFromLocal(this.seller.id, 'Favorites', false) // id key 默认这(读不到数据的话)false
      })()
    }
  },
  computed: {
    FavoritesText () {
      return this.Favorites ? '收藏' : '未收藏'
    }
  },
  methods: {
    handleDetailClick () {
      this.detailshow = false
    },
    handleWrapperClick () {
      this.detailshow = true
    },
    handleClickFavorites () {
      console.log(1)
      this.Favorites = !this.Favorites
      saveToLocal(this.seller.id, 'Favorites', this.Favorites) // 每次点击都会把数据缓存进去（id，key，value）
    }
  },
  created () {
    this.listMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
  .header
    position:relative
    overflow:hidden
    background:rgba(7,17,27,0.5)
    .header-wrapper
      position:relative
      padding:24px 12px 18px 24px
      font-size:0
      .avatar
        display:inline-block
        img
            border-radius:2px
      .content
        display:inline-block
        vertical-align: top
        width:180px
        height:62px
        font-size:0
        margin-left:16px
        color:#fff
        .content-icon
          color:#e9a303
        .content-name
            line-height:18px
            font-size:16px
            padding-left:5px
            font-weight:bold
        .content-description
            margin-top:10px
            font-size:12px
        .content-support
            overflow:hidden
            display:inline-block
            font-size:12px
            .support-text
                display:inline-block
                line-height:16px
                vertical-align: top
            .support-icon
                background-color:red
      .Favorites
        position:absolute
        width:80px
        height:50px
        top:45px
        right:50px
        text-align:center
        .Favorites-icon
          display:block
          font-size:30px
          &.active
            color:red
        .text
          font-size:8px
          color:#333
    .background
      position: absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(8px)
      background:rgba(0,0,0,0.5)
    .detail-wrapper
      position:absolute
      height:24px
      line-height:24px
      right:12px
      bottom:35px
      background:rgba(0,0,0,.2)
      border-radius:15px
      padding:0 8px
      color:#fff
      .detail-length
        font-size:1px
        vertical-align:top
    .bulletin-wrapper
      position:relative
      height:28px
      line-height:28px
      background:rgba(0,0,0,.2)
      color:#fff
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      .bulletin-icon
        color:#ffa64d
        padding-left:5px
      .bulletin-icon1
        position:absolute
        font-size:10px
        right:0
        top:2px
    .detail
      position:fixed
      z-index:100
      width:100%
      height:100%
      top:0
      left:0
      background:rgba(7,17,27,0.8)
      overflow:auto
      color:#000
      transition:all 0.3s
      &.fade-transition
        opacity:1
        background:rgba(7,17,27,0.8)
      &.fade-enter, &.fade-leave
        opacity:0
        background:rgba(7,17,27,0)
      .detail-wrapper1
        min-height:100%
        color:#fff
        .detail-text
          margin-top:64px
          padding-bottom:64px
          text-align:center
          font-size:18px
          .title
            display:flex
            width:80%
            margin:30px auto 24px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom:1px solid rgba(255,255,255,0.5)
            .detail-text1
              text-align:center
              padding:0 12px
              font-size:14px
          .detail-content
            width:80%
            margin:0 auto
            text-align:center
            .detail-content-text
              font-size:12px
          .detail-supports
            margin:0 42px
            .detail-item
              margin-bottom:12px
              font-size:12px
              text-align:left
              .detail-icon1
                display: inline-block
                vertical-align: top
                width: 12px
                height: 12px
                margin-right: 4px
                background-size: 12px 12px
                &.decrease
                  background-image:url('decrease_1@2x.png')
                &.discount
                  background-image:url('discount_1@2x.png')
                &.guarantee
                  background-image:url('guarantee_1@2x.png')
                &.invoice
                  background-image:url('invoice_1@2x.png')
                &.special
                  background-image:url('special_1@2x.png')
      .detail-close
        position:relative
        width:35px
        height:35px
        text-align:center
        color:red
        margin:0 auto 0 auto
        clear:both
        font-size:25px
        .close111
          font-size:40px
</style>
