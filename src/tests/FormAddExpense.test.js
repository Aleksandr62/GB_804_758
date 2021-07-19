import { mount  } from '@vue/test-utils'
import FormAddExpense from '../components/FormAddExpense.vue'

describe('Test of FormAddExpense', () => {
 const wrapper = mount(FormAddExpense, {
  propsData: {
    categories: ['Food', 'Entertaiment', 'Education', 'Sport', 'Navigation' ]
  }
}
) 
 wrapper.vm.$data.showForm = true

 test('Проверка монтирования', () => {
   expect(wrapper.exists()).toBe(true)
 }) 

 test('Input value of FormAddExpense', () => {
   const inputValue = wrapper.findAll('input[id="costValue"]')
   inputValue.setValue('100')
   expect(wrapper.vm.$data.expense.cost).toBe(100)   
 })

 test('Проверка ввода данных Категории', () => {
  const options = wrapper.find('select').find('option[value="Food"]')
  options.setSelected()
  expect(wrapper.vm.$data.expense.category).toBe('Food')   
 }) 

 test('Кнопка записать нажатие - событие add-expense', () => {
  const saveBtn = wrapper.find('.btn-save')   
  saveBtn.trigger('submit')
  expect(wrapper.emitted('add-expense')).toBeTruthy()
 })

})
