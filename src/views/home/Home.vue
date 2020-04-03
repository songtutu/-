<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <swiper :banner="banner">
      <swiper-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src='item.image' alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomemultidata} from 'network/home'
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'
export default {
  name: 'Home',
  components: {
    NavBar,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      banner: [],
      dKetword: {},
      keywords: {},
      recommend: []
    }
  },
  created () {
    getHomemultidata().then(res => {
      res = res.data
      this.banner = res.banner.list
      this.dKetword = res.dKetword
      this.keywords = res.keywords
      this.recommend = res.recommend.list
      console.log(this.banner)
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    text-align: center;
  }
</style>
