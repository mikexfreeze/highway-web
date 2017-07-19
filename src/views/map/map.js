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
            imageWidth: 906,
            imageHeight: 545,
        }
    },
    mounted() {
      this.$nextTick(function () {
          window.addEventListener('resize', this.getImageWidth);
          window.addEventListener('resize', this.getImageHeight);


      })
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
        GetXY().then((response) => {
            this.dotList = response.data;
        })

        console.log("d")
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
        console.log("c")
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
        "top" : "250",
        "left" : "700",
        "stat" : randomState
    },
        {
            "top" : "350",
            "left" : "200",
            "stat" : randomState
        }];

    randomState++;

    return result;
}