import { queryHotMapData } from '../services/api';

export default {
  namespace: 'hotmap',
  state: {
    points: [],
  },

  effects: {
    *fetchHotMapData(_, { call, put }) {
      const res = yield call(queryHotMapData);
      yield put({
        type: 'show',
        payload: res.data,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        points: payload,
      };
    },
  },
};
