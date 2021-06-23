<template>
  <div class="calc">
      <h1>Калькулятор</h1>
    <div class="row btn-group">
        <button 
        class="action__button" 
        v-for="(act, idx) in operators" 
        :class="{ active: selectAction === act }"
        :key="idx" 
        :title="helps[act]"
        @click="selectAction = act"
        > 
        {{ act }} 
        </button>
    </div>
        <div class="row">
    <label class="operand">Операнд 1:
        <input v-model.number="operandOne" placeholder="Операнд 1" type="text" />
    </label>

    <div v-if="!!selectAction" class="action"> {{ selectAction }} </div>

    <label class="operand">Операнд 2:
        <input v-model.number="operandTwo" placeholder="Операнд 2" type="text" />
    </label>

            <div class="action"> = </div>

    <div class="operand">Результат:
        <div v-if="!!selectAction" class="total"> {{ result }} </div>
    </div>
        </div>
    <hr>

  </div>
</template>

<script>
export default {
    name: 'Vcalc',
    data() {
        return {
            operandOne: 0,
            operandTwo: 0,
            actions: {
                '-': (a, b) => a - b, 
                '+': (a, b) => a + b,
                '/': (a, b) => b === 0 ? 'на 0 делить нельзя' : a / b,
                '*': (a, b) => a * b,
                '%': (a, b) => b === 0 ? 'на 0 делить нельзя' : Math.floor(a / b),
                '^': (a, b) => Math.pow(a, b)
                },
            helps: {
                '-': 'вычитание', 
                '+': 'сложение',
                '/': 'деление',
                '*': 'умножение',
                '%': 'целочисленное деление',
                '^': 'возведение в степень'
                },
            operators: ['-', '+', '/', '*', '%', '^'],
            selectAction: '',
        }
    },
    computed: {
        result() {
            return this.actions[this.selectAction]( this.operandOne, this.operandTwo );
        }
    }
}
</script>

<style>
.calc {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    border: 1px solid #5c5b5b;
    box-shadow: 1px 1px 3px #535353;
}

h1 {
    text-align: left;
}

.row {
    margin-top: 0.5rem;
    padding: 1rem;    
    display: flex;
}

.btn-group {
    border-bottom: 1px solid #BEBEBE;
}

input {
    width: 6rem;
    padding: 0.5rem 1rem;
    font-size: 18px;
}

.operand {
    margin-right: 1rem;
    width: fit-content;
    display: flex;
    flex-direction: column;
}

.action {
    padding: 0.5rem;
    margin-top: 1rem;
    margin-right: 1rem;
    width: 20px;
    align-self: center;
}

.action__button {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.2rem;
    text-align: center;
    border: transparent;
    background: darkslategrey;
    color: white;
    font-weight: 800;
    transition: all 0.5s;
}

.action__button:hover {
    border: 1px solid darkslategrey;
    background: white;
    color: darkslategrey;
    transition: all 0.5s;
}

.active {
    background:tomato;
}

.total {
    padding: 0.5rem;
    min-width: 6rem;
    justify-self: center;
    width: fit-content;
    background-color: darkgrey;
    border: 1px solid grey;
    border-radius: 3px;
}

</style>