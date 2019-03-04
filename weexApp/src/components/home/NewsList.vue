<template>
  <div class='list-box'>
    <div class="item-box" v-for='(item, index) in handledListData' :key='index'>
      <div class="left-point">
        <div class="inner-point"></div>
      </div>
      <div>
        <wxParse :content="getContent(item)" @preview="preview" @navigate="navigate" />
      </div>
      <div style='color:#8e99ac'>
        {{ item.displaytime }}
      </div>
    </div>
  </div>
</template>
<script>
  import { parseData, parseTime } from '@/utils'
  import wxParse from 'mpvue-wxparse'
  export default {
    props: {
      listData: {
        type: Array,
        default: {}
      }
    },
    components: {
      wxParse
    },
    data () {
      return {
      }
    },
    computed: {
      handledListData () {
        if ('Data' in this.listData) {
          const newListData = parseData(this.listData)
          // 循环处理时间
          newListData.forEach(element => {
            if ('displaytime' in element) {
              element.displaytime = parseTime(element.displaytime, '{y}/{m}/{d} {h}:{i}')
            }
          })
          return newListData
        } else {
          return []
        }
      }
    },
    methods: {
      getContent (item) {
        const img = item.image_url ? "<img src='" + item.image_url + "'/>" : ''
        return item.title + img
      },
      preview (src, e) {
        console.log('图片全屏的路径', src)
      },
      navigate (href, e) {
        console.log('链接的路径', href)
      }
    }
  }
</script>
<style>
@import url("~mpvue-wxparse/src/wxParse.css");
.wxParse .p{
  margin: 0;
}
.wxParse{
  /* 默认的parse.css是#666，首页资讯的字体是#d0d0d0 */
  font-size: 30rpx;
  color:#d0d0d0;
  line-height: 24px;
}
</style>

<style scoped>
.list-box{
  color:#d0d0d0;
  padding:10px 8px;
  padding-left: 12px;
  line-height:24px;
  background:#111c24;
  font-size: 30rpx;
}
.item-box{
  position: relative;
  border-left: 1px solid #6798d3;
  margin-left: 2px;
  padding:10px 0;
  padding-left: 13px;
}
.left-point{
  position: absolute;
  left: -11px;
  top: 12px;
  border-radius:50%;
  border:4px solid #111c24;
}
.inner-point{
  width:7px;
  height:7px;
  border-radius:50%;
  background:#6798d3;
  border:3px solid #2f4864;
}
</style>