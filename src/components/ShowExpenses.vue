<template>
  <div>
    <div class="total">Total: {{ amount }}</div>
    <table class="show-expenses">
      <tr class="header">
        <td class="cell">#</td>
        <td class="cell">Date</td>
        <td class="cell">Category</td>
        <td class="cell" colspan="2">Value</td>
      </tr>
      <tr v-for="(expense, idx) in expenses" :key="idx">
        <td class="cell">{{ expense.id }}</td>
        <td class="cell">{{ dateToString(new Date(expense.date)) }}</td>
        <td class="cell">{{ expense.category }}</td>
        <td class="cell">{{ +expense.cost }}</td>
        <td class="cell">
          <button
            class="context-menu-btn"
            @click="
              $modal.show('ContextMenu', { idCost: expense.id, $event })
            "
          >
            &#8942;
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
    name: 'ShowExpenses',    
    props:  {
        expenses: {
            type: Array,
            default: () => [],
        },              
    },
    computed: {
        amount() {
            return this.$store.getters.amount
        }
    },
    methods: {
        dateToString(date) {
            return date.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })
        },
    }
}
</script>

<style scoped>
.show-expenses {
  border-collapse: collapse;
  width: fit-content;
}
.total {
  padding: 8px 20px;
  font-weight: 800;
}
.header {
  font-weight: 800;
}
.cell {
  padding: 0 24px;
  border-bottom: 1px solid #ebebeb;
}
.context-menu-btn {
  padding: 8px 16px;
  font-weight: 900;
  border: none;
  background: transparent;
  cursor: pointer;
}
.context-menu-btn:hover {
  background: #e3e3e3;
  position: relative;
}
</style>