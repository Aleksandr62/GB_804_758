import Vue from 'vue'
import Vuex from 'vuex'
/* import axios from 'axios' */

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataExpenses: [],
        categoriesList: { labels: [], colors: [] },
    },
    getters: {
        expenses: state => state.dataExpenses,
        categories: state => state.categoriesList,   
    },
    mutations: {
        addNewCost(state, data) {
            if(data instanceof Array && !state.dataExpenses.length) {
                state.dataExpenses = []
                state.dataExpenses.push(...data)
            } else if(!(data instanceof Array))
                state.dataExpenses.push(data)
        },
        delCost(state, idx) {
            state.dataExpenses.splice(idx, 1)
        },
        editCost(state, cost) {         
            state.dataExpenses.splice(state.dataExpenses.findIndex(el => el.id === cost.id), 1, cost)
        },        
        newCategory(state, data) {
            if(data.labels instanceof Array && !state.categoriesList.labels.length) {
                state.categoriesList.labels.push(...data.labels)   
                state.categoriesList.colors.push(...data.colors)                 
            } else if(!(data.labels instanceof Array)) {
                state.categoriesList.labels.push(data.labels)   
                state.categoriesList.colors.push(data.colors)                 
            }
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
        storeData({commit}, data) {
            if(data.expenses) commit('addNewCost', data.expenses)
            if(data.labels) commit('newCategory', data)            
        },
    }
})