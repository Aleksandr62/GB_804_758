import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ShowExpenses from '../components/ShowExpenses.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Test of ShowExpenses', () => {
    let getters
    let store    

    getters = {
        amount: () => 3000,
    }
    store = new Vuex.Store({
        getters
    })

 const wrapper = mount(ShowExpenses, {
  store, 
  localVue,
  propsData: {
    expenses: [
        {id: 3, date: '2021-01-21', category: 'Food', cost: 1000 },
        {id: 4, date: '2021-01-21', category: 'Food', cost: 1000 },
        {id: 5, date: '2021-01-21', category: 'Food', cost: 1000 },                
    ]
  }
}
) 
 test('Проверка кол-во записей по расходам', () => {
  expect(wrapper.props().expenses.length).toBe(3)   
 }) 

 test('Проверка суммы расходов из хранилища (геттер)', () => {
    expect(wrapper.vm.amount).toBe(3000)   
   }) 

 test('Кол-во строк в table', () => {
  const tableRows = wrapper.findAll('tr')  
  expect(tableRows.length).toBe(4)
 })

})
