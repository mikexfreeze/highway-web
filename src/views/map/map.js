/**
 * Created by Micheal Xiao on 2017/7/10.
 */
import {GetXY} from './api/map'
import dotview from './components/dotview.vue'

var randomState = 0;

export default {
    components:{dotview},
    data(){
        return{
            dotList: []
        }
    },
    methods:{
        getXY(){
            this.dotList = testXY();
        }
    },
    created: function () {
        GetXY().then((response) => {
            this.dotList = response.data;
        })

        setInterval(function () {
            GetXY().then((response) => {
                this.dotList = response.data;
            })

        }, 60000)
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