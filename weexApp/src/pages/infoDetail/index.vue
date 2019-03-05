<template>
  <div class="details">
    <div v-if='LoadFinished'>
      <div class="title">{{title}}</div>
      <div class="tips">
        <span class="otime">{{otime}} </span>
        <span class="source">{{source}}</span>
      </div>
      <wxParse :content='getContent' @preview="preview" @navigate="navigate" />
    </div>
    <BaseNoData v-if='listState.noData' tip='没有更多的数据了...' color='#666' ></BaseNoData>
    <BaseReload v-if='listState.reLoad' @reloadEvent='getInfoDetailData' color='#666' tip='加载失败点击重试'></BaseReload>
  </div>
</template>

<script>
  import request, { getByURL } from '@/api'
  import BaseNoData from '@/components/BaseNoData'
  import BaseReload from '@/components/BaseReload'
  import wxParse from 'mpvue-wxparse'
  const initListState = {
    loading: false,
    noData: false,
    reLoad: false
  }
  export default {
    components: {
      BaseNoData,
      BaseReload,
      wxParse
    },
    computed: {
      getContent () {
        console.log(3333, this.bodyContent)
        return this.bodyContent
      }
    },
    data () {
      return {
        isReLoad: true,
        listState: {
          loading: false,
          noData: false,
          reLoad: false
        },
        LoadFinished: false,
        bodyContent: '',
        page: {
          title: '',
          source: '',
          otime: ''
        }
      }
    },
    created () {
      this.LoadFinished = false
    },
    mounted () {
      this.getInfoDetailData(this.setContent)
    },
    methods: {
      resetListState () {
        this.listState = {...initListState}
        this.LoadFinished = false
      },
      setContent (res, url, callback) {
        if (/Type=Research/.test(url)) {
          const contentHtml = res.data
          // 取body中的内容，再去除body中的script
          const bodyIndex = contentHtml.lastIndexOf('<body>')
          const bodyLastIndex = contentHtml.lastIndexOf('</body>')
          const content = contentHtml.slice(bodyIndex + 6, bodyLastIndex)
          const noScriptHtml = content.replace(/<script[^>]*>(.|\n)*?(?=<\/script>)<\/script>/gi, '').replace(/color: black/g, 'color: #d0d0d0')
          this.bodyContent = noScriptHtml
          this.$nextTick(() => {
            this.LoadFinished = true
            callback()
          })
        } else {
          if (res.data && res.data[0]) {
            this.page = {
              title: res.data[0].title,
              source: res.data[0].source,
              otime: res.data[0].otime
            }
            this.bodyContent = res.data[0].content
            this.$nextTick(() => {
              this.LoadFinished = true
              callback()
            })
          }
        }
      },
      getInfoDetailData (callback) {
        this.resetListState()
        wx.showLoading({
          title: '加载中'
        })
        let url = this.$root.$mp.query.url
        const { id, types } = this.$root.$mp.query
        // 路由处理
        if (!url) {
          url = 'https://stocknews.htsec.com:9084/ShareNews/ggdetail?id=' + id + '&Type=Research'
        } else {
          if (types === 'totalInfo') {
            url = url + '?id=' + id + '&Type=Research'
          }
        }
        // 掉接口
        request(getByURL, {
          id, url
        }).then((res) => {
          // 接口正确返回时
          if (res.statusCode === 200 && !res.data.errorCode) {
            // 没有数据时
            if (res.data.length <= 0) {
              this.listState = {...initListState, noData: true}
              wx.hideLoading()
            } else {
              if (callback !== null && typeof (callback) === 'function') {
                callback(res, url, () => {
                  wx.hideLoading()
                })
              }
            }
          } else {
            // 接口报错时
            wx.hideLoading()
            this.listState = {...initListState, reLoad: true}
          }
        },
        (error) => {
          wx.hideLoading()
          this.listState = {...initListState, reLoad: true}
          console.log(`${getByURL}接口报错==${error}`)
        })
      },
      preview () {},
      navigate () {}
    }
  }
</script>
<style>
  @import url("~mpvue-wxparse/src/wxParse.css");
  page{
    background: #fff;
    font-size:30rpx;
    word-break:break-all;
  }
  .wxParse{
    /* 资讯详情的字体是#333 */
    color:#333;
  }
</style>

<style scoped>
.details{
  padding:0 8px;
  padding-bottom:10px;
}
.title{
  text-align: center;
  font-size: 14px;
  margin: 4px;
}
.tips{
  text-align: center;
  font-size: 12px;
  color: #2D5D8A;
  margin: 3px;
}
</style>