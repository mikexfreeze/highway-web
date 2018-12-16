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
            <el-col :span="6" :push="4">
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
                        type="index"
                        label="序号"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="DevID"
                        label="设备ID"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="Time"
                        label="时间"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="CarWeight"
                        label="总重(Kg)"
                >
                </el-table-column>
                <el-table-column
                        prop="Speed"
                        label="车速(Km/h)"
                >
                </el-table-column>
                <el-table-column
                        prop="Axlenum"
                        label="轴数"
                >
                </el-table-column>
                <el-table-column label="轴组数" prop="Axlenum">
                </el-table-column>
                <el-table-column label="是否超重" prop="OverLoad">
                    <template scope="scope">
                        <span v-if="scope.row.OverLoad === '1'">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                                size="mini"
                                @click="handleCheckDetail(scope.$index, scope.row)">查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>


            <el-dialog title="详情" :visible.sync="dialogTableVisible" width="30%">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="设备ID:" >
                        <span>{{rowData.DevID}}</span>
                    </el-form-item>
                    <el-form-item label="车牌号:">
                        <span>{{rowData.CarNum}}</span>
                    </el-form-item>
                    <el-form-item label="时间:">
                        <span>{{rowData.Time}}</span>
                    </el-form-item>
                    <el-form-item label="总重:" >
                        <span>{{rowData.CarWeight ? rowData.CarWeight + " Kg" : ""}}</span>
                    </el-form-item>
                    <el-form-item label="重量修正:" >
                        <span>  {{ rowData.Modweight ? rowData.Modweight + " kg" : "" }} </span>
                    </el-form-item>
                    <el-form-item label="车速:">
                        <span>{{rowData.Speed ? rowData.Speed + " Km/h" : ""}}</span>
                    </el-form-item>

                    <el-form-item label="是否倒车:">
                        <span v-if="rowData.REVERSE === '1'">是</span>
                        <span v-else>否</span>
                    </el-form-item>
                    <el-form-item label="是否超重:">
                        <span v-if="rowData.OverLoad === '1'">是</span>
                        <span v-else>否</span>
                    </el-form-item>

                    <el-form-item label="轴数" style="width: 100%;">
                        <span>{{rowData.Axlenum}}</span>
                    </el-form-item>
                    <el-table border
                            :data="rowData.aInfo"
                            style="width: 100%;margin-bottom: 20px">
                        <el-table-column
                                align="center"
                                type="index"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="aW"
                                label="轴重(Kg)"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="aS"
                                label="轴速(Km/h)">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="aD"
                                label="轴距(m)">
                        </el-table-column>
                    </el-table >
                    <el-form-item label="轴组数" style="width: 100%;">
                        <span>{{rowData.AGWNum}}</span>
                    </el-form-item>
                    <el-table border
                              :data="rowData.aGInfo"
                              style="width: 100%;margin-bottom: 20px">
                        <el-table-column
                                width="100"
                                align="center"
                                type="index"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="AGW"
                                label="轴组重(Kg)"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="AGT"
                                label="轴组轴型">
                        </el-table-column>
                    </el-table >

                </el-form>

            </el-dialog>
        </el-row>
    </div>




</template>

<script src="./feedata.js"></script>
<style src="./feedata.scss"></style>