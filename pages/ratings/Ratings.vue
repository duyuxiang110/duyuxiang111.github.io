<template>
    <ratings-comment :seller="seller" :ratings="ratings"></ratings-comment>
</template>

<script>
import axios from 'axios'
import RatingsComment from './components/Comment.vue'

export default {
  name: 'Ratings',
  props: {
    seller: Object
  },
  data () {
    return {
      ratings: []
    }
  },
  methods: {
    getCatingInOf () {
      axios.get('./static/ratings.json').then((res) => {
        console.log(res)
        res = res.data
        if (res.errno === 0) {
          this.ratings = res.data
        }
      }).catch((error) => {
        console.log('喔！ 失败了！', error)
      })
    }
  },
  created () {
    this.getCatingInOf()
  },
  components: {
    RatingsComment
  }
}
</script>

<style lang="stylus" scoped>

</style>
