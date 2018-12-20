<template>
    <div class="road_stat_unit">
        <template v-if="roadstatus.sensorCount < 12">
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s8 == 0, 'red': roadstatus.s8 == 1 , 'blue': roadstatus.s8 == 2 }">
                        <span>9</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s9 == 0, 'red': roadstatus.s9 == 1, 'blue': roadstatus.s9 == 2 }">
                        <span>10</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="grid-content" style="text-align: center">
                    <h1 class="road_port" align="center"> {{roadstatus.port}} 号道</h1>
                    <img  v-if="roadstatus.s16 === '0'" width="40"  src="../../../assets/images/neton.png"/>
                    <img  v-if="roadstatus.s16 === '1'" width="40" align="center" src="../../../assets/images/netoff.png"/>
                </div>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s6 == 0, 'red': roadstatus.s6 == 1 , 'blue': roadstatus.s6 == 2}">
                        <span>7</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s7 == 0, 'red': roadstatus.s7 == 1 , 'blue': roadstatus.s7 == 2}">
                        <span>8</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="grid-content">
                </div>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s4 == 0, 'red': roadstatus.s4 == 1, 'blue': roadstatus.s4 == 2 }">
                        <span>5</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s5 == 0, 'red': roadstatus.s5 == 1, 'blue': roadstatus.s5 == 2 }">
                        <span>6</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="grid-content">
                </div>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s2 == 0, 'red': roadstatus.s2 == 1, 'blue': roadstatus.s2 == 2 }">
                        <span>3</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s3 == 0, 'red': roadstatus.s3 == 1, 'blue': roadstatus.s3 == 2 }">
                        <span>4</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="grid-content">
                    <div class="check_detail">
                        <div class="block-content">
                            <el-row type="flex" justify="center">
                                <span>{{roadstatus.statuLabel}}</span>
                            </el-row>
                            <el-row type="flex" justify="center">
                                <el-button @click="selectLane" type="success">详情查看-></el-button>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s0 == 0, 'red': roadstatus.s0 == 1, 'blue': roadstatus.s0 == 2 }">
                        <span>1</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s1 == 0, 'red': roadstatus.s1 == 1, 'blue': roadstatus.s1 == 2 }">
                        <span>2</span>
                    </div>
                </el-col>
            </el-row>
        </template>
        <template v-else>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s10 == 0, 'red': roadstatus.s10 == 1 , 'blue': roadstatus.s10 == 2 }">
                        <span>11</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s11 == 0, 'red': roadstatus.s11 == 1, 'blue': roadstatus.s11 == 2 }">
                        <span>12</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="grid-content-sm" style="text-align: center">
                    <h1 class="road_port" align="center"> {{roadstatus.port}} 号道</h1>
                    <img  v-if="roadstatus.s16 === '0'" width="40"  src="../../../assets/images/neton.png"/>
                    <img  v-if="roadstatus.s16 === '1'" width="40" align="center" src="../../../assets/images/netoff.png"/>
                </div>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s8 == 0, 'red': roadstatus.s8 == 1 , 'blue': roadstatus.s8 == 2}">
                        <span>9</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s9 == 0, 'red': roadstatus.s9 == 1 , 'blue': roadstatus.s9 == 2}">
                        <span>10</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="grid-content-sm">
                </div>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s6 == 0, 'red': roadstatus.s6 == 1, 'blue': roadstatus.s6 == 2 }">
                        <span>7</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s7 == 0, 'red': roadstatus.s7 == 1, 'blue': roadstatus.s7 == 2 }">
                        <span>8</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="grid-content-sm">
                </div>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s4 == 0, 'red': roadstatus.s4 == 1, 'blue': roadstatus.s4 == 2 }">
                        <span>5</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s5 == 0, 'red': roadstatus.s5 == 1, 'blue': roadstatus.s5 == 2 }">
                        <span>6</span>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <div class="grid-content-sm">
                </div>
            </el-row>


            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s2 == 0, 'red': roadstatus.s2 == 1, 'blue': roadstatus.s2 == 2 }">
                        <span>3</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s3 == 0, 'red': roadstatus.s3 == 1, 'blue': roadstatus.s3 == 2 }">
                        <span>4</span>
                    </div>
                </el-col>
            </el-row>


            <el-row>
                <div class="grid-content-sm">
                    <div class="check_detail">
                        <div class="block-content">
                            <el-row type="flex" justify="center">
                                <span>{{roadstatus.statuLabel}}</span>
                            </el-row>
                            <el-row type="flex" justify="center">
                                <el-button @click="selectLane" type="success">详情查看-></el-button>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-row>

            <el-row>
                <el-col :span="2">
                    <div class="sensor" :class="{ 'green': roadstatus.s0 == 0, 'red': roadstatus.s0 == 1, 'blue': roadstatus.s0 == 2 }">
                        <span>1</span>
                    </div>
                </el-col>
                <el-col :span="2" :offset="18">
                    <div class="sensor" :class="{ 'green': roadstatus.s1 == 0, 'red': roadstatus.s1 == 1, 'blue': roadstatus.s1 == 2 }">
                        <span>2</span>
                    </div>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['roadstatus'],
        data(){
            return{
            }
        },
        methods: {
            selectLane(){
                console.log(this.roadstatus.port)
                this.$emit('changeLane', this.roadstatus.port)
            }
        },
        computed: {
            statusLabel: function () {
                let label = "健康"
                $(this.roadstatus).each((key, val)=>{
                    console.log(val)
                })
//                if(this.roadstatus.forEach((val, key)=>{
//                    if(val == "1"){
//                        return true
//                    }
//                })){label = "检修预警"}
//                if(this.roadstatus.forEach((val, key)=>{
//                        if(val == "2"){
//                            return true
//                        }
//                    })){label = "维护预警"}
                return label
            }
        }
    }
</script>

<style scoped>
    .road_stat_unit {
        background-color: #97a8be;
        width: 240px;
        margin-right: 20px;
        flex-shrink: 0
    }

    .sensor {
        width: 40px;
        height: 30px;

        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center;
    }

    .green {
        background-color: green;
    }

    .blue{
        background-color: blue;
    }

    .red {
        background-color: red;
    }

    .road_port {
        color: white;
    }

    .grid-content {
        max-height: 120px;
        min-height: 145px;
    }

    .grid-content-sm {
        max-height: 90px;
        min-height: 110px;
    }

    .check_detail {
        background-color: white;
        margin: 40px 20px 0px 20px;
    }

    .block-content {
        background: none;
    }

</style>