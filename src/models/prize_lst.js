import { fakeSubmitForm, queryFakeLst } from '../services/api';
import {
  queryPrizeLst,
  queryPrizeLstOrDetail,
  fakeSubmitPrize,
  updatePrize,
  fakeDeletePrize,
} from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'prize_lst',

  state: {
    prizeData: [],
    prizeDetail: [],
  },

  effects: {
    //获取AP列表
    *fetchPrizeLst({ payload }, { call, put }) {
      const response = yield call(queryPrizeLst, payload);
      yield put({
        type: 'showPrizeLst',
        payload: response,
      });
    },
    // 获取AC详情
    *fetchPrizeDetail({ payload }, { call, put }) {
      const response = yield call(queryPrizeLstOrDetail, payload);
      // console.error(response);
      yield put({
        type: 'showPrizeDetail',
        payload: response,
      });
    },
    *addPrize({ payload }, { call }) {
      yield call(fakeSubmitPrize, payload);
      message.success('提交成功');
    },
    *deletePrize({ payload }, { call, put }) {
      const response = yield call(fakeDeletePrize, payload);
      // console.log(payload);
      if (response.code === 1) {
        const res = yield call(queryPrizeLstOrDetail, { page: payload.page, size: payload.size });
        yield put({
          type: 'showPrizeLst',
          payload: res,
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
    *updatePrize({ payload }, { call }) {
      yield call(updatePrize, payload);
      message.success('修改成功');
    },
  },

  reducers: {
    showPrizeLst(state, action) {
      // console.error(action);
      return {
        ...state,
        prizeData: action.payload.data,
      };
    },
    showPrizeDetail(state, { payload }) {
      console.error(payload);
      return {
        ...state,
        prizeDetail: payload.data,
      };
    },
  },
};
