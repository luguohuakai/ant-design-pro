/* eslint-disable camelcase */
import {queryActiveData, queryUserData, querySchoolUserCountTop10, queryAuthWayCount, queryFeedbackLst} from '../services/api';

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

        school_user_count_top_10: '',

        auth_way_count: '',

        feedback_lst: '',
    },

    effects: {
        * fetchAnalysisData(_, {call, put}) {
            const active_data = yield call(queryActiveData);
            const user_data = yield call(queryUserData);
            const school_user_count_top_10 = yield call(querySchoolUserCountTop10);
            const auth_way_count = yield call(queryAuthWayCount);
            const feedback_lst = yield call(queryFeedbackLst,{size: 16});
            yield put({
                type: 'show',
                payload: {
                    active_data,
                    user_data,
                    school_user_count_top_10,
                    auth_way_count,
                    feedback_lst,
                },
            });
        },
    },

    reducers: {
        show(state, {payload:{active_data,user_data,school_user_count_top_10,auth_way_count,feedback_lst}}) {
            return {
                ...state,
                yesterday_active: active_data.data.yesterday_active,
                month_active: active_data.data.month_active,
                recent_active: active_data.data.data,
                ...user_data.data,
                school_user_count_top_10: school_user_count_top_10.data,
                auth_way_count: auth_way_count.data,
                feedback_lst: feedback_lst.data,
            };
        },
    },
};
