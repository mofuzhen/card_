<template>
  <div class="rewards">
    <!-- 卡片 -->
    <div class="rewards_picture">
      <div class="rewardsPiture_top">
        <h3>疯狂多米诺</h3>
        <p>审核状态：待审核</p>
      </div>
      <!--背景图-->
      <div class="rewards-img">
        <img src="../../../../../components/img/艾克.png" alt />
      </div>
    </div>
    <!-- 收货信息 -->
    <div class='input'>
      <div class='input-item'>
        <input type="text" placeholder="收货手机号">
      </div>
      <div class='input-item'>
        <input type="text" placeholder="手机号密码">
      </div>
      <div class='input-item'>
        <input type="text" placeholder="收货地址">
      </div>
  </div>
</template>

<script>
export default {
    name:"rewards",
    data(){
        return{

        }
    }
};
</script>

<style>
</style>