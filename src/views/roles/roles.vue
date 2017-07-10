<template>
    <div>

        <breadcrumb></breadcrumb>
        <div class="filter-container">
            <el-button type="primary" icon="plus" @click="onAdd" v-authority="'ROLE_ADMIN'">新增</el-button>
            <el-button type="primary" icon="edit" @click="onEdit" v-if="hasAuthority('ROLE_ADMIN')">编辑</el-button>
            <el-button type="danger" icon="delete" @click="onDel" v-if="hasAuthority('ROLE_ADMIN')">删除</el-button>
        </div>

        <dataTable :tableData="formData" v-on:selectionChange="handleSelectionChange"/>

        <pagination :total="totalPage" v-on:pageChange="handleCurrentChange"></pagination>
        <!--对话框编辑区-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form class="small-space" :model="temp" label-position="left" label-width="60px"
                   style='width: 400px; margin-left:50px;'>
            <!--<el-form-item label="ID">-->
              <!--<el-input v-model="temp.id" placeholder="请输入"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="名称">
              <el-input v-model="temp.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="temp.description" :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入（最多50字）"></el-input>
            </el-form-item>
            <!--<el-form-item label="权限">-->
              <!--<el-input v-model="temp.authorities" placeholder="请输入"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="状态" >
              <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
                <el-option v-for="item in  activeStatusOptions" :key="item.key" :label="item.display_name"
                           :value="item.display_name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
            <el-button v-else type="primary" @click="update">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script src="./roles.js">

</script>
<!--<style scoped src="./roles.scss"></style>-->
