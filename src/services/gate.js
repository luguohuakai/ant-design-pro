import request from '../utils/request';

export async function login(params) {
    return request('/gate/login',{
        method: 'POST',
        body: params,
    })
}