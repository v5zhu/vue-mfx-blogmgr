import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import article from './modules/article';
import link from './modules/link';
import feedback from './modules/feedback';
import milestone from './modules/milestone';
import log from './modules/log';
import task from './modules/task';
import route from './modules/route';
import role from './modules/role';
import func from './modules/function';
import permission from './modules/permission';
import rolePermission from './modules/rolePermission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        article,
        link,
        feedback,
        milestone,
        log,
        task,
        route,
        role,
        func,
        permission,
        rolePermission
    },
    getters
});

export default store
