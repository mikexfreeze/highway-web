/**
 * Created by Micheal Xiao on 2017/6/19.
 */
import {GetRolesList,CreateRole,DeleteRole,UpdateRole} from 'api/roles'
import dataTable from './components/rolesTable.vue'
import { Message } from 'element-ui';

const activeStatusOptions = [
  { key: 'ED', display_name: 'NORMAL' },
  { key: 'EF', display_name: 'DELETE' },
];
let selectionData = []

export default {
    data(){
        return{
            formData:[],
            totalPage:10,
            pageParam:{
                page:1,
                size:15
            },
            textMap: {
              create: '创建',
              update: '编辑',
            },
            dialogStatus:'create',
            dialogFormVisible: false,
            activeStatusOptions,
            temp: {
             // id: '',
             status: '',
             description: '',
             name: '',
             // authorities: [''],
            },
        }
    },
    methods:{
        create(){
          console.log("this.temp")
          console.log(this.temp)
          CreateRole(this.temp)
            .then(()=> {
              this.dialogFormVisible = false;
              this.dialogStatus = 'create';
              this.getList(this.pageParam)
            })
        },
        update(){
          console.log("编辑接口");
          UpdateRole(this.temp)
            .then(() => {
              this.dialogFormVisible = false;
              this.getList(this.pageParam);
            });
        },
        handleSelectionChange(selection){
            selectionData = selection
        },
        getList(pageParam) {
            GetRolesList(pageParam).then((response)=>{
                this.totalPage = Math.ceil(response.headers['x-total-count']/pageParam.size * 10)
                this.formData = response.data
            })
        },
        handleCurrentChange(page){
            this.pageParam.page = page;
            this.getList(this.pageParam)
        },
        onAdd(){
          this.dialogStatus = 'create';
          this.dialogFormVisible = true;
        },
        onDel(){
          // 判断是否选中记录
          if(selectionData.length == 0){
            Message({
              message: "请至少选择一行数据",
              type: 'error',
              duration: 5 * 1000
            })
            return
          };
          // 确认框及删除操作
          this.ConfirmBox().then( () => {
            Promise.all(selectionData.map(function (val) {
              return DeleteRole(val.id)
            })).then(()=>{
              this.getList(this.pageParam)
            })
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          }, () => {
            this.$message({
              type:'info',
              message: '已取消删除'
            });
          });
        },
        onEdit(){
          // 判断是否选中记录
          if(selectionData.length > 1 ||selectionData.length == 0){
            Message({
              message: "请选择一行数据",
              type: 'error',
              duration: 5 * 1000
            })
            return
          };
          $.extend(this.temp, selectionData[0])
          this.dialogStatus = 'update';
          this.dialogFormVisible = true;
        }
    },
    created(){
        this.getList(this.pageParam)
    },
    components: {
        dataTable,
    },
}
