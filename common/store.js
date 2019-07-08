// 存数据
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__ // 把所有值存到_seller_这个变量里
  if (!seller) { // 没有创建seller时候
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller) // 否则直接解析成json对象
    if (!seller[id]) { // 没有注册的商家就是空对象，有的话直接用
      seller[id] = {}
    }
  }
  seller[id][key] = value // 然后id和key保存到vulue
  window.localStorage.__seller__ = JSON.stringify(seller) // json格式存入
}
// 读数据 def：如果读不到传入def变量默认值
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__ // 首先读取seller
  if (!seller) { // 如果没有seller返回默认值
    return def
  }
  seller = JSON.parse(seller)[id] // 如果有seller就转换成json对象同时拿到 id
  if (!seller) { // 如果取不到这个 id 还是返回默认值
    return def
  }
  let ret = seller[key] // 如果取到 id 的话，就看这个商家有没有key
  return ret || def // 如果ret没有返回默认值
}
