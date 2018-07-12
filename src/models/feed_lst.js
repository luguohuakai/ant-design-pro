/* eslint-disable linebreak-style */

import { queryfeedbackLst, querydealLst, querybackLst } from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'feed_lst',

  state: {
    feedbackData: [],
    dealfeedbackData: [],
  },

  effects: {
    //意见反馈
    *fetchFeedbackLst({ payload }, { call, put }) {
      const response = yield call(querybackLst, payload);
      yield put({
        type: 'showFeedbackLst',
        payload: response,
      });
    },
    *fetchdealLst({ payload }, { call, put }) {
      const response = yield call(querydealLst, payload);
      yield put({
        type: 'dealFeedbackLst',
        payload: response,
      });
      if (response.code > 1) {
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },
  },

  reducers: {
    showFeedbackLst(state, action) {
      // console.error(action);
      return {
        ...state,
        feedbackData: action.payload.data,
      };
    },
    dealFeedbackLst(state, { payload }) {
      console.error(payload);
      return {
        ...state,
        dealfeedbackData: payload.data,
      };
    },
  },
};
