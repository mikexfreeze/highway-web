<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-row class="grid-content select-area">
                    <el-col :span="6">
                        <el-select v-model="selectedProvince" placeholder="请选择" @change="changeProvince()">
                            <el-option
                                    v-for="item in provinceOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="selectedRoad" placeholder="请选择" :disabled="provinceHasItem()" @change="changeRoad()">
                            <el-option
                                    v-for="item in roadOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="selectedStation" placeholder="请选择" :disabled="roadHasItem()" @change="changeStation()">
                            <el-option
                                    v-for="item in stationOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="selectedPort" placeholder="请选择" :disabled="stationHasItem()" @change="changePort()">
                            <el-option
                                    v-for="item in portOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" class="col-1-left">
                <el-row>
                    <el-col :span="8">
                        <h6>设备体检报告</h6>
                    </el-col>
                    <el-col :span="8">
                        <el-button size="mini" round id="btn-checkall" @click="checkAll()">查看全部</el-button>
                    </el-col>
                </el-row>

                <el-table
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        :row-class-name="tableRowClassName"
                        ref="singleTable"
                        :show-header="false"
                        :data="sensorList"
                        style="width: 100%">
                    <el-table-column
                            prop="pointName"
                            label="检查点"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="100">
                        <template scope="scope">
                            <statu-label :status="scope.row.status"></statu-label>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="19">
                <el-row id="select-chart-type-row">
                    <el-select id="chart-types" size="mini" v-model="selectedType" placeholder="请选择"  @change="changeType()">
                        <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <figure id="sensor-charts-contianer">
                        <chart :options="sensorline"  ref="c1" auto-resize></chart>
                    </figure>
                </el-row>
                <el-row type="flex" justify="center">
                    <table v-if="chartDatas.length" class="min-max-table" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                           <td class="column-td">
                               设备
                           </td>
                            <td v-for="(item, index) in chartDatas">


                                <span v-if="currentIndex === index" :style="{color: lineColors[index]}">传感器{{index +1}}</span>
                                <span v-else>传感器{{index +1}}</span>

                            </td>

                        </tr>
                        <tr>
                            <td class="column-td">
                                最大值
                            </td>
                            <td v-for="(item, index) in chartDatas">

                                <span v-if="currentIndex === index" :style="{color: lineColors[index]}">{{item.max}}</span>
                                <span v-else>{{item.max}}</span>

                            </td>
                        </tr>
                        <tr>
                            <td class="column-td">
                                最小值
                            </td>
                            <td v-for="(item, index) in chartDatas">
                                <span v-if="currentIndex === index" :style="{color: lineColors[index]}">{{item.min}}</span>
                                <span v-else>{{item.min}}</span>
                            </td>
                        </tr>
                    </table>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {GetProvince, GetRoad, GetStation, GetPort, GetCarLog, GetStatu} from '../home/api/Lane.js'
    import {GetSensorAverageConfig, GetSensorAverageValueLog} from './api/DeviceCheck.js'
    import statuLabel from '../home/components/status.vue'


    import ECharts from 'vue-echarts/components/ECharts.vue'
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/toolbox');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/markLine');
    require('echarts/lib/component/dataZoom');
    import {sensorline} from './sensorline';
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {
            ElRow,
            ElButton,
            chart: ECharts,
            statuLabel
        },
        data() {
            return {
                lineColors: ["red","orange","#ffd400","green","teal","darkblue","darkorchid","lightslategray","darkgoldenrod","#008fc4","royalblue","deeppink"],
                currentIndex: -1,
                chartDatas: [],
                tmpStatus:[],
                sensorList:[],
                provinceOptions: [],
                roadOptions: [],
                stationOptions: [],
                portOptions: [],
                selectedProvince: null,
                selectedRoad: null,
                selectedStation: null,
                selectedPort: null,
                deviceID: null,
                charts:{},
                currentRow: null,
                seconds:0,
                selectedType:'0',
                sensorline,
                types: [
                    {
                      value:"0",
                      label:"一天"
                    },
                    {
                        value:"1",
                        label:"一周"
                    },
                    {
                        value:"2",
                        label:"一个月"
                    },
                    {
                        value:"3",
                        label:"三个月"
                    }
                ]
            }
        },
        created: function () {
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

            var cachePovince = window.localStorage.getItem("home_povince");
            if (cachePovince) {
                this.selectedProvince = cachePovince;
            }

            var cacheRoad = window.localStorage.getItem("home_road");

            if (cacheRoad) {
                this.selectedRoad = cacheRoad;
                this.roadOptions = JSON.parse(window.localStorage.getItem("home_road_options"));
            }

            var cacheStation = window.localStorage.getItem("home_station");

            if (cacheStation) {
                this.selectedStation =  cacheStation;
                this.stationOptions = JSON.parse(window.localStorage.getItem("home_station_options"));
                GetPort(this.selectedProvince, this.selectedRoad, this.selectedStation)
                    .then((response)=> {
                        this.portOptions = getPortObj(response.data.portList)
                    })

                // 获取传感器状态
                let param = {
                    province:this.selectedProvince,
                    road:this.selectedRoad,
                    station:this.selectedStation
                };
                GetStatu(param)
                    .then(res=> {
                        this.tmpStatus = res.data;
                    })
            }
        },
        methods: {
            tableRowClassName(row, index) {
                //把每一行的索引放进row
                row.index = index
            },
            saveSelecetedToCache() {
                window.localStorage.setItem("home_povince", this.selectedProvince);
                window.localStorage.setItem("home_road_options", JSON.stringify(this.roadOptions));
                window.localStorage.setItem("home_road", this.selectedRoad);
                window.localStorage.setItem("home_station_options", JSON.stringify(this.stationOptions));
                window.localStorage.setItem("home_station", this.selectedStation);
            },
            changeType() {
                this.currentIndex = -1;
                this.fetchChartData();
            },
            checkAll() {
                this.currentIndex = -1;
                this.updateWholeChart(this.sensorList);
            },
            handleCurrentChange(val) {
                this.currentRow = val;

                this.currentIndex = val.index;

                var sensorIndex = val.index;

                var color = this.lineColors[sensorIndex];

                this.updateChart(val,color);
            },
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            load () {
                // simulating async data from server
                let c1 = this.$refs.c1
                c1.showLoading({
                    text: '正在加载',
                    color: '#4ea397',
                    maskColor: 'rgba(255, 255, 255, 0.4)'
                })
                let timer = setInterval(() => {
                        clearTimeout(timer)
                        c1.hideLoading()
                        c1.mergeOptions(this.charts)
                }, 500)
            },

            newLoad() {
                let c1 = this.$refs.c1
                c1.showLoading({
                    text: '正在加载',
                    color: '#4ea397',
                    maskColor: 'rgba(255, 255, 255, 0.4)'
                })

                c1.clear()

                let timer = setInterval(() => {
                    clearTimeout(timer)
                    c1.hideLoading()
                    c1.mergeOptions(this.charts)
                }, 500)
            },

            // 渲染图表
            updateChart(sensorData, lineColor) {
                let maxV = parseInt(sensorData.cMax);
                let minV = parseInt(sensorData.cMin);


                // 根据最大最小数值，修正传感器实际状态
                for (let i = 0;i < sensorData.avs.length; i++) {
                    let normalValue = parseInt(sensorData.avs[i]);

                    let fixnormalV = normalValue - parseInt(sensorData.avs[0]);


                    if (fixnormalV > maxV || fixnormalV < minV) {
                        sensorData.status = '1';
                        break;
                    }
                }

                this.setCurrent(sensorData);
                if (sensorData.avs.length > 0) {
                    let baseV = sensorData.avs[0];
                    let fixAvs = sensorData.avs.map(x=> {
                        var ret = x - baseV;

                        if (ret < minV) {
                            ret = minV - 10;
                        } else if (ret > maxV) {
                            ret = maxV + 10;
                        }

                        return ret;
                    });


                    this.charts = {
                        dataZoom: [
                            {
                                type: 'inside',
                                orient: 'vertical',
                                start:100,
                                end:0
                            },{
                                type: 'slider',
                                orient: 'vertical',
                            },
                            {
                                type: 'slider',
                                orient: 'horizontal',
                                start:0,
                                end:100
                            }
                        ],
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            type: 'category',
                            data: sensorData.avs.map((v,i)=>{
                                return i
                            }),
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            boundaryGap: false,

                        },
                        yAxis: {
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            max: maxV + 10,
                            min: minV - 10
                        },
                        series: [{
                            type: 'line',
                            data: fixAvs,
                            lineStyle: {
                                normal: {
                                    color: lineColor
                                }
                            },
                            markLine: {
                                data:[
                                    {
                                        name: '预警最大值',
                                        yAxis: maxV,
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '预警最大值  '
                                            }
                                        },
                                        lineStyle : {
                                            normal: {
                                                color: '#FF9900',
                                                type: 'dashed'
                                            }
                                        }
                                    },{
                                        name: '预警最小值',
                                        yAxis: minV,
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '预警最小值  '
                                            }
                                        },
                                        lineStyle : {
                                            normal: {
                                                color: '#FF9900',
                                                type: 'dashed'
                                            }
                                        }
                                    }]
                            }
                        }]
                    }
                    this.newLoad()
                }
            },
            // 渲染整个图表
            updateWholeChart(sensorList) {

                sensorList.forEach(elem => {

                    var min = 0;
                    var max = 0;
                    var base = elem.avs[0];

                    elem.avs.forEach(a => {

                        var tmpV = a - base;

                        if (tmpV < min) {
                            min = tmpV;
                        }

                        if (tmpV > max) {
                            max = tmpV;
                        }
                    })

                    elem.min = min;
                    elem.max = max;
                });

                this.chartDatas = sensorList.slice();

                this.charts = {
                    color: this.lineColors,
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                       data: []
                    },

                    xAxis: {
                        type: 'category',
                        data: sensorList[0].avs.map((v,i)=>{
                            return i
                        }),
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        boundaryGap: false
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        max: parseInt(sensorList[0].cMax) + 10,
                        min: parseInt(sensorList[0].cMin) - 10
                    },

                    dataZoom: [
                        {
                            type: 'inside',
                            orient: 'vertical',
                            start:0,
                            end:100
                        },{
                            type: 'slider',
                            orient: 'vertical',
                        },
                        {
                            type: 'slider',
                            orient: 'horizontal',
                            start:0,
                            end:100
                        }
                    ],
                }

                var series = [];
                var lengendData = [];

                sensorList.forEach((sensorData,index)=> {
                    let maxV = parseInt(sensorData.cMax);
                    let minV = parseInt(sensorData.cMin);

                    // 根据最大最小数值，修正传感器实际状态
                        sensorData.status = '0';

                    for (let i = 0;i < sensorData.avs.length; i++) {

                        let normalValue = parseInt(sensorData.avs[i]);

                        let fixnormalV = normalValue - parseInt(sensorData.avs[0]);


                        if (fixnormalV > maxV || fixnormalV < minV) {
                            sensorData.status = '1';
                            break;
                        }
                    }

                    if (sensorData.avs.length > 0) {

                        let baseV = sensorData.avs[0];

                        let fixAvs = sensorData.avs.map(x=> {
                           var ret = x - baseV;

                           if (ret < minV) {
                               ret = minV - 10;
                           } else if (ret > maxV) {
                               ret = maxV + 10;
                           }

                           return ret;
                        });


                        let tmpSery = {
                            type: 'line',
                            data: fixAvs,
                            smooth:false,
                            name: "传感器" + (index + 1),
                            symbol:"circle"
                        };

                        series.push(tmpSery);

                        let tmpLegend = {
                            name: "传感器" + (index + 1),
                            icon: "pin"
                        }
                        lengendData.push(tmpLegend);
                    }
                });

                let maxV = sensorList[0].cMax;
                let minV = sensorList[0].cMin;


                let makelineTmp = {
                    type: 'line',
                    markLine: {
                        data:[
                            {
                                name: '预警最大值',
                                yAxis: maxV,
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '预警最大值  '
                                    }
                                },
                                lineStyle : {
                                    normal: {
                                        color: '#FF9900',
                                        type: 'dashed'
                                    }
                                }
                            },{
                                name: '预警最小值',
                                yAxis: minV,
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '预警最小值  '
                                    }
                                },
                                lineStyle : {
                                    normal: {
                                        color: '#FF9900',
                                        type: 'dashed'
                                    }
                                }
                            }]
                    },
                    data: [],
                    lineStyle: {
                        normal: {
                            color: 'green'
                        }
                    },

                };
                series.push(makelineTmp);


                this.charts.series = series;
                this.charts.legend.data = lengendData;

                // 配置图例

                this.newLoad();
            },
            // 获取图表数据
            fetchChartData() {
                GetSensorAverageConfig(this.deviceID)
                    .then(res=> {
                        let result = res.data;

                        this.sensorList.forEach((element,index)=> {
                            let maxKey = "CMax" + index;
                            let minKey = "CMin" + index;
                            element.cMax = result[maxKey];
                            element.cMin = result[minKey];
                        })

                    });

                GetSensorAverageValueLog(this.deviceID,this.selectedType)
                    .then(res=> {
                        let result = res.data;

                        this.sensorList.forEach(sVal=> {
                           sVal.avs = [];
                        });

                        result.forEach(val=> {
                            let sensorCount = val.SensorCount;

                            // 目前只显示10或12

                            if (sensorCount > 12) {
                                sensorCount = 12
                            }


                            for (let i = 0;i < sensorCount;i++) {
                                let svKey = "SV" + i;
                                let senIndex = i;

                                let sav = val[svKey];

                                this.sensorList[senIndex].avs.push(sav)
                            }
                        });

                        this.updateWholeChart(this.sensorList);
                    })

            },
            getPovince(){
                return GetProvince()
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
                this.selectedPort = null;
                this.deviceID = null;
                // 调用查询Road接口
                GetRoad(this.selectedProvince)
                    .then((response)=>{
                        this.roadOptions = getResObjArry(response.data.roadList)
                    })
            },
            changeRoad(value) {
                this.selectedStation = null;
                this.selectedPort = null;
                this.deviceID = null;
                GetStation(this.selectedProvince ,this.selectedRoad)
                    .then((response)=>{
                        this.stationOptions = getResObjArry(response.data.stationList)
                    })
            },
            changeStation(value) {
                this.selectedPort = null;
                this.deviceID = null;
                GetPort(this.selectedProvince, this.selectedRoad, this.selectedStation)
                    .then((response)=> {
                        this.portOptions = getPortObj(response.data.portList)
                    })

                // 获取传感器状态
                let param = {
                    province:this.selectedProvince,
                    road:this.selectedRoad,
                    station:this.selectedStation
                };
                GetStatu(param)
                    .then(res=> {
                        this.tmpStatus = res.data;
                    })
            },
            changePort(value) {
                this.combineDeviceID()

                // 过滤数据
                let selecetedStatus = this.tmpStatus.find((val=>{
                    return val.port === this.selectedPort;
                }))

                this.sensorList = makeSensorList(selecetedStatus);

                // 获取图表数据
                this.fetchChartData();
                this.saveSelecetedToCache();
            },
            combineDeviceID() {
                this.deviceID = this.selectedProvince + "-" + this.selectedRoad + "-" + this.selectedStation + "-" + this.selectedPort
            },
        }
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

    function getPortObj(data) {
        let arr = [];
        data.forEach((val, n) => {
            let x = Object.keys(val)[0];
            arr.push({
                "key": x,
                "value": (val[x] + ' 号出口收费站')
            })
        });
        return arr
    }

    // 构造传感器列表数据结构
    function makeSensorList(data) {
        // 判断浏览器个数
        let countOfSensor = data.sensorCount;

        if (countOfSensor > 12) {
            countOfSensor = 12;
        }

        let list = [];

        for (var sIndex =0;sIndex < countOfSensor;sIndex++) {
            let pointNameText = "传感器" + (sIndex + 1);
            let statusIndex = "s" + sIndex;

            var tmpSensorInfo = {pointName:pointNameText,status:data[statusIndex], cMax:"", cMin:"",avs:[] }

            list[sIndex] = tmpSensorInfo;
        }

        return list
    }

    function randomColor(){
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        let color = 'rgba('+ r +','+ g +','+ b +',0.8)';
        return color;
    }


</script>

<style scoped>

    .select-area{
        margin: 0.4em 0 0 0.67em;
        font-size: 2em;
    }

    .col-1-left {
        margin-top: 0.1em;
    }

    figure#sensor-charts-contianer {
        margin-left: 0;
        margin-right: 0;
    }

    .echarts {
        width: 100%;
        min-width: 0%;
        height: 32vw;
    }

    #btn-checkall {
        margin-top: 20px;
    }


    #select-chart-type-row {
        margin-left: 5em;
        margin-top: 1.4em;
    }

    .min-max-table {
        border-color: grey;
    }

    .min-max-table th, .min-max-table td {
        padding: 5px;
        border: 1px solid black;
        text-align: center;
    }

    .min-max-table {
        border-collapse: collapse;
        border-spacing: 0px;
    }

</style>