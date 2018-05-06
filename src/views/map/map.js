/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetXY} from './api/map'
import dotview from './components/dotview.vue'

var randomState = 0;
var timeSet;
export default {
    components:{dotview},
    data(){
        return{
            dotList: [],
            imageWidth: 1059,
            imageHeight: 672,
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
        }
    },
    created: function () {

        timeSet = setInterval(function () {
            GetXY().then((response) => {
                this.dotList = response.data;

            })

        }, 60000)


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