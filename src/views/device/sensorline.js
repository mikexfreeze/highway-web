export let sensorline = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        },
        boundaryGap: false
    },
    yAxis: {
        splitLine: {
            show: false
        },
        max: 1010,
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        },
    },
    series: {
        type: 'line',
        data: [],
        lineStyle: {
            normal: {
                color: 'green'
            }
        }
    },
};