/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetXY} from './api/map'
import axios from 'axios'


export default {
    data(){
        return{}
    },
    methods:{
        getXY(){
            // GetXY()
            axios.get('http://192.168.1.203:8080/gaosuWeb/doMapShow')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}