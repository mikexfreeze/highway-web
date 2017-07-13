<template>
    <span>
        <el-tag v-if="status == 0" type="success">正常状态</el-tag>
        <el-tag v-if="status == 1" type="danger">异常状态</el-tag>
        <el-tag v-if="status == 2" type="primary">无传感器</el-tag>
    </span>
</template>
<script>
    export default{
        props:['status'],
    }
</script>

