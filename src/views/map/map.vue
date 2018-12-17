<template>
    <div>

        <div style="position: relative">
            <img id="map-image" src="../../assets/images/map.jpg">
            <div id='station_point'>
                <dotview :key="index" :mapDot="dot" :style="{top: (dot.top * (imageHeight/545)) + 'px', left: (dot.left * (imageWidth/906)) + 'px'}"
                         v-for="(dot, index) in dotList"></dotview>
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


                    <figure id="weightinfo-charts-1" style="margin: 0px 0px">
                        <chart :options="chart1" ref="c1" style="height: 200px; width: 500px"></chart>
                    </figure>

                    <figure id="weightinfo-charts-2" style="margin: 0px 0px">
                        <chart :options="chart2" ref="c2" style="height: 200px; width: 500px"></chart>
                    </figure>

                    <figure id="error-charts" style="margin: 0px 0px">
                        <chart :options="errorChart" ref="errorC" style="height: 200px; width: 500px"></chart>
                        <div align="center">
                            <el-button @click="dialogTableVisible = true" v-if="errorChart">查看详情</el-button>
                        </div>
                    </figure>

                </div>
                <el-button @click="show =!show" class="weightInfoBtn" v-if="!show">统<br/>计<br/>信<br/>息</el-button>
            </transition>


            <el-dialog title="健康统计详情" :visible.sync="dialogTableVisible">
                <el-table :data="errorDataDetail">
                    <el-table-column property="PlatLen" label="承台长度(m)" width="150"></el-table-column>
                    <el-table-column property="PlatType" label="承台类型"></el-table-column>
                    <el-table-column property="ProductSpec" label="产品型号" width="200"></el-table-column>
                    <el-table-column property="Manufactor" label="厂家"></el-table-column>
                    <el-table-column property="DevID" label="设备ID"></el-table-column>
                    <el-table-column property="checkDay" label="维修(天)"></el-table-column>
                    <el-table-column property="brokenDay" label="故障(天)"></el-table-column>
                </el-table>
            </el-dialog>


        </div>
    </div>


</template>

<script src="./map.js"></script>
<style src="./map.scss"></style>