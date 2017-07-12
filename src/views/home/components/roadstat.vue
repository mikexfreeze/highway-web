<template>
    <div class="road_stat_unit">
        <el-row>
            <el-col :span="2">
                <div class="sensor" >
                    <span>9</span>
                </div>
            </el-col>
            <el-col :span="2" :offset="18">
                <div class="sensor">
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
                <div class="sensor">
                    <span>7</span>
                </div>
            </el-col>
            <el-col :span="2" :offset="18">
                <div class="sensor">
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
                <div class="sensor">
                    <span>5</span>
                </div>
            </el-col>
            <el-col :span="2" :offset="18">
                <div class="sensor">
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
                <div class="sensor">
                    <span>3</span>
                </div>
            </el-col>
            <el-col :span="2" :offset="18">
                <div class="sensor">
                    <span>4</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div class="grid-content">
                <div class="check_detail">
                    <div class="block-content">
                        <el-row type="flex" justify="center">
                            <span>正常状态</span>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <el-button type="success">详情查看-></el-button>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-row>
        <el-row>
            <el-col :span="2">
                <div class="sensor">
                    <span>1</span>
                </div>
            </el-col>
            <el-col :span="2" :offset="18">
                <div class="sensor">
                    <span>2</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props:['roadstatus'],
        methods: {
         colorForSensor (status) {
             let color = "green";

             if (status == "0") {
                 color = "green"
             } else if (status == "1") {
                 color = "blue"
             } else if (status == "2") {
                 color = "red"
             }

             return color
         }
        }
    }
</script>

<style>
    .road_stat_unit {
        background-color: #97a8be;
        width: 240px;
        margin-right: 20px;
        flex-shrink: 0
    }

    .sensor {
        width: 40px;
        height: 30px;
        background-color: green;

        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center;
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