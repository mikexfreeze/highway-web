/**
 * Created by 40802 on 2017/7/10.
 */
import fetch from 'utils/fetch';

export function GetXY() {
    return fetch({
        url: '/gaosuWeb/doMapShow',
        method: 'get',
    }).then(function (response) {
        console.log("获取坐标信息接口")
        console.log(response)
        // console.log(response.headers)
        // console.log(response.headers('X-Total-Count'))
        return response
    })
}


export function GetWeightCountingCheck(startTime,endTime,range) {
    return fetch({
        url: 'gaosuWeb/doGetWeightCountingCheck?startTime=' + startTime + "&endTime=" + endTime + "&range=" + range ,
        method: 'get',
    }).then(function (response) {
        console.log("获取重量统计接口")
        console.log(response)
        return response
    })
}


export function GetStatErrorCount(startTime,endTime,range) {
    // return fetch({
    //     url: 'gaosuWeb/doGetStatErrorCount?startTime=' + startTime + "&endTime=" + endTime + "&range=" + range ,
    //     method: 'get',
    // }).then(function (response) {
    //     console.log("获取别人重量统计接口")
    //     console.log(response)
    //     return response
    // })

    // TEST
    return fetch({
        url: 'gaosuWeb/doGetWeightCountingCheck?startTime=' + startTime + "&endTime=" + endTime + "&range=" + range ,
        method: 'get',
    }).then(function (response) {
        console.log("获取重量统计接口")
        console.log(response)
        return response
    })



}

export function GetWeightCountingOriginal(startTime,endTime,range) {
    return fetch({
        url: 'gaosuWeb/doGetWeightCountingOriginal?startTime=' + startTime + "&endTime=" + endTime + "&range=" + range ,
        method: 'get',
    }).then(function (response) {
        console.log("获取别人重量统计接口")
        console.log(response)
        return response
    })
}

