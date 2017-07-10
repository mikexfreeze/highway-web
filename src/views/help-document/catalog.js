/**
 * Created by Micheal Xiao on 2017/7/5.
 */
import {GetCatalog, GetMdFile} from './api/getCatalog'
import markdown from 'markdown'
export default{
    data(){
        return{
            catalogData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created(){
        this.getCatalog();
    },
    methods: {
        getCatalog(){
            GetCatalog().then((response) => {
                this.catalogData = response.data;
            })
        },
        handleNodeChange(data){
            let tree = this.$refs.fileTree.data;
            checkOnPath.call(tree, data)
            let path = "";
            findPath.call(this, tree)
            // console.log(path)
            function findPath(tree) {
                tree.findIndex((val, n)=>{
                    if(val.onPath){
                        path = path + "/" + val.label;
                        if(val.children && val.children.length){
                            findPath.call(this, val.children)
                        }
                    }

                })
            }

            if(path){
                GetMdFile(path)
                    .then((response)=>{
                        var html = markdown.markdown.toHTML(response.data)
                        $("#md-container").html(html)
                    })
            }



        }
    }
}

function checkOnPath(selectNode) {
    var block = false
    this.forEach((val, n) => {
        if(val.children && val.children.length){
            if(checkOnPath.call(val.children, selectNode)){
                this[n].onPath = true;
            }else{
                this[n].onPath = false
            }
        }else{
            if(val.$treeNodeId == selectNode.$treeNodeId){
                this[n].onPath = true;
                block = true
            }else{
                this[n].onPath = false
            }
        }
    })
    return block

}