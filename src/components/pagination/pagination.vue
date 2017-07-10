<template>
    <el-row type="flex" class="mt-10" justify="center">
        <el-pagination @current-change="pageChange"
                layout="prev, pager, next"
                :total= "total">
        </el-pagination>
    </el-row>

</template>

<script src="./pagination.js"></script>
<style scoped src="./pagination.scss"></style>