import {stringify} from "qs";
import request from '../utils/request';

// 查 列表
export async function giftList(params) {
    return request(`/gift?${stringify(params)}`);
}

// 增
export async function giftAdd(params) {
    return request(`/gift`, {
        method: 'POST',
        body: params,
    });
}

// 删
export async function giftDelete(params) {
    return request(`/gift/${params.id}`, {
        method: 'DELETE',
    });
}

// 改
export async function giftUpdate(params) {
    return request(`/gift/${params.id}`, {
        method: 'PUT',
        body: params,
    });
}

// 详情
export async function giftDetail(params) {
    return request(`/gift/${params.id}`);
}

