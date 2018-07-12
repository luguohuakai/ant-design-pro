/* eslint-disable linebreak-style */
import {
  queryApLstOrDetail,
  fakeSubmitAp,
  fakeDeleteAp,
  updateAp,
  queryApLst,
} from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'ap_lst',

  state: {
    apData: [],
    apDetail: [],
  },

  effects: {
    //获取AP列表
    *fetchApLst({ payload }, { call, put }) {
      const response = yield call(queryApLst, payload);
      yield put({
        type: 'showApLst',
        payload: response,
      });
    },
    // 获取AC详情
    *fetchApDetail({ payload }, { call, put }) {
      const response = yield call(queryApLstOrDetail, payload);
      console.error(response);
      yield put({
        type: 'showApDetail',
        payload: response,
      });
    },
    *addAp({ payload }, { call }) {
      yield call(fakeSubmitAp, payload);
      message.success('提交成功');
    },
    *deleteAp({ payload }, { call, put }) {
      const response = yield call(fakeDeleteAp, payload);
      console.log(payload);
      if (response.code === 1) {
        const res = yield call(queryApLstOrDetail, { page: payload.page, size: payload.size });
        yield put({
          type: 'showApLst',
          payload: res,
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
    *updateAp({ payload }, { call }) {
      yield call(updateAp, payload);
      message.success('修改成功');
    },
  },

  reducers: {
    showApLst(state, action) {
      console.error(action);
      return {
        ...state,
        apData: action.payload.data,
      };
    },
    showApDetail(state, { payload }) {
      console.error(payload);
      return {
        ...state,
        apDetail: payload.data,
      };
    },
  },
};
