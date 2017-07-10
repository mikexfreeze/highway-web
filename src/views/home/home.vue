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
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
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