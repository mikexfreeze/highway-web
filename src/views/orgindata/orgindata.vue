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
                <el-button type="warning" @click="searchCarLog" :disabled="canSearch()">查询</el-button>
            </el-col>
            <el-col :span="6" :push="8">
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
                    :data="carsList"
                    style="width: 100%"
                    :fit="true"
                    :max-height="tableHeight"
            >
                <el-table-column
                        prop="DevID"
                        label="设备ID"
                        fixed
                        min-width="300">
                </el-table-column>
                <el-table-column
                        prop="Time"
                        label="时间"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="CarWeight"
                        label="总重"
                        >
                </el-table-column>
                <el-table-column
                        prop="Modweight"
                        label="重量修正"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="Speed"
                        label="速度"
                        >
                </el-table-column>
                <el-table-column
                        prop="Axlenum"
                        label="轴数"
                        >
                </el-table-column>
                <el-table-column
                        prop="AW1"
                        label="轴1重"
                        >
                </el-table-column>
                <el-table-column
                        prop="AW2"
                        label="轴2重"
                        >
                </el-table-column>
                <el-table-column
                        prop="AW3"
                        label="轴3重"
                        >
                </el-table-column>
                <el-table-column
                        prop="AW4"
                        label="轴4重"
                        >
                </el-table-column>
                <el-table-column
                        prop="AW5"
                        label="轴5重"
                        >
                </el-table-column>
                <el-table-column
                        prop="AW6"
                        label="轴6重"
                        >
                </el-table-column>
                <el-table-column
                        prop="sstat"
                        label="传感器"
                        min-width="300"
                        >
                </el-table-column>

                <el-table-column
                        label="轮轴"
                        >
                    <template scope="scope">
                        <span>{{scope.row.SenInfoAxeCounter1}} </span>
                        <span>{{scope.row.SenInfoAxeCounter2}}</span>
                        <el-button v-if="scope.row.isEnable =='1'" type="warning" @click="disabledBtn(scope.row)">禁用</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="CarNum"
                        label="车牌"
                        width="100">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script src="./orgindata.js"></script>
<style scoped src="./orgindata.scss"></style>