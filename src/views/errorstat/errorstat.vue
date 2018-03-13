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
                        <el-select v-model="selectedPort" placeholder="请选择" :disabled="stationHasItem()">
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
            <el-col :span="5" :pull="1" align="middle">
                <span style="line-height: 34px">漏失总重</span>
                <span>{{leakWeightCount}}</span>
                <span>kg</span>
            </el-col>
            <el-col :span="3" :pull="1" type="flex" justify="end">
                <el-button @click="printTable">打印输出</el-button>
            </el-col>
            <el-col :span="4" :pull="1">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[30, 40, 60, 100]"
                        :page-size=pageSize
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalNum">
                </el-pagination>
            </el-col>
        </el-row>
        <el-row class="table-area">
            <el-table
                    :data="errorList"
                    :fit="true"
                    :max-height="tableHeight"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="70"
                        >
                </el-table-column>
                <el-table-column
                        prop="DevID"
                        label="设备ID"
                        min-width="300"
                >
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="时间"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="CarWeight"
                        label="总重">
                </el-table-column>
                <el-table-column
                        prop="Modweight"
                        label="重量修补"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="OtherDevWeight"
                        label="收费计重"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="sstat"
                        label="传感器状态 ( 0:正常  1:故障 )"
                        min-width="300"
                        >
                </el-table-column>

                <el-table-column
                        prop="AxleStat"
                        label="轮轴状态"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="light"
                        label="光幕状态"
                        width="100">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script src="./errorstat.js"></script>
<style scoped src="./errorstat.scss"></style>