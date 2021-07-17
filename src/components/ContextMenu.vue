<template>
    <div class="wrapper"
    :style = "`top: ${modalWindowSettings.$event.clientY - modalWindowSettings.$event.offsetY}px;
            left: ${modalWindowSettings.$event.srcElement.offsetLeft + modalWindowSettings.$event.srcElement.offsetWidth}px`"
    >
        <router-link class="item-menu"
        v-for="(item, idx) of menuItems" 
        :key="idx" 
        :to="item.path"
        > {{ item.title }} </router-link>
        <button class="btn-close" @click="$modal.hide()">Закрыть</button>
    </div>
</template>

<script>
export default {
    props: {
        modalWindowSettings: Object
    },
    name: 'ContextMenu',
    computed: {
        menuItems() {
            return [
                    {title: 'Редактировать', path: `/dashboard/edit/${this.modalWindowSettings.idCost}`},
                    {title: 'Удалить', path: `/dashboard/delete/${this.modalWindowSettings.idCost}`},                
                ]
        }
    },     
}
</script>

<style scoped>
.wrapper {
  width: fit-content;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #EBEBEB;
  border-radius: 3px;
}
.item-menu {
  text-decoration: none;
  padding: 6px 12px;
  transition: background 0.3s;  
}
.item-menu:hover {
  background: #EBEBEB;
  transition: background 0.3s;
}
</style>