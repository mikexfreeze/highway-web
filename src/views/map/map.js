/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetXY,GetWeightCountingCheck,GetWeightCountingOriginal,GetStatErrorCount} from './api/map'
import dotview from './components/dotview.vue'
import moment from 'moment'


var randomState = 0;
var timeSet;

import ECharts from 'vue-echarts/components/ECharts.vue'
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/legend');
require('echarts/lib/component/markLine');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/title');
require('echarts/lib/component/legendScroll');


export default {
    components:{dotview,chart: ECharts,},
    data(){
        return{
            dotList: [],
            imageWidth: 1059,
            imageHeight: 672,
            show: true,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            weightDateRange: '',
        }
    },
    mounted() {
        var vm = this;
      this.$nextTick(function () {
          window.addEventListener('resize', resizeThrottler, false);

          var resizeTimeout;
          function resizeThrottler() {
              if (!resizeTimeout) {
                  resizeTimeout = setTimeout(function () {
                      resizeTimeout = null;
                      actualResizeHandler()
                  }, 100);
              }
          }

          function actualResizeHandler() {
              vm.getImageHeight();
              vm.getImageWidth();
          }
      })


        setTimeout(function () {
            vm.getImageWidth();
            vm.getImageHeight();

            GetXY().then((response) => {
                vm.dotList = response.data;
            })

        }, 1000)

        // this.getXY();




    },
    methods:{
        getXY(){
            this.dotList = testXY();
        },

        getImageWidth(event) {
            this.imageWidth = document.getElementById('map-image').clientWidth;

        },
        getImageHeight(event) {
            this.imageHeight = document.getElementById('map-image').clientHeight;
        },

        userChangeDate() {

            let start = this.weightDateRange[0];
            let end = this.weightDateRange[1];

            let startStr = moment(start).format("YYYY-MM-DD");
            let endStr = moment(end).format("YYYY-MM-DD");

            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var diffDays = Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay)));

            GetWeightCountingCheck(startStr,endStr,"guangxi").then((resp) => {

                // 构造图表
                if (resp.data) {

                    this.chart1 = makeChart(resp.data,"计重统计")

                } else {
                    this.chart1 = {}
                }

                let targetChart = this.$refs.c1;
                this.newLoad(targetChart,this.chart1);
            });

            GetWeightCountingOriginal(startStr,endStr,"guangxi").then((resp)=> {

                // 构造图表
                if (resp.data) {

                    this.chart2 = makeChart(resp.data,"监测统计")


                } else {
                    this.chart2 = {}
                }

                let targetChart = this.$refs.c2;
                this.newLoad(targetChart,this.chart2);
            })

            GetStatErrorCount(startStr,endStr,"guangxi").then((resp)=> {

                // 构造图表
                if (resp.data) {

                    this.errorChart = makeErrorChart(resp.data,"监测统计")


                } else {
                    this.errorChart = {}
                }

                let targetChart = this.$refs.errorC;
                this.newLoad(targetChart,this.errorChart);
            })


        },

        newLoad(chart,dataOptions) {
            chart.showLoading({
                text: '正在加载',
                color: '#4ea397',
                maskColor: 'rgba(255, 255, 255, 0.4)'
            })

            chart.clear()

            let timer = setInterval(() => {
                clearTimeout(timer)
                chart.hideLoading()
                chart.mergeOptions(dataOptions)
            }, 500)
        },


    },
    created: function () {

        timeSet = setInterval(function () {
            GetXY().then((response) => {
                this.dotList = response.data;

            })

        }, 60000)


        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.weightDateRange = [start, end];

        let startStr = moment(start).format("YYYY-MM-DD");
        let endStr = moment(end).format("YYYY-MM-DD");
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var diffDays = Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay)));


        GetWeightCountingCheck(startStr,endStr,"guangxi").then((resp) => {

            // 构造图表
            if (resp.data) {

                this.chart1 = makeChart(resp.data,"计重统计")

            }
        })


        GetWeightCountingOriginal(startStr, endStr,"guangxi").then((resp) => {

            // 构造图表
            if (resp.data) {

                this.chart2 = makeChart(resp.data,"监测统计")
            }
        })

        GetStatErrorCount(startStr,endStr, "guangxi").then((resp)=> {

            // 构造表
            if (resp.data) {
                this.errorChart = makeErrorChart(resp.data, "健康统计", diffDays)
            }



        })
    },

    updated: function () {
        this.imageWidth = document.getElementById('map-image').clientWidth;
        this.imageHeight = document.getElementById('map-image').clientHeight;

    },
    destroyed:function () {
        clearInterval(timeSet)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getImageWidth);
        window.removeEventListener('resize', this.getImageHeight);
    }
}


function makeErrorChart(data,title,days) {


    var testData = [{"PlatLen":"18","ProductSpec":"測試產品型號","Manufactor":"測試廠家","DevID":"guangxi-nanlinggaosu-nanlingzhan-1","PlatType":"測試稱台類型","checkDay":"0","brokenDay":"2"},{"PlatLen":"","ProductSpec":"","Manufactor":"","DevID":"guangxi-nanlinggaosu-nanlingzhan-2","PlatType":"","checkDay":"0","brokenDay":"0"},{"PlatLen":"","ProductSpec":"","Manufactor":"","DevID":"guangxi-nanlinggaosu-nanlingzhan-3","PlatType":"","checkDay":"0","brokenDay":"0"}]


    var serDatas = [];
    var lenDatas = [];

    var count = testData.length;

    var allDays = count * days;

    var brokenDay = 0;
    var checkDay = 0;

    testData.forEach((tmpInfo)=> {

        if (tmpInfo["brokenDay"] && tmpInfo["brokenDay"] !== "0") {
            brokenDay += parseInt(tmpInfo["brokenDay"])
        }

        if (tmpInfo["checkDay"] && tmpInfo["checkDay"] !== "0") {
            checkDay += parseInt(tmpInfo["checkDay"])
        }
    })


    var healthDay = allDays - brokenDay - checkDay;


    serDatas.push({value: healthDay,name: "健康"});
    serDatas.push({value: brokenDay, name: "故障"});
    serDatas.push({value: checkDay, name: "维护"});


    var chartOptions = {};

    chartOptions.title = {
        text: title,
        left: "center"
    };

    chartOptions.tooltip = {
        trigger: 'item',
        formatter: "{b} : {c} 天 ({d}%)"
    };


    chartOptions.series = {
        type: 'pie',
        radius : '50%',
        center: ['30%', '50%'],
        data: serDatas,
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    };

    chartOptions.legend = {
        orient: "vertical",
        right: 10,
        top: 50,
        data: ["健康","维护","故障"],
    }

    return chartOptions


}


function makeChart(data,title) {

    var lenDatas = [];
    var serDatas = [];
    var lenFormatName = {};

    data.forEach(tmp => {

        let tmpResult = tmp.axlenum + "轴车" + " "  + tmp.count + " 辆 " + "总吨位：" + tmp.totalWeight + " Kg";

        serDatas.push({value: tmp.totalWeight, name: tmp.axlenum + "轴车"});
        lenDatas.push(tmp.axlenum + "轴车");
        lenFormatName[tmp.axlenum + "轴车"] = tmpResult;
    });


    var chartOptions = {};

    chartOptions.title = {
        text: title,
        left: "center"
    };

    chartOptions.tooltip = {
        trigger: 'item',
        formatter: "{b} : {c} Kg ({d}%)"
    };


    chartOptions.series = {
        type: 'pie',
        radius : '50%',
        center: ['30%', '43%'],
        data: serDatas,
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    };

    chartOptions.legend = {
        orient: "vertical",
        right: 10,
        top: 50,
        data: lenDatas,
        formatter: function (name) {

            return lenFormatName[name]

        },
    }

    return chartOptions
}


function testXY() {
    var result = mapTestState();
    return result;
}

function mapTestState() {

    if (randomState == 3) {
        randomState = 0;
    }

    var result = [{
        "top" : "240",
        "left" : "830",
        "stat" : randomState
    }];

    randomState++;

    return result;
}