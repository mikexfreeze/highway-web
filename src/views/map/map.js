/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetXY} from './api/map'
import axios from 'axios'
import dotview from './components/dotview.vue'

var randomState = 0;

export default {
    components:{dotview},
    data(){
        return{
            dotList: []
        }
    },
    methods:{
        getXY(){
            this.dotList = testXY();



        }
    }
}

function testXY() {
    var result = mapTestState();
    return result;

    // $('#station_point').empty();
    //
    // var station_pointE = $('#station_point');
    //
    // for (var i = 0; i < result.length; i++) {
    //     var stationStatus = result[i];
    //
    //     var stationStatusID = "station_status_" + i;
    //
    //     var pointHtml = "<div id='" + stationStatusID + "'></div>"
    //
    //     station_pointE.append(pointHtml);
    //
    //     var jQID = '#' + stationStatusID;
    //
    //     var statusColor;
    //     var statusImage;
    //
    //     if (stationStatus["stat"] == 0) {
    //         statusColor = "green";
    //         statusImage = "url('../../assets/images/greendot.png')";
    //     } else if (stationStatus["stat"] == 1) {
    //         statusColor = "blue";
    //         statusImage = "url('../../assets/images/bluedot.png')";
    //     } else if (stationStatus["stat"] == 2) {
    //         statusColor = "red";
    //         statusImage = "url('../../assets/images/reddot.png')";
    //     }
    //
    //     var topValue = stationStatus["top"] + "px";
    //     var leftValue = stationStatus["left"] + "px";
    //
    //     var cssParam = {
    //         "width": "30px",
    //         "height": "30px",
    //         // "background-color": statusColor,
    //         "position": "absolute",
    //         "top": topValue,
    //         "left": leftValue,
    //         "background-image": statusImage
    //     }
    //
    //     $(jQID).css(cssParam);
    // }
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