/**
 * 原生 location 的扩展，命名为 $route
 * 可混入Vue实例中使用：vm.$route
 */

import ENV from '../ENV'

/**
 * build query { a: 1, b: 2 } => 'a=1&b=2'
 * @param {object} query 
 * @return {string}
 */
const buildQuery = (query = {}) => Object.keys(query).map(k => `${k}=${query[k]}`).join('&')

/**
 * build href with env
 * @param {string} url 
 * @param {object} [query]
 * @return {string}
 */
const buildHref = (url, query = {}) => {
  url = ENV.BASE_DIR + url
  query = buildQuery(query)
  const target = url + (url.includes('?') ? query : ('?' + query))
  return target
}

/**
 * get query
 * @param {string|array|undefined} [keys] query name
 * @return {string|object}
 * -- http://xxx.cn?a=1&b=2
 * -- string    : query('a') => '1'
 * -- array     : query(['a', 'b']) => ['1', '2']
 * -- undefined : query() => { a: '1', b: '2' } 
 */
const query = function (keys) {
  const queryArr = decodeURIComponent(location.search).slice(1).split('&').filter(r => r)
  const q = Object.create(null)
  queryArr.forEach(item => {
    const [k, v] = item.split('=')
    q[k] = v
  })
  const isArr = Array.isArray(keys)
  return keys && !isArr ? q[keys] : (isArr ? keys.map(k => q[k]): q)
}
/**
 * Or use like object:
 * query.a => '1'
 * query.b => '2'
 */
const querys = query()
Object.keys(querys).forEach(k => query[k] = querys[k]);

const $route = {
  ...location, // 继承原生的 location
  query,
  buildQuery,
  buildHref,
  path: location.pathname.split('/').filter(Boolean).join('/'),
  routeTo: (url, query) => location.href = buildHref(url, query),  // 带线上域名的跳转
  replaceTo: (url, query) => location.replace(buildHref(url, query)), // 带线上域名的替换
}

export default {
  ...$route,
  computed: {
    $route() {
      return $route
    }
  }
}