import fetch from 'utils/fetch';

export function GetUserList() {
    return fetch({
        url: '/gaosuWeb/doUserEdit?controlType=list',
        method: 'get',
    }).then(function (response) {
        console.log("获取用户列表")
        console.log(response)
        return response
    })
}

export function modifyUser(userName,enable) {
    return fetch({
        url: '/gaosuWeb/doUserEdit?controlType=modify&userName=' + userName + '&enable=' + enable,
        method: 'get',
    }).then(function (response) {
        console.log("修改用户状态")
        console.log(response)
        return response
    })
}

export function deleteUser(userName) {
    return fetch({
        url: '/gaosuWeb/doUserEdit?controlType=del&userName=' + userName,
        method: 'get',
    }).then(function (response) {
        console.log("删除用户")
        console.log(response)
        return response
    })
}


// export function GetErrorCount(param) {
//     return fetch({
//         url: '/gaosuWeb/doErrorCounting',
//         method: 'get',
//         params: param
//     }).then(function (response) {
//         console.log("获取 Error Counting");
//         console.log(response);
//         return response
//     })
// }
//
// export function GetCarLog(param) {
//     return fetch({
//         url: '/gaosuWeb/doShowCarLog',
//         method: 'get',
//         params: param
//     }).then(function (response) {
//         console.log("获取 Car Log");
//         console.log(response);
//         return response
//     })
// }