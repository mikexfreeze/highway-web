import fetch from 'utils/fetch';
import axios from 'axios';
import {Message} from 'element-ui';

export function loginByEmail(username, password) {

    const data = "grant_type=password&username=" + username + "&password=" + password;

    return axios({
        method: 'post',
        url: process.env.BASE_API + '/uaa/oauth/token',
        data: data,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Basic d2ViX2FwcDo="
        }
    }).then(function (result) {
        return result
    }, error => {
        console.log("error")
        console.log(error)
        if (error.response.status >= 400) {
            Message({
                message: error.response.data.error_description,
                type: 'error',
                duration: 10 * 1000
            })
        }
        return Promise.reject(error);
    })
}

export function getInfo(token) {
    return fetch({
        url: '/uaa/api/account',
        method: 'get',
        headers: {
            "Authorization": token
        }
        // params: { token }
    });
}

