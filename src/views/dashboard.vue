<template>
  <div>
    <div class="top">
      <form-add-expense
        ref="formAddExpense"
        :countExpenses="countExpenses"
        :categories="categories"
        @add-expense="addNewCost"
      />
      <form-add-category
        :categories="categories"
        @add-category="addNewCategory"
      />  
      <select class="countPages" v-model="quantityOnPage">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>            
      </select>    
    </div>
    <link-add-expense></link-add-expense>
    <show-expenses
      :expenses="expensesPage"
    />
    <pagination
      :quantityOnPage="quantityOnPage"
      :pages="pages"
      :curPage="+$route.params.page"
    />
  </div>
</template>

<script>
import FormAddExpense from '../components/FormAddExpense.vue';
import FormAddCategory from '../components/FormAddCategory.vue';
import LinkAddExpense from '../components/LinkAddExpense.vue';
import ShowExpenses from '../components/ShowExpenses.vue';
import Pagination from '../components/Pagination.vue';
import { mapActions } from 'vuex'

const expenses = [
            {id: 1, date: '2021-03-17', category: 'Food', cost: 1000 },
            {id: 2, date: '2021-04-12', category: 'Entertaiment', cost: 4500 },     
            {id: 3, date: '2021-01-21', category: 'Food', cost: 1000 },
            {id: 4, date: '2021-05-05', category: 'Education', cost: 4500 },      
            {id: 5, date: '2021-05-10', category: 'Sport', cost: 1000 },
            {id: 6, date: '2021-02-20', category: 'Navigation', cost: 4500 },                   
          ]
const category = ['Food', 'Entertaiment', 'Education', 'Sport', 'Navigation' ]

export default {
  name: 'Dashboard',
  data() {
    return {
      quantityOnPage: 5,
    }
  },
  components: {
    FormAddExpense,
    FormAddCategory,
    LinkAddExpense,
    ShowExpenses,
    Pagination
  },
  computed: {
    countExpenses() {
      return this.$store.getters.count
    },
    pages() {
      return Array.from({length: Math.ceil(this.countExpenses / this.quantityOnPage)}, (v, i) => i + 1)
    },
    page() {
        return this.$route.params.page - 1
    },
    expensesPage() {
        const {page, quantityOnPage} = this
        return this.$store.getters.expenses.slice(page * quantityOnPage, page * quantityOnPage + quantityOnPage)
    },
    categories() {
      return this.$store.getters.categories
    },
    attrs() {
        return { 
            category: this.$route.params.category || '',
            cost: +this.$route.params.idx || 0,
            value: +this.$route.query.value || 0,
            vm: this
        }
    }
  },
  methods: {
    ...mapActions([
      'addData',
      'getAllExpenses' 
    ]),
    
    addNewCost(data) {
          const idx  = this.$store.getters.expenses.findIndex((el) => el.id === data.id ) || -1
        if(idx !== -1)
          this.editCost(data)
        else
          this.$store.dispatch('addData', {...data, id: this.countExpenses + 1})  
        this.$router.push(`/dashboard/${this.pages[this.pages.length - 1]}`)        
    },
    delCost(id) {
        this.$modal.hide()
        this.$store.dispatch('delData', id)  
        this.$router.push(`/dashboard/${this.pages[this.pages.length - 1]}`)          
    },
    editCost(cost) {
        this.$modal.hide()
        this.$store.dispatch('editData', cost)  
    },
    addNewCategory(cat) {
        this.$store.commit('addNewCategory', cat)  
    }      
  },
  created() {
    this.getAllExpenses({expenses, category})
  },  
  watch: {
      attrs: (params) => {
        if(params.cost && params.vm.$route.name === 'deletePayment')
          params.vm.delCost(params.cost)
        if(params.cost && params.vm.$route.name === 'editPayment') {
          params.vm.$refs.formAddExpense.expense = params.vm.$store.getters.expenses.find(el => el.id === params.cost)
          params.vm.$refs.formAddExpense.showForm = true      
        }
        if(params.category)
            if(params.value) {
                const expense = {
                    date: new Date(),
                    category: params.category,
                    cost: +params.value
                }
                params.vm.$refs.formAddExpense.expense = {...expense}
                params.vm.addNewCost(expense)
            } else {
                const expense = {...{
                    date: new Date(),
                    category: params.category,
                }} 
                params.vm.$refs.formAddExpense.expense = {...expense}                
                params.vm.$refs.formAddExpense.showForm = true
            }  
      }
  }  
}
</script>

<style scoped>
.top {
  display: flex;
}
.countPages {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-bottom: 1px solid #2b2b2b;
  border-radius: 3px;
  background: rgb(199, 198, 198);
  outline: none;
}
</style>