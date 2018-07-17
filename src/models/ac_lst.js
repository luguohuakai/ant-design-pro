/* eslint-disable linebreak-style */
import { fakeSubmitForm, queryFakeLst, queryAcCount } from '../services/api';

import {
  queryAcLstOrDetail,
  fakeSubmitAC,
  fakeDeleteAC,
  updateAc,
  queryAcLst,
} from '../services/api';

import { message } from 'antd/lib/index';

export default {
  namespace: 'ac_lst',
  state: {
    acData: [],
    acDetail: [],
    acCount: [],
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
    // 获取AC详情
    *fetchAcDetail({ payload }, { call, put }) {
      const response = yield call(queryAcLstOrDetail, payload);
      // console.error(response);
      yield put({
        type: 'showAcDetail',
        payload: response,
      });
    },
    //ac总数
    *fetchAcCount(_, { call, put }) {
      const response = yield call(queryAcCount);
      console.log(response);
      yield put({
        type: 'showAcCount',
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
        const res = yield call(queryAcLstOrDetail, { page: payload.page, size: payload.size });
        yield put({
          type: 'showAcLst',
          payload: res,
        });
        message.success('删除成功');
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
      // console.error(action);
      return {
        ...state,
        acData: action.payload.data,
      };
    },
    showAcDetail(state, { payload }) {
      // console.error(payload);
      return {
        ...state,
        acDetail: payload.data,
      };
    },
    showAcCount(state, action) {
      return {
        ...state,
        acCount: action.payload.data,
      };
    },
  },
};
