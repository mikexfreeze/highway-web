/**
 * Created by Micheal Xiao on 2017/5/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import tabs from './modules/tabs';
import expTabs from './modules/tabpage/exampleTab';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        tabs,
        expTabs
    },
    getters
});

export default store
