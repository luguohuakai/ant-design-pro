import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
const remote_url = 'http://106.14.7.51/'; // 测试环境 远程接口

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'GET /school': remote_url,
  'POST /school': remote_url,
  'DELETE /school': remote_url,
  'PUT /school': remote_url,
  'POST /test/index.php': 'http://localhost',
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_lst': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  // 'GET /admin/authHotMapData': {
  //   data: [
  //     { lng: 116.191031, lat: 39.988585, count: 10 },
  //     { lng: 116.389275, lat: 39.925818, count: 60 },
  //     { lng: 116.287444, lat: 39.810742, count: 12 },
  //     { lng: 116.481707, lat: 39.940089, count: 13 },
  //     { lng: 116.410588, lat: 39.880172, count: 14 },
  //     { lng: 116.394816, lat: 39.91181, count: 15 },
  //     { lng: 116.31626, lat: 39.956306, count: 100 },
  //     { lng: 116.416002, lat: 39.952917, count: 80 },
  //     { lng: 121.50074, lat: 31.30639, count: 80 },
  //   ],
  // },
  'GET /admin/authHotMapData': remote_url,
  'GET /admin/activeUsers': remote_url,
  'GET /admin/basicUserStatistics': remote_url,
  'POST /admin/Index/uploadImg': remote_url, // 注意: mock 中不支持文件上传
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /admin/gate/login': remote_url,
  'POST /admin/gate/login_bk': (req, res) => {
    const { password, user_name, type } = req.body;
    if (password === '123456' && user_name === 'root') {
      res.send({
        code: 1,
        msg: '登录成功',
        data: {
          status: 'ok',
          type,
          currentAuthority: 'admin',

          current_authority: 'admin',
          token: 'sdjogewoejo%&*Hufl9754d',
        },
      });
      return;
    }
    if (password === '123456' && user_name === 'user') {
      res.send({
        code: 1,
        msg: '登录成功',
        data: {
          status: 'ok',
          type,
          currentAuthority: 'user',

          current_authority: 'user',
          token: 'sdjogewoejo%&*Hufl9754dsdf',
        },
      });
      return;
    }
    res.send({
      code: 0,
      msg: '登录失败',
      data: {
        status: 'error',
        type,
        currentAuthority: 'guest',

        current_authority: 'guest',
      },
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default (noProxy ? {} : delay(proxy, 1000));
