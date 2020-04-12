<template>
<div v-if="Object.keys(goods).length !== 0">
  <div  class="base-info">
    <div class="info-title">【{{goods.shopName}}】{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.price}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services.length > 4 ? goods.services[index - 1].name.substr(0, 5) : goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
  <detail-shop-info :shopInfo = 'goods.shopInfo'></detail-shop-info>
</div>
</template>

<script>
import DetailShopInfo from 'views/detail/childView/DetailShopInfo'
export default {
  name: 'DetailBaseInfo',
  components: {
    DetailShopInfo
  },
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info{
  padding: 8px;
  padding-bottom: 0px;
  color: rgb(148, 147, 147);
  border-bottom: 6px solid rgb(240, 240, 240);
}
.info-title{
  font-weight: bold;
  color: rgb(73, 73, 73);
  font-size: 15px;
  margin-bottom: 5px;
}
.info-price{
  position: relative;
  padding-top: 5px;
}
.n-price{
  color:rgb(245, 117, 127);
  font-size: 20px;
}
.o-price{
  font-size: 10px;
  text-decoration: line-through;
  margin-right: 5px;
  color: rgb(150, 150, 150);
}
.discount{
  background: rgb(245, 117, 127);
  color: white;
  padding: 3px;
  font-size: 12px;
  border-radius: 7px;
  position:absolute;
  top: 0;
}
.info-other{
  display: flex;
  font-size: 13px;
  color: rgb(150, 150, 150);
  padding-top: 20px;
  padding-bottom: 8px;
  border-bottom: 0.5px solid rgb(235, 232, 232);
}
.info-other span{
  flex: 1;
  text-align: center;
}
.info-other span:first-child,.info-service-item:first-child{
  text-align: left;
}
.info-other span:last-child,.info-service-item:last-child{
  text-align: right;
}
.info-service{
  height: 50px;
  line-height: 50px;
  display: flex;
}
.info-service img{
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
.info-service-item span {
  font-size: 10px;
  vertical-align: middle;
}
.info-service-item{
  flex: 1;
  color: rgb(73, 73, 73);
  font-size: 12px;
  height: 50px;
  text-align: center;
}
</style>
