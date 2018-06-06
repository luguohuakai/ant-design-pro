import {queryHotMapData} from '../services/api';

export default {
    namespace: 'hotmap',
    state: {
        points: [],
        location: {},
    },

    effects: {
        * fetchHotMapData(_, {call, put}) {
            const res = yield call(queryHotMapData);
            yield put({
                type: 'show',
                payload: res,
            });
        },
    },

    reducers: {
        show(state, {payload}) {
            return {
                ...state,
                points: payload.data.data,
                location: payload.data.location,
            };
        },
    },
};
