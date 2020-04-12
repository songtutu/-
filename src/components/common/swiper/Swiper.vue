<template>
  <div id="swiper-box">
    <div class="swiper" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount> 1">
        <div v-for="(item, index) in slideCount" class="indi-item" :key="index" :class="{active: index === currentIndex-1}"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false// 是否正在滚动
    }
  },
  mounted: function () {
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom()
      // 2.开启定时器
      this.startTimer()
    }, 100)
  },
  methods: {
    //  定时器操作
    startTimer: function () {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTimer: function () {
      window.clearInterval(this.playTimer)
    },
    // 移动动画
    scrollContent: function (currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true
      // 1.开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms'
      this.setTransform(currentPosition)
      // 2.判断滚动到的位置
      this.checkPosition()
      // 4.滚动完成
      this.scrolling = false
    },
    // 校验位置
    checkPosition: function () {
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.swiperStyle.transition = '0ms'
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }
        // 2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex - 1)
      }, this.animDuration)
    },
    setTransform: function (position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`
    },
    handleDom: function () {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper')
      let slidesEls = swiperEl.getElementsByClassName('slide')
      // 2.保存个数
      this.slideCount = slidesEls.length
      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, slidesEls[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swiperStyle = swiperEl.style
      }
      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth)
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
      } else if (this.distance > 0 && curDistance > this.totalWidth * this.moveRatio) {
        this.currentIndex--
      } else if (this.distance < 0 && curDistance > this.totalWidth * this.moveRatio) {
        this.currentIndex++
      }
      this.scrollContent(-this.currentIndex * this.totalWidth)
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
