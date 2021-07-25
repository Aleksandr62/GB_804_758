<template>
  <v-toolbar flat>
    <v-dialog v-model="showForm" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="teal" dark v-bind="attrs" v-on="on">
          New category <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-card-title>New category</v-card-title>
          <v-container>
            <v-row>
              <v-text-field
                v-model="category.labels"
                :rules="[(v) => v !== '' || 'This field is required']"
                label="Category"
                required
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-2" text @click="showForm = !showForm">
            Cancel
          </v-btn>
          <v-btn
            color="teal darken-2"
            text
            type="submite"
            @click.stop="newCategory"
            :disabled="!category"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
export default {
    name: 'AddNewCategory',
    data(){
        return{
            showForm: false,
            category: { label: '', colors: ''},
        }
    }, 
    methods: {
        newCategory() {
            this.category.colors = 
                    `rgb(${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)})`
            this.$emit('add-category', this.category)
            this.showForm = false
        }
    },
}
</script>

<style scoped>
</style>