/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import axios from 'axios'


export default {
    data() {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: ''
        }
    },
    methods:{
        getRoad(){
            // GetXY()
            axios.get('http://192.168.1.203:8080/gaosuWeb/doQueryStatOfStation?province=guangxi&road=nanlinggaosu&station=nanlingzhan')
                .then(function (response) {
                    console.log(response);

                    var result = response.data;

                    $('#sensors_containner').empty();

                    for (var i = 0; i < result.length; i++) {
                        var roadInfo = result[i];
                        var sensorboxHtml = sensorbox(roadInfo);
                        $('#sensors_containner').append(sensorboxHtml);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

function sensorbox(roadInfo) {
    var color_s0 = colorSensor(roadInfo["s0"]);
    var color_s1 = colorSensor(roadInfo["s1"]);
    var color_s2 = colorSensor(roadInfo["s2"]);
    var color_s3 = colorSensor(roadInfo["s3"]);
    var color_s4 = colorSensor(roadInfo["s4"]);
    var color_s5 = colorSensor(roadInfo["s5"]);
    var color_s6 = colorSensor(roadInfo["s6"]);
    var color_s7 = colorSensor(roadInfo["s7"]);
    var color_s8 = colorSensor(roadInfo["s8"]);
    var color_s9 = colorSensor(roadInfo["s9"]);

    var num_road = roadNumName(roadInfo["port"]);

    var sysInfo = "正常状态";

    if (roadInfo["s0"] == "1" || roadInfo["s1"] == "1" || roadInfo["s2"] == "1" || roadInfo["s3"] == "1" || roadInfo["s4"] == "1" || roadInfo["s5"] == "1" || roadInfo["s6"] == "1" || roadInfo["s7"] == "1" || roadInfo["s8"] == "1" || roadInfo["s9"] == "1") {
        sysInfo = "检查预警";
    }

    if (roadInfo["s0"] == "2" || roadInfo["s1"] == "2" || roadInfo["s2"] == "2" || roadInfo["s3"] == "2" || roadInfo["s4"] == "2" || roadInfo["s5"] == "2" || roadInfo["s6"] == "2" || roadInfo["s7"] == "2" || roadInfo["s8"] == "2" || roadInfo["s9"] == "2") {
        sysInfo = "维护预警";
    }

    var sensorboxHtml = "<div class='sensors_box'>" +
        "<div class='sensor sensor_right' id='sensor_10' " + color_s9 + ">" +
        "<span class='sensor_text'>10</span>" +
        "</div>" +
        "<div class='sensor sensor_left' id='sensor_9' " + color_s8 + ">" +
        "<span class='sensor_text'>9</span>" +
        "</div>" +
        "<div class='placeholder_blank'>" +
        "</div>" +
        "<div class='sensor sensor_right' id='sensor_8' " + color_s7 + ">" +
        "<span class='sensor_text'>8</span>" +
        "</div>" +
        "<div class='sensor sensor_left' id='sensor_7' " + color_s6 + ">" +
        "<span class='sensor_text'>7</span>" +
        "</div>" +
        "<div class='placeholder_blank'>" +
        "</div>" +
        "<div class='sensor sensor_right' id='sensor_6' " + color_s5 + ">" +
        "<span class='sensor_text'>6</span>" +
        "</div>" +
        "<div class='sensor sensor_left' id='sensor_5' " + color_s4 + ">" +
        "<span class='sensor_text'>5</span>" +
        "</div>" +
        "<div class='placeholder_blank'>" +
        "</div>" +
        "<div class='sensor sensor_right' id='sensor_4' " + color_s3 + ">" +
        "<span class='sensor_text'>4</span>" +
        "</div>" +
        "<div class='sensor sensor_left' id='sensor_3' " + color_s2 + ">" +
        "<span class='sensor_text'>3</span>" +
        "</div>" +
        "<div class='placeholder_blank'>" +
        "</div>" +
        "<div class='sensor sensor_right' id='sensor_2' " + color_s1 + ">" +
        "<span class='sensor_text'>2</span>" +
        "</div>" +
        "<div class='sensor sensor_left' id='sensor_1' " + color_s0 + ">" +
        "<span class='sensor_text'>1</span>" +
        "</div>" +
        "<div class='sensor_road'>" +
        "<span class='sensor_road_text'>" + num_road + "</span>" +
        "</div>" +
        "<div class='sensor_detail_check_containner'>" +
        "<span class='sensor_status_text'>" + sysInfo + "</span>" +
        "<button class='check_sensor_status_btn'>详情查看</button>" +
        "</div>" +
        "</div>"

    return sensorboxHtml;
}

function colorSensor(status) {

    if (status === undefined) {
        return "style='visibility:hidden;'";
    }

    var color = "green";
    if (status == "0") {
        color = "green";
    } else if (status == "1") {
        color = "blue";
    } else if (status == "2") {
        color = "red";
    }

    return "style='background-color: " + color + "';";
}

function roadNumName(port) {

    return port + "号道";

}