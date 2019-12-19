const app = require('express')();
const proxy = require('http-proxy-middleware');
const { port, proxyTable } = require('./config');

const proxyConfig = {
  changeOrigin: true,
  onProxyRes: (proxyRes, req) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,OPTIONS,PUT,POST,DELETE'
    proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type'
    proxyRes.headers['Access-Control-Allow-Credentials'] = true
  }
}

module.exports = _ => {
  Object.keys(proxyTable).forEach(prefix => {
    // Proxy
    app.use(prefix, proxy({
      target: proxyTable[prefix],
      ...proxyConfig
    }));
  })
  app.listen(port);
  console.log('Proxy server running at http://localhost:' + port)
}
