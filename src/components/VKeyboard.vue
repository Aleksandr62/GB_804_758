<template>
    <div class="wrapper" v-if="showKeyb">
        <div class="wrapper-inner" >
        <button class="calc-btn" 
        v-for="(btn, idx) in 10" 
        :key="idx"
        @click="$emit('clk-btn', idx)"
        > 
        {{ idx }} 
        </button>
        <button class="calc-btn"  @click="$emit('clk-btn-backspace')"> <h3>←</h3>  </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['showKeyb'],
    name: 'VKeyboard',
    data: () => {
    }
}
</script>

<style>
.wrapper {
    margin-top: 10px;
    padding: 18px;
    width: 170px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
    background: #a5a5a5;
}

.wrapper-inner {
    margin: -12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;    
}
.calc-btn {
    margin: 6px;
    justify-self: flex-start;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: coral;
    box-shadow: 1px 1px 3px #2b2b2b;
    color: #2b2b2b;
}

</style>