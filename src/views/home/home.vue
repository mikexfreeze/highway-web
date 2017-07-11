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
                        <el-select v-model="selectedProvince" placeholder="请选择" @change="changeProvince()">
                            <el-option
                                    v-for="item in provinceOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="selectedRoad" placeholder="请选择" :disabled="provinceHasItem()" @change="changeRoad()">
                            <el-option
                                    v-for="item in roadOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="selectedStation" placeholder="请选择" :disabled="roadHasItem()" @change="changeStation()">
                            <el-option
                                    v-for="item in stationOptions"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-row>
                    <el-col :span="8">
                        <el-tag type="success">正常状态</el-tag>
                    </el-col>
                    <el-col :span="8">
                        <el-tag type="primary">检修预警</el-tag>
                    </el-col>
                    <el-col :span="8">
                        <el-tag type="danger">维护预警</el-tag>
                    </el-col>
                </el-row>
                <h5>设备体检报告</h5>
                <el-table
                        :data="checkPointList"
                        style="width: 100%">
                    <el-table-column
                            prop="pointName"
                            label="检查点"
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
            </el-col>
            <el-col :span="18">

            </el-col>
        </el-row>

        <el-button @click="getRoad">车道</el-button>
    </div>
</template>

<script src="./home.js"></script>
<style scoped src="./home.scss"></style>