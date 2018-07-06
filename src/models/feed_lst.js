/* eslint-disable linebreak-style */

import { queryfeedbackLst, querydealLst } from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'feed_lst',

  state: {
    feedbackData: [],
  },

  effects: {
    //意见反馈
    *fetchFeedbackLst({ payload }, { call, put }) {
      const response = yield call(queryfeedbackLst, payload);
      yield put({
        type: 'showFeedbackLst',
        payload: response,
      });
    },
    *fetchdealLst({ payload }, { call }) {
      const response = yield call(querydealLst, payload);
      if (response.code === 1) {
        message.error(response.msg);
      } else {
        message.error(response.msg);
      }
    },
  },

  reducers: {
    showFeedbackLst(state, action) {
      console.error(action);
      return {
        ...state,
        feedbackData: action.payload.data,
      };
    },
  },
};
