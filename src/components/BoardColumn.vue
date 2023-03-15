<script setup>
import { useBoardStore } from "../stores/board";
import { defineProps,toRefs } from "vue";
import ColumnTask from '@/components/ColumnTask.vue';

const props = defineProps({
  column: Object
})
const { column } = toRefs(props);

const boardStore = useBoardStore();

const emit = defineEmits(['openModal'])

const boardVariant = (variant) => {
  const variantsColors = {
    "To do": "secondary",
    "In progress": "warning",
    Completed: "success",
  };
  return variantsColors[variant];
};
const createTask = ($event, column) => {
  boardStore.createNewTask($event.target.value, column)
  $event.target.value = ''
};
</script>
<template>      
  <!-- Boards -->
  <v-card
    class="w-100 mx-md-8 py-5 my-5 d-flex flex-column"
    :color="boardVariant(column.name)"
    :key="$columnIndex"
  >
    <div class="mb-auto">
      <h2 class="text-center">{{ column.name }}</h2>
      <!-- Tasks -->
      <column-task :column="column" @openModal="emit('openModal', $event)"/>
    </div>
    <!-- Add new task -->
    <div>
      <input
        class="mx-2 text-field"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.name)"
      />
    </div>
  </v-card>
</template>