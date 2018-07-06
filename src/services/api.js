/* eslint-disable linebreak-style */
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

export async function queryFeedbackLst(params) {
  return request(`/feedback?${stringify(params)}`);
}
export async function setOnlineStatus(params) {
  return request(`/admin/setOnlineStatus?${stringify(params)}`);
}

export async function querySchoolCount() {
  return request('/admin/school/schoolCount');
}

// 添加学校
export async function fakeSubmitSchool(params) {
  return request('/school', {
    method: 'POST',
    body: params,
  });
}

// ac列表
export async function queryAcLst(params) {
  return request(`/ac?${stringify(params)}`);
}

// 添加ac
export async function fakeSubmitAC(params) {
  return request('/ac', {
    method: 'POST',
    body: params,
  });
}

// ap列表
export async function queryApLst(params) {
  return request(`/ap?${stringify(params)}`);
}

// 添加ap
export async function fakeSubmitAp(params) {
  return request('/ap', {
    method: 'POST',
    body: params,
  });
}

// Ssid列表
export async function querySsidLst(params) {
  return request(`/schoolssid?${stringify(params)}`);
}

// 添加Ssid
export async function fakeSubmitSsid(params) {
  return request('/schoolssid', {
    method: 'POST',
    body: params,
  });
}
//修改School
export async function updateSchool(params) {
  return request(`/school/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'PUT',
    },
  });
}
//修改Ac
export async function updateAc(params) {
  return request(`/ac/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'PUT',
    },
  });
}
//修改Ap
export async function updateAp(params) {
  return request(`/ap/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'PUT',
    },
  });
}

//修改Ssid
export async function updateSsid(params) {
  return request(`/schoolssid/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'PUT',
    },
  });
}

// 删除学校
export async function fakeDeleteSchool(params) {
  return request(`/school/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

//删除AC
export async function fakeDeleteAC(params) {
  return request(`/ac/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

//删除Ap
export async function fakeDeleteAp(params) {
  return request(`/ap/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

//删除school_ssid
export async function fakeDeleteSsid(params) {
  return request(`/schoolssid/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

//意见反馈列表
export async function queryfeedbackLst(params) {
  return request(`/feedback?${stringify(params)}`);
}
//已处理意见
export async function querydealLst(params) {
  return request(`/admin/dealFeedback?${stringify(params)}`);
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
  return request(`/admin/authHotMapData?${stringify(params)}`, {
    method: 'GET',
  });
}

// 日活 月活 卡片
export async function queryActiveData(params) {
  return request(`/admin/activeUsers?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryAuthTop10(params) {
  return request(`/admin/authTop10?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function querySchoolUserCountTop10() {
  return request('/admin/schoolUserCountTop10', {
    method: 'GET',
  });
}

export async function queryAuthWayCount() {
  return request('/admin/recentAuthWay', {
    method: 'GET',
  });
}

// 基础用户统计 卡片
export async function queryUserData(params) {
  return request(`/admin/basicUserStatistics?${stringify(params)}`, {
    method: 'GET',
  });
}
