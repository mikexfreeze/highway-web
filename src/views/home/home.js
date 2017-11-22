/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetProvince, GetRoad, GetStation, GetStatu} from './api/Lane.js'
import statuLabel from './components/status.vue'
import roadblock from './components/roadstat.vue'

var timeSet;


export default {
    components:{statuLabel,roadblock},
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
            provinceOptions: [],
            roadOptions: [],
            stationOptions: [],
            selectedProvince: null,
            selectedRoad: null,
            selectedStation: null,
            checkPointList:[],
            roadStatusList:[]
        }

    },
    methods:{
        handlechangeLane(data){
            this.checkPointList = setCheckPointList(this.roadStatusList[data-1])
        },
        getPovince(){
            return GetProvince()
        },
        getRoad(){
            var result = sensorTest();

            $('#sensors_containner').empty();

            this.roadStatusList = result;

            // for (var i = 0; i < result.length; i++) {
            //     var roadInfo = result[i];
            //     var sensorboxHtml = sensorbox(roadInfo);
            //     $('#sensors_containner').append(roadblock);
            // }
        },
        provinceHasItem() {
            return this.selectedProvince == null;
        },
        roadHasItem() {
            return this.selectedRoad == null;
        },
        stationHasItem() {
            return this.selectedStation == null;
        },
        changeProvince() {
            this.selectedStation = null;
            this.selectedRoad = null;
            // 调用查询Road接口
            GetRoad(this.selectedProvince)
                .then((response)=>{
                    this.roadOptions = getResObjArry(response.data.roadList)
                })
        },
        changeRoad(value) {
            this.selectedStation = null;
            GetStation(this.selectedProvince ,this.selectedRoad)
                .then((response)=>{
                    this.stationOptions = getResObjArry(response.data.stationList)
                })
            // var stationList = testGetStation();
            // this.stationOptions = stationList["stationList"];
        },
        changeStation(value) {
            // 调用整个数据接口 TODO:
            let param = {
                province:this.selectedProvince,
                road:this.selectedRoad,
                station:this.selectedStation
            };
            GetStatu(param)
                .then((response)=>{
                    let data = response.data[0]

                    response.data.forEach((val,n)=>{
                        response.data[n].statuLabel = "正常状态"
                        Object.keys(val).forEach((w)=>{
                            if(val[w] == "1" && w != "port"){
                                response.data[n].statuLabel = "需要维护"
                            }
                        })
                    })

                    this.roadStatusList = response.data

                    this.checkPointList = setCheckPointList(data)
                })
        },
        updateStatusPerSecond() {
            // 调用整个数据接口 TODO:
            let param = {
                province:this.selectedProvince,
                road:this.selectedRoad,
                station:this.selectedStation
            };
            GetStatu(param)
                .then((response)=>{
                    let data = response.data[0]

                    response.data.forEach((val,n)=>{
                        response.data[n].statuLabel = "正常状态"
                        Object.keys(val).forEach((w)=>{
                            if(val[w] == "1" && w != "port"){
                                response.data[n].statuLabel = "需要维护"
                            }
                        })
                    })

                    this.roadStatusList = response.data

                    this.checkPointList = setCheckPointList(data)
                })
        },
    },

    created: function () {

        var gThis = this;

        timeSet = setInterval(function () {
            if (gThis.selectedStation) {
                gThis.updateStatusPerSecond()
            }
        }, 60000);



        this.getPovince()
            .then((response) => {
                this.provinceOptions = [];
                response.data.provinceList.forEach((val, n) => {
                    let x = Object.keys(val)[0];
                    this.provinceOptions.push({
                        "key": x,
                        "value": val[x]
                    })

                })
            });
    },
    destroyed:function () {
        clearInterval(timeSet)
    },
}

function setCheckPointList(data) {
    let list = [];

    let sensorCount = Number(data["sensorCount"]);

    if (sensorCount > 12) {
        sensorCount = 12
    }

    for (var sIndex = 0; sIndex < sensorCount;sIndex++) {
        var tmpPointName = "传感器" + (sIndex + 1);
        var statusIndex = "s" + sIndex;

        list[sIndex] = {pointName:tmpPointName, status: data[statusIndex]}
    }

    list.push({pointName:"光幕",status:data["light"]});
    list.push({pointName:"轮轴器识别1",status:data["axeCounter1"]});
    list.push({pointName:"轮轴器识别2",status:data["axeCounter2"]});

    return list
}

function getResObjArry(data) {
    let arr = [];
    data.forEach((val, n) => {
        let x = Object.keys(val)[0];
        arr.push({
            "key": x,
            "value": val[x]
        })

    });
    return arr
}

function testGetProvince() {
    return {
        "provinceList": [
            {
                "key": "guangxi",
                "value": "广西"
            },
            {
                "key": "jiangsu",
                "value": "江苏"
            }
        ]
    }
}

function testGetRoad() {
    return {
        "roadList" : [
            {
                "key" : "nn1",
                "value" : "南宁市绕城高速公路1",
            },
            {
                "key" : "nn2",
                "value" : "南宁市绕城高速公路2",
            }
        ]
    }
}

function testGetStation() {
    return {
        "stationList" : [
            {
                "key" : "nnesfz1",
                "value" : "南宁东收费站1",
            },
            {
                "key" : "nnesfz2",
                "value" : "南宁东收费站2",
            }
        ]
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

    var sensorboxHtml =
        "<div class='sensors_box'>" +
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

function sensorTest() {
    var result = [{
        "s0" : "1",
        "s1" : "0",
        "s2" : "0",
        "s3" : "1",
        "s4" : "0",
        "s5" : "0",
        "s6" : "1",
        "s8" : "0",
        "port" : "8",
        "light": "0"
    },
        {
            "s0" : "1",
            "s1" : "0",
            "s2" : "0",
            "s3" : "1",
            "s4" : "0",
            "s5" : "0",
            "s6" : "1",
            "s8" : "0",
            "port" : "8",
            "light": "0"
        }];

    return result;
}