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
            <el-col :span="6" class="col-1-left">
                <el-row>
                    <el-col :span="8">
                        <el-tag type="success">正常状态</el-tag>
                    </el-col>
                    <el-col :span="8">
                        <el-tag type="primary">无传感器</el-tag>
                    </el-col>
                    <el-col :span="8">
                        <el-tag type="danger">异常状态</el-tag>
                    </el-col>
                </el-row>
                <h5>设备体检报告</h5>
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
            <el-col :span="18">
                <figure id="sensor-charts-contianer">
                    <chart :options="sensorline"  ref="c1" auto-resize></chart>
                </figure>
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
    import {sensorline} from './sensorline';

    export default {
        components: {
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
                }, 1500)
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
                            max: 1100,
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                        },
                        series: {
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
                        }
                    }

                    this.load()
                }
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

                        this.updateChart(this.sensorList[0])
                    })

                GetSensorAverageValueLog(this.deviceID)
                    .then(res=> {
                        let result = res.data;

                        result.forEach(val=> {

                            for (let i = 0;i < 10;i++) {
                                let svKey = "SV" + i;
                                let senIndex = i;

                                let sav = val[svKey];

                                this.sensorList[senIndex].avs.push(sav)
                            }
                        })

                        this.updateChart(this.sensorList[0]);
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
        let list = [];
        list[0] = {pointName:"传感器1",status:data["s0"], cMax:"", cMin:"", avs:[]}
        list[1] = {pointName:"传感器2",status:data["s1"], cMax:"", cMin:"", avs:[]}
        list[2] = {pointName:"传感器3",status:data["s2"], cMax:"", cMin:"", avs:[]}
        list[3] = {pointName:"传感器4",status:data["s3"], cMax:"", cMin:"", avs:[]}
        list[4] = {pointName:"传感器5",status:data["s4"], cMax:"", cMin:"", avs:[]}
        list[5] = {pointName:"传感器6",status:data["s5"], cMax:"", cMin:"", avs:[]}
        list[6] = {pointName:"传感器7",status:data["s6"], cMax:"", cMin:"", avs:[]}
        list[7] = {pointName:"传感器8",status:data["s7"], cMax:"", cMin:"", avs:[]}
        list[8] = {pointName:"传感器9",status:data["s8"], cMax:"", cMin:"", avs:[]}
        list[9] = {pointName:"传感器10",status:data["s9"], cMax:"", cMin:"", avs:[]}
        return list
    }


</script>

<style scoped>

    .select-area{
        margin: 0.67em 0 0 0.67em;
        font-size: 2em;
    }

    .col-1-left {
        margin-top: 40px;
    }

    .figure {
        width: 100vw;
        margin: 1em auto;
        padding: 0 1em;
        border: none;
        border-radius: 0px;
        box-shadow: none
    }

    .echarts {
        width: 100%;
        min-width: 0%;
        height: 36vw;
    }
</style>