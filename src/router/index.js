import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* layout*/
import Layout from '../views/layout/Layout.vue';

/* login*/
import Login from '../views/login';

/*register*/
import Register from '../views/register';

// dashboard
const map = resolve => require(['../views/map/map.vue'], resolve);
const home = resolve => require(['../views/home/home.vue'], resolve);

/* error page*/
const Err404 = resolve => require(['../views/error/404'], resolve);
const Err401 = resolve => require(['../views/error/401'], resolve);



export default new Router({
    routes: [
        // {path: '/register', component: Register, hidden: true},
        // {path: '/login', component: Login, hidden: true},

        {path: '/404', component: Err404, hidden: true},
        {path: '/401', component: Err401, hidden: true},
        {path: '*', redirect: '/404', hidden: true},

        {
            path: '/',
            component: Layout,
            redirect: '/map',
            name: '首页',
            children: [
                {path: 'map', component: map, name:'地图'},
                {path: 'home', component: home, name:'主页'}
            ]
        }



    ]
})
