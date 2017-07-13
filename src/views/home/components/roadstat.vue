<template>
    <div class="road_stat_unit">
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
            <div class="grid-content">
                <h1 class="road_port" align="center"> {{roadstatus.port}} 号道</h1>
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
                let label = "正常状态"
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
        max-height: 100px;
        min-height: 130px;
    }

    .check_detail {
        background-color: white;
        margin: 40px 20px 0px 20px;
    }
</style>