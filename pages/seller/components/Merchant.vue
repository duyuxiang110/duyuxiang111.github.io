<template>
    <div class="seller">
      <div class="seller-content" ref="sellerBscroll">
        <div>
          <div class="across1"></div>
          <div class="overview">
            <img class="item-img" width="100%" height="100%" src="https://desk-fd.zol-img.com.cn/t_s720x360c5/g5/M00/0A/0B/ChMkJ1tEfAKIeyCwAF6u9pbKmU0AAplXQBdHUIAXq8O746.jpg">
            <div class="desc">{{seller.brand}}</div>
          </div>
          <div class="across2"></div>
          <div class="setion">
            <h3 class="title">配送信息</h3>
            <span class="text">由商家配送提供配送 , 约{{seller.deliveryTime}}分钟送达 , 距离1.8km</span>
            <div class="price">配送费{{seller.deliveryPrice}}</div>
          </div>
          <div class="setion">
            <h3 class="title">商家服务</h3>
            <ul>
              <li v-for="(item,index) of seller.supports" :key="index" class="support" >
                <span class="support-icon" :class="classList[seller.supports[index].id]"></span>
                <span class="support-item">{{seller.supports[index].description}}</span>
              </li>
            </ul>
          </div>
          <div class="pics">
            <h3 class="title">商家实景</h3>
            <div class="pics-wrapper" ref="picsScroll">
              <ul class="pics-item" ref="imgScroll">
                <li class="pics-list" v-for="(item, index) of seller.pics" :key="index">
                  <img class="item-img" width="120" height="90" :src="item">
                </li>
              </ul>
            </div>
          </div>
          <div class="info">
            <h3 class="title">商家信息</h3>
            <h4 class="text">{{seller.explain}}</h4>
            <ul class="info-list">
              <li v-for="(item,index) of seller.infos" :key="index">
                <h4 class="info-item">{{item}}</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'SellerMerchant',
  props: {
    seller: Object
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this.$nextTick(() => {
          if (this.seller.pics) {
            let picwidth = 120
            let margin = 6
            let width = (picwidth + margin) * this.seller.pics.length
            this.$refs.imgScroll.style.width = width + 'px'
            if (!this.picscroll) {
              this.picscroll = new BScroll(this.$refs.picsScroll, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.scroll.refresh()
            }
          }
        })
      })
    }
  },
  created () {
    this.classList = ['decrease', 'discount', 'special', 'guarantee', 'invoice']
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerBscroll, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    })
  }
}

</script>

<style lang="stylus" scoped>
  .seller
    .seller-content
      position:absolute
      top:179px
      left:0
      bottom:0
      width:100%
      overflow:hidden
      .across1
        width:100%
        height:2px
        background-color:#f5f5f5
      .overview
        position: relative
        padding:16px
        .desc
          padding:8px 0 8px 0
          line-height:18px
          font-weight:400
          color:#666
          overflow:hidden
          white-space:nowrap
          text-overflow:ellipsis
      .across2
        width:100%
        height:10px
        background-color:#f5f5f5
      .setion
        padding:16px
        .title
          line-height:40px
          font-size:17px
          font-weight:700
          color:#000
        .text
          line-height:40px
          color:#666
        .price
          color:#666
        .support
          line-height:25px
          .support-icon
            display: inline-block
            vertical-align:top
            width:25px
            height:25px
            background-size:25px
            &.decrease
              background-image:url('decrease_1@2x.png')
            &.discount
              background-image:url('discount_1@2x.png')
            &.special
              background-image:url('special_1@2x.png')
            &.guarantee
              background-image:url('guarantee_1@2x.png')
            &.invoice
              background-image:url('invoice_1@2x.png')
      .pics
        padding:16px
        .title
          line-height:40px
          font-size:17px
          font-weight:700
        .pics-wrapper
          overflow:hidden
          white-space:nowrap
          .pics-list
            display:inline-block
            width:120px
            height:90px
            margin-right:6px
      .info
        padding:16px
        .title
          line-height:40px
          font-size:17px
          font-weight:700
        .text
          color:#999
        .info-list
          padding:20px 0 20px 0
          font-weight:700
          color:#333
          .info-item
            border-top:1px solid rgba(7,17,27,0.1)
            padding:30px 0 30px 0
            color:#333
</style>
