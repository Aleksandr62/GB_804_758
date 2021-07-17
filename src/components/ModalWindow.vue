<template>
  <div>
    <transition name="fade">
      <component :is="ModalWindoW" :modalWindowSettings="modalWindowSettings" 
      />
    </transition>
  </div>
</template>
 
<script>
export default {
    name: 'ModalWindow',
    components: {
        ContextMenu: () => import('@/components/ContextMenu.vue'),
    },
    props: {
        ModalWindoW: String,
        modalWindowSettings: Object
    },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: opacity 1s;
}
</style>