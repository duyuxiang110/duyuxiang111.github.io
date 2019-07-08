<template>
    <home-header :seller="seller"></home-header>
</template>

<script>
import HomeHeader from './components/Header.vue'

export default {
  name: 'Home',
  props: {
    seller: Object
  },
  components: {
    HomeHeader
  }
}
</script>

<style lang="stylus" scoped>

</style>
