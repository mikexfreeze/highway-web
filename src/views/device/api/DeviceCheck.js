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


export function GetSensorAverageConfig(deviceID) {
    return fetch({
        url: '/gaosuWeb/doGetSensorAverageConfig?DevID='+ deviceID,
        method: 'get',
    }).then(function (response) {
        console.log("获取传感器最大最小值")
        console.log(response)
        return response
    })
}

export function GetSensorAverageValueLog(deviceID,type) {
    return fetch({
        url: '/gaosuWeb/doGetSensorAverageValueLog?DevID='+ deviceID +'&type=' + type,
        method: 'get',
    }).then(function (response) {
        console.log("获取传感器一周的平均值")
        console.log(response)
        return response
    })
}
