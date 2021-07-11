import Vue from 'vue'
import Vuex from 'vuex'
/* import axios from 'axios' */

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataExpenses: [],
        categoriesList: [],
    },
    getters: {
        expenses: state => state.dataExpenses,
        categories: state => state.categoriesList,
        count: state => state.dataExpenses.length,
        amount: state => state.dataExpenses.reduce((sum, el) => sum += el.cost, 0 ),        
    },
    mutations: {
        addNewCost(state, data) {
            if(data instanceof Array && !state.dataExpenses.length) {
                state.dataExpenses = []
                state.dataExpenses.push(...data)
            } else if(!(data instanceof Array))
                state.dataExpenses.push(data)
        },
        addNewCategory(state, data) {
            if(data instanceof Array && !state.categoriesList.length)
                state.categoriesList.push(...data)
            else if(!(data instanceof Array))
                state.categoriesList.push(data)        
        }
    },
    actions: {
        addData({commit}, data) {
            commit('addNewCost', data)
        },
        getAllExpenses({commit}, data) {
            commit('addNewCost', data.expenses)
            commit('addNewCategory', data.category)            
        },
    }
})