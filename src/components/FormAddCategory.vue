<template>
  <div>
    <div v-if="showForm" class="filter" @click="showForm = !showForm"></div>
    <div class="wrapper-form">
      <button class="addCost" @click="showForm = !showForm">
        Add new category +
      </button>
      <form
        v-if="showForm"
        class="addFormCoast"
        @submit.prevent.stop="$emit('add-category', category)"
      >
        <div class="row">
          <label for="category">Category:</label>
          <input
            v-model="category"
            class="inputData"
            id="category"
            type="text"
          />
        </div>
        <div class="row">
          <button class="btn-save" type="submit">Добавить</button>
          <button class="btn-close" @click="showForm = false">Закрыть</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    props:  {
        categories: {
            type: Array,
            default: () => [],
        }
    },
    name: 'FormAddCategory',
    data(){
        return{
            showForm: false,
            category: ''
        }
    },
}
</script>

<style scoped>
.wrapper-form {
  margin-left: 10px;
  width: fit-content;
  position: relative;
}
</style>