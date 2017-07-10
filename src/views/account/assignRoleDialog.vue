<template>
    <div>
        <el-table :data="roletableData"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange"
                  node-key="author">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="描述" width="180"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {GetUserList, GetUsers, SetUserRoles} from 'api/getUserList'
    import {GetRolesList} from 'api/roles'

    export default{
        props: ['dialogRow', 'RoledialogVisible', 'femit', 'roletableData'],
        name: 'roletable',
        data(){
            return {
                multipleSelection: [],
            }
        },
        mounted(){
            this.setChecked()
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            setCheckedKeys(author) {
                this.$refs.multipleTable.setCheckedKeys(author);
            },
            // 按用户名查询用户信息
            getUsers(login){
                return GetUsers(login)
            },
            // 显示并勾选用户角色信息
            setChecked(){
//            遍历数组，与dialogRow比较
                for (var i = 0; i < this.roletableData.length; i++) {
                    for (var j = 0; j < this.dialogRow.roles.length; j++) {
                        if (this.roletableData[i].id == this.dialogRow.roles[j]) {
                            this.$refs.multipleTable.toggleRowSelection(this.roletableData[i]);
                        }
                    }
                }
            }
        },
        watch: {
            "femit.enterBtn": function () {
                let rolesArr = []
                this.multipleSelection.forEach(function (val) {
                    rolesArr.push(val.id)
                })
                SetUserRoles(this.dialogRow.login, rolesArr)
                    .then(() => {
                        this.$emit('semit')
                    })
            }
        }

    }
</script>
