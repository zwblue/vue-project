<template>
  <div class='list-box'>
    <div class="bot-bd item-box" v-for='(item, index) in listData' :key='index'>
      <div class="title">
        {{item.Title}}
      </div>
      <div class="desc">
        {{item.Summary}}
      </div>
      <div class="time">
        {{ item.CreatedDate }}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      listData: {
        type: Array,
        default: {}
      }
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
.list-box{
  color:#8e99ac;
  padding:0 8px;
  font-size: 30rpx;
}
.item-box{
  padding: 8px 0;
}
.title{
  color:#6798d3;
  padding: 8px 0;
  font-size: 34rpx;
}
.time{
  margin-top: 6px;
  text-align: right;
}
</style>