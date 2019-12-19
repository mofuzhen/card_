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
          <h3>小怪艾克</h3>
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
       <button disabled v-show="status==2">活动未开始</button>
       <button disabled v-show="status==3">活动已结束</button>
       <button  @click="btn" class="participation" v-show="status==1">立即参与</button>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Hello-Parcel',
  data() {
    return {
      message:'',
      status:1,
      text:'',
      no_buy:1,
    }
  },
  methods:{
    outside(event){
      if (event.target.className != 'input') {
          this.no_buy= 2;    //输入框.phone_input以外的位置
      }    
    },
    btn(){
      this.$router.push('/home');
    },
    

  },
  mounted(){
      // axios.get('https://app.playplus.cn/playboom/api/sign/getsign')
      //   .then(res=>{
      //     console.log(res)
      //   })
      //   .catch(err=>{
      //     console.log(err)
      //   })
  }
}
</script>

<style lang="less">
@import './style.less';
</style>


