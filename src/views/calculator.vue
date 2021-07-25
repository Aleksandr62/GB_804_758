<template>
  <v-container>
      <v-row>
          <v-col>
            <calc :action="currentAction" :event="event" />
          </v-col>
          <v-col>          
            <keyboard @action-calc="actionHandler" @key-calc="inputNum" />
          </v-col>          
      </v-row>
  </v-container>
</template>

<script>
import Calc from '@/components/calc.vue'
import Keyboard from '@/components/keyboard.vue'
export default {
    name: "Calculator",
    components: {
        Calc,
        Keyboard,
    },
    data() {
        return {
            currentAction: '',
            event: null,
        }
    },
    methods: {
        actionHandler(action) {
            this.currentAction = action
        },
        inputNum(event) {
            this.event = event
        },
    }
}
</script>
<style scoped>

</style>