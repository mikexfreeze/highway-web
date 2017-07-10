/**
 * Created by Micheal Xiao on 2017/6/7.
 */
const expTabs = {
    state: {
        expTabs:[{
            title: 'Tab 1',
            name: '1',
        }, {
            title: 'Tab 2',
            name: '2',
        }]
    },

    mutations: {
        ADD_EXP_TAB: (state, tab) => {
            state.expTabs.push(tab)
        },
        SET_EXP_TAB: (state, tabs) => {
            state.expTabs = tabs
        },
    },

    actions: {

        AddExpTab({commit, state},tab){
            return new Promise(()=>{
                commit('ADD_EXP_TAB', tab);
            })
        },
        SetExpTab({commit, state},tabs){
            return new Promise(()=>{
                commit('SET_EXP_TAB', tabs);
            })
        }


    }
};

export default expTabs;
