<template>
    <el-breadcrumb class="app-levelbar" separator="/">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item">
            <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
            <router-link v-else :to="item.path">{{item.name}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script src="./breadcrumb.js"></script>
<style scoped src="./breadcrumb.scss"></style>