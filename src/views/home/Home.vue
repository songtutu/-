<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control id="tab-fixed" ref="tabControl1" :titles = '["流行","新款","精选"]' @tabClick='tabClick' v-show="isFixed"></tab-control>
    <scroll class="content" @scroll="scroll" ref="scroll" :pullUpLoad = true @pullingUp = 'pullingUp'>
      <swiper v-if="banner.length" :banner="banner">
        <swiper-item v-for="(item,index) in banner" :key="index">
          <a :href="item.link">
            <img :src='item.image' alt="" @load="imgLoaded">
          </a>
        </swiper-item>
      </swiper>
      <recommend-view :recommend='recommend' @loadFlag = 'reLoad'></recommend-view>
      <feature-view></feature-view>
      <tab-control id="tab-control" ref="tabControl2" class="tab-control" :titles = '["流行","新款","精选"]' @tabClick='tabClick' ></tab-control>
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
// 防抖
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
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
      let func = () => {
        this.isShowLoading = false
        this.$refs.scroll.refresh()
      }
      delay(func, 500)
    },
    tabTop (newValue, oldValue) {
      this.goods['pop'].curPosition = -newValue
      this.goods['new'].curPosition = -newValue
      this.goods['sell'].curPosition = -newValue
    },
    isLoad () {
      if (this.isLoad) this.tabTop = document.querySelector('#tab-control').offsetTop
    }
  },
  activated () {
    this.curTyper = this.$store.curTyper
    this.$refs.scroll.scrollTop(0, this.scrollPositon, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.scrollPositon = this.$refs.scroll.scroll.y
  },
  data () {
    return {
      isShowBackTop: false,
      isShowLoading: false,
      isFixed: false,
      isLoad: false,
      tabTop: 0,
      scrollPositon: 0,
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
          'list': [],
          'curPosition': 0
        },
        'sell': {
          'page': 0,
          'list': [],
          'curPosition': 0
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
      if (page > 1) this.isShowLoading = true
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.page = page
      })
    },
    reLoad (v) {
      this.isLoad = v
    },
    imgLoaded () {
      if (this.isLoad) this.tabTop = document.querySelector('#tab-control').offsetTop
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
      console.log(-this.goods[this.curType].curPosition + '---------' + this.curType)
      this.$refs.scroll.scrollTop(0, this.goods[this.curType].curPosition, 0)
      this.$refs.tabControl1.curIndex = index
      this.$refs.tabControl2.curIndex = index
    },
    // 监听是否显示backtop按钮
    scroll (position) {
      if (position.y < -1000) this.isShowBackTop = true
      else this.isShowBackTop = false
      // tab是否吸顶
      this.isFixed = (-position.y) > this.tabTop
      if (this.isFixed) {
        this.goods[this.curType].curPosition = position.y
      }
      this.scrollPositon = position.y
    },
    // backtop事件滑到顶部
    topClick () {
      this.$refs.scroll.scrollTop(0, 0, 500)
    },
    // 上拉刷新
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
  .content{
    overflow: hidden;
    margin-top: 44px;
  }
  .loading{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #tab-fixed{
    position: absolute;
    top: 44px;
    z-index: 9;
    width: 100%;
  }
</style>
