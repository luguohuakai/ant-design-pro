import {fakeSubmitForm, queryFakeLst} from '../services/api';
import {querySchoolLst,fakeSubmitSchool} from '../services/api';
import {message} from "antd/lib/index";

export default {
    namespace: 'lst',

    state: {
        schoolData: [],
    },

    effects: {
        * fetchSchoolLst({payload}, {call, put}) {
            const response = yield call(querySchoolLst, payload);
            yield put({
                type: 'showSchoolLst',
                payload: response,
            });
        },
        *addSchool({ payload }, { call }) {
            yield call(fakeSubmitSchool, payload);
            message.success('提交成功llll');
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
