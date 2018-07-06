import {fakeSubmitForm, queryFakeLst} from '../services/api';
import {querySchoolLst, fakeSubmitSchool, fakeDeleteSchool, querySchoolCount, setOnlineStatus} from '../services/api';
import {message} from "antd/lib/index";

export default {
    namespace: 'school_lst',

    state: {
        page: 1,
        size: 10,
        schoolData: [],
        schoolCount: [],
    },

    effects: {
        * fetchSchoolLst({payload}, {call, put}) {
            const response = yield call(querySchoolLst, payload);
            yield put({
                type: 'showSchoolLst',
                payload: response,
            });
        },

        * setOnlineStatus({payload}, {call}) {
            const response = yield call(setOnlineStatus, payload);
            if (response.code > 0) {
                message.success(response.msg);
            }else {
                message.error(response.msg);
            }
        },

        * fetchSchoolCount(_, {call, put}) {
            const response = yield call(querySchoolCount);
            yield put({
                type: 'showSchoolCount',
                payload: response,
            });
        },
        * addSchool({payload}, {call}) {
            yield call(fakeSubmitSchool, payload);
            message.success('提交成功');
        },
        * deleteSchool({payload}, {call, put}) {
            const response = yield call(fakeDeleteSchool, payload);
            if (response.code === 1) {
                const res = yield call(querySchoolLst, {page:payload.page,size:payload.size});
                yield put({
                    type: 'showSchoolLst',
                    payload: res,
                });
            } else {
                message.error('删除失败');
            }
        },
        * appendFetch({payload}, {call, put}) {
            const response = yield call(queryFakeLst, payload);
            yield put({
                type: 'appendLst',
                payload: Array.isArray(response) ? response : [],
            });
        },
    },

    reducers: {
        showSchoolLst(state, action) {
            return {
                ...state,
                schoolData: action.payload.data,
            };
        },
        showSchoolCount(state, action) {
            return {
                ...state,
                schoolCount: action.payload.data,
            };
        },
        queryLst(state, action) {
            return {
                ...state,
                lst: action.payload,
            };
        },
        appendLst(state, action) {
            return {
                ...state,
                lst: state.lst.concat(action.payload),
            };
        },
    },
};
