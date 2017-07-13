<template>
    <span>
        <el-tag v-if="isEnable == 1" type="success">已启用</el-tag>
        <el-tag v-if="isEnable == 2" type="warning">已禁用</el-tag>
    </span>
</template>
<script>
    export default{
        props:['isEnable'],
    }
</script>