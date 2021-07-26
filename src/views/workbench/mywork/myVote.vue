<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" >
                    <div class="judge-info">
                        <span>您有权限审核的评审项目列表</span>
                        <el-divider></el-divider>
                    </div>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                            stripe
                            height="450px"
                    >
                        <el-table-column
                                prop="projectName"
                                label="项目名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="prizeName"
                                label="拟申请奖项">
                        </el-table-column>
                        <el-table-column
                                prop="voteCount"
                                label="当前票数" sortable  class="number" >
                        </el-table-column>
                        <el-table-column
                                prop="headName"
                                label="项目负责人">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!--							<el-button type="text" icon="el-icon-edit">编辑</el-button>-->
                                <el-button
                                        type="text"
                                        icon="el-icon-edit"
                                        @click="handleVote(scope.$index, scope.row)"
                                >给它投票</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

            </el-col>

        </el-row>


    </div>
</template>

<script>

    export default {
        name: "vote",
        components:{

        },
        data(){
            return{
                name: localStorage.getItem("ms_username"),
                tableData: [],
                Max:0

            }
        },
        computed: {
            role() {
                return this.name === "admin" ? "超级管理员" : "普通用户";
            },

        },
        mounted() {
            fetch("http://localhost:8888/project/queryByExpertId?expertId="+JSON.parse(localStorage.getItem('Authorization')).userID.toString())
                .then(response=>response.json())
                .then((json)=>{
                    console.log(json)
                    this.tableData=json
                    // this.tableData[0].voteCount=2

                })
           .then(()=>{ for(let i=0;i<this.tableData.length;i++){
                if(this.tableData[i].voteCount>this.Max){
                    this.Max=this.tableData[i].voteCount;
                }
            }})//把最高的票数底色变红
            console.log(JSON.parse(localStorage.getItem('Authorization')).userID.toString());
            console.log("最大值"+this.Max)
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if(row.voteCount===this.Max){
                    return "warning-row"
                }
            },
            handleVote(index, row) {
                this.$confirm('您确定要给该投票吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        console.log(row)//当前行的值
                        fetch("http://localhost:8888/relation/vote?prizeId="+row.prizeId+"&expertId="+this.$store.state.E_user.userId+"&projectId="+row.projectId)
                        .then(response=>{
                            if(response===true){
                                this.$message.success('投票评审成功！');
                            }
                            else
                                this.$message.error('投票评审失败！');
                        })
                    })
                    .catch(() => {});
            },
        }
    }
</script>

<style >
    .judge-info{
        text-align: center;
        font-size: 24px;
        color: #666666;
    }
    .el-table .warning-row {
        background: oldlace;

    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .number{
        color: #f0c78a;
    }
</style>