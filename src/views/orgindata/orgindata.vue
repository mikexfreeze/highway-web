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
                <el-button type="warning" @click="searchCarLog" :disabled="canSearch()">查询</el-button>
            </el-col>
        </el-row>
        <el-row class="table-area">
            <el-table
                    :data="carsList"
                    style="width: 100%">
                <el-table-column
                        prop="DevID"
                        label="设备ID"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="Time"
                        label="时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="CarWeight"
                        label="总重"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="Speed"
                        label="速度"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="Axlenum"
                        label="轴数"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="AW1"
                        label="轴1重"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="AW2"
                        label="轴2重"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="AW3"
                        label="轴3重"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="AW4"
                        label="轴4重"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="AW5"
                        label="轴5重"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="AW6"
                        label="轴6重"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="sstat"
                        label="传感器"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="Modweight"
                        label="重量修正"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="SenInfoAxeCounter1"
                        label="轮轴"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="CarNum"
                        label="车牌"
                        width="120">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script src="./orgindata.js"></script>
<style scoped src="./orgindata.scss"></style>