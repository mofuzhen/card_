import errorReport from '../utils/errorReport'
import storage from '../utils/storage'
import $http from '../utils/http'

import ENV from '../ENV'

const query = key => {
  const search = decodeURIComponent(location.search)
  const queryMap = new Map(search.slice(1).split('&').map(item => item.split('=')))
  if (key && typeof key === 'string') {
    return queryMap.get(key)
  }
  const obj = Object.create(null)
  queryMap.forEach((v, k) => obj[k] = v)
  return obj
}

const queryString = querys => Object.keys(querys).map(k => `${k}=${querys[k]}`).join('&')

export default {
   data() {
      return {
         user: {},
         openid: '',
         unAuth: false
      }
   },
   created() {
      
   },
   methods: {
      shouldToLogin() {
         const user = storage.get('user') || {}
         if (!user.id || !user.token) {
            return true
         }
         // storage 中有 user
         this.user = user
         return false
      },
      getOpenid(scope = 'snsapi_base') {
         // 从缓存授权
         // const storageOpenid = storage.get('openid')
         // if (storageOpenid) {
         //    return Promise.resolve(storageOpenid)
         // }
         // 从路由授权
         // const queryOpenid = query('openid')
         // if (queryOpenid) {
         //    storage.set('openid', queryOpenid)
         //    return Promise.resolve(queryOpenid)
         // }
         const { code, from, ...otherParams } = query()

         if (from === 'login') {
            return Promise.resolve()
         }
         // 从微信授权
         if (code) {
            storage.remove('user')
            const useUserCode = otherParams.usercode ? { usercode: otherParams.usercode } : {};
               /**
                * @responses data.data
                * !userid ? 新用户 : 老用户
                * !openid ? 授权异常 : 授权成功
                */
            return $http.get('/site/checkuser', { jscode: code, ...useUserCode })
              .then(res => {
                if (+res.data.code === 0) {
                  return res.data
                }
                return Promise.reject(res.data)
              })
              .then(data => {
                // console.log(JSON.stringify(data.data))
                const { openid, user_id: userid, token, user_face, user_nickname } = data.data  
                this.openid = openid
                // if (userid) {
                this.user = { id: userid, token, openid, user_nickname, user_face}
                storage.set('user', this.user)
                return openid
                // } else {
                //    reject(openid)
                // }
              })
              .catch(e => {
                errorReport(e)
                redirectToAuth(scope, location.origin + location.pathname + '?' + queryString(otherParams))
              })
         }
         
        // 第一次进来 !code && from !== 'login'
          redirectToAuth(scope)

         return Promise.reject()
      }
   }
}

function redirectToAuth(scope, href) {
  const REDIRECT_URI = encodeURIComponent(href || location.href);
  const QUERY_STR = queryString({
    appid: ENV.WECHAT_APP_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: scope,
    state: 1,
    connect_redirect: 1
  })

  location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?${QUERY_STR}#wechat_redirect`;
}