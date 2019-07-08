<template>
    <goods-menu :goods="goods" :seller="seller"></goods-menu> <!-- 本组件数据和app组件数据一起传入 -->
</template>

<script>
import GoodsMenu from './components/Menu.vue'
import axios from 'axios'

export default {
  name: 'Goods',
  props: {
    seller: Object // 接收从app视图传来的数据
  },
  components: {
    GoodsMenu
  },
  data () {
    return {
      goods: []
    }
  },
  methods: {
    getGoodsInfo () {
      axios.get('./static/goods.json').then((res) => {
        console.log(res)
        res = res.data
        if (res.errno === 0) {
          this.goods = res.data
        }
      })
    }
  },
  created () {
    this.getGoodsInfo()
  }
}
</script>

<style lang="stylus" scoped>

</style>
