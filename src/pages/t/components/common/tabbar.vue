<template>
  <div class="tool-bar">
    <!-- tab 按钮 , 需要有一个数据源, 通过这个数据源来去驱动视图-->
    <div
      class="tool-bar-item"
      v-for="(item,index) in toolBarData"
      :key="index"
      @click="onChangeFragment(item,index)"
      :class="{'tool-bar-item-name-h' : index === selectItemIndex}"
    >
      <!-- <img
        class="tool-bar-item-img"
        :src="[index === selectItemIndex ? item.hIcon : item.nIcon]"
        alt
      /> -->
      <p
        class="tool-bar-item-name"
      >{{item.name}}</p>
    </div>
  </div>
  <!-- <div class="page-tabbar"> -->
  <!-- tabs-->
  <!-- <mt-tabbar v-model='current'>
        <mt-tab-item id="home" :class="current==='home'?'mt-tab-item':'mint-bass'">
            首页
        </mt-tab-item>
        <mt-tab-item id="rewards">
            奖励
        </mt-tab-item>
  </mt-tabbar>-->

  <!-- </div> -->
</template>

<script>
export default {
  name: "tabbar",
  props: {
    current: String
  },
  data() {
    return {
      // selected: this.current,
      toolBarData: [
        {
          //名称
          name: "首页",
          //组件名称
          componentName: "home"
        },
        {
          //名称
          name: "奖励",
          //组件名称
          componentName: "rewards"
        }
      ],
      //选中的 tab 按钮
      selectItemIndex: 0
    };
  },
  watch: {
    // current: function(val) {
    //   switch (val) {
    //     case "home":
    //       this.$router.push("/home");
    //       break;
    //     case "rewards":
    //       this.$router.push("/rewards");
    //       break;
    //   }
    // }
  },
  methods:{
    onChangeFragment(item,index){
      this.selectItemIndex = index;
      this.$emit('onChangeFragment',item.componentName)
    }
  }
};
</script>

<style lang="less">
@import "./style.less";
</style>
