import fetch from 'utils/fetch';

export function AddPaintRequest(deviceID) {
    return fetch({
        url: '/gaosuWeb/doAddPaintRequestAccess?DevID='+ deviceID,
        method: 'get',
    }).then(function (response) {
        console.log("添加绘图请求")
        console.log(response)
        return response
    })
}


export function ShowPaint(deviceID) {
    return fetch({
        url: '/gaosuWeb/doShowPaint?DevID='+ deviceID,
        method: 'get',
    }).then(function (response) {
        console.log("请求图片")
        console.log(response)
        return response
    })
}
