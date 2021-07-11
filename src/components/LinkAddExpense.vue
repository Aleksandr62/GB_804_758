<template>
  <div class="linksAdd">
      <div>
          <h3>Частые расходы:</h3>
      </div>
      <div>
        <router-link class="link"
        v-for="(link, idx) in shortLinks"
        :key="idx"
        :to="`${link.path}/${link.name}?value=${link.value}`"
        >
            <span>+</span> {{ link.name }}: {{ link.value }}
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
    name: 'LinkAddExpense',
    data() {
        return {            
            shortLinks: [
                { name: 'Food', path: '/dashboard/add/payment', value: 200},                             
                { name: 'Sport', path: '/dashboard/add/payment', value: ''},   
                { name: 'Education', path: '/dashboard/add/payment', value: 1000}, 
                { name: 'Navigation', path: '/dashboard/add/payment', value: 500},                                 
            ]
        }
    },
}
</script>

<style scoped>
.linksAdd {
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 4px 8px;  
  border-top: 1px solid #BEBEBE;
  border-bottom: 1px solid #BEBEBE;    
  color: #222222;
  display: flex;
  width: fit-content;
  display: flex;
  flex-direction: column;
}
.link {
  text-decoration: none;
  font-size: 12px;
  margin: 0 3px;
  padding: 3px 6px;
  cursor: pointer;
  border: transparent;
  border-radius: 3px;
  background: teal;
  color: white;  
}
.link:hover {
  background: rgb(0, 100, 100); 
}
.link:before:not(:first-child) {
  content: "|";
}
span {
    font-family: monospace;
    font-size: 20px;
    font-weight: bolder;
}
</style>