<template>
    <!--<div class="footer">-->
    <el-row class="footer">
        <el-popover
                ref="popover"
                placement="top-end"
                width="160"
                v-model="popoverVisible"
                popper-class="ysfclass"
                trigger="hover">
            <div style="text-align: right;">
                <el-button size="mini" type="text" @click="handleDevCheck">设备体检报告</el-button>
                <el-button type="text" size="mini" @click="handleDevLive">设备实时报告</el-button>
            </div>
        </el-popover>


        <el-popover
                ref="popover-data"
                placement="top-end"
                width="160"
                v-model="dataPopoverVisible"
                popper-class="ysfclass"
                trigger="hover">
            <div style="text-align: right;">
                <el-button size="mini" type="text" @click="handleOrgData">监测数据查询</el-button>
                <el-button type="text" size="mini" @click="handleFeeData">计费数据查询</el-button>
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
                        <router-link v-popover:popover  :to="devRoute()" @click="userClickDevice" ref="testDevice">
                            <!--<img  class="active-icon" :src="activeDeviceImage()"/>-->

                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tubiaozhexiantu"></use>
                            </svg>
                        </router-link>
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
                    <router-link v-popover:popover-data  :to="dataRoute()" @click="userClickData" ref="testData">

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
                    <el-row type="flex" justify="space-between">
                        <el-col :span="3">

                        </el-col>
                        <el-col :span="4" align="center">
                            <img style="width: 38px;height: 38px;margin-top: -0.6em" class="img-dot" src="../../assets/images/greendot.png" />
                            <span style="display: block;" class="dot-text">正常状态</span>
                        </el-col>
                        <el-col :span="4" align="center">
                            <img style="width: 38px;height: 38px;margin-top: -0.6em"  class="img-dot" src="../../assets/images/bluedot.png" />
                            <span style="display: block;" class="dot-text">检查预警</span>
                        </el-col>
                        <el-col :span="4" align="center">
                            <img style="width: 38px;height: 38px;margin-top: -0.6em" class="img-dot" src="../../assets/images/reddot.png" />
                            <span style="display: block;" class="dot-text">维护预警</span>
                        </el-col>

                        <el-col :span="6" align="right">
                            <span class="time-span">{{timenow}}</span>
                            <span class="time-span">{{datenow}}</span>
                        </el-col>
                        <el-col :span="1">
                        </el-col>
                    </el-row>

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
              dataPopoverVisible: false,
              deviceType:"1",
              dataInfoType:"1"  // 1 监测(原始)数据 2 收费数据
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

            dataRoute() {
                let r = "orgindata";
                if (this.dataInfoType === "1") {
                    r = "orgindata";
                } else if (this.dataInfoType === "2" ) {
                    r = "feedata";
                }
                return r;
            },

            userClickDevice() {
                this.deviceType = "2";
            },

            userClickData() {
                this.dataInfoType = "1";
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

            },
            handleOrgData() {
                this.dataInfoType = "1";
                this.$router.push('orgindata');
                this.dataPopoverVisible = false;

                this.$refs.testData.className += " router-link-exact-active router-link-active" ;
            },
            handleFeeData() {
                this.dataInfoType = "2";
                this.$router.push('feedata');
                this.dataPopoverVisible = false;
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
        width:35%;
        height: 50%;
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

    .ysfclass {
        display: none;
    }


</style>