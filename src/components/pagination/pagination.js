/**
 * Created by Micheal Xiao on 2017/6/2.
 */
export default {
    props:['total'],
    methods:{
        pageChange(page) {
            this.$emit('pageChange',page)
        },
    }
}