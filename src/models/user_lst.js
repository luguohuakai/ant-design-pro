/* eslint-disable linebreak-style */

import { queryUserLst, updateUser, fakeDeleteUser,queryUserLstOrDetail } from '../services/api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'user_lst',

  state: {
    userData: [],
    userDetail:[],
  },

  effects: {
    //user列表
    *fetchUserLst({ payload }, { call, put }) {
      const response = yield call(queryUserLst, payload);
      yield put({
        type: 'showUserLst',
        payload: response,
      });
    },
      // 获取AC详情
      *fetchUserDetail({ payload }, { call, put }) {
          const response = yield call(queryUserLstOrDetail, payload);
          // console.error(response);
          yield put({
              type: 'showUserDetail',
              payload: response,
          });
      },
    *deleteUser({ payload }, { call }) {
      const response = yield call(fakeDeleteUser, payload);
      // console.log(payload);
      if (response.code === 1) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
    *updateUser({ payload }, { call }) {
      yield call(updateUser, payload);
      message.success('修改成功');
    },
  },

  reducers: {
    showUserLst(state, action) {
      // console.error(action);
      return {
        ...state,
        userData: action.payload.data,
      };
    },
    showUserDetail(state, { payload }) {
      console.error(payload);
      return {
        ...state,
        userDetail: payload.data,
      };
    },
  },
};
