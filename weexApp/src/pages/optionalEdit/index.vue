<template>
 <scroll-view  class='edit-box' @scroll="scroll" :scroll-y='scrollY'>
  <div class="title bot-bd">
    <div :class="['title' + index, 'title-item']" v-for="(item,index) in titleList" :key="index">
      {{ item }}
    </div>
  </div>
 
  <div class="list-box">
    <div :class="{'list-item': true, 'bot-bd': true, 'acitve-item': true, isHide: scrollY }" :style='{top: activeItemConfig.offsetTop+"px"}'>
      <div class="remove"></div>
      <div class="desc">
        <div class="stock-name">
          {{activeItem.goodsName}}
        </div>
        <div>
          {{activeItem.goodsCode}}
        </div>
      </div>
      <div class="toTop" :class="{hide: true}"></div>
      <div class="move-box">
        <div class="move"></div>
      </div>
    </div>
    <div :class="{'list-item': true, 'bot-bd': true, 'start-item': activeItemConfig.startIndex === index }" v-for="(item, index) in handledStockCodes" :key="index">
      <div class="remove" @click="removeStock(item.goodsCode)"></div>
      <div class="desc">
        <div class="stock-name">
          {{item.goodsName}}
        </div>
        <div>
          {{item.goodsCode}}
        </div>
      </div>
      <div class="toTop" :class="{hide: index === 0}" @click="setTopStock(item.goodsCode)"></div>
      <div class="move-box" :data-index='index' @touchmove='touchmove' @touchend='touchend' @touchstart='touchstart'>
        <div class="move"></div>
      </div>
    </div>
  </div>
 </scroll-view>
</template>

<script>
  // 移动的原理
  // 1、只能在同一个屏幕内进行移动
  // 2、计算开始距离屏幕顶部的位置 this.clientY
  // 3、移动的到某个位置y值得到。 e.touches[0].clientY
  // 4、将y值减去开始位置，得到他移动了多少距离 yMoveValue = e.touches[0].clientY - this.activeItemConfig.clientY
  // 5、计算开始距离外元素的位置 this.startOffsetTop = e.currentTarget.offsetTop
  // 6、计算你选中的item的位置并跟着你移动 this.activeItemConfig.offsetTop = yMoveValue + this.activeItemConfig.startOffsetTop
  // 排序的原理
  // 1、设置每个元素的高固定为54px
  // 2、再根据startOffsetTop来确定移动了哪个index中
  // 3、将选中的index移除
  // 4、并将将要移到的选项中给border-width的宽度设成54px
  // 5、根据offsetTop的位置来计算到底移入了哪个位置
  // 6、将其元素添加到这个元素之前
  import request, { optionStock } from '@/api'
  import { parseData } from '@/utils'
  export default {
    data () {
      return {
        titleList: ['删除', '名称', '置顶', '移动'],
        // 缓存中的数据
        localStockCodes: [],
        // 处理后带名称的数据
        handledStockCodes: [],
        // 当移动时，让屏幕无法滚动
        scrollY: true,
        activeItemConfig: {
          clientY: 0, // 记录距离屏幕的距离
          height: 54, //  item的高度
          offsetTop: 0, // 按照这个对移动的item进行定位
          startOffsetTop: 0, // 距离外元素的开始距离
          endIndex: -1 // 开始的index 用来保留starIndex 在触摸结束后用来删除
        },
        activeItem: {
          goodsCode: '--',
          goodsName: '--'
        }
      }
    },
    onShow () {
      this.activeItemConfig = {
        clientY: 0, // 记录距离屏幕的距离
        height: 54, //  item的高度
        offsetTop: 0, // 按照这个对移动的item进行定位
        startOffsetTop: 0, // 距离外元素的开始距离
        endIndex: -1, // 最终移到的index
        startIndex: -1 // 开始的index 用来保留starIndex 在触摸结束后用来删除
      }
      this.localStockCodes = wx.getStorageSync('addedStockCodeArray')
      console.log('localStockCodes', this.localStockCodes)
      this.getOptionData()
      this.scrollY = true
    },
    computed: {
    },
    methods: {
      async getOptionData () {
        if (this.localStockCodes.length > 0) {
          try {
            const {data} = await request(optionStock, {
              goodsList: this.localStockCodes
            })
            // 需要的值对应的key数组
            const needKeys = ['goodsName', 'goodsCode']
            this.handledStockCodes = parseData(data, 'data', 'field', needKeys)
            console.log(this.handledStockCodes)
          } catch (err) {
            console.log('optionStock接口报错', err)
          }
        }
      },
      removeStock (goodsCode, index = '') {
        if (index === '') {
          index = this.localStockCodes.findIndex((item) => item === goodsCode)
        }
        this.localStockCodes.splice(index, 1)
        wx.setStorageSync('addedStockCodeArray', this.localStockCodes)
        this.handledStockCodes.splice(index, 1)
      },
      setTopStock (goodsCode) {
        const index = this.localStockCodes.findIndex((item) => item === goodsCode)
        const topLocalStock = this.localStockCodes.splice(index, 1)
        const topHandedStock = this.handledStockCodes.splice(index, 1)
        // 返回的是一个数组
        this.localStockCodes.unshift(topLocalStock[0])
        wx.setStorageSync('addedStockCodeArray', this.localStockCodes)

        this.handledStockCodes.unshift(topHandedStock[0])
      },
      touchmove (e) {
        // 1、选中item的y移动了多少
        const yMoveValue = e.touches[0].clientY - this.activeItemConfig.clientY
        // 2、移动item的y现在的位置
        this.activeItemConfig.offsetTop = yMoveValue + this.activeItemConfig.startOffsetTop
        // 3、移动item到了哪个index的范围
        const index = parseInt(this.activeItemConfig.offsetTop / this.activeItemConfig.height)
        // 4、保存下最终到的index， touchend时 添加选中的item
        this.activeItemConfig.endIndex = index
      },

      touchend (e) {
        // 1、拖动完毕，开启滑动
        this.scrollY = true
        // 2、删除选中的item
        this.removeStock('', this.activeItemConfig.startIndex)
        // 3、在最后的index中添加选中的item
        this.localStockCodes.splice(this.activeItemConfig.endIndex, 0, this.activeItem.goodsCode)
        wx.setStorageSync('addedStockCodeArray', this.localStockCodes)
        this.handledStockCodes.splice(this.activeItemConfig.endIndex, 0, this.activeItem)
        // 4、完成后，将endIndex 初始化
        this.activeItemConfig.endIndex = -1
        this.activeItemConfig.startIndex = -1
      },

      touchstart (e) {
        // 1、选中item距离屏幕的y值，
        this.activeItemConfig.clientY = e.touches[0].clientY
        // 2、选中item距离外元素的y值
        this.activeItemConfig.startOffsetTop = e.currentTarget.offsetTop
        // 3、选中的item是第几个
        const startIndex = parseInt(this.activeItemConfig.startOffsetTop / this.activeItemConfig.height)
        // 4、保留item下标index，后来删除
        this.activeItemConfig.startIndex = startIndex
        // 5、选中item的数据
        this.activeItem = this.handledStockCodes[startIndex]
        // 6、移动item的下标，这个是监听改变的
        this.activeItemConfig.endIndex = startIndex
        // 7、移动item的距离，这个是监听改变的
        this.activeItemConfig.offsetTop = e.currentTarget.offsetTop
        // 关闭scroll-view可以轮动 拖动时滚动会出问题
        this.scrollY = false
      },
      scroll (val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped>
.over-auto{
  overflow: auto;
}
.acitve-item{
  position: absolute;
  top:0;
  right:0;
  left:0;
  height: 54px;
  color:#fff; 
  opacity: 1;
  background: #000;

}
.isHide{
  display: none !important;
}
.edit-box{
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right: 0;
  font-size: 30rpx;
  color: #8e99ac;
}
.hide{
  opacity: 0;
}
.title{
  display: flex;
  justify-content: space-between;
  padding: 6px 0 ;
  padding-left: 20px;
  border-color:#203846
}
.visiable-hidden{
  visibility: hidden;
}
.title1{
  width: 31%;
}
.start-item{
  opacity: 0.3;
}
.title3{
  width: 23%;
}
.title-item{
  text-align: center;
}
.list-box{
  position: relative;
}
.list-item{
  border-color:#203846;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 54px;
}
.remove{
  width: 44rpx;
  height: 44rpx;
  margin: 0 3.5px;
  background: url('../../../static/images/optional/remove_zxg.png');
  background-size: 100% 100%;
}
.desc{
  width: 31%;
  text-align: center;
}
.toTop{
  width: 44rpx;
  height: 44rpx;
  margin: 0 3.5px;
  background: url('../../../static/images/optional/option_top.png');
  background-size: 100% 100%;
}
.move-box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  width: 23%;
}
.move{
  width: 44rpx;
  height: 44rpx;
  margin: 0 3.5px;
  background: url('../../../static/images/optional/move_icon.png');
  background-size: 100% 100%;
}
.stock-name{
  color: #d0d0d0;
}
</style>