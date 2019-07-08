<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="decrease " v-show="food.count>0" @click.stop="handleClickDecrease">
          <span class="inner iconfont iconfont-">&#xe606;</span> <!-- 按钮滚动动画 -->
        </div>
      </transition>
        <div class="count" v-show="food.count>0">{{food.count}}</div>
        <div class="add iconfont iconfont1" @click.stop="handleClickAdd">&#xe605;</div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: Object
  },
  methods: {
    // + 按钮没值 clik之后为1，之后每次++
    handleClickAdd () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1) // 想要视图动态内容更新，必须用上vue.set来解决
      } else {
        this.food.count++
      }
      this.$emit('add', event.target) // 传给Menu.vue组件 add 事件，并把每次点击的值传给它
    },
    // - 按钮
    handleClickDecrease () {
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    position:relative
    right:-115px
    bottom:20px
    .decrease
      line-height:24px
      color:rgb(0,160,220)
      .inner
        position:absolute
        top:-6px
        left:-47px
        padding:6px
        font-size:20px
        transition: all 0.2s linear
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .add
      display:inline-block
      font-size:23px
      color:rgb(0,160,220)
      &.iconfont1
        position:absolute
        top:-6px
        padding:6px
    .count
      position:absolute
      width:22px
      text-align:center
      left:-18px
      top:5px
</style>
