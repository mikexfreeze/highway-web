<template>
    <div>
        <breadcrumb></breadcrumb>
        <div class="filter-container">
            <el-button type="primary" icon="plus" @click="onAdd" v-authority="'ROLE_ADMIN'">新增</el-button>
        </div>
        <div>
            <!--数据表格-->
            <dataTable :tableData="formData" v-on:selectionChange="handleSelectionChange"
                       @ssemit="handleSsemit"/>
            <!--翻页-->
            <pagination :total="totalPage" v-on:pageChange="handleCurrentChange1"></pagination>
            <!--dialog编辑区-->
            <!--新增用户-->
            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
                         :rules="userRules" style='width: 400px; margin-left:50px;'>
                    <el-form-item label="用户名" prop="login">
                        <el-input v-model="temp.login" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="temp.password" placeholder="请输入密码（不少于6位）"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="temp.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
                    <!--<el-button v-else type="primary" @click="update">确 定</el-button>-->
                </div>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    import {GetUserList, GetUsers} from 'api/getUserList'
    import moment from 'moment'
    import {DeleteUsers, CreateUser} from 'api/getUserList'
    import permission from 'store/permission'
    import {parseTime} from 'utils'
    import {isWscnEmail} from 'utils/validate';
    import {GetRolesList} from 'api/roles'
    import dataTable from './assignRoleTable.vue'

    //每页显示的记录数
    let pageParam = {
        page: 1,
        size: 10
    }
    let selectionData = []

    export default{
        created(){
            this.showInfo(pageParam);
//            this.getList(pageParam);
        },
        data(){
            const validateEmail = (rule, value, callback) => {
                if (!isWscnEmail(value)) {
                    callback(new Error('请输入正确的合法邮箱'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能少于6位'));
                } else {
                    callback();
                }
            };
            return {
                //初始化
                formData: [],
                totalPage: 10,
                textMap: {
                    create: '新增'
                },
                dialogFormVisible: false,
                dialogStatus: 'create',
                temp: {
                    login: '',
                    password: '',
                    email: '',
                    createdBy: ''
                },
                userRules: {
                    login: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        components: {
            dataTable
        },
        methods: {
            hasAuthority: permission.hasAuthority,
            create(){
                console.log(this.temp);
                CreateUser(this.temp)
                    .then(() => {
                        this.dialogFormVisible = false;
                        this.dialogStatus = 'create';
                        this.showInfo(pageParam);
                    });
            },
//            显示用户信息
            showInfo(pageParam){
                GetUserList(pageParam)
                    .then((response) => {
                        //console.log(response)
                        this.totalPage = Math.ceil(response.headers['x-total-count'] / pageParam.size * 10)
                        this.formData = response.data
                    })
            },
            //翻页功能
            handleCurrentChange1(page){
                pageParam.page = page;
                this.showInfo(pageParam)
            },
            handleSelectionChange(selection){
                this.selectionData = selection
            },
            onAdd(){
                this.dialogFormVisible = true;
                this.dialogStatus = 'create';
            },
            handleSsemit(){
                this.showInfo(pageParam);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
