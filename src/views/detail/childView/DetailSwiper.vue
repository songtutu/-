<template>
  <div >
    <swiper :banner="banner" class="deatail-swiper">
    <swiper-item v-for="(item, index) in banner" :key="index">
      <img :src="item" alt="">
    </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  name: 'DetailSwiper',
  props: {
    banner: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.deatail-swiper{
  height: 280px;
  overflow: hidden;
}
</style>
