<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24"><router-view name="top"></router-view></el-col>
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <router-view name="aside"></router-view>
      <!--右侧内容区-->
      <div class="content-container" :class="{'content-collapse':collapse}">
        <v-tags></v-tags>
        <div class="grid-content bg-purple-light">
          <transition name="fade" mode="out-in">

                  <router-view></router-view>

          </transition>
          <el-backtop target=".grid-content"></el-backtop>
        </div>
      </div>
    </el-col>
  </el-row> 
</template>

<script>
// @ is an alias to /src
import vTags from '@/components/nav/Tags.vue';
import bus from '@/components/nav/bus';

export default {
  name: "Home",
  components: {   
    vTags
  },
  data() {
    return {
      tagsList: this.$store.getters.cachedTags,//[],
      collapse: false,
      loading: false
    };
  },
  created() {
        bus.$on('content-collapse', msg => {
            this.collapse = msg;
        });
        //监听数据 bus.$on("tags",msg={ }) msg中是获取的上文中的集合数据
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            //this.tagsList = arr;     
            this.$store.getters.cachedTags = arr ;         
        });
    }
};
</script>
