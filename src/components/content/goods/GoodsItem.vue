<template>
  <div class="goods-item"  >
    <img class="goods-img" :src='item.show.img' alt="" ref="img" @load="imageLoad">
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="sc">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number
    }
  },
  mounted () {
    let height = this.$refs.img.offsetHeight
    if (height < window.innerWidth * 0.7) {
      document.querySelectorAll('.goods-img')[this.index].style.height = window.innerWidth * 0.7 + 'px'
    }
    if (height > window.innerWidth * 0.75) {
      document.querySelectorAll('.goods-img')[this.index].style.height = window.innerWidth * 0.75 + 'px'
    }
  },
  methods: {
    imageLoad () {
      this.$store.state.imgLoaded++
    }
  }
}
</script>

<style scoped>
  .goods-item{
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .sc{
    position: relative;
  }
  .goods-info .sc::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
