<template>
    <div>
        <!--数据表格-->
        <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <!--<el-table-column align="center" label="ID" width="65">-->
            <!--<template scope="scope">-->
            <!--<span>{{scope.row.id}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="login" label="用户名">
                <template scope="scope">
                    <span class="link-type">{{scope.row.login}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <!--<el-table-column prop="createdBy" label="创建人"></el-table-column>-->
            <!--<el-table-column prop="createdDate" label="创建时间">-->
            <!--<template scope="scope">-->
            <!--<span class="link-type">{{scope.row.createdDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="lastModifiedBy" label="上次修改人"></el-table-column>-->
            <el-table-column prop="type" label="操作" align="center" width="200">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="assignRole(scope.row)"
                               v-if="hasAuthority('ROLE_ADMIN')">
                        赋予角色
                    </el-button>
                    <el-button type="danger" size="small" @click="delUsers(scope)"
                               v-if="hasAuthority('ROLE_ADMIN')">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--赋予角色-->
        <el-dialog title="赋予角色" v-if="RoledialogVisible" :visible.sync="RoledialogVisible">
            <role-table :roletableData="roleData" :dialogRow="RoledialogRow"
                        @semit="handleTableEmit" :femit.sync = "femit"></role-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="RoledialogVisible = false">取消</el-button>
                <el-button type="primary" @click="femit.enterBtn = !femit.enterBtn">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

    let pageParam = {
        page: 1,
        size: 10
    }

    import {GetUserList, GetUsers} from 'api/getUserList'
    import {DeleteUsers, CreateUser} from 'api/getUserList'
    import {GetRolesList} from 'api/roles'
    import roleTable from './assignRoleDialog.vue'

    export default{
        props: ['tableData'],
        data(){
            return {
                roleData: [],
                RoledialogRow: {},
                RoledialogVisible: false,
                multipleSelection: [],
                femit:{enterBtn:false}
            }
        },
        created(){
            this.getList(pageParam);
        },
        methods: {
            handleSelectionChange(val){
                this.multipleSelection = val;
                this.$emit('selectionChange', val)
            },
            // 删除用户提示及删除功能
            delUsers(scope){
                this.ConfirmBox().then(() => {
                    DeleteUsers(scope.row.login)
                        .then(() => {
                            this.tableData.splice(scope.$index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                        });
                }, () => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //赋予角色按钮
            assignRole(row){
                this.RoledialogVisible = true;
                this.RoledialogRow = row;
            },
            handleTableEmit(){
                this.RoledialogVisible = false;
                this.$emit('ssemit');
            },
            //显示数据
            getList(pageParam){
                GetRolesList(pageParam).then((response) => {
                    this.roleData = response.data;
                })
            }
        },
        components: {
            roleTable
        }
    }
</script>
