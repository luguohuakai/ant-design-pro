import {message} from 'antd';
import * as giftService from '../services/gift';

export default {
    namespace: 'gift',
    state: {
        giftList: [],

        // 分页
        pageSize: 10,
        total: 0,
        current: 1,
        lastPage: 0,
    },

    effects: {
        // 查 列表
        * giftList({payload}, {call, put}) {
            const rs = yield call(giftService.giftList, payload);
            yield put({type: 'saveList', payload: {data: rs.data}});
        },

        // 增
        * giftAdd({payload}, {call}) {
            const rs = yield call(giftService.giftAdd, payload);
            if (rs.code === 1) {
                message.success(rs.msg)
            }else {
                message.error(rs.msg)
            }
        },

        // 删
        * giftDelete({payload},{call,put}) {
            const rs = yield call(giftService.giftDelete,payload);
            if (rs.code === 1) {
                message.success(rs.msg)
            }else {
                message.error(rs.msg)
            }
        },

        // 改
        * giftUpdate({payload},{call,put}) {
            const rs = yield call(giftService.giftUpdate,payload);
            if (rs.code === 1) {
                message.success(rs.msg)
            }else {
                message.error(rs.msg)
            }
        },

        // 详情
        * giftDetail({payload},{call,put}) {
            const rs = yield call(giftService.giftDetail,payload);
            if (rs.code === 1) {
                message.success(rs.msg)
            }else {
                message.error(rs.msg)
            }
        },
    },

    reducers: {
        saveList(state, {payload: {data}}) {
            return {
                ...state,
                giftList: data.data,
                pageSize: data.per_page,
                total: data.total,
                current: data.current_page,
                lastPage: data.last_page,
            }
        },
    },
}