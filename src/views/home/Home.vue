<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" @scroll="scroll" ref="scroll" :pullUpLoad = true @pullingUp = 'pullingUp'>
      <swiper :banner="banner">
        <swiper-item v-for="(item,index) in banner" :key="index">
          <a :href="item.link">
            <img :src='item.image' alt="">
          </a>
        </swiper-item>
      </swiper>
      <recommend-view :recommend='recommend'></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles = '["流行","新款","精选"]' @tabClick='tabClick'></tab-control>
      <goods-list :goods='goods[curType].list'></goods-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomemultidata, getHomeGoods} from 'network/home'
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'
import RecommendView from './childCom/RecommendView'
import FeatureView from './childCom/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
export default {
  name: 'Home',
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    imgLoad () {
      return this.$store.state.imgLoaded
    }
  },
  watch: {
    imgLoad (newValue, oldValue) {
      this.$refs.scroll.refresh()
    }
  },
  data () {
    return {
      isShowBackTop: false,
      curType: 'pop',
      banner: [],
      dKetword: {},
      keywords: {},
      recommend: [],
      goods: {
        'pop': {
          'page': 0,
          'list': [],
          'curPosition': 0
        },
        'new': {
          'page': 0,
          'list': []
        },
        'sell': {
          'page': 0,
          'list': []
        }
      }
    }
  },
  created () {
    getHomemultidata().then(res => {
      res = res.data
      this.banner = res.banner.list
      this.dKetword = res.dKetword
      this.keywords = res.keywords
      this.recommend = res.recommend.list
    })
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  mounted () {
    let height = window.innerHeight - 44 - 49
    document.querySelector('.content').style.height = height + 'px'
  },
  methods: {
    // 获取数据
    getHomeData (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.page = page
      })
    },
    // tab的点击事件
    tabClick (index) {
      switch (index) {
        case 0 :
          this.curType = 'pop'
          break
        case 1 :
          this.curType = 'new'
          break
        case 2 :
          this.curType = 'sell'
          break
      }
    },
    // 监听是否显示backtop按钮
    scroll (position) {
      if (position.y < -1000) this.isShowBackTop = true
      else this.isShowBackTop = false
    },
    // backtop事件滑到顶部
    topClick () {
      this.$refs.scroll.scrollTop(0, 0, 500)
    },
    pullingUp () {
      this.getHomeData(this.curType)
      this.$refs.scroll.finishPullUp()
    }
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
  .tab-control{
    width: 100%;
    z-index: 9;
  }
  .content{
    overflow: hidden;
  }
</style>
