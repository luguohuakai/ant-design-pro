/* eslint-disable linebreak-style */
import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '数据监测',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '数据概览',
        path: 'analysis',
      },
      {
        name: '热力图',
        path: 'hot-map',
      },
      // {
      //   name: '监控页',
      //   path: 'monitor',
      // },
      // {
      //   name: '工作台',
      //   path: 'workplace',
      //   // hideInBreadcrumb: true,
      //   // hideInMenu: true,
      // },
    ],
  },
  // {
  //   name: '表单页',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: '基础表单',
  //       path: 'basic-form',
  //     },
  //     {
  //       name: '分步表单',
  //       path: 'step-form',
  //     },
  //     {
  //       name: '高级表单',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //     },
  //   ],
  // },
  {
    name: '管理',
    icon: 'table',
    path: 'lst',
    children: [
      {
        name: '用户管理',
        path: 'user-lst',
      },
      {
        name: '学校管理',
        path: 'school-lst',
      },
      {
        name: 'AC管理',
        path: 'ac-lst',
      },
      {
        name: 'AP管理',
        path: 'ap-lst',
      },
      {
        name: '热点管理',
        path: 'ssid-lst',
      },
    ],
  },
  {
    name: '日志',
    icon: 'file-text',
    path: 'log',
    children: [
      {
        name: '认证日志',
        path: 'auth-log-lst',
      },
    ],
  },
  {
    name: '意见反馈',
    icon: 'question-circle-o',
    path: 'feedback',
    children: [
      {
        name: '反馈列表',
        path: 'feedback-lst',
      },
    ],
  },
  // {
  //   name: '详情页',
  //   icon: 'profile',
  //   path: 'profile',
  //   children: [
  //     {
  //       name: '基础详情页',
  //       path: 'basic',
  //     },
  //     {
  //       name: '高级详情页',
  //       path: 'advanced',
  //       authority: 'admin',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     // {
  //     //   name: '404',
  //     //   path: '404',
  //     // },
  //     // {
  //     //   name: '500',
  //     //   path: '500',
  //     // },
  //     // {
  //     //   name: '触发异常',
  //     //   path: 'trigger',
  //     //   hideInMenu: true,
  //     // },
  //   ],
  // },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
