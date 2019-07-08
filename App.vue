<template>
  <div id="app">
     <header-home :seller="seller"></header-home>
     <div class="tab">
        <div class="tab-item">
          <router-link to="/Goods">
            点餐
            <span class="icon"></span>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/Ratings">
            评轮
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/Seller">
            商家
          </router-link>
        </div>
    </div>
    <router-view :seller="seller"/> <!-- 视图传入ajax数据 -->
  </div>
</template>

<script>
import headerHome from './pages/home/Home.vue'
import axios from 'axios'
import {urlParse} from '@/common/urlParse.js'

export default {
  name: 'app',
  data () {
    return {
      seller: { // 每个商家都有id值,从url参数看到
        id: (() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  components: {
    headerHome
  },
  methods: {
    getHomeInOf () {
      axios.get('./static/index.json?id=' + this.seller.id).then(res => {
        res = res.data
        if (res.errno === 0) {
          this.seller = Object.assign({}, this.seller, res.data)
          console.log(this.seller.id)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getHomeInOf()
  }
}
</script>

<style lang="stylus" scoped>
  .tab-item
    float:left
    overflow:hidden
    width:33.33%
    height:30px
    padding-top:10px
    text-align:center
    font-size:20px
    & > a
      display: block
      font-size: 16px
      color: rgb(169, 169, 169)
      &.active
        color: rgb(35, 149, 255)
        font-weight:600
</style>
