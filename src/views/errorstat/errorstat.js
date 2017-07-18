import {GetProvince, GetRoad, GetStation, GetPort,GetStatu,GetErrorCount} from '../home/api/Lane.js'
import print from 'assets/js/printThis.js'
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
            errorList:[],
            errorCount:"0",
        }

    },
    methods:{
        canSearch() {
          if (this.selectedProvince != null && this.selectedTime.length > 1 && this.selectedTime[0] && this.selectedTime[1]) {
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
            // 调用查询Road接口
            GetRoad(this.selectedProvince)
                .then((response)=>{
                    this.roadOptions = getResObjArry(response.data.roadList)
                })
        },
        changeRoad(value) {
            this.selectedStation = null;
            this.selectedPort = null;
            GetStation(this.selectedProvince ,this.selectedRoad)
                .then((response)=>{
                    this.stationOptions = getResObjArry(response.data.stationList)
                })
        },
        changeStation(value) {
            this.selectedPort = null;
            GetPort(this.selectedProvince, this.selectedRoad, this.selectedStation)
                .then((response)=> {
                    this.portOptions = getPortObj(response.data.portList)
                })
        },
        searchError() {
            console.log("searchError");

            let startT = (this.selectedTime.length > 1) ? toParmaDateString(this.selectedTime[0]): "";
            let endT = (this.selectedTime.length > 1) ? toParmaDateString(this.selectedTime[1]) : "";


            let param = {
                province:this.selectedProvince,
                road:this.selectedRoad,
                station:this.selectedStation,
                port:this.selectedPort,
                startTime:startT,
                endTime:endT
            };
            GetErrorCount(param)
                .then((response)=>{
                    let data = response.data

                    this.errorList = data.ErrorList;
                    this.errorCount = data.errCount;



                })

        },
        printTable(){
            $(".table-area").printThis()
        }
    },
    created: function () {
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

function toParmaDateString(date) {
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    console.log(Y+M+D);
    return Y+M+D;
}