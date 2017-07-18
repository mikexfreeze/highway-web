<template>
    <div>
        <img id="map-image"  src="../../assets/images/nanning_map.png">
        <div id='station_point'>
            <dotview v-for="(dot, index) in dotList" :key="index" :mapDot="dot" :style="{top: (dot.top * (imageHeight/545)) + 'px', left: (dot.left * (imageWidth/906)) + 'px'}"></dotview>
        </div>
    </div>
</template>

<script src="./map.js"></script>
<style scoped src="./map.scss"></style>