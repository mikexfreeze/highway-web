/**
 * Created by john on 2017/7/11.
 */
import fetch from 'utils/fetch';

export function GetProvince() {
    return fetch({
        url: '/gaosuWeb/doGetLocation?queryType=Province',
        method: 'get',
    }).then(function (response) {
        console.log("获取省")
        console.log(response)
        return response
    })
}

export function GetRoad(province) {
    return fetch({
        url: '/gaosuWeb/doGetLocation?province='+ province + '&queryType=Road',
        method: 'get',
    }).then(function (response) {
        console.log("获取road");
        console.log(response);
        return response
    })
}

export function GetStation(province, road) {
    return fetch({
        url: '/gaosuWeb/doGetLocation?province='+ province + '&road='+ road + '&queryType=Station',
        method: 'get',
    }).then(function (response) {
        console.log("获取station");
        console.log(response);
        return response
    })
}

export function GetStatu(param) {
    return fetch({
        url: '/gaosuWeb/doQueryStatOfStation',
        method: 'get',
        params:param
    }).then(function (response) {
        console.log("获取station info");
        console.log(response);
        return response
    })
}