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
      <label class="operand"
        >Операнд 1:
        <input
          :class="{ active__operand: selectOperand === 'operandOne' }"
          v-model.number="operandOne"
          placeholder="Операнд 1"
          type="text"
        />
      </label>

      <div v-if="!!selectAction" class="action">{{ selectAction }}</div>

      <label class="operand"
        >Операнд 2:
        <input
          :class="{ active__operand: selectOperand === 'operandTwo' }"
          v-model.number="operandTwo"
          placeholder="Операнд 2"
          type="text"
        />
      </label>

      <div class="action">=</div>

      <div class="operand">
        Результат:
        <div v-if="!!selectAction" class="total">{{ result }}</div>
      </div>
    </div>
    <hr />
    <div class="label">
      <input
        id="one"
        type="radio"
        v-model="selectOperand"
        name="select"
        value="operandOne"
      />
      <label for="one">Операнд 1</label>
      <input
        id="two"
        type="radio"
        v-model="selectOperand"
        name="select"
        value="operandTwo"
      />
      <label for="two">Операнд 2</label>
      <br /><br />
      <label for="keyb">
        <input id="keyb" type="checkbox" v-model="showKeyb" /> Показать
        клавиатуру
      </label>
    </div>
    <v-keyboard
      :showKeyb="showKeyb"
      @clk-btn="handlerClickKeyb"
      @clk-btn-backspace="delSimb"
    />
  </div>
</template>

<script>
import VKeyboard from './VKeyboard.vue';

export default {
    name: 'Vcalc',
    components: {
        VKeyboard
    },
    data() {
        return {
            showKeyb: false,
            selectOperand: 'operandOne',
            operandOne: 0,
            operandTwo: 0,
            actions: {
                '-': (a, b) => a - b, 
                '+': (a, b) => a + b,
                '/': (a, b) => b === 0 ? 'на 0 делить нельзя' : a / b,
                '*': (a, b) => a * b,
                '%': (a, b) => b === 0 ? 'на 0 делить нельзя' : Math.floor(a / b),
                '^': (a, b) => Math.pow(a, b),
                'f': (a, b) => `Опер.1: ${this.fib(a)}, Опер.2: ${this.fib(b)}`,
                'x': () => this.clear()
                },
            helps: {
                '-': 'вычитание', 
                '+': 'сложение',
                '/': 'деление',
                '*': 'умножение',
                '%': 'целочисленное деление',
                '^': 'возведение в степень',
                'f': 'финнобачи',
                'x': 'очистить'                
                },
            operators: ['-', '+', '/', '*', '%', '^', 'f', 'x'],
            selectAction: '',
        }
    },
    computed: {
        result() {
            return this.actions[this.selectAction]( +this.operandOne, +this.operandTwo );
        }
    }, methods: {
        handlerClickKeyb(btn) {
            this[this.selectOperand] += String(btn);
            this[this.selectOperand] = +this[this.selectOperand];
        },
        fib(n) {
            return n <= 1 ? n : n + this.fib(n - 1);
        },
        clear() {
            this.selectOperand = 'operandOne';
            this.operandOne = 0;
            this.operandTwo = 0;
            this.selectAction = '';
        },
        delSimb() {
            this[this.selectOperand] = 
            `${this[this.selectOperand]}`.length > 1 ?
            `${this[this.selectOperand]}`.slice(0, -1) : 0;
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
  border-bottom: 1px solid #bebebe;
}

.label {
  align-self: start;
}

#keyb,
#one,
#two {
  width: fit-content;
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

.active__operand {
  outline: 3px solid coral;
}

.active {
  background: tomato;
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