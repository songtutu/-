<template>
  <div class="cart-bottom">
    <div class="item-select">
      <div class="check-btn" :class="{active:isActive}" @click="checkClick"></div>
      <div class="p">全选</div>
    </div>
    <div class="right">
      <div class="sum">合计：<span>￥{{countPrice}}</span></div>
      <div class="js-btn">结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartBottom',
  data () {
    return {
      isActive: this.isCheck
    }
  },
  watch: {
    isCheck (newV, oldV) {
      this.isActive = newV
    }
  },
  methods: {
    checkClick () {
      if (!this.isActive) this.$store.commit('allClick')
      if (this.isActive) this.$store.commit('qxAllClick')
      this.isActive = !this.isActive
    }
  },
  computed: {
    countPrice () {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((pre, now) => {
        pre += now.price * now.count
        return pre
      }, 0)
    },
    isCheck () {
      return this.$store.state.allCheck
    }
  }
}
</script>

<style scoped>
.cart-bottom{
  border-top:1px solid rgba(200, 200, 200, 0.5);
  padding: 0px 10px;
  height: 40px;
  background: white;
  position: relative;
}
.cart-bottom div{
  display: inline-block;
}
.check-btn{
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgb(179, 177, 177);
  vertical-align: middle;
}
.active::before{
  content: ' ';
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: url('../../../assets/img/cart/gou.png') no-repeat;
  background-size: 18px 18px;
}
.item-select{
  position: relative;
  display: inline-block;
}
.p{
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 14px;
}
.right{
  height: 40px;
  line-height: 40px;
}
.sum{
  color:black;
}
.sum span {
  color: rgb(241, 96, 28);
  font-size: 13px;
}
.js-btn{
  margin-left: 15px;
  height: 30px;
  line-height: 30px;
  padding:0px 30px;
  color: white;
  font-weight: normal;
  font-size: 14px;
  border-radius: 5%;
  background: linear-gradient(to right, rgb(255, 114, 2), rgb(255, 74, 1));
}
</style>
