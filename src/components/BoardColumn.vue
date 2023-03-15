<script setup>
import { useBoardStore } from "../stores/board";
import { defineProps,toRefs } from "vue";
import ColumnTask from '@/components/ColumnTask.vue';
import { boardVariant, boardIcon } from '@/utils';

const props = defineProps({
  column: Object
})
const { column } = toRefs(props);

const boardStore = useBoardStore();

const emit = defineEmits(['openModal'])

const createTask = ($event, column) => {
  boardStore.createNewTask($event.target.value, column)
  $event.target.value = ''
};
</script>
<template>      
  <!-- Boards -->
  <div
    class="w-100 mx-md-8 py-5 my-5 d-flex flex-column"
    :key="$columnIndex"
  >
    <div class="mb-auto">
      <div class="d-flex justify-center">
      <v-icon :icon="boardIcon(column.name)" :color="boardVariant(column.name)"  class="icon mt-1 mr-3"/>
      <h2 class="text-center font-weight-thin">{{ column.name }}</h2>
    </div>
      <!-- Tasks -->
      <column-task :column="column" @openModal="emit('openModal', $event)"/>
    </div>
    <!-- Add new task -->
    <div>
      <input
        class="mx-12 input-field"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.name)"
      />
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
</style>