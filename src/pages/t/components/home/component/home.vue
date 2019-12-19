<template>
    <div class="page-tabbar">
      <!-- 底图背景-->
      <div class="card_bg">
        <img src="../../../../../components/img/底图.png" alt />
      </div>
      <!-- 悬浮卡片 -->
      <div class="card_picture">
        <div class="cardPiture_top">
          <h3>疯狂多米诺</h3>
          <p>请上传包含4天分享内容的截图1张</p>
        </div>
        <!--背景图-->
        <div class="card-img">
          <img src="../../../../../components/img/艾克.png" alt />
        </div>
      </div>
      <!-- 图片上传 -->
      <div class="image-upload">
          <div class="image-upload-item">
              <img class="user-image" :src="src" alt="">
              <!-- <p>示例图</p> -->
          </div>
           <div class="image-upload-item">
              <!-- <input type="file" id="img_flie"/> -->
              <a href="javascript:;" class="a-upload">
              <img class="add" src="../../../../../components/img/添加.png" alt="">
              <input id='upload' type="file" name="" placeholder="点击" @change="upload">
                点击上传
              </a>
           </div>
      </div>
    </div>
</template>

<script>
export default {
    name:"home",
    data(){
        return{
            src:require('../../../../../components/img/艾克.png')
        }
    },
    methods:{
      upload(e){
        var picture_=e.target.files[0]
        console.log(picture_)
        var myfrom=new FormData();
        myfrom.append('file',picture_)
        console.log(myfrom)
      },
    }
};
</script>

<style>
</style>