/*
 * @Author: e4glet
 * @Date: 2020-07-09 00:46:22
 * @LastEditTime: 2020-07-09 22:23:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-cli4-framwork\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
/**
 * 引入后台模版(常用的可以预加载，不常用的可以使用懒加载)
 */
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'
// import Home from "../views/Home";
// import dashboard from "../views/workbench/dashboard";
// import mySettings from "../views/workbench/mySettings"
// import mission from "../views/workbench/mywork/mission";
// import myVote from "../views/workbench/mywork/myVote";
// import myTeam from "../views/workbench/mywork/myTeam";
// import voting from "../views/workbench/mywork/voting";
// import message from "../views/workbench/user/message";
// import changePassword from "../views/workbench/user/changePassword";



import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})



Vue.use(VueRouter)

//通过name和type动态加载菜单
//组件加载方式使用懒加载
const routes = [

  { path: '/', redirect: 'login' },
  {
    path: '/testadmin',
    // component:mission,
    component: () => import( /* webpackChunkName: "mymanage" */ '@/views/testadmin.vue'),
    name: '管理员页面',
    meta: {
      title: '查看项目',
      role: ['admin', 'editor', 'user']
    },
  },
    {
  path: '/home',
  type: 'home',
  name: 'home',
  redirect: '/dashboard',
  // component:Home,
  component: () => import( /* webpackChunkName: "home" */ '@/views/Home.vue'),
  children: [{
    path: '/dashboard',
    name: '首页',
    meta: {
      title: '系统首页',
      role: ['admin', 'editor', 'user']
    }, //活动子页面打标签，这样tags可以显示
    components: {
      default: () => import( /* webpackChunkName: "topNav" */ '@/views/workbench/dashboard.vue'),
      // default:dashboard,
      top: TopNav,
      aside: LeftNav
    },
    leaf: true, // 只有一个节点
    iconCls: 'iconfont icon-home', // 图标样式class
    menuShow: true
  },
  {
    path: '/mySet',
    components: {
      default: () => import( /* webpackChunkName: "mySet" */ '@/views/workbench/mySettings.vue'),
      // default: mySettings,
      top: TopNav,
      aside: LeftNav
    },
    name: '更多功能',
    iconCls: 'el-icon-menu',
    menuShow: true,
    children: [
    {
      path: '/myVote',
      // component:mission,
      component: () => import( /* webpackChunkName: "mymanage" */ '@/views/workbench/mywork/myVote.vue'),
      name: '查看项目',
      meta: {
        title: '查看项目',
        role: ['admin', 'editor', 'user']
      },
      menuShow: true
    },
      {
        path: '/myTeam',
        component:()=> import('@/views/workbench/mywork/myTeam.vue'),
        // component: myTeam,
        name:'我的评审组',
        meta: {
          title: '评审组',
          role: ['admin', 'editor', 'user']
        },
        menuShow: true
      },

    {
      path: '/message',
      component: () => import( /* webpackChunkName: "message" */ '@/views/workbench/user/message.vue'),
      // component: message,
      name: '系统消息',
      meta: {
        title: '系统消息',
        role: ['admin', 'editor', 'user']
      },
      menuShow: true //不显示在菜单栏中
    },
      {
        path: '/voting',
        component:() => import( /* webpackChunkName: "home" */ '@/views/workbench/mywork/voting.vue'),
        // component: voting,
        name:'正在评审',
        meta: {
          title: '正在评审',
          role: ['admin', 'editor', 'user']
        },
        menuShow: false
      },
    {
      path: '/user/changepwd',
      component: () => import( /* webpackChunkName: "changepwd" */ '@/views/workbench/user/changePassword.vue'),
      // component: changePassword,
      name: '修改密码',
      meta: {
        title: '修改密码',
        role: ['admin', 'editor', 'user']
      },
      menuShow: true //不显示在菜单栏中
    },
    {
      path: '/403',
      meta: {
        title: '无访问权限',
        role: ['admin', 'editor', 'user']
      },
      component: () => import( /* webpackChunkName: "Login" */ '@/components/403.vue'),
      menuShow: false //不显示在菜单栏中
    }
    ]
  },

  ]
},
{ //系统登录首页
  path: '/login',
  name: 'login',
  type: 'login',
  component: () => import( /* webpackChunkName: "Login" */ '@/views/Login.vue')
},
{
  path: '*',
  meta: {
    title: '404',
    role: ['admin', 'editor', 'user']
  },
  component: () => import( /* webpackChunkName: "404" */ '@/components/404.vue')
}
]

const router = new VueRouter({
  //mode: 'hash',  //hash  or history
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  console.log('to:' + to.path)

  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('Authorization')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('Authorization'))
    if (!user) {
      next({
        path: '/login'
      })
      NProgress.done()
    } else if (to.meta.role.indexOf(user.rolename) >= 0) {
      next()
    } else {
      next({
        path: '/403'
      })
    }
  }
});

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router