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
                    <figure id="weightinfo-charts-contianer">
                        <chart :options="chart"  ref="c1" auto-resize></chart>
                    </figure>

                </div>
                <el-button class="weightInfoBtn" v-if="!show" @click="show =!show" >统<br/>计<br/>信<br/>息 </el-button>
            </transition>


        </div>
    </div>


</template>

<script src="./map.js"></script>
<style src="./map.scss"></style>