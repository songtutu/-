<template>
  <div v-if="Object.keys(shopInfo).length !== 0" class="shop-info">
    <div class="shop-head">
      <img :src="shopInfo.shopLogo" alt="">
      <div class="shop-other">
        <span class="shop-name">{{shopInfo.name}}</span>
        <img class="shop-level" src="~assets/img/detail/hg.png" alt="" v-for="index in shopInfo.level" :key="index">
      </div>
    </div>
    <div class="shop-content">
      <div class="shop-left">
        <div>
          <p class="shop-sell">{{shopInfo.cSells}}</p>
          <p>总销量</p>
        </div>
        <div>
          <p class="shop-goods">{{shopInfo.cGoods}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shop-right">
        <div v-for="(item, index) in shopInfo.score" :key="index">
          <span>{{item.name}}</span>
          <span class="shop-score" :class="{'hight-span':item.isBetter}">{{item.score}}</span>
          <span>
            <span v-if="item.isBetter" class="hight-better better">高</span>
            <span v-if="!item.isBetter" class="low-better better">低</span>
          </span>
        </div>
      </div>
    </div>
    <div class="enter-btn" @click="enterClcik">
        进店逛逛
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    enterClcik () {
      window.location.href = this.shopInfo.shopUrl
    }
  }
}
</script>

<style scoped>
.shop-info{
  padding: 8px;
  color: rgb(73, 73, 73);
  border-bottom: 6px solid rgb(240, 240, 240);
}
.shop-head{
  position: relative;
  width: 100%;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.shop-head>img{
  width: 45px;
  height: 45px;
  border-radius: 5%;
  margin-right: 10px;
  vertical-align: middle;
}
.shop-head span{
  vertical-align: middle;
  font-size: 14px;
}
.shop-content{
  margin-top: 10px;
  display: flex;
  height: 66px;
}
.shop-left{
  flex: 1;
  display: flex;
  font-size: 12px;
  border-right: 1px solid rgb(235, 232, 232);
}
.shop-left div{
  flex: 1;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  line-height: 33px;
}
.shop-sell,.shop-goods{
  font-size: 15px;
}
.shop-right{
  flex: 1;
  text-align: right;
  font-size: 12px;
  line-height: 22px;
}
.shop-right div{
  display: flex;
}
.shop-right div span{
  flex: 1;
  text-align: left;
}
.shop-right div span:nth-child(1){
  flex: 2;
  text-align: center;
}
.shop-score{
  color: green;
}
.hight-span{
  color: red;
}
.better{
  color: white;
  padding: 1px;
  text-align: center;
}
.hight-better{
  background: red;
}
.low-better{
  background: green;
}
.enter-btn{
  width: 45%;
  font-size: 14px;
  padding: 5px;
  color: rgb(100, 100, 100);
  text-align: center;
  background: rgb(240, 240, 240);
  margin: 25px auto;
  border-radius: 5px;
  cursor: pointer;
}
.shop-other{
  display: inline-block;
  vertical-align: middle;
}
.shop-name{
  display: block
}
.shop-level{
  margin-top: 4px;
  width: 16px;
  height: 16px;
}
</style>
