<template>

        <span class="dot">
            <el-popover
                    ref="popover1"
                    placement="top"
                    :title="mapDot.stationName"
                    width="200"
                    trigger="hover"
                    @show="popViewShow()"
            >
                <el-table
                        :data="portList"
                        style="width: 100%">
                    <el-table-column
                            prop="portName"
                            label="道路"
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

        </el-popover>

        <div class="dotview greenview" v-popover:popover1 v-if="mapDot.stat == 0">
        </div>
        <div class="dotview blueview" v-popover:popover1 v-if="mapDot.stat == 1">
        </div>
        <div class="dotview redview" v-popover:popover1 v-if="mapDot.stat == 2">
        </div>
    </span>


</template>
<script>
    import {GetStatu} from '../../home/api/Lane.js'
    import statuLabel from '../../home/components/status.vue'

    export default {
        props: ['mapDot'],
        components:{statuLabel},
        data: function () {
            return {
                tmpDot: this.mapDot,
                portList: []
            }
        },
        methods: {
            popViewShow() {
                this.checkPointList = [];

                let devIDArr = this.tmpDot.Devid.split('-');
                let port = devIDArr[3];

                // 获取传感器状态
                let param = {
                    province:devIDArr[0],
                    road:devIDArr[1],
                    station:devIDArr[2],
                    port:devIDArr[3]
                };

                GetStatu(param)
                    .then((resp)=> {

                        let tmpStatus = resp.data;

                        this.portList = [];

                        tmpStatus.forEach((portInfo => {
                            let portName = portInfo.port + "号道";

                            let portStatus = "0";


                            Object.keys(portInfo).forEach((w)=>{
                                if(portInfo[w] == "1" && w != "port" && w != "sensorCount"){
                                    portStatus = "1";
                                } else if (portInfo[w] == "2" && w != "port" && w != "sensorCount") {
                                    if (portStatus == "0") {
                                        portStatus = "2";
                                    }
                                }
                            })

                            this.portList.push({
                                portName: portName,
                                status: portStatus
                            })
                        }))
                    })
            },

        }
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

        list.push({pointName:"光栅识别器",status:data["light"]});
        list.push({pointName:"轮轴识别器1",status:data["axeCounter1"]});
        list.push({pointName:"轮轴识别器2",status:data["axeCounter2"]});

        return list
    }

</script>

<style scoped>
    @-webkit-keyframes twinkling { /*透明度由0到1*/
        0% {
            opacity: 0.5; /*透明度为0*/
        }

        40% {
            opacity: 1;
        }

        80% {
            opacity: 0.5;
        }

        100% {
            opacity: 0.3; /*透明度为1*/
        }
    }

    .dot {
        position: absolute;
    }

    .dotview {
        width: 30px;
        height: 30px;
        position: absolute;
        -webkit-animation: twinkling 1.6s infinite ease-in-out;
    }

    .greenview {
        background-image: url('../../../assets/images/greendot.png');
        background-size: cover
    }

    .blueview {
        background-image: url("../../../assets/images/bluedot.png");
        background-size: cover
    }

    .redview {
        background-image: url("../../../assets/images/reddot.png");
        background-size: cover
    }


</style>

