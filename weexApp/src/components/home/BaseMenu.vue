<template>
  <div class="menu-box">
    <div class="menu-item-box" @tap="jumpToPage" v-for="(item,index) in menuData" :key="index">
      <div class="menu-item" :style='{background:"#"+item.bg}'>
        <image class="menu-icon" :src='item.icon'></image>
      </div>
      <div class="menu-title">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
const defaultMenuData = [
  {name: '我的自选', type: 'tab', path: '../optional/main', bg: '5f93ed', icon: require('../../../static/images/ht_12.png')},
  {name: '自选资讯', type: 'tab', path: '../optional/main', bg: 'e16969', icon: require('../../../static/images/ht_03.png')},
  {name: '板块', type: 'tab', path: '../optional/main', bg: 'e38900', icon: require('../../../static/images/block.png')},
  {name: '港股', type: 'tab', path: '../optional/main', bg: 'c74a23', icon: require('../../../static/images/hk.png')},
  {name: '热搜股票', type: 'tab', path: '../optional/main', bg: 'e4ad2e', icon: require('../../../static/images/ht_19.png')},
  {name: '龙虎榜', type: 'tab', path: '../optional/main', bg: 'd45b26', icon: require('../../../static/images/ht_21.png')},
  {name: '条件选股', type: 'tab', path: '../optional/main', bg: '49b0b0', icon: require('../../../static/images/ht_09.png')},
  {name: '新股日历', type: 'tab', path: '../optional/main', bg: '824ca6', icon: require('../../../static/images/ht_18.png')}
]
export default {
  props: {
    menuData: {
      type: Array,
      default: defaultMenuData
    }
  },
  mounted () {
    console.log(this.menuData)
  },
  methods: {
    jumpToPage (url) {
      console.log(wx)
      wx.switchTab({
        url: '../optional/main',
        'open-type': 'switchTab'
      })
    }
  }
}
</script>
<style scope>
.menu-box{
 width: 100%;
 color: #e6eaf2;
 background: #111c24;
 display: flex;
 flex-wrap: wrap;
}
.menu-item-box{
  width: 25%;
  text-align: center;
  margin: 15px 0;
}
.menu-item{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 6px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}
.menu-icon{
  width: 60rpx;
  height: 60rpx;
}
</style>