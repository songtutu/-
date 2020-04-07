<template>
  <div id="swiper-box">
    <div class="swiper" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="itemCount > 1">
        <div v-for="(item, index) in itemCount" class="indi-item" :key="index" :class="{active: index === itemIndex}"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    banner: {},
    // 设置轮播的时间
    interval: {
      type: Number,
      default: 3000
    },
    // 设置动画的时间
    animTime: {
      type: Number,
      default: 300
    },
    // 设置滑动多少为一下张
    moveC: {
      type: Number,
      default: 0.25
    }
  },
  data () {
    return {
      // 当前的index
      itemIndex: 0,
      // 是否正在滚动
      scrolling: false,
      itemWidth: 320
    }
  },
  computed: {
    // 总数
    itemCount () {
      return this.banner.length
    },
    swiperStyle () {
      return document.querySelector('.swiper').style
    }
  },
  mounted () {
    setTimeout(() => {
      this.startTimer()
    }, 300)
    this.itemWidth = window.innerWidth
    window.onresize = () => {
      this.itemWidth = window.innerWidth
    }
  },
  methods: {
    // 开启定时器
    startTimer () {
      this.playTimer = window.setInterval(() => {
        this.itemIndex++
        this.scrollPosition(-this.itemIndex * this.itemWidth)
      }, this.interval)
    },
    // 停止定时器
    stopTimer () {
      window.clearInterval(this.playTimer)
    },
    // 移动动画
    setTransform (position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
    },
    // 滚动到正确位置
    scrollPosition (curPosition) {
      this.scrolling = true
      this.swiperStyle.transition = 'transform ' + this.animTime + 'ms'
      this.setTransform(curPosition)
      this.checkPosition()
      this.scrolling = false
    },
    // 校验位置
    checkPosition () {
      if (this.itemIndex >= this.itemCount) {
        this.itemIndex = 0
      } else if (this.itemIndex < 0) {
        this.itemIndex = this.itemCount - 1
      }
      this.setTransform(-this.itemIndex * this.itemWidth)
    },
    // 接触开始
    touchStart (e) {
      // 如果正在滚动则无法移动
      if (this.scrolling) return
      // 停止计时器
      this.stopTimer()
      // 记录开始位置
      this.startX = e.touches[0].pageX
    },
    // 接触移动
    touchMove (e) {
      // 计算出移动的距离
      this.currX = e.touches[0].pageX
      this.distance = this.currX - this.startX
      // 获得当前item的位置
      let curPosition = this.itemIndex * -this.itemWidth
      let moveDistance = curPosition + this.distance
      this.setTransform(moveDistance)
    },
    // 接触结束
    touchEnd (e) {
      // 获取移动的距离
      let curDistance = Math.abs(this.distance)
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && curDistance > this.itemWidth * this.moveC) {
        this.itemIndex--
      } else if (this.distance < 0 && curDistance > this.itemWidth * this.moveC) {
        this.itemIndex++
      }
      this.scrollPosition(-this.itemIndex * this.itemWidth)
      // 移动完成后重新开启定时器
      this.startTimer()
    }
  }
}
</script>

<style scoped>
  #swiper-box {
    overflow: hidden;
    position: relative;
  }
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }
  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
