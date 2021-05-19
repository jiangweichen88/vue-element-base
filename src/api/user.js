import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-base/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-base/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-base/user/logout',
    method: 'post'
  })
}
