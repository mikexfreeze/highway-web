import {GetUserList} from './api/UserEdit.js'
import userstatlabel from './components/userstatus.vue'

export default {
    components:{userstatlabel},
    data() {
        return {
            userList: [],
            input5 : "",
            multipleSelection: []
        }
    },
    created: function () {
        GetUserList().then((response) => {
          this.userList = response.data;
        })
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log("multipleSelection is " + this.multipleSelection );
        },
        addNewUser() {
            //TODO:
        },
        deleteSelectUser(){
            // this.multipleSelection.forEach((E) => {
            //
            // })

        },
        stopUser() {

        },
        enableUser() {

        }
    }
}