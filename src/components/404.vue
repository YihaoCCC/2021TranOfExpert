<template>
  <div class="error-page">
      <div class="error-code">4<span>0</span>4</div>
      <div class="error-desc">啊哦~ 你还没有投票项目喔！快去主页选择你喜欢的项目吧！</div>
      <div class="error-handle">
        <router-link to="/">
          <el-button type="warning" round>返回首页</el-button>
        </router-link>
        <el-button type="warning" round @click="goBack" style="margin-left: 100px;">返回上一页 </el-button>
      </div>
  </div>
</template>
<script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    }
  }
</script>
<style>
  .error-page{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
  }
  .error-code{
    line-height: 1;
    font-size: 200px;
    font-weight: bolder;
    color: #E6A23C;
  }
  .error-code span{
    color: #666666;
  }
  .error-desc{
    font-size: 30px;
    color: #777;
  }
  .error-handle{
    margin-top: 30px;
    padding-bottom: 200px;
  }
  .error-btn{
    margin-left: 100px;
  }
</style>
