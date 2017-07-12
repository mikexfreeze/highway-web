<template>
    <!--<div class="footer">-->
    <el-row class="footer">
        <el-col :span="15">
            <el-row>
                <el-col :span="4">
                    <router-link to="map">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-globe"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="home">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouye"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="device">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tubiaozhexiantu"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="errorstat">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jinggao1"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="orgindata">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yunpan"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="admin">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yonghuguanli"></use>
                        </svg>
                    </router-link>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="9">
            <div class="grid-content bg-purple-dark"></div>
        </el-col>
    </el-row>
    <!--</div>-->
</template>

<script>
    export default{}
</script>

<style scoped lang="scss">
    .footer {
        position: fixed;
        width: 100%;
        z-index: 2;
        bottom: 0;
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

    .icon{
        height: 70px;
        margin-top: 5px;
        width: 100%;
    }
</style>