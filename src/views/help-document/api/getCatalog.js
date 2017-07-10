/**
 * Created by xinquan.yu on 2017/7/5.
 */
import fetch from 'utils/fetch';
import axios from 'axios';


export function GetCatalog() {
    return fetch({
        url: process.env.NODE_API,
        method: 'get',
    }).then(function (result) {
        console.log("获取目录信息接口 返回信息")
        console.log(result)
        return result
    })
}

// export function GetMdFile(filePath) {
//     return fetch({
//         url: process.env.NODE_API + '/files' + filePath,
//         method: 'get',
//     }).then(function (result) {
//         console.log("获取MD文件")
//         console.log(result)
//         return result
//     })
// }

export function GetMdFile(filePath) {
    return axios({
        method:'get',
        url:process.env.NODE_API + '/files' + filePath,
        headers: {'accept': 'text/html,application/xhtml+xml,application/xml'}
    })
    .then(function (response) {
        console.log("获取MD文件")
        console.log(response)
        return response
    })

}
