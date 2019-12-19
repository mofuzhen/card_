<template>
  <div class='index'>
      <!-- 动态组件 -->
      <component :is="currentComponentId"></component>
      <tabbar @onChangeFragment="onChangeFragment"></tabbar> 
  </div>
</template>

<script>
import tabbar  from '../common/tabbar'
export default {
  name: 'Home',
  data(){
    return{
      currentComponentId: 'home'
    }
  },
  components: {
    tabbar,
    // 异步组件引入方式, 异步组件: 只有在需要去展示这个组件的时候, 才会把组件去进行渲染
    'home' : ()=> import('./component/home'),
    'rewards' : ()=> import('./component/rewards')
  },
  methods:{
    // 组件切换
    onChangeFragment(componentName){
      // 传入参数值要等于异步组件的名称
      this.currentComponentId = componentName;
    }
  }
}
</script>

<style lang="less">
@import './style.less';
</style>


