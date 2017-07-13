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
        <el-row class="select-time-area">
            <el-col :span="6">
                <el-date-picker
                        v-model="selectedTime"
                        type="daterange"
                        placeholder="选择日期范围">
                </el-date-picker>
            </el-col>
            <el-col :span="2">
                <el-button type="warning" @click="searchError" :disabled="canSearch()">查询</el-button>
            </el-col>
            <el-col :span="4" align="middle">
                <span>漏失总重</span>
                <span>{{errorCount}}</span>
                <span>kg</span>
            </el-col>
            <el-col :span="10" type="flex" justify="end">
                <el-button>打印输出</el-button>
            </el-col>
        </el-row>
        <el-row class="table-area">
            <el-table
                    :data="errorList"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="DevID"
                        label="设备ID"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="CarWeight"
                        label="总重"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="sstat"
                        label="传感器状态">
                        width="80"
                </el-table-column>
                <el-table-column
                        prop="Modweight"
                        label="重量修补"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="AxleStat"
                        label="轮轴状态"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="light"
                        label="光幕状态"
                        width="120">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script src="./errorstat.js"></script>
<style scoped src="./errorstat.scss"></style>