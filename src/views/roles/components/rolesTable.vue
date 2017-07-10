<template>
    <div>
        <el-table
                :data="tableData"
                border
                stripe
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="65">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="180">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="module"-->
                    <!--label="模型">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column align="center" label="操作" width="150" v-if="hasAuthority('ROLE_ADMIN')">
                <template scope="scope">
                    <el-button size="small" type="primary"
                               @click="handlePermit(scope.row)"
                    >授权
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="授权编辑"
                :visible.sync="AuthordialogVisible"
                v-if="AuthordialogVisible"
                >
            <author-tree :dialogRow="AuthordialogRow" @semit="handleTreeEmit" :femit.sync = "femit"></author-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="AuthordialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="femit.enterBtn = !femit.enterBtn">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import authorTree from './authoritiesTree.vue'

    export default {
        props: ['tableData'],
        data(){
            return {
                multipleSelection: [],
                AuthordialogVisible: false,
                AuthordialogRow:{},
                femit:{enterBtn:false},
            }
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
//                console.log("选中row数据")
//                console.log(this.multipleSelection)
                this.$emit('selectionChange', val)
            },
            handlePermit(row){
                this.AuthordialogVisible = true;
                this.AuthordialogRow = row;
//                console.log("选中row数据")
//                console.log(row)
            },
            handleTreeEmit(){
                this.AuthordialogVisible = false;
            }
        },
        components: {
            authorTree
        }
    }
</script>
