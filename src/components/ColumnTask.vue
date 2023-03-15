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
const dialog = ref('');

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
        class="task my-4 mx-10 list-group-item pt-4 px-5"
        :key="task.id"
        :subtitle="task.description"
        @click="taskLocation(task.id, column.name)"
      >
      <div class="d-flex justify-space-between mt-2">
      <h4 class="font-weight-thin">{{ task.name }}</h4>
      <v-icon icon="mdi-delete-outline" color="grey" size="small" class="icon" @click="dialog = true"/>
    </div>
      </li>
    </template>
  </draggable>
</template>
<style scoped>
.task {
  height: 80px;
  border-radius: 1.2rem;
  background-color: #fff;
  color: #000;
  display: block;
  border: 1px solid rgba(34,41,47,.125);
  -webkit-filter: drop-shadow(0 5px 10px rgba(0,0,0,.1));
    filter: drop-shadow(0 5px 10px rgba(0,0,0,.1));}
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
.icon {
  opacity: .4
}
</style>