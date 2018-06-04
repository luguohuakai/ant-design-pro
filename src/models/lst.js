import { queryFakeLst } from '../services/api';

export default {
  namespace: 'lst',

  state: {
    lst: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeLst, payload);
      yield put({
        type: 'queryLst',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeLst, payload);
      yield put({
        type: 'appendLst',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
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
