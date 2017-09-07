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
        },
        markLine: {
            data: [
                {
                    name: '平均线',
                    type: 'average',
                    label: {
                        normal: {
                            position: 'start',
                            formatter: '均值  '
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'grey',
                            type: 'solid'
                        }
                    }
                },
                {
                    name: '最大值',
                    yAxis: 0,
                    label: {
                        normal: {
                            position: 'start',
                            formatter: '最大值  '
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'red',
                            type: 'solid'
                        }
                    }
                }, {
                    name: '最小值',
                    yAxis: 0,
                    label: {
                        normal: {
                            position: 'start',
                            formatter: '最小值  '
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'red',
                            type: 'solid'
                        }
                    }
                }]
        }
    },
};