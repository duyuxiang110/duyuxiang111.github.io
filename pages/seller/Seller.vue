<template>
    <seller-merchant :seller="seller"></seller-merchant>
</template>

<script>
import SellerMerchant from './components/Merchant.vue'

export default {
  name: 'Seller',
  props: {
    seller: Object
  },
  components: {
    SellerMerchant
  }
}
</script>

<style lang="stylus" scoped>

</style>
