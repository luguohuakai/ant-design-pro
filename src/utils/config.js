// TODO: 环境: test product 上线前需要修改为product
const ENV = 'test';
// TODO: 是否跨域
const IS_CROSS_DOMAIN = false;

const TEST = 'test';
const PRODUCT = 'product';

const REMOTE_URL = ENV === PRODUCT
    ? 'https://api.srun.com/'
    : ENV === TEST
        ? 'http://106.14.7.51/'
        : 'http://106.14.7.51/';

export {
    ENV,
    TEST,
    PRODUCT,
    REMOTE_URL,
    IS_CROSS_DOMAIN,
}