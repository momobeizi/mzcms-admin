import { Message } from 'element-ui'

//其它一些常用处理
/**
 * checkFileType:检测文件类型是否符合要求
 * downloadBlob:下载文件流
 * downStreamCheck: 下载文件流检测是否返回正常文件流
 * */

/** 检测文件类型是否符合要求
 * @param {String} name 文件名
 * @param {Array}  acceptFormat 允许的文件类型
 * @result {Boolean} 返回结果 true:符合要求 false:不符合要求
 *
 * */
export function checkFileType (name, acceptFormat) {
  let resultState, ex;
  resultState = false;
  ex = name.substring(name.lastIndexOf('.') + 1);
  ex = ex.toLowerCase();
  for (var i = 0; i < acceptFormat.length; i++) {
    if (ex.indexOf(acceptFormat[i]) != -1) {
      resultState = true;
      break;
    }
  }
  return resultState;
}


/** 从响应头部读取文件名称
* @param {res}  response
* */
export function responseFileName (res) {
  if (res && res.headers) {
    let resultFileName = decodeURI(res.headers['content-disposition']);
    return resultFileName.substring(resultFileName.indexOf('=')).substring(1);
  }
  return '';
}

/**
* @param {String} resource 文件流
* @param {String} fileType 文件类型
* @param {String} fileName 文件名 （可以响应头部读取文件名，如下）
*  let resultFileName = res.headers['content-disposition'];
*  let name = resultFileName.substring(resultFileName.indexOf('=')).substring(1);
* 使用方式 this.$downloadBlob(data,'application/octet-stream','download.zip');其中文件名可以从响应头截取
*
* */
export function downloadBlob (resource, fileType, fileName) {
  var data = new Blob([resource], {
    type: fileType
  });
  if ('download' in document.createElement('a')) { //非IE
    var downloadUrl = window.URL.createObjectURL(data);
    var anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = fileName;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  } else { //IE10+下载
    navigator.msSaveBlob(data, fileName);
  }
}


/** 导出文件流成功失败分别干干什么
* @param {String} res 文件流或者JSON对象（错误情况下）
* @param {Boolean} blob res资源是否是blob对象，文件流 默认不传递该参数
*
* */
export function downStreamCheck (res, blob) {
  let result = {};
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = e => {
      try {
        result = JSON.parse(e.target.result);
      } catch (e) {
        // console.log(e)
      } finally {
        if (res.headers['content-type'].indexOf('download') === -1 && (typeof result.code !== 'undefined' || typeof result.status !== 'undefined')) { // 返回错误对象
          Message({
            message: result.message || result.msg,
            type: 'error',
            duration: 5 * 1000
          });
        } else {
          resolve();
        }
      }
    }
    if (!blob) {
      reader.readAsText(new Blob([res.data], {
        type: 'application/octet-stream'
      }));
    } else {
      reader.readAsText(res.data);
    }
  })
}

//文件操作

/**
* 文件转化成 base64
* @param {Object} file
* @param {Function} callback
* */
export function fileToBase64 (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
      resolve(evt.target.result)
    }
  })
}
