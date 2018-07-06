/* eslint-disable linebreak-style */
import { queryApLst, fakeSubmitAp, fakeDeleteAp, updateAp } from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'ap_lst',

  state: {
    apData: [],
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
    *addAp({ payload }, { call }) {
      yield call(fakeSubmitAp, payload);
      message.success('提交成功');
    },
    *deleteAp({ payload }, { call, put }) {
      const response = yield call(fakeDeleteAp, payload);
      console.log(payload);
      if (response.code === 1) {
        const res = yield call(queryApLst, { page: payload.page, size: payload.size });
        yield put({
          type: 'showApLst',
          payload: res,
        });
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
  },
};
