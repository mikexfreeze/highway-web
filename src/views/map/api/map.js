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