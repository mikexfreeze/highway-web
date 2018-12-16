/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetXY} from './api/map'
import dotview from './components/dotview.vue'

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


export default {
    components:{dotview,chart: ECharts,},
    data(){
        return{
            dotList: [],
            imageWidth: 1059,
            imageHeight: 672,
            show: true,
            weightInfo:[{value:1000, name:"2轴车"},{value:1000, name:"3轴车"},{value:1000, name:"4轴车"},{value:1000, name:"5轴车"},{value:1000, name:"6轴车"}]
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
        hideWeightInfo() {

        }
    },
    created: function () {

        timeSet = setInterval(function () {
            GetXY().then((response) => {
                this.dotList = response.data;

            })

        }, 60000)


        this.chart =  {
            title: {
                text: '天气情况统计',
                subtext: '虚构数据',
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                data: ['2轴车', '3轴车','4轴车','5轴车','6轴车']
            },
            series : [
                {
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data:[
                        {value:535, name: '2轴车'},
                        {value:510, name: '3轴车'},
                        {value:634, name: '4轴车'},
                        {value:735, name: '5轴车'},
                        {value:735, name: '6轴车'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        let c1 = this.$refs.c1;
        c1.mergeOptions(this.chart);


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