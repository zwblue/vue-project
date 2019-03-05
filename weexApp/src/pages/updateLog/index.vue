<template>
  <div class="log-box">
    <div v-for="(item, index) in logList" :key="item.id">
      <div class="title">
        <div class="lf">
          {{item.title}}
        </div>
        <div class="rt">
          {{item.time}}
        </div>   
      </div>
      <div class="content">
        <div class="desc">{{item.desc}}</div>
        <div v-for="(item, arrIndex) in item.contentArray" :key="arrIndex">
          {{(arrIndex + 1) + '.' + item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        logList: [
          {
            title: 'e海通财小程序v1.3.3',
            desc: '更新内容',
            contentArray: ['为小程序添加置顶行情信息'],
            time: '2017年11月'
          },
          {
            title: 'e海通财小程序v1.3.2',
            desc: '更新内容',
            contentArray: ['修改美股指数等分时图显示不正常问题', '修改html解析问题'],
            time: '2017年9月'
          },
          {
            title: 'e海通财小程序v1.3.1',
            desc: '更新内容',
            contentArray: [
              '首页tab增加资讯功能',
              '行情“沪深”中增加资金流入、资金流出模块',
              '行情增加“全球”模块',
              '行情增加“全部”模块',
              '个股分时线增加小红点',
              '个股页面增加“资金”模块',
              '个股页面增加“诊股”模块',
              '“我的”点击二维码增加版本修改信息'
            ],
            time: '2017年7月'
          },
          {
            title: 'e海通财小程序v1.2.5',
            desc: '更新内容',
            contentArray: ['个股十字线重叠问题', '修改其他已知问题'],
            time: '2017年6月1日'
          },
          {
            title: 'e海通财小程序v1.2.4',
            desc: '更新内容',
            contentArray: [
              '首页排版布局修改',
              '首页指数样式修改',
              '新增4小时新闻直播模块，以及更多详情页',
              '新增我的自选模块',
              '新增入口板块、港股',
              '新增自选资讯功能',
              '新增编辑自选股功能',
              '个股页面新增十字线功能',
              '个股页面新增资讯模块',
              '个股页面新增大事件模块',
              '个股页面新增F10模块',
              '修改个股页面添加自选按钮位置',
              '修改个股页面分钟K线下拉菜单',
              '修改其他已知问题'
            ],
            time: '2017年5月31日'
          }
        ]
      }
    }
  }
</script>

<style scoped>
.log-box{
  color:#d0d0d0;
  font-size:30rpx;
}
.title{
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  background: #152630;
}
.content{
  background: #111c24;
  padding: 10px 15px;
}
.desc{
  color:#999;
  margin-bottom: 5px;
}
</style>