import {routerRedux} from 'dva/router';
import {fakeAccountLogin} from '../services/api';
import {setAuthority, setToken} from '../utils/authority';
import {reloadAuthorized} from '../utils/Authorized';
import {message} from 'antd';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        * login({payload}, {call, put}) {
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // Login successfully
            if (response.code === 1) {
                message.success(response.msg);
                reloadAuthorized();
                yield put(routerRedux.push('/'));
            }else {
                message.error(response.msg);
            }
        },

        * logout(_, {put, select}) {
            try {
                // get location pathname
                const urlParams = new URL(window.location.href);
                const pathname = yield select(state => state.routing.location.pathname);
                // add the parameters in the url
                urlParams.searchParams.set('redirect', pathname);
                window.history.replaceState(null, 'login', urlParams.href);
            } finally {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                        data: {
                            token: '',
                            currentAuthority: 'guest',
                        },
                    },
                });
                reloadAuthorized();
                yield put(routerRedux.push('/user/login'));
            }
        },
    },

    reducers: {
        changeLoginStatus(state, {payload}) {
            setToken(payload.data.token);
            setAuthority(payload.data.currentAuthority);
            return {
                ...state,
                status: payload.data.status,
                type: payload.data.type,
            };
        },
    },
};
