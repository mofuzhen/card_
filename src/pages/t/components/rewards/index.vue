<template>
  <div class='rewards'>
    <div class='information'>
       <input type="text" placeholder="收货人手机">
    </div>
   
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar  from '../common/tabbar'
export default {
  name: 'App',
  components:{
    tabbar
  }
}
</script>

<style lang="less">
@import './style.less';
</style>

