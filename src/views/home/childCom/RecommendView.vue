<template>
  <div class="recommend">
    <div v-for="(item, index) in recommend" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommend: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      nums: 0,
      flag: false
    }
  },
  methods: {
    imgLoad () {
      this.nums++
    }
  },
  watch: {
    nums (newV, oldV) {
      if (newV === 4) this.flag = true
      this.$emit('loadFlag', this.flag)
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 5px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
