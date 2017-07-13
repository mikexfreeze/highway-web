<template>
    <div>
        <img src="../../assets/images/nanning_map.png">
        <div id='station_point'>
            <div id='station_status'>
            </div>
            <dotview v-for="dot in dotList" :mapDot="dot" :style="{top: dot.top + 'px', left: dot.left + 'px'}"></dotview>
        </div>
        <el-button @click="getXY">测试接口</el-button>
    </div>
</template>

<script src="./map.js"></script>
<style scoped src="./map.scss"></style>