/* eslint-disable linebreak-style */

import { querySsidLst, fakeSubmitSsid, fakeDeleteSsid, updateSsid } from '../services/api';

import { message } from 'antd/lib/index';

export default {
  namespace: 'ssid_lst',

  state: {
    ssidData: [],
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
    *addSsid({ payload }, { call }) {
      yield call(fakeSubmitSsid, payload);
      message.success('提交成功');
    },
    *deleteSsid({ payload }, { call, put }) {
      const response = yield call(fakeDeleteSsid, payload);
      // console.log(payload);
      if (response.code === 1) {
        const res = yield call(querySsidLst, { page: payload.page, size: payload.size });
        yield put({
          type: 'showSsidLst',
          payload: res,
        });
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
      console.error(action);
      return {
        ...state,
        ssidData: action.payload.data,
      };
    },
  },
};
