<template>
    <!--<div class="footer">-->
    <el-row class="footer">
        <el-popover
                ref="popover"
                placement="top"
                width="160"
                v-model="popoverVisible"
                trigger="hover">
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="handleDevCheck">设备体检报告</el-button>
                <el-button type="text" size="mini" @click="handleDevLive">设备实时报告</el-button>
            </div>
        </el-popover>


        <el-col :span="15">
            <el-row>
                <el-col :span="4" >
                    <router-link to="map">
                        <img class="active-icon" src="../../assets/images/icons/1-1.png" />
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-globe"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="home">
                        <img class="active-icon" src="../../assets/images/icons/2-2.png" />
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouye"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <div v-popover:popover>
                        <router-link :to="devRoute()" @click="userClickDevice" ref="testDevice">
                            <img  class="active-icon" :src="activeDeviceImage()"/>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tubiaozhexiantu"></use>
                            </svg>
                        </router-link>
                    </div>
                </el-col>
                <el-col :span="4">
                    <router-link to="errorstat">
                        <img class="active-icon" src="../../assets/images/icons/4-4.png" />
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jinggao1"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="orgindata">
                        <img class="active-icon" src="../../assets/images/icons/5-5.png" />
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yunpan"></use>
                        </svg>
                    </router-link>
                </el-col>
                <el-col :span="4">
                    <router-link to="admin">
                        <img class="active-icon" src="../../assets/images/icons/6-6.png" />
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yonghuguanli"></use>
                        </svg>
                    </router-link>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="9">
            <div class="grid-content bg-purple-dark" >
                <div id="right-bottom-status">
                    <el-col :span="4" align="center" :offset="2">
                        <img class="img-dot" src="../../assets/images/greendot.png" />
                        <span class="dot-text">正常状态</span>
                    </el-col>
                    <el-col :span="4" align="center">
                        <img class="img-dot" src="../../assets/images/bluedot.png" />
                        <span class="dot-text">检查预警</span>
                    </el-col>
                    <el-col :span="4" align="center">
                        <img class="img-dot" src="../../assets/images/reddot.png" />
                        <span class="dot-text">维护预警</span>
                    </el-col>
                    <el-col :span="4" align="right">
                        <span class="time-span">{{timenow}}</span>
                        <span class="time-span">{{datenow}}</span>
                    </el-col>
                </div>

            </div>
        </el-col>
    </el-row>
    <!--</div>-->
</template>

<script>
    import Pic_1 from '../../assets/images/icons/3-1.png'
    import Pic_2 from '../../assets/images/icons/3-2.png'


    export default{
        data() {
          return {
              datenow : '',
              timenow : '',
              date : '',
              interval :'',
              popoverVisible: false,
              deviceType:"1"
          }
        },
//        watch: {
//            deviceType: function (newType) {
//                this.deviceType = newType
//
//            }
//        },
        methods: {
            devRoute() {
                let r = "device"
                if (this.deviceType === "1") {
                    r = "device";
                } else if (this.deviceType === "2") {
                    r = "devcheck";
                }
                return r;
            },
            userClickDevice() {
                this.deviceType = "2";
            },
            activeDeviceImage() {
                let imageUrl = Pic_1;
                if (this.deviceType === "1") {
                    imageUrl = Pic_1;
                } else if (this.deviceType === "2") {
                    imageUrl = Pic_2;
                }

                return imageUrl;
            },

            time() {
                this.date = new Date();

                this.datenow = this.date.toLocaleDateString('zh');

                this.timenow = this.date.toLocaleTimeString('zh',{hour12:false,hour:"numeric",minute:"numeric"})
            },
            handleDevCheck() {
                this.deviceType = "2";
                this.$router.push('devcheck');
                this.popoverVisible = false;

                this.$refs.testDevice.className += " router-link-exact-active router-link-active" ;
            },
            handleDevLive() {
                this.deviceType = "1";
                this.$router.push('device');
                this.popoverVisible = false;

            }
        },
        mounted() {
            this.interval = setInterval(this.time, 5000)
        },
        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>

<style scoped lang="scss">
    .active-icon{
        display: none;
    }

    .router-link-active{
        position: relative;
        .active-icon{
            display: block;
            position: absolute;
            width: 50%;
            right: 0;
        }
    }

    .time-span {
        color: #4AB7BD;
        display: block;
        vertical-align: bottom;
    }

    .img-dot {
        width:30%;
        height: 30%;
    }

    .dot-text {
        display: inline-block;
    }

    .footer {
        position: fixed;
        width: 100%;
        z-index: 2;
        bottom: 0;
    }

    .bg-purple-dark {
        background: white;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        min-height: 80px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .icon{
        height: 50px;
        margin-top: 15px;
        width: 80%;
    }

    #right-bottom-status {
        margin: auto;
        padding-top: 20px;
    }




</style>