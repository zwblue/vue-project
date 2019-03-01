export const BASE_URL = 'https://pch5.htsec.com/'
// 指数
export const marketIndex = BASE_URL + 'marketIndex'
// 24小时新闻列表
export const getnews24List = BASE_URL + 'api/AStocksInfo'
// 搜索
export const searchStock = BASE_URL + 'stock/searchStock'
// 资讯列表
export const getStockInfo = BASE_URL + 'api/htsecResearch'
// 自选股数据
export const optionStock = BASE_URL + 'quote/zxgList'
// 行情数据
export const quotaStock = BASE_URL + 'stock/stockDynamic'
// 分时数据
export const Minutes = BASE_URL + 'minute/minute'
// K数据
export const kline = BASE_URL + 'KLine/KLine'

// 龙虎榜数据
export const longHuMenuUrl = BASE_URL + 'api/LongHuMenu'
// 个股龙虎榜
export const longhuPeriodUrl = BASE_URL + 'api/longhuPeriod'
// 营业部龙虎榜
export const branchPeriod = BASE_URL + 'api/BranchPeriod'
// 个股龙虎榜明细
export const longHuDetailUrl = BASE_URL + 'api/LongHuBlueData'

// 热搜
export const hotSearchUrl = BASE_URL + 'api/hotSearch'

// 新股申购详细信息接口
export const basicInfoNewByIdUrl = BASE_URL + 'api/stockNewsApi/BasicInfoNewById'
// 公司基本信息接口
export const basicInfoNewDetailByIdUrl = BASE_URL + 'api/stockNewsApi/BasicInfoNewDetailById'
// 当日申购列表接口
export const basicInfoNewNowUrl = BASE_URL + 'api/stockNewsApi/BasicInfoNewNow'
// 新股申购列表接口
export const basicInfoNewversionUrl = BASE_URL + 'api/stockNewsApi/BasicInfoNewversion'
// 今日可申购个股数
export const getNewstockCountUrl = BASE_URL + 'api/stockNewsApi/GetNewstockCount'
// 已发行待上市接口
export const issuedlistedUrl = BASE_URL + 'api/stockNewsApi/issuedlisted'
// 上市表现接口 (近2个月上市股票)
export const stockperformanceUrl = BASE_URL + 'api/stockNewsApi/stockperformance'

// zdf榜
export const getOnTheList = BASE_URL + 'quote/quoteList'
// 板块
export const bkList = BASE_URL + 'BKList'
// 智能选股菜单
export const stockToolMenu = BASE_URL + 'api/searchstocktab?version=default'
// 智能选股搜索股票
export const stockSearchList = BASE_URL + 'api/searchstock'

// 研报
// TradingCode=600640&type=Default&pageNum=1&pageSize=10
export const StockResearch = BASE_URL + 'api/StockResearchReport'
// f10信息
// tradingCode=SH600837
export const f10DetaiUrl = BASE_URL + 'api/BriefingF10'
export const f10Share = BASE_URL + 'api/F10Shareholder'

// 大事件
export const StockKeyNews = BASE_URL + 'api/StockKeyNews'
// 公司简介
export const f10Company = BASE_URL + 'api/F10CompanyInfor'
// 行业地位
export const f10StatusUrl = BASE_URL + 'api/F10IndustryRank'

// 财务指标
export const financeUrl = BASE_URL + 'api/F10MainFinance'

// 自选股资讯
export const ZXGListInfo = BASE_URL + 'ZXG/ZXGListInfo'
// 个股新闻
export const getGsxw = BASE_URL + 'api/getGsxw'
// 个股公告
export const getGsgg = BASE_URL + 'api/getGsgg'
// 个股更多
export const getByURL = BASE_URL + 'api/getByURL'

// pdfURl
export const pdfUrl = BASE_URL + 'api/requestFile.pdf'

// 诊股
export const clinicShareFrontUrl = BASE_URL + 'api/DiagnosisStocksFront'
export const clinicShareEndUrl = BASE_URL + 'api/DiagnosisStocksEnd'
export const industryDiagnosisUrl = BASE_URL + 'api/IndustryDiagnosisStocks'
export const basicAspectUrl = BASE_URL + 'api/FundamentalDiagnosisStocks'

export default function request (url, data = {}, method = 'POST') {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}
