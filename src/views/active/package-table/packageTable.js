/**
 * Created by Micheal Xiao on 2017/6/2.
 */

import moment from 'moment'

import dataTable from './components/table/table.vue'
import store from 'store'
import {GetList, CreatActive, UpdateActive, DeleteActive} from 'api/activities'
import { Message } from 'element-ui';
import editor from './components/editor.vue';

const activeTypeOptions = [
    { key: 'FD', display_name: '技术分享' },
    { key: 'FE', display_name: '招聘会' }
];
const actTypeOptions = [
    { key: 'AD', display_name: '技术分享' },
    { key: 'AE', display_name: '招聘会' },
    { key: 'AG', display_name: '全部'}
];

//此部分将来抽出
let pageParam = {
    page:1,
    size:15
}

//组件级变量
let selectionData = []

export default {
    hasAuthority:this.hasAuthority,
    created(){
        this.getList(pageParam);
    },
    data() {
        return {
            //对话框数据
            textMap: {
                update: '编辑',
                create: '创建'
            },
            dialogStatus:'create',
            dialogFormVisible: false,
            temp: tempInit(),
            activeTypeOptions,
            //日期选择限制
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            totalPage:10,
            formData: [],
            actTypeOptions,
            activityType: ''
        }
    },
    components: {
        dataTable,
        editor
    },
    methods: {
        create(){
            this.temp.beginDate = moment(this.temp.beginDate).format("YYYY-MM-DD")
            this.temp.creator = store.getters.name
            CreatActive(this.temp)
                    .then(()=> {
                        this.dialogFormVisible = false
                        this.dialogStatus = 'create';
                        this.getList(pageParam)
                    })
        },
        update(){
            this.temp.beginDate = moment(this.temp.beginDate).format("YYYY-MM-DD")
            this.temp.creator = store.getters.name
            UpdateActive(this.temp)
                    .then(()=> {
                        this.dialogFormVisible = false
                        this.getList(pageParam)
                    })
        },
        getList(pageParam) {
            GetList(pageParam).then((response)=>{
                this.totalPage = Math.ceil(response.headers['x-total-count']/pageParam.size * 10)
                this.formData = response.data
            })
        },
        onSubmit() {
            console.log('submit!');
        },
        onAdd() {
            this.dialogStatus = 'create'
            this.dialogFormVisible = true;
            this.temp = tempInit()
        },
        onDel() {
            if(selectionData.length == 0){
                Message({
                    message: "请至少选择一行数据",
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }
            Promise.all(selectionData.map(function (val) {
                return DeleteActive(val.id)
            })).then(()=>{
                this.getList(pageParam)
            })
        },
        onEdit: function () {
            if(selectionData.length > 1 || selectionData.length == 0){
                Message({
                    message: "请选择一行数据",
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }
            $.extend(this.temp, selectionData[0])
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
        },
        onSearch(){
            // 获取输入框的内容
            let res = $('#searchBox >input').val();
            // 获取选择的活动类型  this.temp.type
            // console.log(this.activityType);
            let comRes ;
            // 新数组，存放搜索的数据
            let newFormData = [];
            let size = res.length;
            // console.log(res);
            // 如果2个输入都为空
            if( (res.length == 0) && (this.activityType === '')){
                Message({
                    type: 'info',
                    message: '请输入搜索内容'
                });
                return
            }
            if(res.length != 0){
                for(var i=0; i<this.formData.length; i++){
                    for(var j=0; j<=this.formData[i].name.length - size+1; j++){
                        comRes = this.formData[i].name.substring(j, j+size );
                        if((this.activityType !== "全部") || (this.activityType !== '')) {
                            if( (comRes === res) && (this.formData[i].type === this.activityType)){
                                console.log(this.formData[i].name);
                                newFormData.push(this.formData[i]);
                            }
                        }
                        if((this.activityType === "全部") || (this.activityType === '')){
                            if(comRes === res){
                                // console.log(this.formData[i].name);
                                newFormData.push(this.formData[i]);
                            }
                        }
                    }
                }
                // console.log(newFormData);
                this.formData = newFormData;
            }else{
                // 输入框无内容，搜索全部显示全部
                if(this.activityType === "全部"){
                    this.getList(pageParam)
                }else{
                    for(var i=0; i<this.formData.length; i++){
                        if( (this.formData[i].type === this.activityType) ){
                            // console.log(this.formData[i].name);
                            newFormData.push(this.formData[i]);
                        }
                    }
                    this.formData = newFormData;
                }
            }
        },
        handleCurrentChange(page){
            // console.log("page")
            // console.log(page)
            pageParam.page = page;
            this.getList(pageParam)
        },
        handleSelectionChange(selection){
            selectionData = selection
        }

    }
}

function tempInit() {
    return {
        beginDate: "",
        creator: "",
        description: "",
        name: "",
        type: "技术分享"
    }
}
