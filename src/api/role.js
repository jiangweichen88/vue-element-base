import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-base/routes',
    method: 'get'
  })
}
export function getRoutesObj() {
  return request({
    url: '/vue-element-base/Objroutes',
    method: 'get'
  })
}
export function getRoles() {
  return request({
    url: '/vue-element-base/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-base/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-base/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-base/role/${id}`,
    method: 'delete'
  })
}
