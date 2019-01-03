<template>
    <div>

        <div style="position: relative">
            <img id="map-image" src="../../assets/images/map.jpg">
            <div id='station_point'>
                <dotview :key="index" :mapDot="dot" :style="{top: (dot.top * (imageHeight/545)) + 'px', left: (dot.left * (imageWidth/906)) + 'px'}"
                         v-for="(dot, index) in dotList"></dotview>
            </div>

            <div style="width: 580px;" class="weightInfoTable" ref="animTarget">
                <div class="inlineDiv">
                    <div class="inlineTitle">计费（总重：{{chargeCarWeight}} Kg 车辆数：{{chargeCarNum}} ）</div>
                    <div>
                        <el-table
                                :data="lastChargeDatas"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="Axlenum"
                                    label="轴数"
                                    align="center"
                                    header-align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="CarWeight"
                                    label="车重（Kg）"
                                    align="center"
                                    header-align="center">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="inlineDiv">
                    <div class="inlineTitle">监测 （总重：{{checkCarWeight}} Kg 车辆数：{{checkCarNum}} ）</div>
                    <div>
                        <el-table
                                :data="lastCheckDatas"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="Axlenum"
                                    label="轴数"
                                    align="center"
                                    header-align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="CarWeight"
                                    label="车重（Kg）"
                                    align="center"
                                    header-align="center">
                            </el-table-column>
                        </el-table>
                    </div>

                </div>
            </div>


            <transition name="fade">
                <div class="weightInfo" v-if="show">
                    <el-button @click="show = !show" icon="arrow-right"></el-button>
                    <h3 style="display: inline">统计信息</h3>
                    <el-date-picker :picker-options="pickerOptions"
                                    @change="userChangeDate()"
                                    align="right"
                                    placeholder="选择日期范围"
                                    style="margin-left: 20px"
                                    type="daterange"
                                    v-model="weightDateRange">
                    </el-date-picker>


                    <figure id="weightinfo-charts-2" style="margin: 0px 0px 0px 0px">
                        <chart :options="chart2" ref="c2" style="width: 500px;height: 280px"></chart>
                    </figure>

                    <figure id="weightinfo-charts-1" style="margin: 0px 0px 0px 0px">
                        <chart :options="chart1" ref="c1" style=" width: 500px; height: 280px"></chart>
                    </figure>


                    <figure id="error-charts" style="margin: 0px 0px">
                        <chart :options="errorChart" ref="errorC" style="width: 500px;height: 280px"></chart>
                        <div align="center">
                            <el-button @click="dialogTableVisible = true" v-if="errorChart">查看详情</el-button>
                        </div>
                    </figure>

                </div>
                <el-button @click="show =!show" class="weightInfoBtn" v-if="!show">统<br/>计<br/>信<br/>息</el-button>
            </transition>


            <el-dialog title="健康统计详情" :visible.sync="dialogTableVisible">
                <el-table :data="errorDataDetail" height="500">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column property="DevID" label="设备ID"></el-table-column>
                    <el-table-column property="Manufactor" label="厂家"></el-table-column>
                    <el-table-column property="ProductSpec" label="产品型号" width="200"></el-table-column>
                    <el-table-column property="PlatType" label="称台类型"></el-table-column>
                    <el-table-column property="PlatLen" label="称台长度(m)" width="150"></el-table-column>
                    <el-table-column property="checkDay" label="维修(天)"></el-table-column>
                    <el-table-column property="brokenDay" label="故障(天)"></el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>


</template>

<script src="./map.js"></script>
<style src="./map.scss"></style>