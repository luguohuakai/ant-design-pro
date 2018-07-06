/* eslint-disable linebreak-style */
import { fakeSubmitForm, queryFakeLst } from '../services/api';

import { queryAcLst, fakeSubmitAC, fakeDeleteAC, updateAc } from '../services/api';

import { message } from 'antd/lib/index';

export default {
  namespace: 'ac_lst',
  state: {
    acData: [],
  },

  effects: {
    // 获取AC列表
    *fetchAcLst({ payload }, { call, put }) {
      const response = yield call(queryAcLst, payload);
      // console.error(response);
      yield put({
        type: 'showAcLst',
        payload: response,
      });
    },
    *addAc({ payload }, { call }) {
      yield call(fakeSubmitAC, payload);
      message.success('提交成功');
    },
    *deleteAc({ payload }, { call, put }) {
      const response = yield call(fakeDeleteAC, payload);
      // console.log(payload);
      if (response.code === 1) {
        const res = yield call(queryAcLst, { page: payload.page, size: payload.size });
        yield put({
          type: 'showApLst',
          payload: res,
        });
      } else {
        message.error('删除失败');
      }
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeLst, payload);
      yield put({
        type: 'appendLst',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *updateAc({ payload }, { call }) {
      yield call(updateAc, payload);
      message.success('修改成功');
    },
  },

  reducers: {
    queryLst(state, action) {
      return {
        ...state,
        lst: action.payload,
      };
    },
    showAcLst(state, action) {
      console.error(action);
      return {
        ...state,
        acData: action.payload.data,
      };
    },
  },
};
