<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" :class="{active: index==curIndex}" v-for="(item, index) in titles" :key="index" @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNav',
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      curIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    backClick () {
      this.$router.go(-1)
    },
    titleClick (index) {
      this.curIndex = index
      this.$emit('titleClick', index)
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
  font-weight: bold;
}
.title-item{
  flex: 1;
  text-align: center;
}
.back img{
  margin-top: 12px;
  margin-left: 10px;
  width: 18px;
  height: 18px;
}
.active{
  color: var(--color-high-text);
}
</style>
