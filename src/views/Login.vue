<template>
	<div>
		<loginHeader title="怀仁斋328建筑评审平台"   ></loginHeader>
		<el-form
			ref="AccountForm"
			:model="account"
			label-position="left"
			label-width="0px"
			class="demo-ruleForm login-container"
		>
			<h3 class="title">L O G I N</h3>
			<el-divider></el-divider>
			<el-form-item prop="username">
				<el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入帐号">
					<template #prepend>
						<el-button icon="el-icon-user"></el-button>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="pwd">
				<el-input type="password" v-model="account.password" auto-complete="off" placeholder="请输入密码">
					<template #prepend>
						<el-button icon="el-icon-lock"></el-button>
					</template>
				</el-input>
			</el-form-item>
			<!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->

			<el-form-item style="width:100%;">
				<el-button type="warning" style="width:100%;" @click="login">登录</el-button>
			</el-form-item>
			<div class="extra-text">
				<a href="javascript:;"  title="找回密码">忘记密码?</a>
			</div>
		</el-form>
		<loginFooter></loginFooter>
	</div>
</template>

<script>
import loginHeader from "@/components/login/loginHeader.vue";
import loginFooter from "@/components/login/loginFooter.vue";

export default {
	components: {
		loginHeader,
		loginFooter
	},
	data() {
		return {
			account: {
				username: "",
				password: ""
			},
			userToken: ""
		};
	},
	methods: {
		async login() {
			if (this.account.username === "" || this.account.password === "") {
				alert("账号或密码不能为空");
				this.$message.error('账号或密码不能为空');

			} else {
				fetch("http://localhost:8888/password/login?username="+this.account.username+"&password="+this.account.password)
				.then(response=>response.json())
						.then(json=>{
						if(json!=null){
							this.$store.state.E_user=json
							var data;
							data = {
								nickname: this.account.username,
								rolename: "admin",
								userID:this.$store.state.E_user.userId
							};
							console.log(this.$store.state.E_user)
							this.$store.commit("login", JSON.stringify(data));
							this.$router.push('/home')
							this.$message.success('登陆成功');}
						}

			)


				//这里可以异步读取数据库信息，如果信息正确返回，并将数据库查询的用户信息赋值给$store
				//调用axios获取后端数据
				//调用封装axios方法 参数列表为自定义多个参数方法,该方法后端可直接通过对象接收参数，public String requestPost(@RequestBody demo_User user) {
				// var data = await this.$http.post('icdMangerSystem/requestPost',{username:this.User.username,password:this.User.password});

				//调用封装axios方法 参数列表为对象方法，下面方法后端可以接收Javabean对象，简化参数传递，为方法为上一个方法的更优化方法
				// var data = await this.$http.post('/validateAdminLogin,JSON.stringify(this.User));
				// console.log("postData:"+JSON.stringify(this.User));

				//跳转网站根目录，即首页
				// this.$router.push("./");
			}
		},
	}
};
</script>
<style >
body {
	background-image:url("./../assets/login-backimg.jpg");
}

.login-container {
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin: 160px auto;
	width: 350px;
	padding: 35px 35px 15px 35px;
	background: #66666669;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;

	background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
	background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
	background: -webkit-gradient(
		linear,
		0% 0%,
		0% 100%,
		from(#ace),
		to(#00c1de)
	); /*谷歌*/
	background: -webkit-linear-gradient(
		top,
		#ace,
		#00c1de
	); /*Safari5.1 Chrome 10+*/
	background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/
}
/*.login-container el-form-item :last-child{*/

/*	margin: 100px;*/
/*}*/

.login-container .title {
	margin: 0px auto 20px auto;
	text-align: center;
	font-size: 30px;
	color: #ffffff;
}
.login-container .remember {
	margin: 0px 0px 35px 0px;
}
.extra-text {

	position: relative;
	margin-bottom: 0;
	padding-left: 2px;
}

.extra-text a {
	font-size: 12px;
	color: #ffffff;
}
.extra-text a:hover {
	color: #29e;
}
.extra-text.reg-text {
	position: absolute;
	top: 4px;
	right: 2px;
}
</style>