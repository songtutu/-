import {request} from './request'

export function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export function getRecommends () {
  return request({
    url: '/recommend'
  })
}
export class Goods {
  constructor (itemInfo, columns, shopInfo, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.shopName = shopInfo.name
    this.shopInfo = shopInfo
    this.lowNowPrice = itemInfo.lowNowPrice
  }
}
export class ItemParams {
  constructor (info, rule) {
    // 注：images可能没有值（某些商品有值，某些没有值）
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}
export class Product {
  constructor (image, title, desc, price, iid, discount) {
    this.image = image
    this.title = title
    this.desc = desc
    this.price = price
    this.iid = iid
    this.discount = discount
    this.checked = false
  }
}
