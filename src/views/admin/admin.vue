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
                    <el-button type="info" @click="addNewUser">添加</el-button>
                    <el-button type="danger" @click="deleteSelectUser">删除</el-button>
                    <el-button type="warning" @click="stopUser">禁用</el-button>
                    <el-button type="success" @click="enableUser">启用</el-button>
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
                <h4>用户列表</h4>
                <el-table
                        ref="multipleTable"
                        :data="userList"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            prop="isEnable"
                            label="状态"
                            width="200">
                        <template scope="scope">
                            <userstatlabel :isEnable="scope.row.isEnable"></userstatlabel>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="120">
                        <template scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-row>
    </div>
</template>

<script src="./admin.js"></script>
<style scoped src="./admin.scss"></style>