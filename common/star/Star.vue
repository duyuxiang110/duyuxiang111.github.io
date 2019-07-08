<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) of itemClasses" :class="itemClass" class="star-item" :key="index"></span>
    </div>
</template>

<script>
const LENGTH = 5// 总评分数
const CLS_ON = 'on'// 全星
const CLS_HALF = 'half'// 半星
const CLS_OFF = 'off'// 无星
export default {
  props: {
    size: Number, // 通过自定义组件外部传尺寸，你就显示多少尺寸
    score: Number// ratings数据里多少分
  },
  computed: {
    // 拼接star + size ，然后下面的CSS改变样式
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2 // 向下取整小算法
      let hasDecimal = score%1 !== 0 // 小数，不为0
      let integer = Math.floor(score) // 直接向下取整
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 如果小数部分如4.5 3.5 ，那我就让一个半星
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 小于5 直接补 无星
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  .star
    font-size:0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          background-image:url('star24_on@2x.png')
        &.half
          background-image:url('star24_half@2x.png')
        &.off
          background-image:url('star24_off@2x.png')
</style>
