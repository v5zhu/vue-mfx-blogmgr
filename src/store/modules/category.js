import {categoryList, categoryAdd} from 'api/category';

const category = {
    state: {
        id: '',
        name: '',
        value: '',
        type: '',
        description: '',
        sort: '',
        parent: ''
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_VALUE: (state, value) => {
            state.value = value;
        },
        SET_TYPE: (state, type) => {
            state.type = type;
        },
        SET_DESCRIPTION: (state, description) => {
            state.description = description;
        },
        SET_SORT: (state, sort) => {
            state.sort = sort;
        },
        SET_PARENT: (state, parent) => {
            state.parent = parent;
        }
    },

    actions: {
        // 获取文章列表
        CategoryList({commit, state}) {
            return new Promise((resolve, reject) => {
                categoryList(state.token).then(response => {
                    const data = response.data;
                    commit('SET_ID', data.id);
                    commit('SET_NAME', data.name);
                    commit('SET_VALUE', data.value);
                    commit('SET_TYPE', data.type);
                    commit('SET_DESCRIPTION', data.description);
                    commit('SET_SORT', data.sort);
                    commit('SET_PARENT', data.parent);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }, // 添加分类
        CategoryAdd({commit, state}, params) {
            return new Promise((resolve, reject) => {
                categoryAdd(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default category;
