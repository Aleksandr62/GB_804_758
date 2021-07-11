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
            value: this.$route.query.value || 0,
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
        this.$store.dispatch('addData', {...data, id: this.countExpenses + 1})  
        this.$router.push(`/dashboard/${this.pages[this.pages.length - 1]}`)        
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
</style>