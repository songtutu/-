<template>
  <div class="detail-bottom">
    <div class="left">
      <div class="left-item">
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div class="left-item">
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div class="left-item" @click='collClcik'>
        <i class="icon coll"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="add-car">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottom',
  methods: {
    collClcik () {
      let dom = document.querySelector('.coll')
      if (dom.style.backgroundPosition === '') {
        dom.style.backgroundPosition = '0px -26px'
      } else {
        dom.style.backgroundPosition = ''
      }
    }
  }
}
</script>

<style scoped>
  .detail-bottom{
    border-top: 1px solid  rgb(209, 211, 209);
    background: white;
    height: 49px;
    width: 100%;
    position: fixed;
    z-index: 9;
    display: flex;
  }
  .left{
    flex: 2;
    justify-content: space-around;
  }
  .right{
    flex: 3;
    justify-content: center;
    align-items:center;
    font-size: 12px;
    color: white;
    padding: 0px 10px;
  }
  .left,.right{
    display: flex;
    height: 100%;
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .left-item .icon{
    flex: 1;
    display: block;
    width: 22px;
    height: 22px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
 .left-item .service {
    background-position: 0 -53px;
  }
 .left-item .shop {
    background-position: 0 -98px;
  }
  .left-item span{
    font-size: 12px;
    color: rgb(79, 88, 79);
  }
  .right div{
    display: inline-block;
    flex: 1;
    vertical-align: middle;
    text-align: center;
    padding: 12px 0px;
  }
  .right .add-car{
    background: linear-gradient(to right, rgb(255, 196, 0), rgb(255, 150, 0));
    border-top-left-radius: 10%;
    border-bottom-left-radius: 10%;
  }
  .right .buy{
    background: linear-gradient(to right, rgb(255, 114, 2), rgb(255, 74, 1));
    border-top-right-radius: 10%;
    border-bottom-right-radius: 10%;
  }
</style>
