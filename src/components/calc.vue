<template>
  <v-container>
    <v-text-field
      :value="result"
      filled
      outlined
      readonly
    ></v-text-field>
    <v-switch
      v-model="switchOperands"
      inset
      color="teal"
    >
      <template v-slot:label>
        {{ switchOperands ? 'Operand 2' : 'Operand 1' }}
      </template>
    </v-switch>
    <v-text-field
      v-model.number="operandOne"
      label="Operand 1:"
      :rules="[rules.value, rules.required]"
      :disabled="switchOperands"
      required
    ></v-text-field>
    <v-text-field
      v-model.number="operandTwo"
      :rules="[rules.value, rules.required]"
      label="Operand 2:"
      :disabled="!switchOperands"      
      required
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
    props: {
        action: String || Object,
        event: Object,
    },
    name: "Calc",
    data() {
        return {
            operandOne: 0,
            operandTwo: 0,
            switchOperands: true,
            rules: {
                value: (v) => (typeof v === 'number') || 'Enter a number',
                required: (v) => (v !== '') || 'This field is required'
            },
            actions: {
                'mdi-backspace': () => this.delSimb(),
                '-': (a, b) => a - b, 
                '+': (a, b) => a + b,
                '/': (a, b) => b === 0 ? 'на 0 делить нельзя' : a / b,
                '*': (a, b) => a * b,
                '%': (a, b) => b === 0 ? 'на 0 делить нельзя' : Math.floor(a / b),
                '^': (a, b) => Math.pow(a, b),
                'f': (a, b) => `Опер.1: ${this.fib(a)}, Опер.2: ${this.fib(b)}`,
                },            
        }
    },
    computed: {
        result() {
            return this.action ? this.actions[this.action]( this.operandOne, this.operandTwo ) : 0;
        },
    },  
    methods: {
        fib(n) {
            return n <= 1 ? n : n + this.fib(n - 1);
        },     
        delSimb() {

        },      
    },
    watch: {
        event: function (val) {
            if(val.$event)
            this.switchOperands ? 
                this.operandTwo = +(this.operandTwo + String(val.data))
                : this.operandOne = +(this.operandOne + String(val.data))
        },
        action: function (val) {
            if(val.data === 'mdi-backspace' && val.$event)
            this.switchOperands ? 
                this.operandTwo = +(String(this.operandTwo).length > 1 ? String(this.operandTwo).slice(0, -1) : 0) 
                : this.operandOne = +(String(this.operandOne).length > 1 ? String(this.operandOne).slice(0, -1) : 0)
        }, 
    }  
}
</script>
<style scoped>
</style>