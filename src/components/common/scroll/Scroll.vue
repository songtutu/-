<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动的位置
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    // 滑动到顶部
    scrollTop (x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
    // 完成上拉加载更多
    finishPullUp () {
      this.scroll.finishPullUp()
    },
    // 刷新界面高度
    refresh () {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
