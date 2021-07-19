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
        delCost(state, id) {
            state.dataExpenses.splice(state.dataExpenses.findIndex(el => el.id === id), 1)
        },
        editCost(state, cost) {         
            state.dataExpenses.splice(state.dataExpenses.findIndex(el => el.id === cost.id), 1, cost)
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
        delData({commit}, idx) {
            commit('delCost', idx)
        }, 
        editData({commit}, cost) {
            commit('editCost', cost)
        },        
        getAllData({commit}, data) {
            if(data.expenses) commit('addNewCost', data.expenses)
            if(data.category) commit('addNewCategory', data.category)            
        },
    }
})