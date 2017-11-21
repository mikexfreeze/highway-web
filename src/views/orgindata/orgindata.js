import {GetProvince, GetRoad, GetStation, GetPort,GetCarLog, GetCarLogTotalNum} from '../home/api/Lane.js'

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
            carsList: [],
            currentPage: 1,
            pageSize: 30,
            totalNum: 0,
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
        searchCarLog() {
            console.log("search Car Log");

            let startT = (this.selectedTime.length > 1) ? toParmaDateString(this.selectedTime[0]): "";
            let endT = (this.selectedTime.length > 1) ? toParmaDateString(this.selectedTime[1]) : "";

            // 获取总个数
            let numParam = {
                province:this.selectedProvince,
                road:this.selectedRoad,
                station:this.selectedStation,
                port:this.selectedPort,
                startTime:startT,
                endTime:endT,
                getTotalNumFlag: 1
            };

            GetCarLogTotalNum(numParam)
                .then((resp)=> {
                    let resultArr = resp.data;

                    if (resultArr.length > 0) {
                        let totalObj = resultArr[0];
                        this.totalNum = parseInt(totalObj.totalNum);

                        this.fetchDataWithTotalAndParam(numParam);
                    }
                });
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;

            this.currentPage = 1;

            this.updatePageChange();




        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;

            this.updatePageChange();

        },
        // 根据总数更新页面获取数据
        fetchDataWithTotalAndParam(param) {
            // 点击查询是初始化下分页参数
            this.currentPage = 1;

            param.getTotalNumFlag = 0;
            param.startLine = this.pageSize * (this.currentPage - 1);
            param.endLine = this.pageSize * (this.currentPage - 1) + this.pageSize;

            if (param.endLine > this.totalNum) {
                param.endLine = this.totalNum

                if (this.totalNum < param.startLine) {
                    param.endLine = param.startLine;
                }
            }


            GetCarLog(param)
                .then((response)=>{
                    let data = response.data

                    this.carsList = data;
                })

        },
        updatePageChange() {
            let startT = (this.selectedTime.length > 1) ? toParmaDateString(this.selectedTime[0]): "";
            let endT = (this.selectedTime.length > 1) ? toParmaDateString(this.selectedTime[1]) : "";

            let startLine = this.pageSize * (this.currentPage - 1);
            let endLine = this.pageSize * (this.currentPage - 1) + this.pageSize

            if (endLine > this.totalNum) {
                endLine = this.totalNum

                if (this.totalNum < startLine) {
                    endLine = startLine;
                }
            }


            // 获取总个数
            let numParam = {
                province:this.selectedProvince,
                road:this.selectedRoad,
                station:this.selectedStation,
                port:this.selectedPort,
                startTime:startT,
                endTime:endT,
                getTotalNumFlag: 0,
                startLine: startLine,
                endLine: endLine
            };

            GetCarLog(numParam)
                .then((response)=>{
                    let data = response.data

                    this.carsList = data;
                })
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