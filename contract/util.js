
export function genSerialNumber() {
  var num = '' //订单号
  var date = new Date()
  for (
    var i = 0;
    i < 5;
    i++ //5位随机数，用以加在时间戳后面。
  ) {
    num += Math.floor(Math.random() * 10)
  }
  num =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString() +
    date.getDate().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString() +
    date.getMilliseconds().toString() +
    num
  return num
}

export function getQueryString(key) {
  //key存在先通过search取值如果取不到就通过hash来取
  var after = window.location.hash.split('?')[1]
  if (after) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    var r = after.match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    } else {
      return null
    }
  }
}

let storage = {
  token: ""
};

export const getStorage = function(str) {
  if (storage[str]) {
    return storage[str];
  }
  let getData = localStorage.getItem("storage");
  if (getData) {
    getData = JSON.parse(getData);
    storage = getData;
  }
  return storage[str];
};

export const setStorage = function(str, data) {
  storage[str] = data;
  localStorage.setItem("storage", JSON.stringify(storage));
};


export const formatLongNumer = function (param) {
  let strParam = String(param)
  let flag = /e/.test(strParam)
  if (!flag) return param.toString();

  // 指数符号 true: 正，false: 负
  let sysbol = true
  if (/e-/.test(strParam)) {
    sysbol = false
  }
  // 指数
  let index = Number(strParam.match(/\d+$/)[0])
  // 基数
  let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')

  if (sysbol) {
    basis = basis.padEnd(index + 1, 0)
  } else {
    basis = basis
      .padStart(index + basis.length, 0)
      .replace(/^0/, '0.')
  }
  return basis.toString()
}
