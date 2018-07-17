/* eslint-disable linebreak-style */

import {
  querySsidLstOrDetail,
  fakeSubmitSsid,
  fakeDeleteSsid,
  updateSsid,
  querySsidLst,
  querySsidCount,
} from '../services/api';

import { message } from 'antd/lib/index';

export default {
  namespace: 'ssid_lst',

  state: {
    ssidData: [],
    ssidDetail: [],
    ssidCount: [],
  },

  effects: {
    //获取ssid
    *fetchSsidLst({ payload }, { call, put }) {
      const response = yield call(querySsidLst, payload);
      yield put({
        type: 'showSsidLst',
        payload: response,
      });
    },
    // 获取ssid详情
    *fetchSsidDetail({ payload }, { call, put }) {
      const response = yield call(querySsidLstOrDetail, payload);
      // console.error(response);
      yield put({
        type: 'showSsidDetail',
        payload: response,
      });
    },
    //ac总数
    *fetchSsidCount(_, { call, put }) {
      const response = yield call(querySsidCount);
      // console.log(response);
      yield put({
        type: 'showSsidCount',
        payload: response,
      });
    },
    *addSsid({ payload }, { call }) {
      yield call(fakeSubmitSsid, payload);
      message.success('提交成功');
    },
    *deleteSsid({ payload }, { call, put }) {
      const response = yield call(fakeDeleteSsid, payload);
      // console.log(payload);
      if (response.code === 1) {
        const res = yield call(querySsidLstOrDetail, { page: payload.page, size: payload.size });
        yield put({
          type: 'showSsidLst',
          payload: res,
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
    *updateSsid({ payload }, { call }) {
      yield call(updateSsid, payload);
      message.success('修改成功');
    },
  },

  reducers: {
    showSsidLst(state, action) {
      // console.error(action);
      return {
        ...state,
        ssidData: action.payload.data,
      };
    },
    showSsidDetail(state, { payload }) {
      // console.error(payload);
      return {
        ...state,
        ssidDetail: payload.data,
      };
    },
    showSsidCount(state, action) {
      return {
        ...state,
        ssidCount: action.payload.data,
      };
    },
  },
};
