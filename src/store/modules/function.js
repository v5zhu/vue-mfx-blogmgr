import {
    addFunction,
    deleteFunction,
    editFunction,
    listFunction,
    listFunctionsByRoute
} from 'api/function';

const func = {
    actions: {
        ListFunctionsByRoute({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listFunctionsByRoute(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListFunction({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listFunction(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        AddFunction({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addFunction(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        EditFunction({commit, state}, data) {
            return new Promise((resolve, reject) => {
                editFunction(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeleteFunction({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deleteFunction(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default func;
