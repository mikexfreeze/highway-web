<template>
  <div>
    <div class="mainMap">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="filter-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户姓名">
          <el-input v-model="formInline.user" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="formInline.region" placeholder="用户角色">
            <el-option label="角色一" value="shanghai"></el-option>
            <el-option label="角色二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button type="primary" icon="plus" @click="onAdd">新增</el-button>
          <el-button type="primary" icon="edit" @click="onAdd">编辑</el-button>
          <el-button type="danger" icon="delete" @click="onDel">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dataTab">
      <dataTable/>
    </div>
  </div>
</template>

<script>
  import dataTable from 'components/table.vue'
  // import {getList} from 'api/activities'


  export default {
    name: 'activeMsg',
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
        // formData: getList().then(function (result) {
        //   console.log("result")
        //   console.log(result)
        //   return result
        // })
      }
    },
    components: {
      dataTable
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onAdd() {
        console.log('add!');
      },
      onDel() {
        console.log('delete!');
      }
    }
  }
</script>
