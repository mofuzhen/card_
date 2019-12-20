module.exports = {
  // 代理服务端口
  port: 4322,
  // 需要代理的 { 接口前缀 : 目标域名 }
  proxyTable: {
    '/playapp'      : 'https://www.kerp21.com/',
    '/playboomuat'  : 'https://app.playplus.cn/',
    '/playboom'     : 'https://app.playplus.cn/',
  }
}