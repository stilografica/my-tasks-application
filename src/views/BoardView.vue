<script setup>
import { useBoardStore } from "../stores/board";
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import { RouterView } from "vue-router";

const board = useBoardStore();

const boardVariant = (variant) => {
  const variantsColors = {
    "To do": "secondary",
    "In progress": "warning",
    Completed: "success",
  };
  return variantsColors[variant];
};
const createTask = ($event, column) => {
  board.createNewTask($event.target.value, column)
  $event.target.value = ''
  console.log($event.target.value)
};

const router = useRouter();
const dialog = ref(false);
const column = ref("");

const taskLocation = (id, columnName) => {
  column.value = columnName;
  dialog.value = true;
  return router.push({ name: "task", params: { id: id } });
};
</script>
<template>
  <v-container fluid>
    <div class="d-flex flex-wrap flex-lg-nowrap align-start mx--md16 px-16">
      <!-- Boards -->
      <v-card
        v-for="(column, $columnIndex) of board.board.columns"
        class="w-100 mx-md-8 py-5 my-5 d-flex flex-column"
        :color="boardVariant(column.name)"
        :key="$columnIndex"
      >
        <div class="mb-auto">
          <h2 class="text-center">{{ column.name }}</h2>
          <!-- Tasks -->
          <v-card
            class="task my-4 mx-5"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            :title="task.name"
            :subtitle="task.description"
            @click="taskLocation(task.id, column.name)"
          />
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
    </div>
    <!-- Task Modal -->
    <v-dialog v-model="dialog" style="min-width: 300px; max-width: 500px">
      <v-card>
        <v-card-title :class="`bg-${boardVariant(column)}`">
          {{ column }}
        </v-card-title>
        <v-card-text>
          <RouterView class="my-5" />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="white" class="bg-primary" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.task {
  cursor: pointer;
}

.task-title::first-letter {
  text-transform: capitalize;
}
.text-field {
  border-bottom: 1px solid #fff;
  color: #fff
}
.text-field:focus { outline: none; }
</style>
