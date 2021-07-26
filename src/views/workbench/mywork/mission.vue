<template>
	<div>
		<div class="table-content">
		<el-row >
			<el-col :span="24" class="toolbar">
				<div class="judge-info">
					<span>您有权限审核的评审项目列表</span>         //!!!!!!!!!  该页面  没有使用!!!!!!!!!//
				</div>
				<el-form :inline="true" :model="filters">
					<el-form-item>
						<el-input
							v-model="filters.number"
							placeholder="请输入申报项目名称"
							auto-complete="off"
							@keyup.enter.native="handleSearch"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium" v-on:click="handleSearch">查询</el-button>
					</el-form-item>
<!--					<el-form-item class="pull-right">-->
<!--						<el-button type="primary" size="medium" @click="showAddDialog" icon="el-icon-plus">新建文件</el-button>-->
<!--					</el-form-item>-->
				</el-form>
			</el-col>
			<!--表格数据-->

			<el-col  >
				<el-table :data="tableData"
						  style="width: 100% ;"
						  :row-class-name="tableRowClassName" >
					<el-table-column prop="id" v-if="idShow" label="项目ID"></el-table-column>
					<el-table-column prop="voteCount" label="已得票数" sortable></el-table-column>
					<el-table-column prop="projectName" label="项目名称"></el-table-column>
					<el-table-column prop="headName" label="负责人" show-overflow-tooltip></el-table-column>
					<el-table-column prop="prizeName"  label="拟申请奖项"></el-table-column>
					<el-table-column prop="updateTime" :formatter="activeTateFormatter" label="更新日期"></el-table-column>
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
			</el-col>
			<el-col :span="24" class="toolbar">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 50, 100, 200]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				></el-pagination>
			</el-col>
		</el-row>
		</div>
	</div>
</template>
<script>
export default {
	data: function() {
		return {
			loading: false,
			idShow: false,
			total: 2,
			currentPage: 1,
			pageSize: 10,
			tableData: [],
			addVisible: true, // 添加弹窗flag
			detailVisible: true, // 详情弹窗flag
			maskVisible: true, // 弹窗mask显示
			detailId: 0, // 详情ID
			filters: {
				// 搜索表单
				number: ""
			}
		};
	},
	mounted() {//与creatd（）用法相似，这是再页面渲染完成之后在进行数据接收和赋值，防止异步数据丢失
	//从数据库获得改小组的项目表，并添加到tableDta中
		fetch("http://localhost:8888/project/queryByExpertId?expertId="+this.$store.state.E_user.userId)
		.then(response=>response.json())
		.then((json)=>{
			console.log(json)
			this.tableData=json
		})
	},
	computed:{
	  howPage(){
	  	return this.tableData.length
	  }
	},
	methods: {
		tableRowClassName({row, rowIndex}) {
			if(row.number===this.Max){
				return "warning-row"
			}
		},
		// 搜索
		handleSearch() {
			console.info(this.filters.number);
		},
		// 详情
		handleDetail(row, event, column) {
			this.detailId = row.projectId;
			this.maskVisible = true;
			this.detailVisible = true;
		},
		// 投票
        handleVote(index, row) {
            this.$confirm('您确定要给该投票吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                	fetch()
                    this.$message.success('投票评审成功！');

                })
                .catch(() => {});
        },
		// 选择每页显示条数
		handleSizeChange(val) {
			//        this.pageSize = val;
			//        this.currentPage = 1;
		},
		// 跳转页
		handleCurrentChange(val) {
			//        this.currentPage = val;
		},
		// 添加弹窗
		showAddDialog() {
			this.addVisible = true;
		},
		// 关闭所有弹窗
		cancelVisible() {
			this.maskVisible = false;
			this.detailVisible = false;
		},

		// 执行日期转换
		activeTateFormatter(row, column) {
			return this.getDateValue(row.updateTime);
		},
		// 获取日期
		getDateValue(datetime) {
			if (datetime) {
				datetime = new Date(datetime);
				let y = datetime.getFullYear() + "-";
				let mon = datetime.getMonth() + 1 + "-";
				let d = datetime.getDate();
				return y + mon + d;
			}
			return "";
		}
	}
};
</script>
<style scoped>
	.judge-info{
		margin-bottom: 20px;
		text-align: center;
		font-size: 24px;
		color: #666666;
	}
.container{
	width: auto;
    
}

.detail-box {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	width: 500px;
	height: 100%;
	overflow-y: auto;
	z-index: 2000;
	background-color: #fff;
}
.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	background-color: #000;
	opacity: 0.3;
}


</style>
