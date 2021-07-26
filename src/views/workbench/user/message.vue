<template>
	<div>
		<div class="container">
			<div class="judge-info">
				<span>系统公告</span>
				<el-divider></el-divider>
			</div>
			<el-tabs v-model="message">
				<el-tab-pane :label="`未读消息(${unread.length})`" name="first">
					<el-table :data="unread" :show-header="false" style="width: 100%" height="310px">
						<el-table-column>
							<template slot-scope="scope">
								<span class="message-title">{{scope.row.messageContent}}</span>
							</template>
						</el-table-column>
<!--						<el-table-column prop="date" width="180"></el-table-column>-->
						<el-table-column width="120">
							<template slot-scope="scope">
								<el-button size="small" @click="handleRead(scope.$index)" type="warning" plain

								>标为已读</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="handle-row">
						<el-button type="primary">全部标为已读</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane :label="`已读消息(${read.length})`" name="second">
					<template v-if="message === 'second'">
						<el-table :data="read" :show-header="false" style="width: 100%">
							<el-table-column>
								<template slot-scope="scope">
									<span class="message-title">{{scope.row.messageContent}}</span>
								</template>
							</el-table-column>
<!--							<el-table-column prop="date" width="150"></el-table-column>-->
							<el-table-column width="120">
								<template slot-scope="scope">
									<el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger">删除全部</el-button>
						</div>
					</template>
				</el-tab-pane>
				<el-tab-pane :label="`回收站(${recycle.length})`" name="third">
					<template v-if="message === 'third'">
						<el-table :data="recycle" :show-header="false" style="width: 100%">
							<el-table-column>
								<template slot-scope="scope">
									<span class="message-title">{{scope.row.messageContent}}</span>
								</template>
							</el-table-column>
<!--							<el-table-column prop="date" width="150"></el-table-column>-->
							<el-table-column width="120">
								<template slot-scope="scope">
									<el-button @click="handleRestore(scope.$index)">还原</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger">清空回收站</el-button>
						</div>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	name: "message",
	data() {
		return {
			message: "first",
			showHeader: false,
			unread: [],
			read: [],
			recycle: []
		};
	},
	mounted() {
		fetch("http://localhost:8888/message/get")
		.then(response=>response.json())
		.then((json)=>
				{console.log(json)
					this.unread=json
				}
		)
	},
	methods: {
		handleRead(index) {
			const item = this.unread.splice(index, 1);
			console.log(item);
			this.read = item.concat(this.read);
		},
		handleDel(index) {
			const item = this.read.splice(index, 1);
			this.recycle = item.concat(this.recycle);
		},
		handleRestore(index) {
			const item = this.recycle.splice(index, 1);
			this.read = item.concat(this.read);
		}
	},
	computed: {
		unreadNum() {
			return this.unread.length;
		}
	}
};
</script>

<style scoped>
.container {
	position: relative;
	padding: 30px;
	background: #fff;
	border: 1px solid #ddd;
}
.message-title {
	cursor: pointer;
}
.handle-row {
	margin:20px 0 20px 0
}
.judge-info{
	text-align: center;
	font-size: 24px;
	color: #666666;
}
</style>

