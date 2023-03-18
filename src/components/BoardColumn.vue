<script setup>
import { useBoardStore } from "../stores/board";
import { defineProps,toRefs, computed, ref } from "vue";
import ColumnTask from '@/components/ColumnTask.vue';
import { boardIcon, boardVariant } from '@/utils';
import placeholder from '@/assets/noTasksPlaceholder.png'

const props = defineProps({
  column: Object
})
const { column } = toRefs(props);

const boardStore = useBoardStore();

const emit = defineEmits(['openModal']);

const noDataImage = computed(() => {
  return placeholder;
})
const hasError = ref(false);

const noDataContent = computed(() => {
  return !column.value.tasks || column.value.tasks.length === 0
})
const showAlert = ref(false);

const createTask = ($event, column) => {
  if ($event.target.value.length > 0) {
    boardStore.createNewTask($event.target.value, column);
    $event.target.value = '';
    boardStore.showMessage({ show: true, text: 'Task created successfully' });
    setTimeout(() => {
      boardStore.showMessage({ show: false, text: '' });
    }, 2000);
  } else {
    hasError.value = true;
  }
};
</script>
<template>      
  <!-- Boards -->
  <div
    class="w-100 mx-md-8 py-5 my-5 d-flex flex-column position-relative"
    :class="{ 'mb-16': noDataContent }"
  >
    <div class="mb-auto">
      <div class="d-flex justify-center">
        <v-icon :icon="boardIcon(column.name)" :color="boardVariant(column.name)"  class="icon mt-1 mr-3"/>
        <h2 class="text-center font-weight-thin">{{ column.name }}</h2>
      </div>
      <!-- Tasks -->
      <column-task :column="column" @openModal="emit('openModal', $event)"/>
      <div v-if="noDataContent" class="no-data-container my-5 d-flex flex-column align-center mx-auto">
        <img :src="noDataImage" alt="Icons made by www.flaticon.com" class="d-block mb-3"/>
        <p class="text-center no-data-message">No tasks yet</p>
      </div>
    </div>
    <!-- Add new task -->
    <div class="d-block mx-auto" :class="{ 'create-task--input': noDataContent }">
      <input
        class="mx-12 input-field"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.name)"
        @input="hasError = false"
      />
      <p v-if="hasError" class="error-message text-center">
        <small>Rellena el campo</small>
      </p>
    </div>
  </div>
</template>
<style scoped>
.input-field {
  padding: 0.438rem 1rem;
  background-clip: padding-box;
  border: 1px solid #d8d6de;
  border-radius: 0.357rem;
}
.no-data-message {
  color: #bbb;
}
.no-data-container {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.create-task--input {
  position: absolute;
  top: 115%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.error-message {
  color: #E53935
}
</style>