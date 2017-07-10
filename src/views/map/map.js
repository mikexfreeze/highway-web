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

                    var result = response.data;

                    $('#station_point').empty();

                    var station_pointE = $('#station_point');

                    for (var i = 0; i < result.length; i++) {
                        var stationStatus = result[i];

                        var stationStatusID = "station_status_" + i;

                        var pointHtml = "<div id='" + stationStatusID + "'></div>"

                        station_pointE.append(pointHtml);

                        var jQID = '#' + stationStatusID;

                        var statusColor;

                        if (stationStatus["stat"] == 0) {
                            statusColor = "green";
                        } else if (stationStatus["stat"] == 1) {
                            statusColor = "blue";
                        } else if (stationStatus["stat"] == 2) {
                            statusColor = "red";
                        }

                        var topValue = stationStatus["top"] + "px";
                        var leftValue = stationStatus["left"] + "px";

                        var cssParam = {
                            "width" : "30px",
                            "height" : "30px",
                            "background-color" : statusColor,
                            "position" : "absolute",
                            "top" : topValue,
                            "left" : leftValue
                        }

                        $(jQID).css(cssParam);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}