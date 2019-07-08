/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse () {
  let url = window.location.search // 解析拿到url参数
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g // 用正则解析url参数如：？id = 12345和 & a = b 这两种
  let arr = url.match(reg) // 用正则match方法 转换 成数组
  // ['?id=12345', '&a=b'] 拿到2数组
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=') // 把第一个字符删除掉，用split分割第一个数组是id 第二个数组是12345，得到的数组就是 id=12345
      let key = decodeURIComponent(tempArr[0]) // 因为是url参数所有用decode...方法.第一哥拿到 id
      let val = decodeURIComponent(tempArr[1]) // 第二个拿到 12345
      obj[key] = val // 这样就转化成了对象 key就是id value就是12345 得到 id=12345
    })
  }
  return obj
}
