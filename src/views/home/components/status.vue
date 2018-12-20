<template>
    <span>
        <el-tag v-if="status == 0" type="success">健康</el-tag>
        <el-tag v-if="status == 1" type="danger">维护</el-tag>
        <el-tag v-if="status == 2" type="primary">故障</el-tag>
    </span>
</template>
<script>
    export default{
        props:['status'],
    }
</script>

