<template>
    <div >

    <div>
        <el-row :gutter="20" class="mgb20">
        <el-col :span="8" >
            <el-card shadow="hover" class="mgb20" style="height:252px;">
                <div class="user-info">
                    <div class="img-box">
                    <img :src="this.voting.img"  alt />
                    </div>
                    <div class="user-info-cont">
                        <h1 class="user-info-name">{{ this.voting.projectName }}</h1>
                        <span style="margin-top: 6px;color: #666666">------------------------------</span>
                       <div class="part">
<!--                        <p> 状态：{{this.voting.status}}</p>-->
                        <p>拟申请奖项：{{this.voting.prizeName}}</p>
                           <p>当前专家票：{{this.voting.voteCount}}</p>
                       </div>
                    </div>
                </div>

            </el-card>
            <el-card shadow="hover" style="height:300px;">
                <template #header>
                    <div class="clearfix">
                        <span>项目详情</span>
                    </div>
                </template>
              {{this.voting.projectContent}}

            </el-card>
        </el-col>


        <el-col :span="16" style="text-align: center ;">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content grid-con-1">
                            <div class="grid-num">系统评估</div>
                            <div class="grid-cont-right">
                                科技性
                                <el-progress :percentage="this.voting.sys" color="#f1e05a"></el-progress>价值
                                <el-progress :percentage="this.voting.money"></el-progress>需求
                                <el-progress :percentage="this.voting.needs" color="#f56c6c"></el-progress>
                            </div>
                        </div>
                    </el-card>
            <el-card style="margin-top: 20px;height: 415px">
                <h1 > 在线评审</h1>
                    <div class="form-box" >
                        <el-form ref="form"  label-width="80px">
                            <el-form-item label="项目名称">
                                <el-input :placeholder="this.voting.projectName"  :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="评审人">
                                <el-input :placeholder="this.nowpeople" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="您的意见">
<!--                                <el-input-number v-model="num" :precision="2" :step="0.1" :max="10"></el-input-number>-->
<!--                                <span style="color: #E6A23C">（最高分10分）</span>-->
                                <el-radio v-model="radio" label="1">通过</el-radio>
                                <el-radio v-model="radio" label="2">否决</el-radio>
                            </el-form-item>
                            <el-form-item label="评价">
                                <el-input type="textarea" rows="3" v-model="summary" placeholder="输入您的评分理由（选填）"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">提交评审</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

            </el-card>
        </el-col>

        </el-row>
    </div>
    </div>
</template>

<script>
    // import topNav from "../../../components/nav/topNav";
    export default {
        name: "voting",
        components:{
          // topNav
        },
        data(){
          return{
              voting:{},
              nowpeople:'',
              num:0,
              summary:'',
              radio: '1'

          }
        },
        computed:{
            //计算该用户已经审核评分的项目
            newItem(){
                return {
                    name: this.voting.name,
                    socre: this.num,
                    judgePerson: this.nowpeople
                }
            }
        },
        mounted() {
            if(this.$store.state.voting.length===0)
            {
                // this.$router.push("/*/")
            }
            this.getdata()
            console.log(this.voting);
            //获取localstoreage中的nickname
            this.nowpeople=JSON.parse(localStorage.getItem( 'Authorization')).nickname.toString()
            console.log(this.nowpeople)
        },
        methods:{
            getdata(){
                this.voting=this.$store.state.voting[0]
                console.log(this.voting);
            },
            goBack(){
                this.$router.go(-1);
            },
            test(){
                console.log(this.voting);
            },
            onSubmit(){
                //与后端交互实现项目投票状态，并记录当前用户的投票状态
                console.log(JSON.parse(JSON.stringify(this.newItem)))
            },
        }
    }
</script>

<style scoped>
    .grid-cont-right {
        flex: 1;
        text-align: center;
        margin-left: 5px;
        font-size: 14px;
        color: #999;
    }
    .error-code span{
        color: #666666;
    }
    .mgb20{
        margin-bottom: 10px;
    }
    .user-info{
        display: flex;
        text-align: center;
    }
    .user-info-cont{

        text-align: center;
        align-items: center;
        margin-left: 12px;
    }
    .user-info-cont p{

        color: #999999;
        left:20px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .user-info-name{
        width: 160px;
        align-items: center;
        font-weight: bold;
        font-size: 16px;

    }
    .part {
        display: block;
        box-sizing: border-box;
        padding: 10px;
        text-align: left;
    }
    .img-box{
        display: flex;
        width: 150px;
        height: 150px;
    }
    .img-box img{
        width: 100%;
        height: 100%;
    }
    .grid-content {
        display: flex;
    }
    .grid-cont-right {
        flex: 1;
        width: 80%;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .grid-num {
        line-height: 100px;
        padding-right: 5px;
        border-right: 2px solid #666666;
        font-size: 20px;
        font-weight: bold;
    }
    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }
    .form-box{
        text-align: left;
        margin-top: 5px;
    }
</style>