<template>
  <v-card flat>
      <v-card-title class="mb-6"><h1>My personal costs</h1></v-card-title>
    <v-data-table
      :headers="headers"
      :items="expenses"
      :page.sync="page"
      :caption="`Total: ${this.total}`"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">

                  <v-btn color="teal" dark v-bind="attrs" v-on="on">
                    Add new cost <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-select
                    class="mx-8"
                    dense
                    v-model="itemsPerPage"
                    :items="[5, 10, 15]"
                    label="Items per page"
                  ></v-select>                      

            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-menu
                      v-model="menuDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.date"
                          label="Date"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.date"
                        no-title
                        @input="menuDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-row>
                  <v-row>
                    <v-select
                      v-model="editedItem.category"
                      :items="categories.labels"
                      prepend-inner-icon="mdi-form-select"
                      label="Category"
                    ></v-select>
                    <AddNewCategory @add-category="addCategory"/>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model.number="editedItem.cost"
                      :rules="[rules.value, rules.required]"
                      :error-messages="errorMessages"
                      valid
                      prepend-inner-icon="mdi-currency-rub"
                      label="Cost"
                      required
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-2" text @click="close"> Cancel </v-btn>
                <v-btn color="teal darken-2" text @click="save" :disabled="!validate"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Delete this cost?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-2" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="teal darken-2" text @click="deleteCostConfirm"
                  >Delete</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="text-center">
          <v-menu bottom offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(action, idx) in costActions" :key="idx">
                <v-btn
                  text
                  color="teal darken-1"
                  @click="action.action(item)"
                  >{{ action.title }}</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination 
      v-model="page" 
      color="teal"
      :length="pageCount"
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
import AddNewCategory from '@/components/addNewCategory.vue'
import { mapActions } from 'vuex'

export default {
    props: {
        expenses: {
            type: Array,
            default: () => []
        },
        categories: {
            type: Object,
            default: () => {}
        },
    },
    name: "ShowExpenses",
    components: {
        AddNewCategory
    },
    data() {
        return {
            dialog: false,
            dialogDelete: false,   
            menuDate: false,         
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            rules: {
                required: (v) => (v !== '' && v !== 0) || 'This field is required', 
                value: (v) => (typeof v) === 'number' || 'Input value (number)',
            },
            errorMessages: '',
            headers: [
                    { text: '#', width: '10%', value: 'id', },
                    { text: 'Data', width: '30%', value: 'date' },
                    {   text: 'Category', 
                        sortable: true,
                        width: '30%',
                        value: 'category' 
                    },
                    { text: 'Value', width: '20%', value: 'cost'},
                    { text: '', width: '10%', value: 'actions' },                    
                    ],
            costActions: [
                { title: 'Edit', action: (item) => { this.editItem(item) } },
                { title: 'Delete', action: (item) => { this.deleteItem(item) } },                    
                    ],
            editedIndex: -1,
            editedItem: {
                id: 0,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                category: '',
                cost: 0,
            },
            defaultItem: {
                id: 0,
                date: '',
                category: '',
                cost: 0,
            },                    
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New cost' : 'Edit cost'
      },
      total() {
          return this.expenses.reduce((sum, el) => sum += el.cost, 0)
      },
      newId() {
          return this.expenses.length + 1
      },
      validate() {
          const {date, category, cost} = this.editedItem
          return !!(date && category && cost && typeof cost === 'number') 
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
        ...mapActions([
            'addData',
            'delData',
            'editData',
        ]),
      addCategory(category) {
          this.$store.commit('newCategory', category)  
      },
      editItem (item) {
        this.editedIndex = this.expenses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.expenses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteCostConfirm () {
        this.delData(this.editedIndex)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.editData(this.editedItem)
        } else {
          this.addData({...this.editedItem, id: this.newId })
        }
        this.close()
      },
    }
}
</script>
<style>
</style>