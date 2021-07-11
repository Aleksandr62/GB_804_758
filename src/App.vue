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
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
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
