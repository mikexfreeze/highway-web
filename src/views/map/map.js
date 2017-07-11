/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetXY} from './api/map'
import axios from 'axios'

var randomState = 0;

export default {
    data(){
        return{}
    },
    methods:{
        getXY(){
            testXY();
            // axios.get('http://192.168.1.203:8080/gaosuWeb/doMapShow')
            //     .then(function (response) {
            //         console.log(response);
            //
            //         var result = response.data;
            //
            //         $('#station_point').empty();
            //
            //         var station_pointE = $('#station_point');
            //
            //         for (var i = 0; i < result.length; i++) {
            //             var stationStatus = result[i];
            //
            //             var stationStatusID = "station_status_" + i;
            //
            //             var pointHtml = "<div id='" + stationStatusID + "'></div>"
            //
            //             station_pointE.append(pointHtml);
            //
            //             var jQID = '#' + stationStatusID;
            //
            //             var statusColor;
            //             var statusImage;
            //
            //             if (stationStatus["stat"] == 0) {
            //                 statusColor = "green";
            //                 statusImage = "url(../../assets/images/green_alert.bmp)";
            //             } else if (stationStatus["stat"] == 1) {
            //                 statusColor = "blue";
            //                 statusImage = "url(../../assets/images/blue_alert.BMP)";
            //             } else if (stationStatus["stat"] == 2) {
            //                 statusColor = "red";
            //                 statusImage = "url(../../assets/images/red_alert.bmp)";
            //             }
            //
            //             var topValue = stationStatus["top"] + "px";
            //             var leftValue = stationStatus["left"] + "px";
            //
            //             var cssParam = {
            //                 "width": "30px",
            //                 "height": "30px",
            //                 // "background-color": statusColor,
            //                 "position": "absolute",
            //                 "top": topValue,
            //                 "left": leftValue,
            //                 "background-image": statusImage
            //             }
            //
            //             $(jQID).css(cssParam);
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }
    }
}

function testXY() {
    var result = mapTestState();

    $('#station_point').empty();

    var station_pointE = $('#station_point');

    for (var i = 0; i < result.length; i++) {
        var stationStatus = result[i];

        var stationStatusID = "station_status_" + i;

        var pointHtml = "<div id='" + stationStatusID + "'></div>"

        station_pointE.append(pointHtml);

        var jQID = '#' + stationStatusID;

        var statusColor;
        var statusImage;

        if (stationStatus["stat"] == 0) {
            statusColor = "green";
            // statusImage = "url(../../assets/images/green_alert.bmp)";
        } else if (stationStatus["stat"] == 1) {
            statusColor = "blue";
            // statusImage = "url(../../assets/images/blue_alert.BMP)";
        } else if (stationStatus["stat"] == 2) {
            statusColor = "red";
            // statusImage = "url(../../assets/images/red_alert.bmp)";
        }

        var topValue = stationStatus["top"] + "px";
        var leftValue = stationStatus["left"] + "px";

        var cssParam = {
            "width": "30px",
            "height": "30px",
            // "background-color": statusColor,
            "position": "absolute",
            "top": topValue,
            "left": leftValue,
            "background-image": statusImage
        }

        $(jQID).css(cssParam);
    }
}

function mapTestState() {

    if (randomState == 3) {
        randomState = 0;
    }

    var result = [{
        "top" : "250",
        "left" : "700",
        "stat" : randomState
    },
        {
            "top" : "350",
            "left" : "200",
            "stat" : randomState
        }];

    randomState++;

    return result;
}