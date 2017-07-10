import store from 'store';
import Vue from 'vue'

const permission = {
    state: {
        permissionRoutes: []
    },
    init(data) {
        const { roles, router } = data;
        const permissionRoutes = router.filter(v => {
            if (roles.indexOf('ROLE_ADMIN') >= 0) return true;
            if (this.hasPermission(roles, v)) {
                if (v.children && v.children.length > 0) {
                    v.children = v.children.filter(child => {
                        if (this.hasPermission(roles, child)) {
                            return child
                        }
                        return false;
                    });
                    return v
                } else {
                    return v
                }
            }
            return false;
        });
        // console.log("permissionRoutes")
        // console.log(permissionRoutes)
        this.state.permissionRoutes = permissionRoutes;
    },
    get() {
        return this.state.permissionRoutes
    },
    hasPermission(roles, route) {
        if (route.meta && route.meta.role) {
            return roles.some(role => route.meta.role.indexOf(role) >= 0)
        } else {
            return true
        }
    },
    hasAuthority(permitRoles){
        return store.getters.roles.some(role => permitRoles.indexOf(role) >= 0)
        // console.log("用户权限")
        // console.log(store.getters.roles)
    }
};

export default permission;

//全局绑定
Vue.prototype.hasAuthority = permission.hasAuthority
