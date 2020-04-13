<template>
<div class="box">
  <div class="item">
    <div class="item-select">
      <div class="check-btn" :class="{active:isCheck}" @click="checkClick"></div>
    </div>
    <div class="item-content">
      <div class="item-img">
        <img :src="item.image" alt="">
      </div>
      <div class="item-p">
        <span class="item-title">{{item.title}}</span>
        <span v-if="item.discount" class="discount">{{item.discount}}</span>
      </div>
    </div>
  </div>
  <div class="item-price">
    <span>￥{{item.price}}</span>
    <div class="count">
      <span class="jian" @click="jianCount">-</span>
      <span class="item-count">{{item.count}}</span>
      <span class="add" @click="addCount">+</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CartListItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isCheck: this.isActive
    }
  },
  computed: {
    isActive () {
      return this.item.checked
    }
  },
  watch: {
    isActive (newV, oldV) {
      this.isCheck = newV
    }
  },
  methods: {
    checkClick () {
      if (!this.isCheck) this.$store.commit('checkClick', this.item)
      if (this.isCheck) this.$store.commit('qxClick', this.item)
      this.isCheck = !this.isCheck
    },
    jianCount () {
      this.$store.commit('jianCart', this.item)
    },
    addCount () {
      this.$store.commit('addCart', this.item)
    }
  }
}
</script>

<style scoped>
.box{
  margin: 8px;
  padding: 10px 8px;
  background: white;
  border-radius: 3%;
  box-shadow:0 6px 8px rgba(60, 60, 60, 0.2);
}
.item{
  display: flex;
}
.item-select{
  vertical-align: middle;
  position: relative;
  display: inline-block;
}
.check-btn{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgb(179, 177, 177);
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.active::before{
  content: ' ';
  display: inline-block;
  position: absolute;
  top: -1px;
  left: -1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: url('../../../assets/img/cart/gou.png') no-repeat;
  background-size: 18px 18px;
}
.item-content{
  margin-left: 10px;
  flex: 1;
  vertical-align: middle;
  display: flex;
  height: 80px;
  position: relative;
}
.item-content img{
  height: 80px;
  border-radius: 5%;
  margin-right: 20px;
}
.item-price{
  margin-top: 10px;
  text-align: center;
  position: relative;
  font-size: 13px;
  height: 20px;
  font-weight: 700;
  color: rgb(241, 96, 28);
}
.item-p{
  display: inline-block;
  vertical-align: middle;
  height: 80px;
  flex: 1;
}
.item-title{
  display: inline-block;
  font-size: 12px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.discount{
  background: rgb(245, 117, 127);
  color: white;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 7px;
  position: absolute;
  top: 50%;
}
.count{
  position: absolute;
  right: 10px;
  top: -2px;
  border:1px solid rgb(219, 219, 219);
}
.count .item-count {
  display: inline-block;
  padding: 2px 25px;
  font-size: 10px;
  color: rgb(119, 119, 119);
  font-weight: normal;
  vertical-align: middle;
}
.count .jian {
  margin-right: -4px;
  display:inline-block;
  color: rgb(119, 119, 119);
  border-right:1px solid rgb(219, 219, 219);
  padding: 0px 8px;
  font-size: 10px;
}
.count .add {
  margin-left: -4px;
  color: rgb(119, 119, 119);
  display:inline-block;
  border-left:1px solid rgb(219, 219, 219);
  padding: 2px 8px;
  font-size: 10px;
}
</style>
