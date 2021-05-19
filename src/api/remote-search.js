import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-element-base/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/vue-element-base/transaction/list',
    method: 'get',
    params: query
  })
}
