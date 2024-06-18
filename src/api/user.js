import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/doLoginByPassword',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
  