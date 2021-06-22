<template>
    <div>
        <input type="number" v-model.number="operand1" placeholder="operand1"/>
        <input type="number" 
            v-model.number="operand2" 
            placeholder="operand2" 
            @blur="sendData(operand2)"
        />
         = {{ sum }}

        {{ text.length + sum}}

        <div class="keyboard">
            <button v-on:click="sum = operand1 + operand2">+</button>
            <button v-on:click="sum = operand1 - operand2">-</button>
            <button @click="mult">*</button>
            <button @click="mult">=</button>
            <button @click="div(operand1, operand2)">/</button>
        </div>
        {{powWithOperand}}
        {{powSum}}
    </div>
</template>

<script>
export default {
    name: "Calculator",
    data(){
        return {
            text: "Some string",
            operand1: 0,
            operand2: 0,
            sum: 0
        }
    },
    watch: {
        sum: function(newValue) {
            this.sendData(newValue)
        }
    },
    methods: {
        mult() {
            this.sum = this.operand1 * this.operand2
        },
        div(op1,op2) {
            this.sum = op1 / op2 
        },
        sendData(data){
            console.log("Send Data name", data)
        }
    },
    computed: {
        powWithOperand(){
            return Math.pow(this.operand1, this.operand2)
        },
        powSum(){
            return Math.pow(this.sum, 4)
        }
    }
}
</script>

<style>

</style>