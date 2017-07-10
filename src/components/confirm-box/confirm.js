/**
 * Created by Micheal Xiao on 2017/6/15.
 */
import { MessageBox } from 'element-ui';
import Vue from 'vue';

export default function ConfirmBox() {
    return MessageBox.confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}

Vue.prototype.ConfirmBox = ConfirmBox;