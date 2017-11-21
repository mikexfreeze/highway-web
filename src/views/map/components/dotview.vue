

<template>

        <span class="dot">
            <el-popover
                    ref="popover1"
                    placement="top-start"
                    :title="mapDot.stationName"
                    width="200"
                    trigger="hover"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </el-popover>

        <div class="dotview greenview" v-popover:popover1 v-if="mapDot.stat == 0" >
        </div>
        <div class="dotview blueview" v-popover:popover1 v-if="mapDot.stat == 1" >
        </div>
        <div class="dotview redview" v-popover:popover1 v-if="mapDot.stat == 2" >
        </div>
    </span>



</template>
<script>
    export default{
        props:['mapDot'],
        data: function () {
            return {
                tmpDot: this.mapDot
            }
        },
    }
</script>

<style scoped>
    @-webkit-keyframes twinkling{	/*透明度由0到1*/
        0%{
            opacity:0.5;				/*透明度为0*/
        }

        40%{
            opacity: 1;
        }

        80% {
           opacity: 0.5;
        }

        100%{
            opacity:0.3;				/*透明度为1*/
        }
    }


    .dot {
        position: absolute;
    }

    .dotview {
        width: 30px;
        height: 30px;
        position: absolute;
        -webkit-animation: twinkling 1.6s infinite ease-in-out;
    }
    
    .greenview {
        background-image: url('../../../assets/images/greendot.png');
        background-size:cover
    }
    
    .blueview {
        background-image: url("../../../assets/images/bluedot.png");
        background-size:cover
    }
    
    .redview {
        background-image: url("../../../assets/images/reddot.png");
        background-size:cover
    }
    


</style>

