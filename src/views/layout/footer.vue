<template>
<!--<div class="footer">-->
    <el-row class="footer">
        <el-col :span="15">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </el-col>
        <el-col :span="9"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
<!--</div>-->
</template>

<script>
export default{

}
</script>

<style scoped lang="scss">
    .footer {
        position: fixed;
        width: 100%;
        z-index: 2;
        bottom:0;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        min-height: 80px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>