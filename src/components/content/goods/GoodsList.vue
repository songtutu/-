<template>
  <div class="good-box" v-if="goods.length !== 0">
    <goods-item v-for="(item, index) in goods" :key="index" :item='item' :index='index' ></goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'
export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped>
  .good-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
