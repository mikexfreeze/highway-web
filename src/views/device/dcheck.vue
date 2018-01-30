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
                <el-row>
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
                sensorline,
                selectedType:'1',
                types: [
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
        },
        methods: {
            changeType() {
                this.fetchChartData();
            },
            checkAll() {
                this.updateWholeChart(this.sensorList);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
                this.updateChart(val);
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
            updateChart(sensorData) {
                let maxV = parseInt(sensorData.cMax);
                let minV = parseInt(sensorData.cMin);


                // 根据最大最小数值，修正传感器实际状态
                for (let i = 0;i < sensorData.avs.length; i++) {
                    let normalValue = parseInt(sensorData.avs[i]);
                    if (normalValue > maxV || normalValue < minV) {
                        sensorData.status = '1';
                        break;
                    }
                }

                this.setCurrent(sensorData);
                if (sensorData.avs.length > 0) {

                    this.charts = {
                        dataZoom: [
                            {
                                type: 'inside',
                                orient: 'vertical',
                                start:70,
                                end:0
                            },{
                                type: 'slider',
                                orient: 'vertical',
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
                        },
                        series: [{
                            type: 'line',
                            data: sensorData.avs,
                            lineStyle: {
                                normal: {
                                    color: 'green'
                                }
                            },
                            markLine: {
                                data:[
                                    {
                                        name: '平均线',
                                        type: 'average',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '均值  '
                                            }
                                        },
                                        lineStyle : {
                                            normal: {
                                                color: 'grey',
                                                type: 'solid'
                                            }
                                        }
                                    },
                                    {
                                        name: '最大值',
                                        yAxis: sensorData.cMax,
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值  '
                                            }
                                        },
                                        lineStyle : {
                                            normal: {
                                                color: 'red',
                                                type: 'solid'
                                            }
                                        }
                                    },{
                                        name: '最小值',
                                        yAxis: sensorData.cMin,
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最小值  '
                                            }
                                        },
                                        lineStyle : {
                                            normal: {
                                                color: 'red',
                                                type: 'solid'
                                            }
                                        }
                                    }]
                            }
                        }]
                    }
                    this. newLoad()
                }
            },
            // 渲染整个图表
            updateWholeChart(sensorList) {

                this.charts = {
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
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            orient: 'vertical',
                            start:70,
                            end:0
                        },{
                            type: 'slider',
                            orient: 'vertical',
                        }
                    ],
                }

                var series = [];
                var lengendData = [];

                var i = 1;
                sensorList.forEach((sensorData)=> {
                    let maxV = parseInt(sensorData.cMax);
                    let minV = parseInt(sensorData.cMin);

                    // 根据最大最小数值，修正传感器实际状态
                    for (let i = 0;i < sensorData.avs.length; i++) {
                        let normalValue = parseInt(sensorData.avs[i]);
                        if (normalValue > maxV || normalValue < minV) {
                            sensorData.status = '1';
                            break;
                        }
                    }

                    if (sensorData.avs.length > 0) {

                        var rColor = randomColor();

                        let tmpSery = {
                            type: 'line',
                            data: sensorData.avs,
                            lineStyle: {
                                normal: {
                                    color: rColor
                                }
                            },
                            name: "传感器" + i,
                        };

                        series.push(tmpSery);


                        let tmpLegend = {
                            name: "传感器" + i,
                        }
                        lengendData.push(tmpLegend);

                        i++;
                    }
                });


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

//                        this.updateChart(this.sensorList[0])
                    })

                GetSensorAverageValueLog(this.deviceID,this.selectedType)
                    .then(res=> {
                        let result = res.data;

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
                        })

//                        this.updateChart(this.sensorList[0]);

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
        height: 36vw;
    }

    #btn-checkall {
        margin-top: 20px;
    }
    #chart-types {
        margin-left: 5em;
        margin-top: 1.4em;
    }

</style>