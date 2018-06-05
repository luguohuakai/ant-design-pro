import {queryRule, removeRule, addRule} from '../services/api';

export default {
    namespace: 'rule',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        * fetch({payload}, {call, put}) {
            const response = yield call(queryRule, payload);
            const data = {
                list: response.data.data,
                pagination: {
                    current: response.data.current_page,
                    pageSize: response.data.per_page,
                    total: response.data.total,
                },
            };
            yield put({
                type: 'save',
                payload: data,
            });
        },
        * add({payload, callback}, {call, put}) {
            const response = yield call(addRule, payload);
            const data = {
                list: response.data.data,
                pagination: {
                    current: response.data.current_page,
                    pageSize: response.data.per_page,
                    total: response.data.total,
                },
            };
            yield put({
                type: 'save',
                payload: data,
            });
            if (callback) callback();
        },
        * remove({payload, callback}, {call, put}) {
            const response = yield call(removeRule, payload);
            const data = {
                list: response.data.data,
                pagination: {
                    current: response.data.current_page,
                    pageSize: response.data.per_page,
                    total: response.data.total,
                },
            };
            yield put({
                type: 'save',
                payload: data,
            });
            if (callback) callback();
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
};
