<template>
  <div class="punch_card" @click='outside($event)'>
    <!-- 底图背景-->
      <div class="card_bg">
        <img src="../../../../components/img/底图.png" alt="">
      </div>
      <!-- 悬浮卡片 -->
      <div class="card_phone">
        <div class="cardPhone_top">
          <img src="../../../../components/img/phone.png" alt="">
          <span>{{title}}</span>
        </div>
        <p>购课用户打卡送礼啦</p>
      </div>
      <!-- 输入框 -->
     <div class="phone_input"  >
        <input v-model="message" class="input"  oninput = "value=value.replace(/[^\d]/g,'')" placeholder="请输入购买课程的手机号" name="tel" maxlength="11">
        <span></span>
     </div>
     <!-- 判断购买 -->
     <div class="no_buy">
       <p v-show="no_buy==2">
         <span class="star">＊</span>
            当前手机号尚未购买课程
         <span>限时抢购</span>
       </p>
     </div>
     <!-- 状态按钮 -->
     <div class="btn">
       <button disabled v-show="status==2">活动已结束</button>
       <button  @click="btn" class="participation" v-show="status==1">立即参与</button>
     </div>
  </div>
</template>

<script>
import { Auth } from '../../../../mixins'
import axios from 'axios'
import storage from '../../../../utils/storage'
export default {
  name: 'Hello-Parcel',
  mixins: [Auth],
  data() {
    return {
      message:'',
      status:1,
      text:'',
      no_buy:1,
      title:''
    }
  },
  methods:{
    outside(event){
      if (event.target.className != 'input') {
          this.no_buy= 2;    //输入框.phone_input以外的位置
      }    
    },
    btn(){
      this.$http.get(`/sign/checkphone`, {
        iphone: this.message,
        openid: this.openid
      }).then(res => {
        const data=res.data.data
        // if(data.is_buy==1){
           this.$router.push('/home');
        // }
      }).catch(err=>{
        console.log(err)
      })
    },
    getsign() {
      this.$http.get('/sign/getsign').then(res => {
      //  alert(res);
          const data=res.data.data[0];
          this.title=data.title
          console.log(this.title)
          this.status=data.status
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  created() {
    const user = storage.get('user') || {}
    if (user.openid) {
      this.getsign()
    } else {
      this.getOpenid().then(this.getsign)
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="less">
@import './style.less';
</style>


