<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useBoardStore } from "./stores/board";
import { storeToRefs } from 'pinia';
import Alert from '@/components/Alert.vue';

const alertStore = useBoardStore();

const { alert } = storeToRefs(alertStore);
</script>
<template>
  <main>
    <RouterView class="my-5"/>
    <transition name="fade" class="alert">
      <alert v-if="alert.show" :text="alert.text"/>
    </transition>
  </main>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.alert {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
