import {queryActiveData,queryUserData} from '../services/api';

export default {
    namespace: 'analysis',
    state: {
        yesterday_active: '',
        month_active: '',
        recent_active: [],

        user_total: '',
        yesterday_total: '',
        today_total: '',
        ios_total: '',
        android_total: '',
        others_total: '',
    },

    effects: {
        * fetchActiveData(_, {call, put}) {
            const res = yield call(queryActiveData);
            yield put({
                type: 'show',
                payload: res,
            });
        },
        * fetchUserData(_, {call, put}) {
            const res = yield call(queryUserData);
            yield put({
                type: 'showUser',
                payload: res,
            });
        },
    },

    reducers: {
        show(state, {payload}) {
            return {
                ...state,
                yesterday_active: payload.data.yesterday_active,
                month_active: payload.data.month_active,
                recent_active: payload.data.data,
            };
        },
        showUser(state, {payload}) {
            return {
                ...state,
                ...payload.data,
            };
        },
    },
};
