<template>
    <div class="goods">
      <div class="wrapper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="item of seller.swiparList" :key="item.id">
              <img class="swiper-img" :src="item.image">
            </swiper-slide>
          </swiper>
      </div>
      <div class="goods-menu" ref="menuWrapper"> <!-- 左侧边栏 -->
        <ul>
          <li
            v-for="(item, index) of goods"
            :key="index"
            class="list-menu"
            :class="{'current':currentIndex === index}"
            @click="selectMenu(index)"
          >
            <span class="text">
              <span
                v-show="item.type > 0" class="icon"
                :class="listMap[item.type]"
              >
              </span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="goods-foods" ref="foodsWrapper"> <!-- 右侧边栏 -->
        <ul>
          <li
            v-for="(item, index) of goods"
            :key="index"
            class="list-food"
            ref="foodList"
          >
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li
                v-for="(food,index) of item.foods"
                :key="index"
                class="food-item"
                @click="handleFood(food)"
              >
                <div class="icon">
                  <img :src="food.icon" width="100" height="100">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span>￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart> <!-- 配送费 和 起送费 -->
      <food :food="foodDetail" ref="fooddd"></food>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '@/common/shopcart/ShopCart.vue'
import cartcontrol from '@/common/cartcontrol/Cartcontrol.vue'
import food from '@/common/food/Food.vue'

export default {
  name: 'GoodsMenu',
  props: {
    goods: Array,
    seller: Object // 接收从app视图传来的数据
  },
  data () {
    return {
      listHeight: [], // 列表数组
      scrollY: 0, // 列表Y轴
      foodDetail: {}, // 商品详情页
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  methods: {
    // 点击menu数组 对应 foods数组
    selectMenu (index) {
      let foodList = this.$refs.foodList // 拿到 li节点
      let el = foodList[index] // 拿到 li 节点当前的索引
      this.foodsScroll.scrollToElement(el, 500) // 点击menu列表滚动到foods页面列表对应索引
    },
    coordinate () {
      // 拿到 结点
      // 初始化为0
      let foodlist = this.$refs.foodList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodlist.length; i++) {
        let item = foodlist[i]
        // padding视口高度
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    // 接收从Cartcontrol.vue组件传来 add 事件，并把每次点击按钮的target传入给_drop
    addFood (target) {
      this._drop(target)
    },
    // 定义 _drop 拿到shopcart组件DOM节点 并 传入给shopcart，并设置参数
    _drop (target) {
      this.$refs.shopcart.drop(target)
    },
    // 点击商品详情页
    // 把循环的food数据传进来
    handleFood (food) {
      this.foodDetail = food // 接收food数据 并传入food组件里
      this.$refs.fooddd.show() // 接收从food组件传来的show方法
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i] // 拿到当前 li 列表
        let height2 = this.listHeight[i + 1] // 拿到每次 li+1 的列表
        // 列表最后一个或当前列表期间  返回当前期间
        // index变化重新做计算
        // 0>列表长度& < 下一个列表长度直接返回index
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0// 什么都没有返回0
    },

    // 这个 selectFoods 就是对应 shopcart 里的selectFoods
    selectFoods () {
      // 初始空数组
      let foods = []
      // goods 里的数据遍历一遍
      // goods 遍历完在遍历 goods 里的 foods 拿到每个 li 数据
      // foods里的li 只要值>0 直接push到空数组
      // 最后把函数 动态传到 shopcart 组件里
      this.goods.forEach((e) => {
        e.foods.forEach((li) => {
          if (li.count > 0) {
            foods.push(li)
          }
        })
      })
      return foods
    }
  },
  mounted () {
    this.meunScroll = new BScroll(this.$refs.menuWrapper, {
      // beter-scroll会阻止默认，所以click等ture console.log 就能看见索引值
      click: true
    })
    this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
      click: true
    })
    this.foodsScroll.on('scroll', (e) => {
      this.scrollY = Math.abs(Math.round(e.y))
    })
  },
  created () {
    this.listMap = ['decrease', 'discount']
  }
}
</script>

<style lang="stylus" scoped>
  .goods
    display:flex
    position:absolute
    top:176px
    bottom:65px
    width:100%
    overflow:hidden
    .wrapper
      width: 100%
      overflow: hidden
      height:100px
      .swiper-img
          width:100%
    .goods-menu
      flex: 0 0 80px
      width:80px
      background #f8f8f8
      .list-menu
        display:table
        width:56px
        height:54px
        padding:0 12px
        &.current
          background:#fff
          font-size:50
        .icon
          display:inline-block
          width:15px
          height:15px
          margin-right:2px
          background-size:15px 15px
          &.decrease
            background-image:url('decrease_3@2x.png')
          &.discount
            background-image:url('discount_3@2x.png')
        .text
          display:table-cell
          width:56px
          font-size:14px
          vertical-align:middle
          color:#666
    .goods-foods
      flex:1
      .title
        padding:9px 34px 9px 0
        margin-left:11px
        font-weight:700
        color:#666
      .food-item
        display:flex
        padding:11px 11px 11px 11px
        .content
          flex:1
          padding:0 10px 10px 10px
          .name
            font-weight:600
            font-size:17px
          .desc
            margin-top:8px
            color:#999
            font-size:9px
            white-space:nowrap
            overflow:hidden
            text-overflow:ellipsis
          .extra
            font-size:9px
            color:#999
            margin-top:8px
          .price
            display:flex
            color:#ff5339
            margin-top:20px
            font-size:16px
            .old
              position:absolute
              height:18px
              line-height:16px
              left:155px
              color:#666
              text-decoration: line-through
              font-size:8px
</style>
