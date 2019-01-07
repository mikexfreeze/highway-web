<template>
    <div class="app-wrapper">
        <Navbar :title="title"></Navbar>

        <div class="main-container">
            <transition name="fade" mode="out-in">
                <!--<keep-alive>-->
                    <router-view></router-view>
                <!--</keep-alive>-->
            </transition>
        </div>

        <FooterBar></FooterBar>

    </div>
</template>

<script>
    import {Navbar, FooterBar} from 'views/layout';

    export default {
        name: 'layout',
        components: {
            Navbar,
            FooterBar
        },
        data() {
            return {
                title: "路网分布图"
            }
        },
        // 基于路线变化的动态设置路由切换动画
        mounted() {
            //检测浏览器类型决定是否展示栏
            this.title = this.$route.meta.title;
        },
        watch: {
            $route(to, from) {
                this.title = to.meta.title;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/assets/styles/mixin.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container {
                margin-left: 40px;
            }
        }
        .sidebar-wrapper {
            width: 180px;
            position: fixed;
            top: 60px;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow-x: hidden;
            transition: all .28s ease-out;
            @include scrollBar;
        }
        .sidebar-container {
            transition: all .28s ease-out;
        }
        .main-container {
            padding: 0 15px;
            transition: all .28s ease-out;
            overflow: auto;
            position: absolute;
            top: 60px;
            right: 0;
            bottom: 80px;
            left: 0;
        }
    }
</style>
