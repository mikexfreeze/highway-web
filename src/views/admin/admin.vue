<template>
    <div>
        <el-row>
            <div class="grid-content page-title">
                <h1>权限管理</h1>
            </div>
        </el-row>
        <el-row>
            <el-col :span="18">
                <span class="wrapper">
                    <el-button type="info">添加</el-button>
                    <el-button type="warning">删除</el-button>
                    <el-button type="success">禁用</el-button>
                    <el-button type="danger">启用</el-button>
                </span>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="请输入用户名" v-model="input5">
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <div id="adminTableContainner">
                <h1>用户列表</h1>
                <!--<el-table-->
                        <!--ref="multipleTable"-->
                        <!--:data="tableData3"-->
                        <!--border-->
                        <!--tooltip-effect="dark"-->
                        <!--style="width: 100%"-->
                        <!--@selection-change="handleSelectionChange">-->
                    <!--<el-table-column-->
                            <!--type="selection"-->
                            <!--width="55">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--label="日期"-->
                            <!--width="120">-->
                        <!--<template scope="scope">{{ scope.row.date }}</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--prop="name"-->
                            <!--label="姓名"-->
                            <!--width="120">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--prop="address"-->
                            <!--label="地址"-->
                            <!--show-overflow-tooltip>-->
                    <!--</el-table-column>-->
                <!--</el-table>-->
            </div>
        </el-row>
    </div>
</template>

<script src="./admin.js"></script>
<style scoped src="./admin.scss"></style>