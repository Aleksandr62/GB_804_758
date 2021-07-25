<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col>
        <v-card width="168" flat>
          <v-btn
            class="px-1"
            elevation="1"
            tile
            fab
            v-for="(item, idx) of numbers"
            :key="idx"
            @click.stop="$emit('key-calc', {data: item, $event})"
          >
            {{ item }}
          </v-btn>
        </v-card>
        <v-card flat>
          <v-btn
            class="px-1"
            active-class="active"
            elevation="1"
            tile
            fab
            v-for="(item, idx) of actions"
            :key="idx"
            :title="item.help"
            @click.stop="$emit('action-calc', item.action)"
          >
           <v-icon v-if="item.action ==='mdi-backspace'">{{item.action}}</v-icon>
           <span v-else>{{ item.action }}</span> 
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
    name: "Keyboard",
    data() {
        return {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            actions: [
                { action: 'mdi-backspace', help: 'удалить символ', },
                { action: '/', help: 'деление', },                
                { action: '*', help: 'умножение', },
                { action: '-', help: 'вычитание', },
                { action: '+', help: 'сложение', },
                { action: '%', help: 'целочисленное деление', },
                { action: '^', help: 'возведение в степень', },                                                                                
                { action: 'f', help: 'финнобачи', },                                       
            ],
            selectButton: null,
        }
    },
}
</script>
<style scoped>
.active {
  background: teal;
}
</style>