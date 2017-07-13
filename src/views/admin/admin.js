import {GetUserList, DeleteUser, AddUser, ModifyUser} from './api/UserEdit.js'
import userstatlabel from './components/userstatus.vue'
import { Message } from 'element-ui';
export default {
    components:{userstatlabel},
    data() {
        return {
            userList: [],
            input5 : "",
            multipleSelection: [],
            temp: {},
            dialogStatus: "",
            dialogFormVisible: false,
            loading:false
        }
    },
    created: function () {
        this.getList()
    },
    methods: {
        getList(){
            GetUserList().then((response) => {
                this.userList = response.data;
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log("multipleSelection is");
            console.log(this.multipleSelection);
        },
        addNewUser() {
            //TODO:
            this.dialogStatus = 'create'
            this.dialogFormVisible = true;
            this.temp = {
                username:""
            }
        },
        deleteSelectUser(){
            if(this.multipleSelection.length == 0){
                Message({
                    message: "请至少选择一行数据",
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }
            Promise.all(this.multipleSelection.map(function (val) {
                return DeleteUser(val.username)
            })).then(()=>{
                this.getList()
            })
            // DeleteUser()
            // this.multipleSelection.forEach((E) => {
            //
            // })

        },
        create(){
            AddUser(this.temp.username)
                .then(()=>{
                    this.dialogFormVisible = false;
                    this.getList()
                })
        },
        activeBtn(){

        },
        disabledBtn(row){
            console.log(row.username)
            ModifyUser(row.username, 2)
                .then(()=>{
                    this.getList()
                })
        },
        stopUser() {

        },
        enableUser() {

        }
    }
}