<template>
    <el-menu :unique-opened='true' mode="vertical" theme="dark" :default-active="$route.path">
        <template v-for="item in permissionRoutes" v-if="!item.hidden">
            <el-submenu :index="item.name" v-if="!item.noDropdown">

                <template slot="title">
                    <wscn-icon-svg :icon-class="item.icon||'wenzhang1'"/>
                    {{item.name}}
                </template>
                <router-link v-for="child in item.children" :key="child.path"
                             v-if="!child.hidden" class="title-link"
                             :to="item.path+'/'+ (child.defPath || child.path)"
                             >
                    <el-menu-item :index="item.path+'/'+child.path" @click="handlerGo(child, item.path)">
                        {{child.tagName || child.name}}
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <router-link v-if="item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
                <el-menu-item :index="item.path+'/'+item.children[0].path">
                    <wscn-icon-svg :icon-class="item.icon ||'geren1'"/>
                    {{item.children[0].name}}
                </el-menu-item>
            </router-link>
        </template>
    </el-menu>
</template>

<script>
    import permissionRoutes from 'store/permission';
    import store from 'store';
    export default {
        name: 'Sidebar',
        data() {

            return {
                permissionRoutes: permissionRoutes.get()
            }
        },
        methods: {
            handlerGo(){
                let routObj = $.extend({},arguments[0]),pat = arguments[1]
                routObj.path = pat + '/'+ (routObj.defPath || routObj.path)
                routObj.name = routObj.tagName || routObj.name
//                console.log("菜单点击")
//                console.log(routObj)
                store.dispatch('AddTab', routObj)
            }
        }
    }

    //  console.log("permissionRoutes.get()")
    //  console.log(permissionRoutes.get())
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu {
        min-height: 100%;
    }

    .wscn-icon {
        margin-right: 10px;
    }

    .hideSidebar .title-link {
        display: inline-block;
        padding-left: 10px;
    }
</style>
