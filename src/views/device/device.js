import {GetProvince, GetRoad, GetStation, GetPort,GetCarLog} from '../home/api/Lane.js'
import {AddPaintRequest,ShowPaint} from './api/DeviceCheck.js'


export default {
    data() {
        return {
            provinceOptions: [],
            roadOptions: [],
            stationOptions: [],
            portOptions: [],
            selectedProvince: null,
            selectedRoad: null,
            selectedStation: null,
            selectedPort: null,
            selectedTime: [],
            deviceID: null,
            isBtnLoading: false,
            picUrl:null,
            timer:null,
        }
    },
    methods:{
        saveSelecetedToCache() {
            window.localStorage.setItem("home_povince", this.selectedProvince);
            window.localStorage.setItem("home_road_options", JSON.stringify(this.roadOptions));
            window.localStorage.setItem("home_road", this.selectedRoad);
            window.localStorage.setItem("home_station_options", JSON.stringify(this.stationOptions));
            window.localStorage.setItem("home_station", this.selectedStation);
        },
        canAddTest() {
            if (this.deviceID != null ) {
                return false
            } else {
                return true
            }
        },
        getPovince(){
            return GetProvince()
        },
        provinceHasItem() {
            return this.selectedProvince == null;
        },
        roadHasItem() {
            return this.selectedRoad == null;
        },
        stationHasItem() {
            return this.selectedStation == null;
        },
        changeProvince() {
            this.selectedStation = null;
            this.selectedRoad = null;
            this.selectedPort = null;
            this.deviceID = null;
            // 调用查询Road接口
            GetRoad(this.selectedProvince)
                .then((response)=>{
                    this.roadOptions = getResObjArry(response.data.roadList)
                })
        },
        changeRoad(value) {
            this.selectedStation = null;
            this.selectedPort = null;
            this.deviceID = null;
            GetStation(this.selectedProvince ,this.selectedRoad)
                .then((response)=>{
                    this.stationOptions = getResObjArry(response.data.stationList)
                })
        },
        changeStation(value) {
            this.selectedPort = null;
            this.deviceID = null;
            GetPort(this.selectedProvince, this.selectedRoad, this.selectedStation)
                .then((response)=> {
                    this.portOptions = getPortObj(response.data.portList)
                })
        },
        changePort(value) {
            this.combineDeviceID()
        },
        combineDeviceID() {
            this.deviceID = this.selectedProvince + "-" + this.selectedRoad + "-" + this.selectedStation + "-" + this.selectedPort
        },
        addPaint() {
            if (this.isBtnLoading) {

            } else {
                this.isBtnLoading = true;
                var vm = this;
                AddPaintRequest(this.deviceID).then(()=> {
                    vm.getPic();
                })
            }
        },
        btnTitle() {
            return this.isBtnLoading ? "请求中" : "数据测试";
        },
        getPic() {
            this.saveSelecetedToCache();
            if (this.picUrl != null) {
                this.isBtnLoading = false;
            } else {

                var vm = this;

                ShowPaint(this.deviceID).then((respone)=> {
                    var data = respone.data;

                    if (data.picUrl) {
                        vm.picUrl = data.picUrl;
                    }

                })

                vm.timer = setTimeout(function () {
                    vm.getPic()
                }, 10000)
            }
        }

    },
    created: function () {
        clearTimeout(this.timer);
        this.getPovince()
            .then((response) => {
                this.provinceOptions = [];
                response.data.provinceList.forEach((val, n) => {
                    let x = Object.keys(val)[0];
                    this.provinceOptions.push({
                        "key": x,
                        "value": val[x]
                    })

                })
            });

        var cachePovince = window.localStorage.getItem("home_povince");
        if (cachePovince) {
            this.selectedProvince = cachePovince;
        }

        var cacheRoad = window.localStorage.getItem("home_road");

        if (cacheRoad) {
            this.selectedRoad = cacheRoad;
            this.roadOptions = JSON.parse(window.localStorage.getItem("home_road_options"));
        }

        var cacheStation = window.localStorage.getItem("home_station");

        if (cacheStation) {
            this.selectedStation =  cacheStation;
            this.stationOptions = JSON.parse(window.localStorage.getItem("home_station_options"));
            GetPort(this.selectedProvince, this.selectedRoad, this.selectedStation)
                .then((response)=> {
                    this.portOptions = getPortObj(response.data.portList)
                })
        }


    },
    destroyed: function () {
        clearTimeout(this.timer)
    }
}

function getResObjArry(data) {
    let arr = [];
    data.forEach((val, n) => {
        let x = Object.keys(val)[0];
        arr.push({
            "key": x,
            "value": val[x]
        })

    });
    return arr
}

function getPortObj(data) {
    let arr = [];
    data.forEach((val, n) => {
        let x = Object.keys(val)[0];
        arr.push({
            "key": x,
            "value": (val[x] + ' 号出口收费站')
        })
    });
    return arr
}