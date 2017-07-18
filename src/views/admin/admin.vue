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
                    <el-button type="warning" @click="logout">登出</el-button>
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
                            label="操作">
                        <template scope="scope">
                            <el-button v-if="scope.row.isEnable !='1'" style="" type="success" @click="activeBtn(scope.row)">启用
                            </el-button>
                            <el-button v-if="scope.row.isEnable =='1'" type="warning" @click="disabledBtn(scope.row)">禁用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-row>

        <el-dialog :title="'新增用户'" :visible.sync="dialogFormVisible">
            <!--<editor :temp = "temp" :activeTypeOptions="activeTypeOptions" :pickerOptions0="pickerOptions0" ></editor>-->
            <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="名称">
                    <el-input v-model="temp.username" placeholder="请输入名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
                <!--<el-button v-else type="primary" @click="update">确 定</el-button>-->
            </div>
        </el-dialog>

        <el-dialog :title="'确定登出？'" :visible.sync="logoutLogFormVisible">
            <div slot="footer" class="dialog-footer">
                <el-button @click="logoutLogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureLogout">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script src="./admin.js"></script>
<style scoped src="./admin.scss"></style>