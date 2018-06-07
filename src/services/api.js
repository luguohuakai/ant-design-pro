import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

// export async function queryRule(params) {
//   return request(`/api/rule?${stringify(params)}`);
// }

export async function queryRule(params) {
  return request(`/school?${stringify(params)}`);
}

// 学校列表
export async function querySchoolLst(params) {
  return request(`/school?${stringify(params)}`);
}

// export async function removeRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

export async function removeRule(params) {
  return request(`/school/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

// export async function addRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });
// }
export async function addRule(params) {
  return request('/school', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}
export async function queryFakeLst(params) {
  return request(`/api/fake_lst?${stringify(params)}`);
}

export async function fakeAccountLogin0(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}
export async function fakeAccountLogin(params) {
  return request('/admin/gate/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

// hotmap 热力图
export async function queryHotMapData(params) {
  return request('/admin/authHotMapData', {
    method: 'GET',
    body: params,
  });
}

// 日活 月活 卡片
export async function queryActiveData(params) {
    return request('/admin/activeUsers', {
        method: 'GET',
        body: params,
    });
}

// 基础用户统计 卡片
export async function queryUserData(params) {
  return request('/admin/basicUserStatistics', {
    method: 'GET',
    body: params,
  });
}
