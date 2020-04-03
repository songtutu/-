import {request} from './request'

export function getHomemultidata () {
  return request({
    url: '/home/multidata'
  })
}
