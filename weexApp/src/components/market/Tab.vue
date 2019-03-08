<template>
  <div class="tab-box top-bd bot-bd">
    <div @click="switchTabIndex(index)" :class="{'item-box': true, 'tab-bd': index === activeIndex}" v-for="(item, index) in tabItems" :key="index">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      activeIndex: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#fff'
      },
      bdColor: {
        type: String,
        default: '#fff'
      }
    },
    data () {
      return {
        tabItems: [
          { name: '沪深' },
          { name: '港股' },
          { name: '全球' },
          { name: '全部' }
        ]
      }
    },
    methods: {
      switchTabIndex (index) {
        this.$emit('switchTabIndex', index)
      }
    }
  }
</script>

<style scoped>
.tab-box{
  display: flex;
  justify-content: space-around;
  height: 36px;
  background: #152630;
  font-size: 30rpx;
  border-color:#203846;
}
.item-box{
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
}
.tab-bd{
  border-bottom: 4rpx solid red;
  color:red;
}
</style>