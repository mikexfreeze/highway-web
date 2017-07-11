<template>
    <div>
        <el-row>
            <el-col :span="6">
                <div class="grid-content page-title">
                    <h1>设备检测</h1>
                </div>
            </el-col>
            <el-col :span="18">
                <el-row class="grid-content select-area">
                    <el-col :span="8">
                        <el-select v-model="selectedProvince" placeholder="请选择" @change="changeProvince(value)">
                            <el-option
                                    v-for="item in provinceOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="selectedRoad" placeholder="请选择" :disabled="provinceHasItem()" @change="changeRoad(value)">
                            <el-option
                                    v-for="item in roadOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="selectedStation" placeholder="请选择" :disabled="roadHasItem()" @change="changeStation(value)">
                            <el-option
                                    v-for="item in stationOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
            </el-col>
            <el-col :span="18">

            </el-col>
        </el-row>
        <div id="sensors_containner">

        </div>
        <el-button @click="getRoad">车道</el-button>
    </div>
</template>

<script src="./home.js"></script>
<style scoped src="./home.scss"></style>