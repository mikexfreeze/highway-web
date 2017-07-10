<template>
    <div>

        <el-tree
                :data="regions"
                :props="props"
                show-checkbox
                ref="tree"
                node-key="author"
        >
        </el-tree>

    </div>
</template>

<script>
    import {GetRole, SetRoleAuthorities} from 'api/roles.js'
    var treeData = require('./authoritiesTree.json');
    export default{
        props: ['dialogRow','femit','dialogVisible'],
        name: 'authortree',
        data() {
            return {
                regions: treeData.regions,
                props: {
                    label: 'label',
                    children: 'children'
                },
            };
        },
        created(){
//            console.log("dialogRow")
//            console.log(this.dialogRow)
        },
        methods: {
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedKeys(author) {
                this.$refs.tree.setCheckedKeys(author);
            },
            getRole(roleId){
                return GetRole(roleId)
            }
        },
        mounted(){
            this.getRole(this.dialogRow.id)
                .then((response) => {
                    this.setCheckedKeys(response.data.authorities)
                })
        },
        watch:{
            "femit.enterBtn": function () {
                SetRoleAuthorities(this.dialogRow.id,this.$refs.tree.getCheckedKeys())
                    .then(()=>{
                        this.$emit('semit')
                    })
            }
        }
    }
</script>