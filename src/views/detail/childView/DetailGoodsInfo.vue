<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start">
        <span class="yuan"></span>
        <span class="xian"></span>
      </div>
      <div class="desc">
        {{detailInfo.desc}}
      </div>
      <div class="end">
        <span class="xian"></span>
        <span class="yuan"></span>
      </div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imageLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imageLoad () {
      this.$store.state.detailImage++
    }
  }
}
</script>

<style scoped>
.info-list img{
  width: 100%;
}
.info-desc{
  padding: 5px;
}
.start span,.end span{
  display: inline-block;
}
.start,.end{
  margin: 5px;
}
.end{
  text-align: right;
}
.yuan{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: black;
  vertical-align:middle;
}
.xian{
  width: 30%;
  height: 2px;
  background: black;
  vertical-align:middle;
}
.desc{
  margin: 4px;
  font-size: 14px;
}
.info-key{
  color: rgb(113, 186, 228);
  text-align: center;
  font-size: 18px;
  margin-bottom: 15px;
}
</style>
