<template>
  <div>
     <div class="shopcart">
        <div class="content" @click.stop="toggleList">
            <div class="content-left"><!-- 购物车左半部分 -->
                <div class="logo-wrapper"><!-- logo -->
                    <div class="logo" :class="{'highlight':totalCount > 0}"> <!-- 只要有选中商品就变色 -->
                        <span class="iconfont" :class="{'highlight':totalCount > 0}">&#xe608;</span>
                    </div>
                    <div class="num" v-show="totalCount > 0 ? true:false">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}元</div><!-- 钱 -->
                <p class="desc">另需配送费￥{{deliveryPrice}}元</p><!-- 配送费 -->
            </div>
            <div class="content-right" @click.stop="pay"><!-- 购物车右半部分 事件冒泡：点击结算时候，列表会冒泡上来，列表自动打开 -->
              <div class="pay" :class="payClass">
               {{payDesc}}
              </div>
            </div>
        </div>
        <div class="ball-container"><!-- 抛物小球 -->
          <div v-for="(ball,index) in balls" :key="index">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
            </transition>
          </div>
        </div>
        <transition name="folt">
          <div class="shopcart-list" v-show="listshow" ><!-- 购物车列表 -->
              <div class="list-header">
                <h1 class="title">已选商品</h1>
                <span class="empty iconfont" @click="handleClickclear">&#xe63e;清空</span>
              </div>
              <div class="list-content" ref="listContent">
                <ul>
                  <li class="food" v-for="(food, index) of selectFoods" :key="index">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                      <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food"></cartcontrol>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
        </transition>
      </div>
    <transition name="fade">
      <div class="listMask" v-show="listshow" @click="listClear"></div><!-- 购物车屏幕阴影 -->
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '@/common/cartcontrol/Cartcontrol.vue'

export default {
  props: {
    deliveryPrice: Number, // 接收从Menu组件传来的值
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: { // foods组件商品列表价格 和 商品个数 所有状态变化都依赖它
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: [// 抛物球 数组
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBall: [], // 存入小球
      fold: true // 购物车列表
    }
  },
  methods: {
    // 接收从Menu.vue组件传来的drop
    drop (target) {
      console.log(target)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        // 如果ball设置为 false，就把球取出 push 到 dropBall数组里
        if (!ball.show) {
          ball.show = true
          ball.target = target // ball的target保存到 drop里target参数里
          this.dropBall.push(ball)
          return
        }
      }
    },
    // 小球 入场动画 每个接收 target 参数(执行动画 DOM 对象)
    beforeDrop (target) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.target.getBoundingClientRect() // 按钮上下左右 相对视口的位置
          let x = rect.left - 32 // target 页面横向坐标位置
          let y = -(window.innerHeight - rect.top - 22) // target 页面纵向坐标
          target.style.display = ''
          target.style.webkitTransform = `translate3d(0,${y}px,0)`
          target.style.transform = `translate3d(0,${y}px,0)`
          // 处理内层动画
          let inner = target.getElementsByClassName('inner-hook')[0] // 拿到节点
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    // 小球 执行动画
    dropping (target) {
      const rf = target.offsetHeight// 触发重绘html,设置transform才有用
      this.$nextTick(() => { // 让动画效果异步执行,提高性能
        target.style.webkitTransform = 'translate3d(0, 0, 0)'// 设置小球掉落后最终的位置
        target.style.transform = 'translate3d(0, 0, 0)'
        // 处理内层动画
        let inner = target.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
      })
    },

    // 小球 结束动画
    afterDrop (target) {
      let ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
      if (ball) {
        ball.show = false
        target.style.display = 'none'// 隐藏小球
      }
    },
    // 购物车列表 反转显示与隐藏
    toggleList () {
      if (!this.totalCount) { // 没有商品 直接隐藏
        return false
      } else {
        this.fold = !this.fold
      }
    },
    // 清除购物车商品
    handleClickclear () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    // 点击购物车阴影隐藏
    listClear () {
      // fold 依赖listshow里的参数
      this.fold = true
    },
    // 支付 多少元
    pay () {
      if (this.totalPrice < this.minPrice) {
        return this.totalPrice
      } else {
        window.alert(`支付${this.totalPrice}`)
      }
    }
  },
  computed: {
    // price商品价格 * 每次点击个数
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => { // 遍历food li列表
        total += food.price * food.count // 初始0 + price *
      })
      return total
    },
    // 所有商品总合
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 总价为 0 显示起送价，当有计算差时候去显示差多少元起送
    payDesc () {
      // 当价格为 0 时 返回 minPrice数据 起送
      // 当价格 < 起送费时  算出差价 并返回
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `￥差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    // 动态class 右侧栏 高亮显示函数
    payClass () {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    },
    // 购物车列表显示与隐藏 和 列表滚动问题
    listshow () {
      if (!this.totalCount) {
        return false
      }
      let show = !this.fold
      // 只有列表展示才需要滚轮初始化
      // show为true
      if (show === true) {
        this.$nextTick(() => {
          // listshow商品是不断变化，如果不存在scroll直接创建一个scroll
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh() // 如有有scroll就不用new，直接会初始化调整对应高度
          }
        })
      }
      return show
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
      position:fixed
      left:0
      bottom:0
      width:100%
      height:66px
      z-index:50
      .content
          display:flex
          background-color: rgba(61,61,63,.9)
          .content-left
              flex:1
              .logo-wrapper
                  display:inline-block
                  position:relative
                  width:55px
                  height:55px
                  top:-15px
                  margin:0 20px
                  padding:8px
                  border-radius:50%
                  background:#444444
                  .logo
                      width:100%
                      height:100%
                      border-radius:50%
                      text-align:center
                      background:#363636
                      &.highlight
                        background:#3190e8
                      .iconfont
                          position:absolute
                          font-size:35px
                          line-height:50px
                          color:#5e5e5e
                          left:17px
                          top:11px
                          &.highlight
                            color:#fff
                .num
                  position:absolute
                  top:0
                  right:0
                  width:24px
                  height:24px
                  line-height:24px
                  text-align:center
                  border-radius:50%
                  color:#fff
                  background:#ff6916
                  box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
              .price
                  display:inline-block
                  vertical-align:top
                  line-height:30px
                  margin-top:12px
                  font-size:20px
                  color:#999
                  &.highlight
                    color:#fff
              .desc
                  position:absolute
                  bottom:10px
                  left:118px
                  color:#999
                  font-size:15px
                  font-weight:400
          .content-right
              flex:0 0 105px
              width:105px
              .pay
                height:66px
                line-height:66px
                text-align:center
                font-size:15px
                font-weight:700
                color:#fff
                background:#535356
                &.enough
                  background:#38ca73
                  color:#fff
                &.not-enough
                  background:#535356
      .ball-container
        .ball
          position: fixed
          left: 32px
          bottom: 22px
          z-index: 200
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
      .shopcart-list
        position:absolute
        top:0
        left:0
        z-index:-1
        width:100%
        transform: translate3d(0, -100%, 0)
        &.folt-enter-active, &.folt-leave-active
          transition: all 0.3s
        &.folt-enter, &.folt-leave-active
          transform: translate3d(0, 0, 0)
        .list-header
          height:40px
          line-height:40px
          padding:0 18px
          background:#fff
          border-bottom:1px solid rgba(7,17,27,0.1)
          .title
            float:left
            font-size:14px
            color:#666
          .empty
            float:right
            font-size:12px
            color:#666
        .list-content
          padding: 0 18px
          max-height: 220px
          overflow: hidden
          background: #fff
          .food
            position: relative
            padding: 12px 0
            box-sizing: border-box
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 120px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            bottom: 16px
            left:200px
  .listMask
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:40
    backdrop-filter: blur(.1px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
