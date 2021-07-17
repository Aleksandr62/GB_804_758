<template>
  <div>
    <div class="menu">
      <router-link class="menu__item" to="/home"> Home </router-link> |
      <router-link
        class="menu__item"
        to="/dashboard/1"
      >
        Dashboard
      </router-link>
      |
      <router-link class="menu__item" to="/about"> About </router-link>
    </div>
    <div class="content">
      <router-view></router-view>
      <modal-window v-if="ModalWindoW" :ModalWindoW="ModalWindoW" :modalWindowSettings="modalWindowSettings" />      
    </div>
  </div>
</template>

<script>


export default {
    name: 'App',
    components: {
      ModalWindow: () => import('./components/ModalWindow.vue'),
    },  
    data() {
      return {
        ModalWindoW: '',
        modalWindowSettings: {}
      }
    },
    methods: {
        dateToString(date) {
            return date.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })
        },
        onShow (settings) {
          this.ModalWindoW = settings.name
          this.modalWindowSettings = settings
        },
        onHide () {
          this.ModalWindoW = ''
          this.modalWindowSettings = {}
        },

    },
    mounted () {
      this.$modal.EventBus.$on('show', this.onShow)
      this.$modal.EventBus.$on('hide', this.onHide)
    },
}
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
a:link {
  text-decoration: none;
  color: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu {
  background: #e3e3e3;
  display: flex;
  align-items: center;
  width: fit-content;
}
.menu__item {
  padding: 8px 20px;
}
.menu__item:hover {
  background: #bebebe;
}
.content {
  padding: 6px;
}
</style>
