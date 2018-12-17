<template>
    <div>

        <div style="position: relative">
            <img id="map-image"  src="../../assets/images/map.jpg" >
            <div id='station_point' >
                <dotview  v-for="(dot, index) in dotList" :key="index" :mapDot="dot" :style="{top: (dot.top * (imageHeight/545)) + 'px', left: (dot.left * (imageWidth/906)) + 'px'}"></dotview>
            </div>


            <transition name="fade">
                <div class="weightInfo" v-if="show">
                    <el-button  icon="arrow-right" @click="show = !show"></el-button>
                    <h3 style="display: inline">统计信息</h3>
                    <el-date-picker style="margin-left: 20px"
                            v-model="weightDateRange"
                            type="daterange"
                            align="right"
                            placeholder="选择日期范围"
                            :picker-options="pickerOptions"
                            @change="userChangeDate()">
                    </el-date-picker>


                    <figure style="margin: 0px 0px" id="weightinfo-charts-1">
                        <chart :options="chart1"  ref="c1" style="height: 200px; width: 500px"></chart>
                    </figure>

                    <figure id="weightinfo-charts-2" style="margin: 0px 0px">
                        <chart :options="chart2"  ref="c2" style="height: 200px; width: 500px"></chart>
                    </figure>

                    <figure id="error-charts" style="margin: 0px 0px">
                        <chart :options="errorChart"  ref="errorC" style="height: 200px; width: 500px"></chart>
                    </figure>
                </div>
                <el-button class="weightInfoBtn" v-if="!show" @click="show =!show" >统<br/>计<br/>信<br/>息 </el-button>
            </transition>


        </div>
    </div>


</template>

<script src="./map.js"></script>
<style src="./map.scss"></style>