<template>
    <div >
        <el-row :gutter="12" v-for="(item,index) in myteam  " :key="index"    >
            <el-col :span="24" >
                <div class="user-info-cont">
                    <div >{{item.teamName}}</div>
                    <div>我的专家组</div>
                </div>
                <el-divider class="between"></el-divider>
<!--                <span style="margin-left: 50px;margin-bottom: 20px">小组成员：</span>-->
            </el-col>

            <el-col :span="8" v-for="(k,j) in item " :key="j">
                <el-card shadow="always" class="mgb20" style="height:252px;"  >
                    <div class="user-info">
                        <img src="@/assets/images/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div >{{ k.expertName }}</div>
                            <div></div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        系统注册时间：
                        <span>2021-7-01</span>
                    </div>
                    <div class="user-info-list">
                        联系电话：
                        <span>{{ k.phone }}</span>
                    </div>
                </el-card>
            </el-col>

        </el-row>

    </div>
</template>

<script>
    export default {
        name: "myTeam",
        data(){
            return {
                teamname:"",
                Team:[],
                myteam:[]
            }
        },
        mounted() {
          fetch("http://localhost:8888/review/queryByExpertId?expertId="+this.$store.state.E_user.userId)
            .then(respose=>respose.json())
            .then((json)=>{
                this.Team=json
                    for(let i=0;i<this.Team.length;i++){
                        fetch("http://localhost:8888/expert/queryByReviewId?reviewId="+this.Team[i].reviewId)
                        .then(response=>response.json())
                        .then(json=>{
                            this.myteam.push(json)
                            console.log(this.myteam)
                            console.log(this.Team[i].reviewName)
                            console.log("------------")
                        })
                        .then(()=>
                        {for(let i=0;i<this.Team.length;i++){
                            this.myteam = this.myteam.map((item,index) => Object.assign(item,{teamName: this.Team[index].reviewName}))
                            } })
                    }
            })
        },
        computed:{
            getname(){
                return  this.teamname=this.myteam[0][0].team
            }
        }

    }
</script>

<style scoped>

.between{
    margin:15px  0 20px 0;
}
.user-info{
    display: flex;
    border-bottom: 2px solid #999999;
    padding-bottom: 25px;
}
.user-info img{
    border-radius: 50%;

}
.user-info-cont {
    margin-top: 20px;
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}
.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}
.user-info-cont div:last-child {
    font-size: 16px;
    margin-top: 8px;
}
.user-info-list{
    font-size: 15px;
    margin: 10px 0 20px 0;

}

</style>