import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* layout*/
import Layout from '../views/layout/Layout.vue';

/* login*/
import Login from '../views/login/index.vue';

/*register*/
import Register from '../views/register';

// dashboard
const map = resolve => require(['../views/map/map.vue'], resolve);
const home = resolve => require(['../views/home/home.vue'], resolve);
const device = resolve => require(['../views/device/device.vue'], resolve);
const errorstat = resolve => require(['../views/errorstat/errorstat.vue'], resolve);
const orgindata = resolve => require(['../views/orgindata/orgindata.vue'], resolve);
const admin = resolve => require(['../views/admin/admin.vue'], resolve);
const devcheck = resolve => require(['../views/device/dcheck.vue'], resolve);
const feedata = resolve => require(['../views/feedata/feedata.vue'], resolve);


/* error page*/
const Err404 = resolve => require(['../views/error/404'], resolve);
const Err401 = resolve => require(['../views/error/401'], resolve);

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
    { path: '*', redirect: '/404', hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/map',
        name: '首页',
        children: [
            {path: 'map', component: map, name:'地图', meta: {title: '路网分布图'}},
            {path: 'home', component: home, name:'主页', meta: {title: '收费站监测'}},
            {path: 'device', component: device, name:'设备', meta: {title: '设备实时报告'}},
            {path: 'errorstat', component: errorstat, name: '故障统计', meta: {title: '故障统计报表'}},
            {path: 'orgindata', component: orgindata, name: '监测数据查询', meta: {title: '监测数据查询'}},
            {path: 'feedata', component: feedata, name: '计费数据查询', meta: {title: '计费数据查询'}},
            {path: 'admin', component: admin, name: '管理', meta: {title: '权限管理'}},
            {path: 'devcheck', component: devcheck, name: '设备体检', meta: {title: '设备体检报告'}}

        ]
    }
]

export const asyncRouterMap = [

];


export default new Router({
    routes: constantRouterMap
})
