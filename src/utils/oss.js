/**
 * Author: Tukun33
 * Date: 2018-06-03
 * Description: 构造oss客户端直传 policy & signature
 */

// const Base64 = require('crypto-js/enc-base64');
// const Crypto = require('./Crypto');
const Base64 = require('js-base64').Base64;
// const Crypto = require('crypto-js');
import Crypto from 'crypto-js'
// console.log(Crypto)
class OSSUploader {
   /**
    * @param {Object} options 
    * { maxSize, expire, AccessKeySecret, AccessKeyId }
    */
   constructor(options = {}) {
      this.expiredAt       = this.getPolicyExpiredAt(options.expire)
      this.OSSAccessKeyId  = options.AccessKeyId
      this.policy          = this.getPolicyBase64(options.maxSize, this.expiredAt)
      this.signature       = this.getSignature(this.policy, options.AccessKeySecret)
      this.name            = Date.now() + '-' + this.getRandomString()
   }
   /**
    * 生成上传策略
    * @param {Number} maxSize 最大上传文件的大小 (MB)
    * @param {Number} expiration Policy的失效时间
    * @returns {String}
    */
   getPolicyBase64(maxSize = 5, expiration) {
      const policyText = {
         "expiration": expiration, //设置该Policy的失效时间
         "conditions": [
            ["content-length-range", 0, maxSize * 1024 * 1024] // 设置上传文件的大小限制
         ]
      };
      // return Base64.encode(JSON.stringify(policyText));
      const str = Crypto.enc.Utf8.parse(JSON.stringify(policyText))
      return Crypto.enc.Base64.stringify(str)
   }

   /**
    * 生成签名
    * @param {String} policy
    * @param {String} AccessSecret 密钥
    * @returns {String}
    */
   getSignature(policy, AccessSecret) {
      const bytes = Crypto.HmacSHA1(Crypto.SHA1, policy, AccessSecret, {
         asBytes: true
      });
      console.log(bytes)
      console.log(Crypto)
      // const signature = Crypto.util.bytesToBase64(bytes)
      const signature = Crypto.enc.Base64.stringify(bytes)
      // const signature = bytes.toString(Crypto.enc.Base64)
      // const signature = Base64.encode(bytes)
      // console.log(signature)
      return signature;
   }

   /**
    * policy 失效时间
    * @param {Number} expire 失效时间戳 (秒)
    * @returns {String}
    */
   getPolicyExpiredAt(expire = 7200) {
      const date = new Date();
      date.setHours(date.getHours() + expire / 60 / 60);
      return date.toISOString()
   }
   /**
    * 获取随机字符串
    * @param {Number} len 字符串长度
    * @returns {String}
    */
   getRandomString(len = 16) {
      var STR = 'qwertyuiopasdfghjklzxcvbnm1234567890'
      if (len > STR.length) {
         var i = 0
         while(i < (len / STR.length + 1)) {
            i++
            STR += STR
         }
      }
      return STR
         .split('')
         .map(item => STR[Math.ceil(Math.random() * (STR.length - 1))])
         .join('')
         .slice(0, len)
   }
}

module.exports = OSSUploader

window.OSSUploader = OSSUploader

