<template>
    <span>
        <el-tag v-if="status == 0" type="success">正常状态</el-tag>
        <el-tag v-if="status == 1" type="primary">检修预警</el-tag>
        <el-tag v-if="status == 2" type="danger">维护预警</el-tag>
    </span>
</template>
<script>
    export default{
        props:['status'],
    }
</script>

