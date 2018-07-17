/* eslint-disable linebreak-style */

import { queryLogLst, queryLogLstOrDetail } from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'log_lst',

  state: {
    logData: [],
    logDetail: [],
  },

  effects: {
    //log列表
    *fetchLogLst({ payload }, { call, put }) {
      const response = yield call(queryLogLst, payload);
      yield put({
        type: 'showLogLst',
        payload: response,
      });
    },
    // 获取log详情
    *fetchUserDetail({ payload }, { call, put }) {
      const response = yield call(queryLogLstOrDetail, payload);
      // console.error(response);
      yield put({
        type: 'showLogDetail',
        payload: response,
      });
    },
  },

  reducers: {
    showLogLst(state, action) {
      return {
        ...state,
        logData: action.payload.data,
      };
    },
    showLogDetail(state, { payload }) {
      return {
        ...state,
        logDetail: payload.data,
      };
    },
  },
};
