<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arroe-right"></i>
        </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-other">
      <span class="date">{{commentInfo.created | showDate}}</span>
      <span>{{commentInfo.style}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-imgs">
        <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :item=item :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../../utils/utils'
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    showDate (value) {
      const date = new Date(value * 1000)
      let newDate = formatDate(date)
      return newDate
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title {
    float: left;
    font-size: 15px;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 15px;
  }
  .info-user {
    margin: 10px 0 5px;
  }
  .info-user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .info-user span {
    margin-left: 5px;
    font-size: 12px;
    vertical-align: middle;
  }
  .info-detail {
    padding: 0 5px 15px;
  }
  .info-detail p {
    font-size: 12px;
    color: rgb(44, 43, 44);
    line-height: 1.5;
  }
  .info-other {
    font-size: 8px;
    color: #999;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .date {
    margin-right: 8px;
    letter-spacing: 0.5px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
