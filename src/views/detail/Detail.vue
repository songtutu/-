<template>
<div>
  <div id="detail">
    <detail-nav class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav>
    <scroll class="content" ref="scroll" @scroll='contenScroll'>
      <detail-swiper v-if="flag" class="detail-swiper" :banner='topImagesList'></detail-swiper>
      <mt-spinner v-else :type='3' color='gray' class='loading'></mt-spinner>
      <detail-base-info :goods = 'goods'></detail-base-info>
      <detail-goods-info :detailInfo='detailInfo'></detail-goods-info>
      <detail-params-info ref='params' :itemParams='itemParamsInfo'></detail-params-info>
      <detail-comment-info ref='comment' :commentInfo='commentInfo'></detail-comment-info>
      <goods-list ref="recommend" :goods='recommends'></goods-list>
    </scroll>
    <detail-bottom @addCar='addCar'></detail-bottom>
  </div>
  <mt-spinner :size='50' :type='3' color='gray' id='loading'></mt-spinner>
</div>
</template>

<script>
import DetailNav from 'views/detail/childView/DetailNav'
import {getDetail, getRecommends, Goods, ItemParams, Product} from 'network/detail'
import DetailSwiper from 'views/detail/childView/DetailSwiper'
import DetailBaseInfo from 'views/detail/childView/DetailBaseInfo'
import DetailGoodsInfo from 'views/detail/childView/DetailGoodsInfo'
import DetailParamsInfo from 'views/detail/childView/DetailParamsInfo'
import DetailCommentInfo from 'views/detail/childView/DetailCommentInfo'
import DetailBottom from 'views/detail/childView/DetailBottom'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { Toast } from 'mint-ui'
const delay1 = (function () {
  let timer1 = 0
  return function (callback, ms) {
    clearTimeout(timer1)
    timer1 = setTimeout(callback, ms)
  }
})()
export default {
  name: 'Detail',
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottom
  },
  data () {
    return {
      iid: null,
      topImagesList: [],
      flag: false,
      goods: {},
      shopInfo: {},
      detailInfo: {},
      itemParamsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      timerQ: null,
      curIndex: 0,
      isClick: true,
      clcikTimer: null
    }
  },
  computed: {
    detailImage () {
      return this.$store.state.detailImage
    },
    detailLoaded () {
      return this.$store.state.detailLoaded
    }
  },
  watch: {
    detailImage (newV, oldV) {
      let func = () => {
        if (this.$refs.scrollrefresh) this.$refs.scroll.refresh()
      }
      delay1(func, 500)
    },
    detailLoaded (newV, oldV) {
      if (this.timerQ) clearTimeout(this.timerQ)
      this.timerQ = setTimeout(() => {
        if (this.themeTopYs[1] === undefined && this.timerQ) {
          this.checkLoad()
        } else {
          this.func()
          document.querySelector('#detail').style.visibility = 'visible'
          document.querySelector('#loading').style.visibility = 'hidden'
        }
      }, 100)
    }
  },
  methods: {
    titleClick (index) {
      this.$refs.scroll.scrollTop(0, -this.themeTopYs[index], 100)
      this.curIndex = index
    },
    contenScroll (position) {
      let y = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.curIndex !== i && ((i < length - 1 && y >= this.themeTopYs[i] && y < this.themeTopYs[i + 1]) || (i === length - 1 && y >= this.themeTopYs[i]))) {
          this.curIndex = i
          this.$refs.nav.curIndex = this.curIndex
        }
      }
    },
    func () {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      if (this.$refs.scrollrefresh) this.$refs.scroll.refresh()
    },
    checkLoad () {
      clearTimeout(this.timerQ)
      this.timerQ = setTimeout(() => {
        this.func()
        if (this.themeTopYs[1] === undefined && this.timerQ) {
          this.checkLoad()
        }
        if (this.themeTopYs[1] !== undefined) {
          document.querySelector('#detail').style.visibility = 'visible'
          document.querySelector('#loading').style.visibility = 'hidden'
        }
      }, 100)
    },
    addCar () {
      if (this.isClick) {
        this.isClick = false
        if (this.clcikTimer) clearTimeout(this.clcikTimer)
        this.clcikTimer = setTimeout(() => {
          this.isClick = true
        }, 1000)
        let product = new Product(this.topImagesList[0], this.goods.title, this.goods.desc, this.goods.lowNowPrice, this.iid, this.goods.discount)
        this.$store.commit('addCar', product)
        Toast({
          message: '加入购物车成功',
          iconClass: 'icon icon-success',
          duration: 1000
        })
      }
    }
  },
  created () {
    this.iid = this.$route.query
    let id = ''
    for (let i in this.iid) {
      id = id + this.iid[i]
    }
    this.iid = id
    getDetail(this.iid).then(res => {
      this.topImagesList = res.result.itemInfo.topImages
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo, res.result.shopInfo.services)
      // 获取商店信息
      this.shopInfo = res.result.shopInfo
      // 获取商品信息
      this.detailInfo = res.result.detailInfo
      // 获取参数信息
      this.itemParamsInfo = new ItemParams(res.result.itemParams.info, res.result.itemParams.rule)
      if (res.result.rate.cRate !== 0) this.commentInfo = res.result.rate.list[0]
      // 数据请求完改变状态
      this.flag = true
    })
    getRecommends().then(res => {
      this.recommends = res.data.list
    })
  }
}
</script>

<style scoped>
#loading{
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
#detail{
  visibility: hidden;
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh ;
}
.loading{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.content{
  height: calc(100% - 44px - 49px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color:white
}
</style>
