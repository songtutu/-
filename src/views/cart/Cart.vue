<template>
<div class="cart">
  <nav-bar class="cart-nav">
    <div slot="center">购物车（{{num}}）</div>
  </nav-bar>
  <cart-list></cart-list>
  <cart-bottom></cart-bottom>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from '../cart/childView/CartList'
import CartBottom from './childView/CartBottom'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottom
  },
  computed: {
    num () {
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
  background: rgb(244, 244, 244);
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
