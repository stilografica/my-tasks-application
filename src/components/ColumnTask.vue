<script setup>
import { useBoardStore } from "../stores/board";
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router";
import { ref, defineProps,toRefs } from "vue";
import draggable from 'vuedraggable';
import { uuid } from '@/utils';

const props = defineProps({
  column: Object
})

const { column } = toRefs(props);

const boardStore = useBoardStore();

const { board } = storeToRefs(boardStore);

const emit = defineEmits(['openModal'])

const router = useRouter();
const drag = ref(false);

const taskLocation = (id, columnName) => {
  emit('openModal', columnName)
  return router.push({ name: "task", params: { id: id } });
};

const draggableEnd = ($columnIndex) => {
  const tasks = board.value.columns[$columnIndex];
  boardStore.sortTaks($columnIndex, tasks)
  drag.value = false
}

</script>
<template>      
  <!-- Tasks -->
  <draggable
    v-model="column.tasks"
    :item-key="uuid()"
    group="columns"
    class="list-group"
    @start="drag=true"
    @end="draggableEnd($columnIndex)"
    >
    <template #item="{ element: task }">
      <li
        class="task my-4 mx-5 list-group-item pt-2 pl-2"
        :key="task.id"
        :subtitle="task.description"
        @click="taskLocation(task.id, column.name)"
      >
      <h4>{{ task.name }}</h4>
      </li>
    </template>
  </draggable>
</template>
<style scoped>
.task {
  height: 40px;
  border-radius: .2rem;
  background-color: #fff;
  color: #000;
  display: block;
}
.task-title::first-letter {
  text-transform: capitalize;
}
.text-field {
  border-bottom: 1px solid #fff;
  color: #fff
}
.text-field:focus { outline: none; }
.list-group-item {
  cursor: move;
}

</style>