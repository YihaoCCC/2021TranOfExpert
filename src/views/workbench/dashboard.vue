<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6" class="vote" v-for="(item,index) in producetionList" :key="index"  >
				<el-card :body-style="{ padding: '0px' }" shadow="hover">
					<div class="vote-img">
						<img :src=item.img >
					</div>
					<div style="padding: 14px;" class="vote-title">
						<div class="vote-name">
							{{item.projectName}}
						</div>

						<div class="vote-number">
							<p class="number"><i class="el-icon-user"></i>线上投票:{{item.number}}</p>
							<el-button type="text" class="button" @click="()=>Tovote(item)"><i class="el-icon-star-on"></i>开始评审</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>
<script>
// import bus from "@/components/nav/bus";
export default {
	name: "dashboard",//系统主页面
	data() {
		return {
			username: "",
			rolename: "",
			logintime: "",
			imgs:[{
				img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
				sys:70,//系统评估分数-科技性  数据库没有
				money:69,//系统评估分数-价值性  数据库没有
				needs:80,//系统评估分数-需求性  数据库没有
				number:1066,
			},
				{img:'https://wy.010zh.cn/adimg/32.jpg?x-bce-process=style/dm',
					sys:30,//系统评估分数-科技性  数据库没有
					money:69,//系统评估分数-价值性  数据库没有
					needs:60,//系统评估分数-需求性  数据库没有
					number:366,
				},
				{img:'https://135editor.cdn.bcebos.com/files/users/541/5419088/202105/LSsdu88d_uzSQ.png',
					sys:90,//系统评估分数-科技性  数据库没有
					money:40,//系统评估分数-价值性  数据库没有
					needs:60,//系统评估分数-需求性  数据库没有
					number:10086,
				},
				{img:'https://135editor.cdn.bcebos.com/files/users/541/5419088/202103/0Rp5CF2bD_E2Ra.png',
					sys:87,//系统评估分数-科技性  数据库没有
					money:96,//系统评估分数-价值性  数据库没有
					needs:61,//系统评估分数-需求性  数据库没有
					number:10016,
				},
				{img:'https://135editor.cdn.bcebos.com/files/users/541/5419088/202012/M42hEYwO_gnYL.jpeg',
					sys:20,//系统评估分数-科技性  数据库没有
					money:60,//系统评估分数-价值性  数据库没有
					needs:80,//系统评估分数-需求性  数据库没有
					number:1066,
					},
				{img:'https://135editor.cdn.bcebos.com/files/users/541/5419088/202012/kWkCHwqd_3Vfq.jpeg',
					sys:33,//系统评估分数-科技性  数据库没有
					money:10,//系统评估分数-价值性  数据库没有
					needs:76,//系统评估分数-需求性  数据库没有
					number:1066,
				},
				{img:'https://mapp.alicdn.com/1624610908709erFUHbEgE1DiSkf.png',
					sys:90,//系统评估分数-科技性  数据库没有
					money:29,//系统评估分数-价值性  数据库没有
					needs:80,//系统评估分数-需求性  数据库没有
					number:16629,
				},
				{img:'https://inews.gtimg.com/newsapp_ls/0/13695104895/0.jpeg',
					sys:70,//系统评估分数-科技性  数据库没有
					money:69,//系统评估分数-价值性  数据库没有
					needs:80,//系统评估分数-需求性  数据库没有
					number:13023,
				},
			],
			producetionList:[],
			List:[]
		};
	},

	mounted() {
		let user = window.localStorage.getItem("Authorization");
		if (user) {
			user = JSON.parse(user);
			this.username = user.nickname || "";
			this.rolename = user.rolename=='admin' ? "管理员":user.rolename=="editor"?"编辑人员":"普通有户";
		}
		fetch("http://localhost:8888/project/queryByExpertId?expertId="+JSON.parse(localStorage.getItem('Authorization')).userID.toString())
		.then(response=>response.json())
		.then((json)=>{
			this.producetionList=json.slice(0,8)//放置8个数据
			// console.log(this.producetionList)
		}).then(()=>{
			this.producetionList=this.producetionList.map((o,i) => { return {...o,...this.imgs[i]}})
			//给前八个数据添加多个属性，
		})
				.then(()=>console.log(this.List))

	},
	methods: {
		Tovote( item){
			this.$store.state.voting=[];
			this.$store.state.voting.push(item);
			console.log(item)
			if(this.$store.state.voting.length!=0){
				this.$router.push('/voting');
				console.log("产品ID为："+item.id);
			}
			else {
				alert("错误！")
			}

		}
	}
};
</script>
<style scoped>

.vote{
	height: 280px;
	box-sizing: border-box;
	margin-bottom: 25px;
}

.vote-name{
	border-top: 2px solid #cccccc;
	padding-top: 6px;
	flex: 1	;
	font-weight: bold;
	font-size: 16px;
	width: 95%;
	text-align: center;
	white-space:nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
}
.vote-number{
	display: flex;
	line-height: 40px;
	justify-content: space-between;
}
.vote-number .number{
	color: #8c939d;
	font-size: 12px;
}
.vote-img{
	height: 192px;
	padding-bottom:5px ;
	;
}
.vote-img img{
	width: 100%;
	height: 100%;
}
</style>

